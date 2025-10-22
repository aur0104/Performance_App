import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {useRoute} from '@react-navigation/native';
import Share from 'react-native-share';
import styles from '../ChallengesDetail/styles';
import {Colors} from '../../../utils/Colors';
import AnySvg from '../../../components/AnySvg';
import {IMAGES} from '../../../assets/images';
import CustomButton from '../../../components/CustomButton';
import {hp} from '../../../utils/responsivesness';
import fonts from '../../../utils/Fonts';
import {getChallengeById, leaveChallenge} from '../../../services/calls';
import Toast from 'react-native-toast-message';

interface ChallengeDetailProps {
  navigation?: any;
}

const MyChallengeDetail: React.FC<ChallengeDetailProps> = ({navigation}) => {
  const {t} = useTranslation();
  const route = useRoute();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showMonthModal, setShowMonthModal] = useState(false);
  const [currentViewDate, setCurrentViewDate] = useState<Date>(new Date());
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear(),
  );

  const [loading, setLoading] = useState<boolean>(false);
  const [leaveLoading, setLeaveLoading] = useState<boolean>(false);
  const [challengeDetails, setChallengeDetails] = useState<any>(null);
  // Get challenge data from navigation params
  const challengeData = (route.params as any)?.challenge || null;
  const userChallenge = (route.params as any)?.userChallenge || null;
  const challengeStatus = (route.params as any)?.status || 'active';
  const {dailySubmissions} = route?.params as any;
  const submitDisable = useMemo(() => {
    if (!dailySubmissions || dailySubmissions.length === 0) return false;
    const today = new Date().toISOString().split('T')[0]; // yyyy-mm-dd
    return dailySubmissions.some((submission: any) => {
      const createdDate = submission.createdAt?.split('T')[0];
      return createdDate === today;
    });
  }, [dailySubmissions]);
  // Load challenge details from API
  useEffect(() => {
    if (challengeData?._id) {
      fetchChallengeDetails(challengeData._id);
    }
  }, [challengeData]);

  const fetchChallengeDetails = async (challengeId: string) => {
    try {
      setLoading(true);
      const response = await getChallengeById(challengeId);

      // Store the challenge details from the API response
      setChallengeDetails(response.data);
    } catch (error) {
      console.error('Error fetching challenge details:', error);
      Alert.alert('Error', 'Failed to load challenge details');
    } finally {
      setLoading(false);
    }
  };

  const backgroundColor = isDarkMode
    ? Colors.darkBackground
    : Colors.lightBackground;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const textColor2 = isDarkMode ? Colors.gray : Colors.black;
  const separaterColor = isDarkMode ? '#424242' : '#E0E0E0';
  const themeBackground = isDarkMode ? Colors.darkInputBg : Colors.lightInputBg;

  const handleButtonClick = () => {
    navigation.navigate('ChallengeTraining', {
      challengeData: challengeDetails || challengeData,
      userChallenge: userChallenge,
      challengeId: userChallenge?._id,
    });
  };

  const handleShare = async () => {
    try {
      // Prepare share content for challenge using API data
      const challengeTitle =
        challengeDetails?.name || challengeData?.name || '7-Day Gym Streak';
      const challengeType =
        challengeDetails?.type?.name || challengeData?.type?.name || 'Strength';
      const exercise =
        (challengeDetails?.exercise ? challengeDetails.exercise.name : null) ||
        challengeData?.exercise?.name ||
        'Squat';
      const duration =
        challengeDetails?.duration || challengeData?.duration
          ? `${challengeDetails?.duration || challengeData?.duration} ${
              (challengeDetails?.duration || challengeData?.duration) === '1'
                ? 'Day'
                : 'Days'
            }`
          : '1 Week';

      const shareMessage = `Check out this challenge: ${challengeTitle}\n\nChallenge Type: ${challengeType}\nExercise: ${exercise}\nDuration: ${duration}\n\nJoin me in this fitness challenge!`;

      const shareOptions = {
        title: 'Share Challenge',
        message: shareMessage,
        url: undefined, // No image URL for challenge sharing
        type: 'text/plain',
        showAppsToView: true,
      };

      await Share.open(shareOptions);
    } catch (error) {
      console.error('Share error:', error);
      // Alert.alert('Error', 'Failed to share challenge');
    }
  };

  const handleLeaveChallenge = async () => {
    if (!userChallenge?._id) {
      Toast.show({
        type: 'error',
        text1: t('Error'),
        text2: t('Challenge ID not found'),
      });
      return;
    }

    Alert.alert(
      t('Leave Challenge'),
      t('Are you sure you want to leave this challenge?'),
      [
        {
          text: t('Cancel'),
          style: 'cancel',
        },
        {
          text: t('Leave'),
          style: 'destructive',
          onPress: async () => {
            try {
              setLeaveLoading(true);
              const response = await leaveChallenge(userChallenge._id);

              if (response.status === 200 || response.status === 201) {
                Toast.show({
                  type: 'success',
                  text1: t('Success'),
                  text2: t('You have successfully left the challenge'),
                });

                // Navigate back after a short delay
                setTimeout(() => {
                  navigation.goBack();
                }, 1500);
              } else {
                Toast.show({
                  type: 'error',
                  text1: t('Error'),
                  text2:
                    response?.data?.message || t('Failed to leave challenge'),
                });
              }
            } catch (error: any) {
              console.error('Leave challenge error:', error);
              Toast.show({
                type: 'error',
                text1: t('Error'),
                text2:
                  error?.response?.data?.message ||
                  t('Failed to leave challenge'),
              });
            } finally {
              setLeaveLoading(false);
            }
          },
        },
      ],
    );
  };

  const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  // Generate proper calendar grid
  const generateCalendarGrid = (viewDate: Date) => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();

    // Get first day of the month and its weekday
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startingDayOfWeek = firstDay.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const daysInMonth = lastDay.getDate();

    // Generate calendar grid (6 weeks * 7 days = 42 days)
    const calendarDays = [];

    // Add empty slots for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      calendarDays.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      calendarDays.push(new Date(year, month, day));
    }

    // Add empty slots to complete the grid (up to 42 total)
    while (calendarDays.length < 42) {
      calendarDays.push(null);
    }

    return calendarDays;
  };

  // Get challenge dates for comparison
  const getChallengeDates = () => {
    const challengeDuration =
      challengeDetails?.duration || challengeData?.duration
        ? parseInt(challengeDetails?.duration || challengeData?.duration)
        : 7;
    const startDate =
      challengeDetails?.createdAt || challengeData?.startDate
        ? new Date(challengeDetails?.createdAt || challengeData?.startDate)
        : new Date();
    const challengeDates = [];

    for (let i = 0; i < challengeDuration; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      challengeDates.push(date);
    }

    return challengeDates;
  };

  const challengeDates = getChallengeDates();
  const calendarGrid = generateCalendarGrid(currentViewDate);

  // Generate months for a specific year
  const generateMonthsForYear = (year: number) => {
    const months = [];
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    // For current year, only show months up to current month
    const monthLimit = year === currentYear ? currentMonth + 1 : 12;

    for (let i = 0; i < monthLimit; i++) {
      const monthDate = new Date(year, i, 1);
      const monthString = monthDate.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      });
      months.push(monthString);
    }

    return months;
  };

  // Generate years for selection (current year and 5 years back)
  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = 0; i < 4; i++) {
      years.push(currentYear - i);
    }
    return years;
  };

  // Get submission dates for progress tracking
  const getSubmissionDates = () => {
    return (
      userChallenge?.dailySubmissions?.map((submission: any) => {
        return new Date(submission.date);
      }) || []
    );
  };

  const submissionDates = getSubmissionDates();

  // Helper functions for date comparison
  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const isSelectedDay = (date: Date) => {
    return isSameDay(date, selectedDate);
  };

  const hasSubmission = (date: Date) => {
    return submissionDates.some((submissionDate: Date) =>
      isSameDay(date, submissionDate),
    );
  };

  const isChallengeDay = (date: Date) => {
    return challengeDates.some(challengeDate => isSameDay(date, challengeDate));
  };

  const isSameMonth = (date1: Date, date2: Date) => {
    return (
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const profileImages = [
    IMAGES.community1,
    IMAGES.community2,
    IMAGES.community3,
  ];

  return (
    <View style={[styles.container, {backgroundColor}]}>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color={Colors.primaryColor} />
          <Text style={{marginTop: 10, color: textColor}}>
            Loading challenge details...
          </Text>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <Image
            source={
              challengeDetails?.mediaUrl || challengeData?.mediaUrl
                ? {uri: challengeDetails?.mediaUrl || challengeData?.mediaUrl}
                : IMAGES.challengeDetail
            }
            style={styles.coverImage}
          />
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AnySvg name="backArrow" width={24} height={24} />
            </TouchableOpacity>
            <Text style={[styles.headerTitle, {color: textColor}]}>
              {t('Detail')}
            </Text>
            <TouchableOpacity
              style={[styles.shareButton, {backgroundColor: 'transparent'}]}
              onPress={handleShare}></TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={[
                styles.challengeTitle,
                {color: textColor, maxWidth: '70%'},
              ]}>
              {challengeDetails?.name}
            </Text>
            <View style={styles.avatarGroup}>
              <Text
                onPress={() =>
                  navigation.navigate('Leaderboard', {
                    challengeId: challengeData?._id,
                  })
                }
                style={{color: Colors.primaryColor, fontSize: 16}}>
                Leaderboard
              </Text>
              {/* )} */}
            </View>
          </View>

          <View style={[styles.separator, {backgroundColor: separaterColor}]} />

          <View style={[styles.row, {flexWrap: 'wrap'}]}>
            <Text style={[styles.subtitle, {color: textColor}]}>
              {t('Challenge Type')}:
            </Text>
            <Text
              style={[
                styles.subtitleValue,
                {color: textColor2, maxWidth: '40%'},
              ]}>
              {challengeDetails?.type?.name || challengeData?.type?.name}
            </Text>
          </View>
          {challengeDetails?.format && (
            <>
              <View
                style={[styles.separator, {backgroundColor: separaterColor}]}
              />
              <View
                style={[
                  styles.row,
                  {justifyContent: 'space-between', flexWrap: 'wrap'},
                ]}>
                <View style={{flexDirection: 'row', gap: 6, flexWrap: 'wrap'}}>
                  <Text style={[styles.subtitle, {color: textColor}]}>
                    {t('Challenge Format')}:
                  </Text>
                  <Text style={[styles.subtitleValue, {color: textColor2}]}>
                    {typeof challengeDetails.format === 'string'
                      ? challengeDetails.format
                      : challengeDetails.format?.name}
                  </Text>
                </View>
              </View>
            </>
          )}
          {challengeDetails?.exercise && (
            <>
              <View
                style={[styles.separator, {backgroundColor: separaterColor}]}
              />
              <View
                style={[
                  styles.row,
                  {justifyContent: 'space-between', flexWrap: 'wrap'},
                ]}>
                <View style={{flexDirection: 'row', gap: 6}}>
                  <Text style={[styles.subtitle, {color: textColor}]}>
                    {t('Exercise')}:
                  </Text>
                  <Text style={[styles.subtitleValue, {color: textColor2}]}>
                    {challengeDetails?.exercise
                      ? challengeDetails.exercise.name
                      : challengeData?.exercise?.name}
                  </Text>
                </View>
              </View>
            </>
          )}

          {(challengeDetails?.distance || challengeData?.distance) && (
            <>
              <View
                style={[styles.separator, {backgroundColor: separaterColor}]}
              />

              <View
                style={[
                  styles.row,
                  {justifyContent: 'space-between', flexWrap: 'wrap'},
                ]}>
                <View style={{flexDirection: 'row', gap: 6}}>
                  <Text style={[styles.subtitle, {color: textColor}]}>
                    {t('Challenge Distance')}:
                  </Text>
                  <Text style={[styles.subtitleValue, {color: textColor2}]}>
                    {challengeDetails?.distance || challengeData?.distance}
                  </Text>
                </View>
              </View>
            </>
          )}

          {(challengeData?.time || challengeDetails?.time) && (
            <>
              <View
                style={[styles.separator, {backgroundColor: separaterColor}]}
              />

              <View style={styles.row}>
                <Text style={[styles.subtitle, {color: textColor}]}>
                  {t('Time')}:
                </Text>
                <Text
                  style={[
                    styles.subtitleValue,
                    {color: Colors.primaryColor, fontSize: 14, marginRight: 10},
                  ]}>
                  {challengeDetails?.time || challengeData?.time}
                </Text>
              </View>
            </>
          )}
          <View style={[styles.separator, {backgroundColor: separaterColor}]} />
          <View style={styles.row}>
            <Text style={[styles.subtitle, {color: textColor}]}>
              {t('Challenge Duration:')}
            </Text>
            <Text style={[styles.dateValue, {color: textColor2}]}>
              {challengeDetails?.duration}
            </Text>
          </View>
          {challengeDetails?.requiredVideo ||
            (challengeData?.requiredVideo && (
              <>
                <View
                  style={[styles.separator, {backgroundColor: separaterColor}]}
                />
                <View style={styles.row}>
                  <View style={styles.leftColumn}>
                    <Text style={[styles.subtitle, {color: textColor}]}>
                      {t('Require Video Proof')}
                    </Text>
                    <Text style={[styles.dateValue, {color: textColor2}]}>
                      {challengeDetails?.requiredVideo ||
                      challengeData?.requiredVideo
                        ? 'Yes'
                        : 'No'}
                    </Text>
                  </View>
                </View>
              </>
            ))}

          {challengeDetails?.sessionGoals && (
            <>
              <View
                style={[styles.separator, {backgroundColor: separaterColor}]}
              />
              <View style={styles.row}>
                <View style={styles.leftColumn}>
                  <Text style={[styles.subtitle, {color: textColor}]}>
                    {t('Session Goals')}
                  </Text>
                  <Text style={[styles.dateValue, {color: textColor2}]}>
                    {challengeDetails?.sessionGoals}
                  </Text>
                </View>
              </View>
            </>
          )}
          {challengeDetails?.completionCount && (
            <>
              <View
                style={[styles.separator, {backgroundColor: separaterColor}]}
              />
              <View style={styles.row}>
                <View style={styles.leftColumn}>
                  <Text style={[styles.subtitle, {color: textColor}]}>
                    {t('Completion Count')}
                  </Text>
                  <Text style={[styles.dateValue, {color: textColor2}]}>
                    {challengeDetails?.completionCount}
                  </Text>
                </View>
              </View>
            </>
          )}
          <Text
            style={[
              styles.progressTitle,
              {color: textColor, marginBottom: 10, marginTop: 20},
            ]}>
            {t('My Progress')}
          </Text>

          <View style={{position: 'relative'}}>
            <View
              style={[
                styles.calendarContainer,
                {backgroundColor: themeBackground},
              ]}>
              <View style={styles.calendarHeader}>
                <View style={{flex: 1}}>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      paddingVertical: 8,
                      borderRadius: 8,
                      gap: 8,
                    }}
                    onPress={() => setShowMonthModal(true)}>
                    <Text style={[styles.monthText, {color: textColor}]}>
                      {currentViewDate.toLocaleDateString('en-US', {
                        month: 'long',
                        year: 'numeric',
                      })}
                    </Text>
                    <AnySvg
                      name={isDarkMode ? 'dropdown' : 'lightDown'}
                      width={24}
                      height={24}
                    />
                  </TouchableOpacity>
                </View>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <TouchableOpacity
                    style={{
                      width: 36,
                      height: 36,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 18,
                      marginLeft: 8,
                    }}
                    onPress={() => {
                      const newDate = new Date(currentViewDate);
                      newDate.setMonth(newDate.getMonth() + 1);
                      setCurrentViewDate(newDate);
                    }}>
                    <AnySvg name="forwardArrow" width={24} height={24} />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.weekRow}>
                {weekDays.map(day => (
                  <Text key={day} style={[styles.weekday, {color: textColor2}]}>
                    {day}
                  </Text>
                ))}
              </View>

              <View style={styles.calendarGrid}>
                {calendarGrid.map((date, index) => {
                  if (!date) {
                    // Empty cell for days outside current month
                    return <View key={index} style={styles.dateCircle} />;
                  }

                  const isSelected = isSelectedDay(date);
                  const hasSubmissionForDate = hasSubmission(date);
                  const isChallengeDate = isChallengeDay(date);
                  const isToday = isSameDay(date, new Date());

                  return (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.dateCircle,
                        isSelected && {backgroundColor: Colors.green},
                        hasSubmissionForDate &&
                          !isSelected && {backgroundColor: Colors.green},
                        isChallengeDate &&
                          !hasSubmissionForDate &&
                          !isSelected && {
                            borderWidth: 2,
                            borderColor: Colors.primaryColor,
                          },
                        isToday &&
                          !isSelected &&
                          !hasSubmissionForDate && {
                            backgroundColor: Colors.lightGray,
                          },
                      ]}
                      onPress={() => setSelectedDate(date)}>
                      <Text
                        style={{
                          color:
                            isSelected || hasSubmissionForDate
                              ? Colors.white
                              : isToday
                              ? Colors.black
                              : textColor,
                          fontSize: 14,
                          fontWeight: isToday ? 'bold' : 'normal',
                        }}>
                        {date.getDate()}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </View>
          <View style={[styles.dateActionRow, {marginBottom: 22}]}>
            {/* <Text style={[styles.dateText, {color: textColor}]}>
            Selected:{' '}
            {selectedDate.toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </Text> */}
          </View>

          {challengeStatus === 'active' && (
            <CustomButton
              onPress={handleButtonClick}
              disable={submitDisable}
              containerStyle={{marginVertical: 30, marginBottom: '10%'}}>
              {t('Submit')}
            </CustomButton>
          )}

          {challengeStatus === 'completed' && (
            <View style={{alignItems: 'center', marginVertical: 30}}>
              <Text
                style={{fontSize: 18, color: Colors.green, fontWeight: 'bold'}}>
                {t('Challenge Completed!')}
              </Text>
              <Text style={{fontSize: 14, color: textColor2, marginTop: 5}}>
                {t('Great job! You completed this challenge.')}
              </Text>
            </View>
          )}

          {challengeStatus === 'cancelled' && (
            <View style={{alignItems: 'center', marginVertical: 30}}>
              <Text
                style={{fontSize: 18, color: Colors.red, fontWeight: 'bold'}}>
                {t('Challenge Cancelled')}
              </Text>
              <Text style={{fontSize: 14, color: textColor2, marginTop: 5}}>
                {t('This challenge has been cancelled.')}
              </Text>
            </View>
          )}

          {challengeStatus === 'incomplete' && (
            <View style={{alignItems: 'center', marginVertical: 30}}>
              <Text
                style={{
                  fontSize: 18,
                  color: Colors.Yellow,
                  fontWeight: 'bold',
                }}>
                {t('Challenge Incomplete')}
              </Text>
              <Text style={{fontSize: 14, color: textColor2, marginTop: 5}}>
                {t('This challenge was not completed within the timeframe.')}
              </Text>
            </View>
          )}

          {challengeStatus === 'active' && (
            <TouchableOpacity
              style={{alignItems: 'center', marginBottom: hp(4)}}
              onPress={handleLeaveChallenge}
              disabled={leaveLoading}>
              {leaveLoading ? (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <ActivityIndicator size="small" color={Colors.red} />
                  <Text
                    style={{fontSize: 16, color: Colors.red, marginLeft: 8}}>
                    {t('Leaving...')}
                  </Text>
                </View>
              ) : (
                <Text style={{fontSize: 16, color: Colors.red}}>
                  {t('Leave Challenge')}
                </Text>
              )}
            </TouchableOpacity>
          )}
        </ScrollView>
      )}

      {/* Month Selection Modal */}
      <Modal
        visible={showMonthModal}
        transparent={true}
        animationType="fade"
        onDismiss={() => setShowMonthModal(false)}
        onRequestClose={() => setShowMonthModal(false)}
        collapsable>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowMonthModal(false)}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={e => e.stopPropagation()}
            style={[styles.modalContainer, {backgroundColor: themeBackground}]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, {color: textColor}]}>
                {t('Select Month')}
              </Text>
              <TouchableOpacity
                onPress={() => setShowMonthModal(false)}
                style={styles.closeButton}>
                <Text style={[styles.closeButtonText, {color: textColor}]}>
                  ✕
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.yearSelector}>
              {generateYearOptions().map(year => (
                <TouchableOpacity
                  key={year}
                  style={[
                    styles.yearOption,
                    selectedYear === year && {
                      backgroundColor: Colors.primaryColor,
                      borderRadius: 8,
                    },
                  ]}
                  onPress={() => setSelectedYear(year)}>
                  <Text
                    style={{
                      color: selectedYear === year ? Colors.white : textColor,
                      fontSize: 16,
                      fontFamily: fonts.UrbanistMedium,
                    }}>
                    {year}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <ScrollView
              style={styles.modalScrollView}
              showsVerticalScrollIndicator={false}>
              {generateMonthsForYear(selectedYear).map((month, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    // Parse the month string and set the view date
                    // The format is "Month Year" (e.g., "January 2023")
                    const parts = month.split(' ');
                    const monthName = parts[0];
                    const year = parts[parts.length - 1]; // Get the last part which should be the year

                    // Get month index (0-11) from month name
                    const monthNames = [
                      'January',
                      'February',
                      'March',
                      'April',
                      'May',
                      'June',
                      'July',
                      'August',
                      'September',
                      'October',
                      'November',
                      'December',
                    ];
                    const monthIndex = monthNames.findIndex(
                      m => m === monthName,
                    );

                    if (monthIndex !== -1) {
                      // Create new date with correct year and month
                      const newDate = new Date(parseInt(year), monthIndex, 1);
                      setCurrentViewDate(newDate);
                      setShowMonthModal(false);
                    }
                  }}
                  style={[
                    styles.monthOption,
                    {borderBottomColor: isDarkMode ? '#333' : '#E0E0E0'},
                  ]}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: '100%',
                      alignItems: 'center',
                    }}>
                    <Text style={[styles.monthText, {color: textColor}]}>
                      {month.split(' ')[0]}
                    </Text>
                    {(() => {
                      const parts = month.split(' ');
                      const monthName = parts[0];
                      const year = parts[parts.length - 1];
                      const monthNames = [
                        'January',
                        'February',
                        'March',
                        'April',
                        'May',
                        'June',
                        'July',
                        'August',
                        'September',
                        'October',
                        'November',
                        'December',
                      ];
                      const monthIndex = monthNames.findIndex(
                        (m: string) => m === monthName,
                      );
                      const monthDate = new Date(parseInt(year), monthIndex, 1);

                      return isSameMonth(monthDate, currentViewDate) ? (
                        <AnySvg name="check" width={20} height={20} />
                      ) : null;
                    })()}
                  </View>
                </TouchableOpacity>
              ))}

              {generateMonthsForYear(selectedYear).length === 0 && (
                <View style={{padding: 20, alignItems: 'center'}}>
                  <Text style={{color: textColor}}>
                    No months available for this year
                  </Text>
                </View>
              )}
            </ScrollView>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default MyChallengeDetail;

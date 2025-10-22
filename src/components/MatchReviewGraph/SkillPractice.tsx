import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Image,
  FlatList,
  Platform,
  Alert,
  Share,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {Colors} from '../../utils/Colors';
import {styles} from './styles';
import AnySvg from '../AnySvg';
import {hp, wp} from '../../utils/responsivesness';
import CustomLineChart from './customGraph';
import {selectedSport} from '../../utils/DummyData';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import {getReviews} from '../../services/calls';
import RNFS from 'react-native-fs';

interface MatchReviewGraphProps {
  reviewOptions?: string[];
  defaultReview?: string;
  monthOptions?: string[];
  yearOptions?: number[];
  showMatchResults?: boolean;
  showReviewDropdown?: boolean;
  titleOverride?: string;
  sportsList?: any[];
  selectedSport?: any;
  onSelectSport?: (sport: any) => void;
  onDateChange?: (date: string) => void;
}

const SkillPraticeGraph: React.FC<MatchReviewGraphProps> = ({
  reviewOptions = ['Skill Practice', 'Match Type'],
  defaultReview = '',
  showReviewDropdown,
  titleOverride,
  sportsList = [],
  selectedSport = null,
  onSelectSport,
  onDateChange,
  ...props
}) => {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const backgroundColor = isDarkMode ? Colors.darkInputBg : '#F5F5F5';
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const textColor2 = isDarkMode ? Colors.gray : Colors.black;
  const borderColor = isDarkMode ? Colors.gray : '#C9C9C9';
  const separaterColor = isDarkMode ? '#424242' : '#E0E0E0';
  const userInfo = useSelector((state: any) => state.user.user);
  const userId = userInfo?.user?._id;

  // Default to 'Skill Practice' and today
  const [selectedReview, setSelectedReview] = useState('Skill Practice');
  const [selectedMonthDate, setSelectedMonthDate] = useState<string>(
    moment().format('MMM DD, YYYY'),
  );
  const [globalDate, setGlobalDate] = useState<string>(
    moment().format('DD-MM-YYYY'),
  );
  const [reviews, setReviews] = useState<any>(null);
  const [loadingReviews, setLoadingReviews] = useState(false);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedType, setSelectedType] = useState<string>(
    selectedSport?.name || (sportsList[0]?.name ?? ''),
  );

  // Update selectedType if selectedSport prop changes
  React.useEffect(() => {
    if (selectedSport && selectedSport.name) {
      setSelectedType(selectedSport.name);
    } else if (sportsList.length > 0) {
      setSelectedType(sportsList[0].name);
    }
  }, [selectedSport, sportsList]);

  // Call onDateChange callback with initial global date
  React.useEffect(() => {
    if (onDateChange) {
      onDateChange(globalDate);
    }
  }, []); // Only run once on mount

  const [modalVisible, setModalVisible] = useState(false);

  // Fetch reviews when sport, session type, or user changes
  React.useEffect(() => {
    const fetchReviews = async () => {
      if (!selectedSport || !selectedSport._id || !userId) return;
      setLoadingReviews(true);
      try {
        const params = {
          sport: selectedSport._id,
          sessionType: selectedReview,
          stats: true,
          user: userId,
        };
        const res = await getReviews(params);
        if (res?.status === 200) {
          setReviews(res?.data);
        }
      } catch (e) {
        setReviews(null);
      } finally {
        setLoadingReviews(false);
      }
    };
    fetchReviews();
  }, [selectedSport, selectedReview, userId]);

  // Process review data for the selected month - Weekly data
  const processReviewData = () => {
    const stats = reviews?.stats;
    if (!stats?.currentMonth) {
      return null;
    }

    const selectedDate = moment(selectedMonthDate, 'MMM DD, YYYY');
    const selectedMonth = selectedDate.format('YYYY-MM');
    const monthData = stats.currentMonth;

    // Get weeks in the selected month
    const startOfMonth = selectedDate.clone().startOf('month');
    const endOfMonth = selectedDate.clone().endOf('month');
    const weeks = [];
    const labels = [];
    const coachFeedback = [];
    const personalRating = [];
    const peerFeedback = [];

    let currentWeek = startOfMonth.clone().startOf('week');

    while (currentWeek.isSameOrBefore(endOfMonth)) {
      const weekEnd = currentWeek.clone().endOf('week');
      const weekLabel = `${currentWeek.format('MMM DD')} - ${weekEnd.format(
        'MMM DD',
      )}`;
      labels.push(weekLabel);

      let weekPersonalSum = 0;
      let weekPeerSum = 0;
      let weekCoachSum = 0;
      let weekCount = 0;

      // Sum up all reviews for this week
      for (let day = 0; day < 7; day++) {
        const currentDay = currentWeek.clone().add(day, 'days');
        const dateKey = currentDay.format('YYYY-MM-DD');
        const dayReviews = monthData[dateKey] || [];

        if (dayReviews.length > 0) {
          const review = dayReviews[0];
          weekPersonalSum += review.rating || 0;
          weekPeerSum += review.peerFeedback?.rating || 0;
          weekCoachSum += review.coachFeedback?.rating || 0;
          weekCount++;
        }
      }

      // Calculate averages for the week
      const avgPersonal = weekCount > 0 ? weekPersonalSum / weekCount : 0;
      const avgPeer = weekCount > 0 ? weekPeerSum / weekCount : 0;
      const avgCoach = weekCount > 0 ? weekCoachSum / weekCount : 0;

      personalRating.push(avgPersonal);
      peerFeedback.push(avgPeer);
      coachFeedback.push(avgCoach);

      currentWeek.add(1, 'week');
    }

    // Calculate the highest rating for y-axis scale
    const allRatings = [...personalRating, ...peerFeedback, ...coachFeedback];
    const maxRating = Math.max(...allRatings, 10); // Default to 10 if no data
    const yAxisMax = Math.ceil(maxRating);

    // Generate y-axis labels based on the highest rating
    const yAxisLabels = [];
    for (let i = yAxisMax; i >= 0; i--) {
      yAxisLabels.push(i.toString());
    }

    return {
      labels,
      datasets: [personalRating, peerFeedback, coachFeedback],
      hasData:
        personalRating.some(rating => rating > 0) ||
        peerFeedback.some(rating => rating > 0) ||
        coachFeedback.some(rating => rating > 0),
      yAxisLabels,
    };
  };

  const chartData = processReviewData();
  const hasData = chartData?.hasData || false;
  const selectedMonthName = moment(selectedMonthDate, 'MMM DD, YYYY').format(
    'MMMM YYYY',
  );

  // Generate PDF and share/download
  const handleShare = async () => {
    try {
      if (!chartData || !hasData) {
        Alert.alert('No Data', 'No data available to share');
        return;
      }

      const reportContent = generatePDFContent();

      await Share.share({
        message: reportContent,
        title: 'Performance Report',
      });
    } catch (error) {
      console.error('Share error:', error);
      // Alert.alert('Error', 'Failed to share report');
    }
  };

  const handleDownload = async () => {
    try {
      if (!chartData || !hasData) {
        Alert.alert('No Data', 'No data available to download');
        return;
      }

      const pdfContent = generatePDFContent();
      const fileName = `performance_report_${moment().format(
        'YYYY-MM-DD_HH-mm',
      )}.pdf`;
      const filePath = `${RNFS.DownloadDirectoryPath}/${fileName}`;

      await RNFS.writeFile(filePath, pdfContent, 'utf8');
      Alert.alert('Success', 'Report downloaded successfully');
    } catch (error) {
      console.error('Download error:', error);
      Alert.alert('Error', 'Failed to download report');
    }
  };

  const generatePDFContent = () => {
    const monthName = selectedMonthName;
    const sportName = selectedSport?.name || 'Unknown Sport';
    const sessionType = selectedReview;

    let content = `
      PERFORMANCE REPORT
      ===================
      
      Sport: ${sportName}
      Session Type: ${sessionType}
      Period: ${monthName}
      
      WEEKLY PERFORMANCE SUMMARY
      ==========================
    `;

    if (chartData && chartData.labels) {
      chartData.labels.forEach((week, index) => {
        const personal = chartData.datasets[0][index] || 0;
        const peer = chartData.datasets[1][index] || 0;
        const coach = chartData.datasets[2][index] || 0;

        content += `
        Week: ${week}
        - Personal Rating: ${personal.toFixed(1)}/10
        - Peer Feedback: ${peer.toFixed(1)}/10
        - Coach Feedback: ${coach.toFixed(1)}/10
        `;
      });
    }

    content += `
      
      Generated on: ${moment().format('MMMM DD, YYYY HH:mm')}
    `;

    return content;
  };

  const DropDownSelector = ({
    label,
    value,
    onPress,
    color,
    iconColor,
    borderColor,
  }: any) => (
    <TouchableOpacity
      style={[styles.dropDown, {borderColor}]}
      onPress={onPress}>
      <Text style={[styles.dropDownText, {color}]}>{value || label}</Text>
      <AnySvg name={iconColor} size={15} />
    </TouchableOpacity>
  );

  const OptionsModal = ({
    visible,
    options,
    onSelect,
    onClose,
    backgroundColor,
    textColor,
    separatorColor,
  }: any) => (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={[styles.modalContent, {backgroundColor}]}>
          {options.map((option: string, idx: number) => (
            <React.Fragment key={option}>
              <TouchableOpacity
                onPress={() => {
                  onSelect(option);
                  onClose();
                }}>
                <Text style={[styles.modalTitle, {color: textColor}]}>
                  {option}
                </Text>
              </TouchableOpacity>
              {idx !== options.length - 1 && (
                <View
                  style={[styles.separator, {backgroundColor: separatorColor}]}
                />
              )}
            </React.Fragment>
          ))}
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={sportsList}
        keyExtractor={item => item._id || item.id}
        renderItem={({item: {_id, id, name, image}}) => {
          const isSelected = selectedType === name;
          return (
            <View style={styles.buttonWrapper}>
              <TouchableOpacity
                onPress={() => {
                  setSelectedType(name);
                  const sport = sportsList?.filter((item: any) => {
                    return item?._id == _id;
                  });
                  if (onSelectSport) onSelectSport(sport[0]);
                }}
                style={[
                  styles.typeButton,
                  {
                    backgroundColor: isSelected
                      ? Colors.primaryColor
                      : isDarkMode
                      ? '#2C2C2E'
                      : '#E0E0E0',
                  },
                ]}>
                {image ? (
                  <Image
                    source={{uri: image}}
                    style={[
                      styles.icon,
                      {
                        tintColor: isSelected ? '#FFF' : Colors.primaryColor,
                      },
                    ]}
                    resizeMode="stretch"
                  />
                ) : (
                  <AnySvg name={isDarkMode ? 'darkTicket' : 'lightTicket'} />
                )}
              </TouchableOpacity>
              <Text
                style={[
                  styles.buttonText,
                  {color: textColor, maxWidth: wp(19)},
                ]}>
                {t(name)}
              </Text>
            </View>
          );
        }}
        contentContainerStyle={{
          marginTop: hp(3),
          paddingHorizontal: wp(2),
          columnGap: 10,
        }}
        ItemSeparatorComponent={() => <View style={{width: wp(2)}} />}
      />

      <View style={styles.headerRow}>
        <Text style={[styles.title, {color: textColor, maxWidth: wp(60)}]}>
          {selectedReview
            ? `${t(selectedReview)} ${t('Review')} - ${selectedMonthName}`
            : titleOverride
            ? titleOverride
            : defaultReview}
        </Text>

        {showReviewDropdown && (
          <DropDownSelector
            label={t('Select Review')}
            value={selectedReview}
            onPress={() => setModalVisible(true)}
            color={textColor2}
            iconColor={isDarkMode ? 'darkDown' : 'lightDown'}
            borderColor={textColor2}
          />
        )}
      </View>

      <OptionsModal
        visible={modalVisible}
        options={reviewOptions}
        onSelect={setSelectedReview}
        onClose={() => setModalVisible(false)}
        backgroundColor={backgroundColor}
        textColor={textColor}
        separatorColor={separaterColor}
      />

      <View
        style={[
          styles.filtersRow,
          {justifyContent: 'space-between', paddingHorizontal: 20},
        ]}>
        <DropDownSelector
          label={t('Select Date/Month')}
          value={selectedMonthDate}
          onPress={() => setShowDatePicker(true)}
          color={textColor2}
          iconColor={isDarkMode ? 'darkDown' : 'lightDown'}
          borderColor={borderColor}
        />

        {showDatePicker && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                const formattedDate =
                  moment(selectedDate).format('MMM DD, YYYY');
                const globalDateFormatted =
                  moment(selectedDate).format('DD-MM-YYYY');
                setSelectedMonthDate(formattedDate);
                setGlobalDate(globalDateFormatted);

                // Call the callback to pass the date to parent component
                if (onDateChange) {
                  onDateChange(globalDateFormatted);
                }
              }
            }}
            themeVariant={isDarkMode ? 'dark' : 'light'}
          />
        )}

        <View style={{flexDirection: 'row', gap: 8}}>
          <TouchableOpacity
            style={[
              styles.iconButton,
              {backgroundColor: isDarkMode ? '#797979' : '#E0E0E0'},
            ]}
            onPress={handleShare}>
            <AnySvg name={isDarkMode ? 'shareIcon' : 'lightShare'} size={15} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.iconButton,
              {backgroundColor: isDarkMode ? '#797979' : '#E0E0E0'},
            ]}
            onPress={handleDownload}>
            <AnySvg
              name={isDarkMode ? 'downloadIcon' : 'lightDownload'}
              size={15}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Re-enable CustomLineChart */}
      {chartData && hasData && (
        <CustomLineChart
          datasets={chartData.datasets}
          labels={chartData.labels}
          yAxisLabels={chartData.yAxisLabels}
          lineColors={['#4ADE80', '#FACC15', '#135AAC']}
          textColor={textColor2}
          isDarkMode={isDarkMode}
        />
      )}

      {!hasData && !loadingReviews && (
        <View style={{alignItems: 'center', paddingVertical: 20}}>
          <Text style={{color: '#000000', fontSize: 16, fontWeight: '500'}}>
            No data found
          </Text>
        </View>
      )}

      {hasData && (
        <View style={styles.legendRow}>
          <View style={[styles.legendBox, {backgroundColor: Colors.blue}]} />
          <Text style={[styles.legendText, {color: textColor2}]}>
            {t('Personal Feedback')}
          </Text>
          <View style={[styles.legendBox, {backgroundColor: Colors.green}]} />
          <Text style={[styles.legendText, {color: textColor2}]}>
            {t('Peer Feedback')}
          </Text>
          <View style={[styles.legendBox, {backgroundColor: Colors.Yellow}]} />
          <Text style={[styles.legendText, {color: textColor2}]}>
            {t('Coach Feedback')}
          </Text>
        </View>
      )}

      {selectedReview === t('Match Type') && (
        <>
          <View style={[styles.separator, {backgroundColor: separaterColor}]} />
          <View style={{marginBottom: 20}}>
            <Text style={[styles.sectionTitle, {color: textColor}]}>
              {t('Match Results')}
            </Text>
            <View style={styles.resultsRow}>
              <Text style={[styles.resultText, {color: textColor}]}>
                {t('Win')}: 50
              </Text>
              <Text style={[styles.resultText, {color: textColor}]}>
                {t('Draw')}: 45
              </Text>
              <Text style={[styles.resultText, {color: textColor}]}>
                {t('Loss')}: 10
              </Text>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default SkillPraticeGraph;

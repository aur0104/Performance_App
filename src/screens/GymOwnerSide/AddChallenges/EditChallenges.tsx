import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {useRoute} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import BackHeader from '../../../components/BackHeader';
import CustomButton from '../../../components/CustomButton';
import {Colors} from '../../../utils/Colors';
import styles from './styles';
import InputField from '../../../components/CustomInputField';
import {hp} from '../../../utils/responsivesness';
import MatchTypeDropdown from '../../../components/Dropdown/MatchTypeDropdown';
import SportDropdown from '../../../components/Dropdown/SportDropDown';
import AnySvg from '../../../components/AnySvg';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {
  updateChallenge,
  getChallengeCategoriesTypes,
} from '../../../services/calls';

const EditChallenge = ({navigation}: any) => {
  const {t} = useTranslation();
  const route = useRoute();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const userState = useSelector((state: any) => state.user?.user);

  // Get challenge data from navigation params
  const challengeData = (route.params as any)?.challengeData;
  const challengeId = (route.params as any)?.id;

  // Fetch challenge categories on mount
  useEffect(() => {
    const fetchChallengeCategories = async () => {
      setLoadingCategories(true);
      try {
        const response = await getChallengeCategoriesTypes();

        if (response?.data) {
          setChallengeCategories(response.data);
        }
      } catch (error) {
        console.error('Error fetching challenge categories:', error);
        Alert.alert(
          'Error',
          'Failed to load challenge categories. Please try again.',
        );
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchChallengeCategories();
  }, []);
  const backgroundColor = isDarkMode
    ? Colors.darkBackground
    : Colors.lightBackground;
  const loaderColor = isDarkMode ? Colors.white : Colors.black;
  const dynamicSubText = isDarkMode ? Colors.gray : '#424242';
  const dynamicBg = isDarkMode ? Colors.darkInputBg : Colors.lightInputBg;

  const [photo, setPhoto] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [sportVisible, setSportVisible] = useState(false);
  const [sport, setSport] = useState('');
  console.log('SPorts here ', sport);
  const [exerciseVisible, setExerciseVisible] = useState(false);
  const [exercise, setExercise] = useState('');
  const [formatVisible, setFormatVisible] = useState(false);
  const [format, setFormat] = useState('');
  const [durationVisible, setDurationVisible] = useState(false);
  const [duration, setDuration] = useState('');
  const [proofVisible, setProofVisible] = useState(false);
  const [proof, setProof] = useState('');
  const [challengeName, setChallengeName] = useState('');
  const [timeInput, setTimeInput] = useState('');
  const [timeVisible, setTimeVisible] = useState(false);
  const [distanceInput, setDistanceInput] = useState('');
  const [goal, setGoal] = useState('');
  const [attendanceTypeVisible, setAttendanceTypeVisible] = useState(false);
  const [attendanceType, setAttendanceType] = useState('');
  const [selectedSportObject, setSelectedSportObject] = useState<any>(null);

  // Challenge categories from API
  const [challengeCategories, setChallengeCategories] = useState<any[]>([]);
  const [selectedSportId, setSelectedSportId] = useState<string | null>(null);
  const [selectedExerciseId, setSelectedExerciseId] = useState<string | null>(
    null,
  );
  const [selectedFormatId, setSelectedFormatId] = useState<string | null>(null);

  const [scheduledDate, setScheduledDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Initialize form with existing challenge data
  useEffect(() => {
    if (challengeData) {
      // Basic challenge information
      setChallengeName(challengeData.name || '');
      setSport(challengeData.type?.name || '');
      setExercise(challengeData.exercise?.name || '');
      setFormat(challengeData.format?.name || '');
      setTimeInput(challengeData.time || '');
      setProof(challengeData.requiredVideo ? 'Yes' : 'No');

      // Store the sport object and IDs for type ID handling
      if (challengeData.type) {
        setSelectedSportObject(challengeData.type);
        setSelectedSportId(challengeData.type._id || challengeData.type.id);
      }

      // Set exercise and format IDs
      if (challengeData.exercise) {
        setSelectedExerciseId(
          challengeData.exercise._id || challengeData.exercise.id,
        );
      }

      if (challengeData.format) {
        setSelectedFormatId(
          challengeData.format._id || challengeData.format.id,
        );
      }

      // Initialize goal field - check both 'goal' and 'sessionGoals' from API
      if (challengeData.sessionGoals || challengeData.goal) {
        setGoal(challengeData.sessionGoals || challengeData.goal);
      }

      // Initialize attendance type - check 'completionCount' and 'attendanceType'
      if (challengeData.completionCount || challengeData.attendanceType) {
        const completionType =
          challengeData.completionCount || challengeData.attendanceType;
        // Map API values to display values
        if (completionType === 'attendedClass') {
          setAttendanceType('Attend a Class');
        } else if (completionType === 'logSession') {
          setAttendanceType('Log a Session');
        } else {
          setAttendanceType(completionType);
        }
      }

      // Initialize duration field - check both 'duration' and 'frequency' from API
      if (challengeData.duration || challengeData.frequency) {
        const durationValue = challengeData.duration || challengeData.frequency;
        console.log('Duration initialization - API value:', durationValue);

        // Map API duration/frequency format to dropdown options
        if (
          durationValue === 'weekly' ||
          durationValue === '7 days' ||
          durationValue.includes('7')
        ) {
          setDuration('1 Week');
        } else if (
          durationValue === 'biweekly' ||
          durationValue === '14 days' ||
          durationValue.includes('14')
        ) {
          setDuration('14 days');
        } else if (
          durationValue === 'monthly' ||
          durationValue === '30 days' ||
          durationValue.includes('30') ||
          durationValue.includes('month')
        ) {
          setDuration('1 Month');
        } else {
          // Try to match common duration patterns
          const lowerValue = durationValue.toLowerCase();
          if (lowerValue.includes('week') || lowerValue.includes('7')) {
            setDuration('1 Week');
          } else if (
            lowerValue.includes('14') ||
            lowerValue.includes('biweekly')
          ) {
            setDuration('14 days');
          } else if (
            lowerValue.includes('month') ||
            lowerValue.includes('30')
          ) {
            setDuration('1 Month');
          } else {
            setDuration(durationValue); // Use as-is if no mapping found
          }
        }
        console.log('Duration set to:', duration);
      } else {
        // Set default duration if none found
        setDuration('1 Week');
        console.log('No duration found in API, setting default to 1 Week');
      }

      // Set existing image if available
      if (challengeData.mediaUrl) {
        setPhoto({uri: challengeData.mediaUrl});
      }

      // Set dates if available - prefer startDate over createdAt
      if (challengeData.startDate) {
        setScheduledDate(new Date(challengeData.startDate));
      } else if (challengeData.createdAt) {
        setScheduledDate(new Date(challengeData.createdAt));
      }

      // Note: endDate is calculated from startDate + duration, but we store it for reference
      if (challengeData.endDate) {
      }

      // Set distance input if available
      if (challengeData.distance) {
        setDistanceInput(challengeData.distance);
      }
    }
  }, [challengeData]);

  const handleImagePick = async () => {
    const result = await launchImageLibrary({mediaType: 'photo'});
    if (result?.assets?.length) {
      setPhoto(result.assets[0]);
    }
  };

  const handleSave = async () => {
    if (!challengeId) {
      Alert.alert('Error', 'Challenge ID is missing');
      return;
    }

    if (!challengeName.trim()) {
      Alert.alert('Error', 'Please enter a challenge name');
      return;
    }

    if (!sport) {
      Alert.alert('Error', 'Please select a challenge type');
      return;
    }

    const isAttendance = sport === 'Attendance Based';

    if (isAttendance) {
      if (!goal.trim()) {
        Alert.alert('Error', 'Please enter a session goal');
        return;
      }
      if (!attendanceType) {
        Alert.alert('Error', 'Please select what counts toward completion');
        return;
      }
      if (!duration) {
        Alert.alert('Error', 'Please select challenge duration');
        return;
      }
    } else {
      if (!exercise) {
        Alert.alert('Error', 'Please select an exercise');
        return;
      }
      if (!format) {
        Alert.alert('Error', 'Please select a challenge format');
        return;
      }
      if (!duration) {
        Alert.alert('Error', 'Please select challenge duration');
        return;
      }
      if (!proof) {
        Alert.alert('Error', 'Please select video proof requirement');
        return;
      }
    }

    try {
      setIsLoading(true);

      // Create FormData for the API call
      const formData = new FormData();

      // Basic challenge data
      formData.append('name', challengeName);

      // Handle type ID - use selected sport object ID or fallback to original
      let typeId = '';
      if (selectedSportObject && selectedSportObject._id) {
        typeId = selectedSportObject._id;
        console.log(
          'Using selected sport object ID:',
          typeId,
          'for sport:',
          sport,
        );
      } else if (challengeData?.type?._id || challengeData?.type?.id) {
        typeId = challengeData?.type?._id || challengeData?.type?.id;
        console.log('Using original type ID:', typeId, 'for sport:', sport);
      } else {
        console.warn('No type ID available for challenge type:', sport);
      }

      if (typeId) {
        formData.append('type', typeId);
      }

      // Add community ID if available
      const communityId =
        typeof challengeData?.community === 'object'
          ? challengeData.community._id || challengeData.community.id
          : challengeData?.community;

      if (communityId) {
        formData.append('community', communityId);
      }

      // Add time field for all challenges
      if (timeInput) {
        formData.append('time', timeInput);
      }

      // Add photo if selected
      if (photo && photo.uri && !photo.uri.startsWith('http')) {
        formData.append('mediaUrl', {
          uri: photo.uri,
          type: photo.type || 'image/jpeg',
          name: photo.fileName || 'challenge_image.jpg',
        } as any);
      }

      const isAttendance = sport === 'Attendance Based';
      let frequency = '';
      let exerciseId = '';
      let formatId = '';

      if (isAttendance) {
        // Attendance-based challenge specific fields
        if (goal) {
          formData.append('sessionGoals', goal);
        }

        if (attendanceType) {
          // Map display values back to API values
          let completionValue = attendanceType;
          if (attendanceType === 'Attend a Class') {
            completionValue = 'attendedClass';
          } else if (attendanceType === 'Log a Session') {
            completionValue = 'logSession';
          }
          formData.append('completionCount', completionValue);
        }

        // Add start date for attendance challenges
        formData.append('startDate', scheduledDate.toISOString());

        // Map duration to frequency for attendance challenges
        if (duration === '1 Week' || duration === '7 days') {
          frequency = 'weekly';
        } else if (duration === '14 days') {
          frequency = 'biweekly';
        } else if (duration === '1 Month' || duration === '30 days') {
          frequency = 'monthly';
        }
        if (frequency) {
          formData.append('frequency', frequency);
        }

        // Also send duration field directly
        if (duration) {
          formData.append('duration', duration);
        }
      } else {
        // Exercise-based challenge specific fields
        if (exercise) {
          // Use selected exercise ID if available, otherwise fallback to original
          exerciseId =
            selectedExerciseId ||
            challengeData?.exercise?._id ||
            challengeData?.exercise?.id;
          if (exerciseId) {
            formData.append('exercise', exerciseId);
            console.log(
              'Using exercise ID:',
              exerciseId,
              'for exercise:',
              exercise,
            );
          } else {
            console.warn('No exercise ID available for exercise:', exercise);
          }
        }

        if (format) {
          // Use selected format ID if available, otherwise fallback to original
          formatId =
            selectedFormatId ||
            challengeData?.format?._id ||
            challengeData?.format?.id;
          if (formatId) {
            formData.append('format', formatId);
            console.log('Using format ID:', formatId, 'for format:', format);
          } else {
            console.warn('No format ID available for format:', format);
          }
        }

        if (requiresDistanceInput && distanceInput) {
          formData.append('distance', distanceInput);
        }

        if (proof) {
          formData.append('requiredVideo', proof === 'Yes' ? '1' : '0');
        }

        // Map duration to frequency for exercise challenges
        if (duration === '1 Week' || duration === '7 days') {
          frequency = 'weekly';
        } else if (duration === '14 days') {
          frequency = 'biweekly';
        } else if (duration === '1 Month' || duration === '30 days') {
          frequency = 'monthly';
        }
        if (frequency) {
          formData.append('frequency', frequency);
        }
        if (sport === 'Attendance Based') {
          formData.append('startDate', scheduledDate);
        }
        // Also send duration field directly
        if (duration) {
          formData.append('startDate', scheduledDate.toISOString());
        }
      }

      console.log('Updating challenge with ID:', challengeId);
      console.log('FormData fields being sent:');
      console.log('- name:', challengeName);
      console.log('- type:', typeId);
      console.log('- isAttendance:', isAttendance);
      console.log('- time:', timeInput);
      console.log('- community:', communityId);
      console.log('- duration:', duration);

      if (isAttendance) {
        console.log('- sessionGoals:', goal);
        console.log('- completionCount:', attendanceType);
        console.log('- startDate:', scheduledDate.toISOString());
        console.log('- frequency:', frequency);
      } else {
        console.log('- exercise (form value):', exercise);
        console.log('- format (form value):', format);
        console.log('- exerciseId:', exerciseId);
        console.log('- formatId:', formatId);
        console.log('- selectedExerciseId:', selectedExerciseId);
        console.log('- selectedFormatId:', selectedFormatId);
        console.log('- distance:', distanceInput);
        console.log('- requiredVideo:', proof === 'Yes' ? '1' : '0');
        console.log('- frequency:', frequency);
        console.log(
          '- availableExercises:',
          availableExercises.map((ex: any) => ex.name),
        );
        console.log(
          '- availableFormats:',
          availableFormats.map((f: any) => f.name),
        );
      }

      console.log(
        '- mediaUrl:',
        photo && photo.uri && !photo.uri.startsWith('http')
          ? 'New image selected'
          : 'Existing/No image',
      );

      // Debug: Log the entire FormData
      console.log('=== FORM DATA DEBUG ===');
      console.log('FormData object:', formData);
      console.log('=== END FORM DATA DEBUG ===');

      const response = await updateChallenge(challengeId, formData);

      console.log('Update response:', response);

      if (response?.status === 200) {
        Alert.alert('Success', 'Challenge updated successfully!', [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]);
      } else {
        throw new Error('Failed to update challenge');
      }
    } catch (error: any) {
      console.error('Error updating challenge:', error);
      Alert.alert(
        'Error',
        error?.response?.data?.message ||
          error?.message ||
          'Failed to update challenge',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const timeOptions = [
    '30 sec',
    '1 min',
    '2 min',
    '5 min',
    '10 min',
    '15 min',
    '20 min',
    '30 min',
    '45 min',
    '60 min',
  ];

  const distanceOptions = ['500m', '1km', '5km', '10km', 'Half Marathon'];

  const attendanceOptions = ['Log a Session', 'Attend a Class', 'Either'];

  // Get selected category from API data
  const selectedCategory = challengeCategories.find(
    cat => cat._id === selectedSportId,
  );
  const availableExercises = selectedCategory?.types || [];
  const availableFormats = selectedCategory?.formats || [];

  const isAttendance = sport === 'Attendance Based';
  // Check if we have exercise and format data from the API even if selectedConfig is not available
  const hasExerciseData = challengeData?.exercise?.name;
  const hasFormatData = challengeData?.format?.name;

  // Debug effect to track field changes
  useEffect(() => {
    console.log('Field state changed:', {
      challengeName,
      sport,
      exercise,
      format,
      timeInput,
      proof,
      goal,
      attendanceType,
      duration,
      distanceInput,
      scheduledDate: scheduledDate.toISOString(),
    });
  }, [
    challengeName,
    sport,
    exercise,
    format,
    timeInput,
    proof,
    goal,
    attendanceType,
    duration,
    distanceInput,
    scheduledDate,
  ]);

  // Debug effect specifically for exercise and format
  useEffect(() => {
    console.log('Exercise/Format state changed:', {
      exercise,
      format,
      exerciseVisible,
      formatVisible,
    });
  }, [exercise, format, exerciseVisible, formatVisible]);

  const requiresTimeInput =
    (sport === 'Endurance' &&
      (format === 'Max Distance in Set Time' ||
        format === 'Max Calories in Set Time')) ||
    (sport === 'Strength' && format === 'Reps in Set Time') ||
    (sport === 'Power' && format === 'Max Reps in Set Time');

  const requiresDistanceInput =
    sport === 'Endurance' && format === 'Fastest Time for Set Distance';

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <BackHeader
        title={challengeData ? t('Edit Challenge') : t('Add Challenge')}
        showBackIcon
        containerStyle={{marginBottom: 0}}
      />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        {sport?.length ? (
          <Text
            style={[
              styles.dropdownText,
              {color: dynamicSubText, marginTop: 10},
            ]}>
            {t('Challenge Type :')}
          </Text>
        ) : null}
        <TouchableOpacity
          style={[styles.dropdown, {backgroundColor: dynamicBg, marginTop: 10}]}
          onPress={() => setSportVisible(true)}>
          <Text style={[styles.dropdownText, {color: dynamicSubText}]}>
            {sport || t('Select Challenge')}
          </Text>
          <AnySvg name={isDarkMode ? 'darkDown' : 'lightDown'} size={24} />
        </TouchableOpacity>

        <SportDropdown
          visible={sportVisible}
          challengeCategories={challengeCategories}
          loading={loadingCategories}
          onSelect={(selectedSport: any) => {
            console.log('SportDropdown selected:', selectedSport);

            // Extract the sport name from the object or use the value directly
            const sportName =
              typeof selectedSport === 'object'
                ? selectedSport.name
                : selectedSport;

            const prevSport = sport;
            setSport(sportName);
            setSelectedSportObject(selectedSport);
            setSelectedSportId(selectedSport._id);
            setSportVisible(false);

            // Only reset related fields if sport actually changed
            if (prevSport !== sportName) {
              console.log(
                'Sport changed from',
                prevSport,
                'to',
                sportName,
                '- resetting dependent fields',
              );

              // Reset all dependent fields
              setExercise('');
              setFormat('');
              setTimeInput('');
              setDistanceInput('');
              setAttendanceType('');
              setGoal('');
              setProof('No'); // Reset proof requirement
              setSelectedExerciseId(null);
              setSelectedFormatId(null);

              // Set default values based on new sport type
              if (sportName === 'Attendance Based') {
                // Set default values for attendance-based challenges
                setGoal('Complete daily sessions');
                setDuration('1 Week');
                setAttendanceType('Log a Session');
                setProof('No'); // Attendance challenges typically don't require video proof
                console.log('Set defaults for attendance-based challenge');
              } else {
                // Set default values for exercise-based challenges
                setDuration('1 Week');
                setProof('Yes'); // Exercise challenges typically require video proof

                // Set default exercise and format if we have API data
                const newCategory = challengeCategories.find(
                  cat => cat.name === sportName,
                );
                if (newCategory) {
                  if (newCategory.types && newCategory.types.length > 0) {
                    setExercise(newCategory.types[0].name);
                    setSelectedExerciseId(newCategory.types[0]._id);
                    console.log(
                      'Set default exercise:',
                      newCategory.types[0].name,
                    );
                  }
                  if (newCategory.formats && newCategory.formats.length > 0) {
                    setFormat(newCategory.formats[0].name);
                    setSelectedFormatId(newCategory.formats[0]._id);
                    console.log(
                      'Set default format:',
                      newCategory.formats[0].name,
                    );
                  }
                } else {
                  console.log('No category found for sport:', sportName);
                }
                console.log(
                  'Set defaults for exercise-based challenge:',
                  sportName,
                );
              }

              // Update the selectedSportObject to match the new sport
              setSelectedSportObject(selectedSport);
              console.log('Updated selectedSportObject:', selectedSport);
            }
          }}
          onClose={() => setSportVisible(false)}
        />

        {isAttendance && (
          <>
            <InputField
              label=""
              value={goal}
              onChangeText={setGoal}
              placeholder={t('Session Goal')}
              containerStyle={styles.input}
            />
            <MatchTypeDropdown
              visible={durationVisible}
              toggle={() => setDurationVisible(!durationVisible)}
              options={['1 Week', '14 days', '1 Month']}
              selected={duration}
              onSelect={setDuration}
              label={t('Set Challenge Duration')}
              style={{marginTop: 18, width: '100%', alignSelf: 'center'}}
            />
            <MatchTypeDropdown
              visible={attendanceTypeVisible}
              toggle={() => setAttendanceTypeVisible(!attendanceTypeVisible)}
              options={attendanceOptions}
              selected={attendanceType}
              onSelect={setAttendanceType}
              label={t('What Counts Toward Completion?')}
              style={{marginTop: 18, width: '100%', alignSelf: 'center'}}
            />
            <InputField
              label=""
              value={challengeName}
              onChangeText={setChallengeName}
              placeholder={t('Name Your Challenge')}
              containerStyle={styles.input}
            />
            {/* <InputField
              label=""
              value={timeInput}
              onChangeText={setTimeInput}
              placeholder={t('Challenge Time (e.g., 20 min)')}
              containerStyle={styles.input}
            /> */}
            <TouchableOpacity
              style={[
                styles.dropdown,
                {
                  backgroundColor: dynamicBg,
                  marginTop: 18,
                  width: '100%',
                  alignSelf: 'center',
                },
              ]}
              onPress={() => setShowDatePicker(true)}>
              <Text style={[styles.dropdownText, {color: dynamicSubText}]}>
                {`${t('Set Start Date')}: ${scheduledDate.toDateString()}`}
              </Text>
              <AnySvg name={isDarkMode ? 'darkDown' : 'lightDown'} size={24} />
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePickerModal
                isVisible={showDatePicker}
                minimumDate={new Date()}
                mode="date"
                date={scheduledDate}
                onConfirm={selectedDate => {
                  setScheduledDate(selectedDate);
                  setShowDatePicker(false);
                }}
                onCancel={() => setShowDatePicker(false)}
              />
            )}

            <InputField
              label=""
              placeholder={t('Upload Photo')}
              onRightIconClick={handleImagePick}
              iconRightName={'attachment'}
              editable={false}
              containerStyle={styles.input}
            />

            {photo && (
              <View style={styles.photoRow}>
                <Image
                  source={{uri: photo.uri}}
                  style={styles.photoPreview}
                  resizeMode="cover"
                />
              </View>
            )}

            <CustomButton
              onPress={handleSave}
              containerStyle={{marginTop: hp(5)}}>
              {t('Save')}
            </CustomButton>
          </>
        )}

        {!isAttendance && selectedCategory && availableExercises.length > 0 && (
          <>
            <MatchTypeDropdown
              visible={exerciseVisible}
              toggle={() => setExerciseVisible(!exerciseVisible)}
              options={availableExercises
                .map((ex: any) => ex.name)
                .concat([exercise])
                .filter(
                  (item: any, index: number, arr: any[]) =>
                    arr.indexOf(item) === index && item,
                )}
              selected={exercise}
              onSelect={(exerciseName: string) => {
                setExercise(exerciseName);
                const selectedEx = availableExercises.find(
                  (ex: any) => ex.name === exerciseName,
                );
                setSelectedExerciseId(selectedEx?._id || null);
                // Reset time and distance inputs when exercise changes
                setTimeInput('');
                setDistanceInput('');
              }}
              label={t('Select Exercise')}
              style={{marginTop: 30, width: '100%', alignSelf: 'center'}}
            />

            <MatchTypeDropdown
              visible={formatVisible}
              toggle={() => setFormatVisible(!formatVisible)}
              options={availableFormats
                .map((f: any) => f.name)
                .concat([format])
                .filter(
                  (item: any, index: number, arr: any[]) =>
                    arr.indexOf(item) === index && item,
                )}
              selected={format}
              onSelect={(selectedFormatName: string) => {
                setTimeInput('');
                setFormat(selectedFormatName);
                const selectedFormat = availableFormats.find(
                  (f: any) => f.name === selectedFormatName,
                );
                setSelectedFormatId(selectedFormat?._id || null);
              }}
              label={t('Select Challenge Format')}
              style={{marginTop: 18, width: '100%', alignSelf: 'center'}}
            />

            {requiresTimeInput && (
              <MatchTypeDropdown
                visible={timeVisible}
                toggle={() => setTimeVisible(!timeVisible)}
                options={timeOptions}
                selected={timeInput}
                onSelect={val => {
                  setTimeInput(val);
                  setTimeVisible(false);
                }}
                label={t('Select Time')}
                style={{marginTop: 18, width: '100%', alignSelf: 'center'}}
              />
            )}

            {requiresDistanceInput && (
              <MatchTypeDropdown
                visible={timeVisible}
                toggle={() => setTimeVisible(!timeVisible)}
                options={distanceOptions}
                selected={distanceInput}
                onSelect={val => {
                  setDistanceInput(val);
                  setTimeVisible(false);
                }}
                label={t('Select Distance')}
                style={{marginTop: 18, width: '100%', alignSelf: 'center'}}
              />
            )}

            <MatchTypeDropdown
              visible={durationVisible}
              toggle={() => setDurationVisible(!durationVisible)}
              options={['1 Week', '14 days', '1 Month']}
              selected={duration}
              onSelect={setDuration}
              label={t('Set Challenge Duration')}
              style={{marginTop: 18, width: '100%', alignSelf: 'center'}}
            />

            <MatchTypeDropdown
              visible={proofVisible}
              toggle={() => setProofVisible(!proofVisible)}
              options={['Yes', 'No']}
              selected={proof}
              onSelect={setProof}
              label={t('Require Video Proof?')}
              style={{marginTop: 18, width: '100%', alignSelf: 'center'}}
            />

            <InputField
              label=""
              value={challengeName}
              onChangeText={setChallengeName}
              placeholder={t('Name Your Challenge')}
              containerStyle={styles.input}
            />
            {/* <InputField
              label=""
              value={timeInput}
              onChangeText={setTimeInput}
              placeholder={t('Challenge Time (e.g., 20 min)')}
              containerStyle={styles.input}
            /> */}

            <InputField
              label=""
              placeholder={t('Upload Photo')}
              onRightIconClick={handleImagePick}
              iconRightName={'attachment'}
              editable={false}
              containerStyle={styles.input}
            />

            {photo && (
              <View style={styles.photoRow}>
                <Image
                  source={{uri: photo.uri}}
                  style={styles.photoPreview}
                  resizeMode="cover"
                />
              </View>
            )}

            <CustomButton
              onPress={handleSave}
              containerStyle={{marginTop: hp(3)}}>
              {t('Update')}
            </CustomButton>
          </>
        )}
      </ScrollView>

      {isLoading && (
        <View style={styles.loaderOverlay}>
          <ActivityIndicator size={86} color={loaderColor} />
        </View>
      )}
    </View>
  );
};

export default EditChallenge;

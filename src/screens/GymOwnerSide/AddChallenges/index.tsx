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
import {launchImageLibrary} from 'react-native-image-picker';
import BackHeader from '../../../components/BackHeader';
import CustomButton from '../../../components/CustomButton';
import {Colors} from '../../../utils/Colors';
import styles from './styles';
import InputField from '../../../components/CustomInputField';
import {hp} from '../../../utils/responsivesness';
import AnySvg from '../../../components/AnySvg';
import SportDropdown from '../../../components/Dropdown/SportDropDown';
import MatchTypeDropdown from '../../../components/Dropdown/MatchTypeDropdown';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {
  createChallenge,
  getChallengeCategoriesTypes,
} from '../../../services/calls';

const AddChallenge = ({navigation, route}: {navigation: any; route?: any}) => {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const backgroundColor = isDarkMode
    ? Colors.darkBackground
    : Colors.lightBackground;
  const loaderColor = isDarkMode ? Colors.white : Colors.black;
  const dynamicSubText = isDarkMode ? Colors.gray : '#424242';
  const dynamicBg = isDarkMode ? Colors.darkInputBg : Colors.lightInputBg;

  const [photo, setPhoto] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(false);

  // Challenge categories from API
  const [challengeCategories, setChallengeCategories] = useState<any[]>([]);

  // Selection states
  const [sportVisible, setSportVisible] = useState(false);
  const [sport, setSport] = useState<string | null>(null);
  const [selectedSportId, setSelectedSportId] = useState<string | null>(null);

  const [exerciseVisible, setExerciseVisible] = useState(false);
  const [exercise, setExercise] = useState('');
  const [selectedExerciseId, setSelectedExerciseId] = useState<string | null>(
    null,
  );

  const [formatVisible, setFormatVisible] = useState(false);
  const [format, setFormat] = useState('');
  const [selectedFormatId, setSelectedFormatId] = useState<string | null>(null);
  const [durationVisible, setDurationVisible] = useState(false);
  const [duration, setDuration] = useState('');
  const [proofVisible, setProofVisible] = useState(false);
  const [proof, setProof] = useState('');
  const [challengeName, setChallengeName] = useState('');
  const [timeInput, setTimeInput] = useState('');
  const [timeVisible, setTimeVisible] = useState(false);
  const [distanceInput, setDistanceInput] = useState('');
  const [goal, setGoal] = useState('');
  const [goalVisible, setGoalVisible] = useState(false);
  const [attendanceTypeVisible, setAttendanceTypeVisible] = useState(false);
  const [attendanceType, setAttendanceType] = useState('');

  const [scheduledDate, setScheduledDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Get community ID from route params
  const communityId = route?.params;

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

  const handleImagePick = async () => {
    const result = await launchImageLibrary({mediaType: 'photo'});
    if (result?.assets?.length) {
      setPhoto(result.assets[0]);
    }
  };

  const handleSave = async () => {
    // Validate required fields
    if (!sport) {
      Alert.alert('Error', 'Please select a challenge type');
      return;
    }

    if (!challengeName.trim()) {
      Alert.alert('Error', 'Please enter a challenge name');
      return;
    }

    // Additional validation for non-attendance challenges
    if (!isAttendance) {
      if (!exercise) {
        Alert.alert('Error', 'Please select an exercise');
        return;
      }
      if (!format) {
        Alert.alert('Error', 'Please select a challenge format');
        return;
      }
      if (!duration) {
        Alert.alert('Error', 'Please set challenge duration');
        return;
      }
    } else {
      // Attendance specific validation
      if (!goal) {
        Alert.alert('Error', 'Please select a session goal');
        return;
      }
      if (!attendanceType) {
        Alert.alert('Error', 'Please select what counts toward completion');
        return;
      }
    }

    setIsLoading(true);

    try {
      // Prepare FormData for API
      const formData = new FormData();

      // Basic challenge data
      formData.append('name', challengeName);
      formData.append('type', selectedSportId || sport || '');

      // Add frequency for all challenges
      // formData.append('frequency', duration?.toLowerCase());
      if (isAttendance) {
        // For attendance-based challenges, map duration to frequency
        let frequency = '';
        if (duration === '7 days') {
          frequency = '7';
        } else if (duration === '14 days') {
          frequency = '14';
        } else if (duration === '1 Month') {
          frequency = '30';
        }
        formData.append('frequency', frequency);
        // formData.append('duration', frequency);
      } else {
        // For exercise-based challenges
        formData.append('frequency', duration?.toLowerCase());
        formData.append(
          'duration',
          duration?.toLowerCase() == 'weekly' ? 'week' : 'month',
        );
        if (timeInput?.length) formData.append('time', timeInput);
      }

      // Add community ID if available
      if (communityId) {
        formData.append('community', communityId);
      }

      // Add photo if selected
      if (photo) {
        formData.append('mediaUrl', {
          uri: photo.uri,
          type: photo.type,
          name: photo.fileName || 'challenge_image.jpg',
        } as any);
      }

      if (isAttendance) {
        // Attendance-based challenge data
        formData.append('duration', duration);
        formData.append('sessionGoals', goal);

        // Map attendance type to completion count
        let completionCount = 'attendedClass'; // default
        if (attendanceType === 'Log a Session') {
          completionCount = 'loggedSession';
        } else if (attendanceType === 'Attend a Class') {
          completionCount = 'attendedClass';
        } else if (attendanceType === 'Either') {
          completionCount = 'either';
        }
        formData.append('completionCount', completionCount);
        if (scheduledDate) {
          formData.append('startDate', scheduledDate.toISOString());
        }
      } else {
        // Exercise-based challenge data
        formData.append('exercise', selectedExerciseId || exercise || '');
        formData.append('format', selectedFormatId || '');

        if (requiresDistanceInput && distanceInput) {
          formData.append('distance', distanceInput);
        }

        if (proof) {
          formData.append('requiredVideo', proof === 'Yes' ? '1' : '0');
        }
      }
      // console.log('Form data ', JSON.stringify(formData));
      // return;
      const response = await createChallenge(formData);
      if (response.status == 200 || response?.status == 201) {
        setIsLoading(false);
        Alert.alert('Success', 'Challenge created successfully!', [
          {
            text: 'OK',
            onPress: () =>
              navigation.replace('ChallengeCreated', {
                challengeId:
                  response?.data?.data?._id ||
                  response?.data?._id ||
                  response?.data?.challenge?._id,
              }),
          },
        ]);
      } else {
      }
    } catch (error: any) {
      console.log('Error here *** ', error?.response?.data?.message);
      setIsLoading(false);
      console.error('Error creating challenge:', error?.message);

      let errorMessage = 'Failed to create challenge. Please try again.';

      if (error?.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error?.message) {
        errorMessage = error.message;
      }

      Alert.alert('Error', errorMessage);
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

  // Generate session goal options (1-50)
  const sessionGoalOptions = Array.from({length: 50}, (_, i) => `${i + 1}`);

  // Challenge duration options for attendance-based challenges
  const challengeDurationOptions = ['7 days', '14 days', '1 Month'];

  // Get selected category from API data
  const selectedCategory = challengeCategories.find(
    cat => cat._id === selectedSportId,
  );
  const availableExercises = selectedCategory?.types || [];

  const isAttendance = sport === 'Attendance Based';
  const requiresTimeInput =
    format === 'Max Distance in Set Time' ||
    format === 'Max Calories in Set Time' ||
    format === 'Reps in Set Time' ||
    format === 'Max Reps in Set Time';

  const requiresDistanceInput = format === 'Fastest Time for Set Distance';

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <BackHeader
        title={t('Add Challenge')}
        showBackIcon
        containerStyle={{marginBottom: 0}}
      />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        {sport?.length && (
          <Text
            style={[
              styles.dropdownText,
              {color: dynamicSubText, marginTop: 10},
            ]}>
            {t('Challenge Type :')}
          </Text>
        )}
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
          onSelect={(category: any) => {
            setSport(category.name);
            setSelectedSportId(category._id);
            setSportVisible(false);
            setExercise('');
            setSelectedExerciseId(null);
            setFormat('');
            setSelectedFormatId(null);
            setTimeInput('');
            setDistanceInput('');
          }}
          onClose={() => setSportVisible(false)}
        />

        {isAttendance && (
          <>
            <MatchTypeDropdown
              visible={goalVisible}
              toggle={() => setGoalVisible(!goalVisible)}
              options={sessionGoalOptions}
              selected={goal}
              onSelect={setGoal}
              label={t('Session Goal')}
              style={{marginTop: 18, width: '100%', alignSelf: 'center'}}
            />
            <MatchTypeDropdown
              visible={durationVisible}
              toggle={() => setDurationVisible(!durationVisible)}
              options={challengeDurationOptions}
              selected={duration}
              onSelect={setDuration}
              label={t('Challenge Duration')}
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
              disable={
                !photo ||
                !challengeName ||
                !duration ||
                !sport ||
                !attendanceType ||
                !goal
              }
              containerStyle={{marginTop: hp(5)}}>
              {t('Save')}
            </CustomButton>
          </>
        )}

        {selectedCategory && availableExercises.length > 0 && (
          <>
            <MatchTypeDropdown
              visible={exerciseVisible}
              toggle={() => setExerciseVisible(!exerciseVisible)}
              options={availableExercises.map((ex: any) => ex.name)}
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
              options={selectedCategory?.formats?.map((f: any) => f.name) || []}
              selected={format}
              onSelect={(selectedFormatName: string) => {
                setTimeInput('');
                setFormat(selectedFormatName);
                const selectedFormat = selectedCategory?.formats?.find(
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
              options={['1 Week', '1 Month']}
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
              disable={
                !photo ||
                !challengeName ||
                !sport ||
                !exercise ||
                !format ||
                !duration ||
                !proof ||
                (requiresTimeInput && !timeInput) ||
                (requiresDistanceInput && !distanceInput)
              }
              containerStyle={{marginTop: hp(3)}}>
              {t('Save')}
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

export default AddChallenge;

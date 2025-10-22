import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import VideoPlayer from 'react-native-video';
import {Colors} from '../../../../utils/Colors';
import BackHeader from '../../../../components/BackHeader';
import styles from './styles';
import CustomButton from '../../../../components/CustomButton';
import AnySvg from '../../../../components/AnySvg';
import {launchImageLibrary, Asset} from 'react-native-image-picker';
import VideoPickerWithPreview from '../../../../components/VideoPickerWithPreview';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import Toast from 'react-native-toast-message';
import {submitUserChallenge} from '../../../../services/calls';

interface ChallengeTrainingProps {
  navigation?: any;
  route?: any;
}

const ChallengeTraining: React.FC<ChallengeTrainingProps> = ({
  navigation,
  route,
}) => {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const dynamicInputBg = isDarkMode ? '#1E1E1E' : '#F6F6F6';
  const [reviewText, setReviewText] = useState('');
  const [reps, setReps] = useState('');
  const [videoUri, setVideoUri] = useState<string | null>(null);
  const [videoAsset, setVideoAsset] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [paused, setPaused] = useState(true);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  // Get challenge data from route params
  const challengeData = route?.params?.challengeData;
  console.log('Challange Data ', challengeData?.time);
  const userChallenge = route?.params?.userChallenge;
  const challengeId = route?.params?.challengeId;

  const backgroundColor = isDarkMode
    ? Colors.darkBackground
    : Colors.lightBackground;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const subTextColor = isDarkMode ? Colors.gray : Colors.darkGray;
  const loaderColor = isDarkMode ? Colors.white : Colors.black;
  const handleButtonClick = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();

      // Create submission object
      const submissionData = {
        date: moment().format('YYYY-MM-DD'),
        reps: reps,
        time: moment(new Date()).format('HH:mm'),
        note: reviewText || "Completed today's workout",
      };

      formData.append('submission', JSON.stringify(submissionData));

      // Add media if available
      if (videoAsset) {
        formData.append('media', {
          uri: videoAsset.uri,
          type: videoAsset.type || 'video/mp4',
          name: videoAsset.fileName || 'video.mp4',
        } as any);
      }

      const res = await submitUserChallenge(challengeId, formData);
      if (res?.status == 200 || res?.status == 201) {
        // navigation.goBack();
        navigation.replace('ChallengeSubmitted');
      }
    } catch (error: any) {
      console.error('Submission error:', error?.response);
      Alert.alert(
        'Error',
        error?.response?.data?.error || 'Failed to submit training',
      );
      // Toast.show({
      //   type: 'error',
      //   text1: 'Error',
      //   text2: error?.response?.data?.error || 'Failed to submit training',
      // });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTimeConfirm = (time: Date) => {
    setSelectedTime(time);
    setTimePickerVisibility(false);
  };

  const handleDateConfirm = (date: Date) => {
    setSelectedDate(date);
    setDatePickerVisibility(false);
  };

  // Check if all required fields are filled
  const isFormValid = () => {
    const basicFieldsValid =
      reps.trim() !== '' && selectedTime !== null && selectedDate !== null;
    const videoRequiredAndPresent = challengeData?.requiredVideo
      ? videoAsset !== null
      : true;
    return basicFieldsValid && videoRequiredAndPresent;
  };
  useEffect(() => {
    if (challengeData?.time) setReps(challengeData?.time);
  }, [challengeData?.time]);

  return (
    <SafeAreaView style={[styles.container, {backgroundColor}]}>
      <BackHeader title={t('Input Challenge')} showBackIcon />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <Text style={[styles.uneditableText, {color: textColor}]}>
          {t('Challenge Type')}:
        </Text>
        {/* Challenge Type Field - Uneditable */}
        <View
          style={[styles.uneditableField, {backgroundColor: dynamicInputBg}]}>
          <Text style={[styles.uneditableText, {color: textColor}]}>
            {challengeData?.type?.name}
          </Text>
        </View>

        {/* Exercise Field - Uneditable */}
        {challengeData?.exercise?.name && (
          <>
            <Text style={[styles.uneditableText, {color: textColor}]}>
              {t('Exercise')}:
            </Text>
            <View
              style={[
                styles.uneditableField,
                {backgroundColor: dynamicInputBg},
              ]}>
              <Text style={[styles.uneditableText, {color: textColor}]}>
                {challengeData?.exercise?.name}
              </Text>
            </View>
          </>
        )}

        {/* Reps Field */}
        {challengeData?.time && (
          <>
            <Text style={[styles.uneditableText, {color: textColor}]}>
              {t('Time')}:
            </Text>
            <View
              style={[
                styles.reviewBox,
                {
                  backgroundColor: dynamicInputBg,
                  height: 56,
                  paddingHorizontal: 10,
                  marginTop: 8,
                },
              ]}>
              <TextInput
                style={[
                  styles.reviewInput,
                  {color: textColor, justifyContent: 'center'},
                ]}
                value={reps}
                onChangeText={setReps}
                placeholder={t('Reps in set time')}
                placeholderTextColor={'#9E9E9E'}
              />
            </View>
          </>
        )}

        {/* Video Upload Field */}
        <VideoPickerWithPreview
          onVideoSelected={(asset: Asset) => {
            setVideoUri(asset.uri || null);
            setVideoAsset(asset);
          }}
          onVideoRemoved={() => {
            setVideoUri(null);
            setVideoAsset(null);
          }}
          onError={(message: string) => {
            Alert.alert('Video Selection Error', message, [{text: 'OK'}]);
          }}
          maxDuration={30}
          placeholder={`${t('Upload Video')} ${
            challengeData?.requiredVideo ? '*' : '(Optional)'
          } - Max 30 seconds`}
          style={[styles.uploadInput, {backgroundColor: dynamicInputBg}]}
          showPreview={false}
        />

        {/* Video Guidelines Button */}
        <TouchableOpacity
          onPress={() => navigation.navigate('VideoGuidelines')}>
          <Text style={[styles.guidelinesText, {color: '#2976BA'}]}>
            {t('Video Guidelines')}
          </Text>
          <AnySvg name={isDarkMode ? 'rightArrow' : 'rightArrow'} size={20} />
        </TouchableOpacity>
        {videoUri && (
          <View style={styles.videoWrapper}>
            <VideoPlayer
              source={{uri: videoUri}}
              style={styles.video}
              paused={paused}
              resizeMode="cover"
            />
            <TouchableOpacity
              onPress={() => setPaused(!paused)}
              style={styles.videoButton}>
              <AnySvg
                name={paused ? 'playIcon' : 'pauseIcon'}
                size={20}
                svgStyle={{alignSelf: 'center'}}
              />
            </TouchableOpacity>
          </View>
        )}

        {/* Notes Section - Moved to bottom */}
        <Text
          style={[
            styles.uneditableText,
            {color: textColor, fontSize: 18, marginTop: 10},
          ]}>
          Attach Notes (Optional)
        </Text>
        <Text
          style={[
            styles.uneditableText,
            {color: textColor, fontSize: 14, paddingTop: 5, paddingBottom: 10},
          ]}>
          Please add additional comments about Your performance.
        </Text>
        <View style={[styles.reviewBox, {backgroundColor: dynamicInputBg}]}>
          <TextInput
            style={[styles.reviewInput, {color: textColor}]}
            multiline
            numberOfLines={4}
            value={reviewText}
            onChangeText={setReviewText}
            placeholder={t('Write Note')}
            placeholderTextColor={'#9E9E9E'}
          />
        </View>

        <View style={styles.buttonWrapper}>
          <CustomButton
            onPress={handleButtonClick}
            disable={
              (challengeData?.time && !reps?.trim().length) ||
              !reviewText?.trim().length
            }>
            {t('Submit')}
          </CustomButton>
        </View>
      </ScrollView>

      {isLoading && (
        <View style={styles.loaderOverlay}>
          <ActivityIndicator size={86} color={loaderColor} />
        </View>
      )}

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={() => setDatePickerVisibility(false)}
      />

      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={() => setTimePickerVisibility(false)}
      />
    </SafeAreaView>
  );
};

export default ChallengeTraining;

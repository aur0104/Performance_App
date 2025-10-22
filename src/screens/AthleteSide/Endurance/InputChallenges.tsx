import React, {useMemo, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';
import Video from 'react-native-video';
import styles from '../../AuthFlow/SignUp/styles';
import BackHeader from '../../../components/BackHeader';
import InputField from '../../../components/CustomInputField';
import {Colors} from '../../../utils/Colors';
import CustomButton from '../../../components/CustomButton';
import AnySvg from '../../../components/AnySvg';
import fonts from '../../../utils/Fonts';
import {hp} from '../../../utils/responsivesness';
import {updatePerformanceChallenge} from '../../../services/calls';
import utils from '../../../utils/utils';
import {CommonActions} from '@react-navigation/native';
interface InputChallengesProps {
  navigation?: any;
  route?: any;
}
const InputChallenges: React.FC<InputChallengesProps> = ({
  navigation,
  route,
}) => {
  const {t} = useTranslation();
  const challengeName = route?.params?.item?.challenge?.title || '';
  const _id = route?.params?.item?._id;
  // console.log('Here *** ', route?.params?.item);
  const format = route?.params?.item?.challenge?.format?.name;
  const category = route?.params?.item?.challenge?.category?.name;
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const user = useSelector((state: any) => state.user.user);
  const role = user?.user?.role;
  const backgroundColor = isDarkMode ? Colors.darkBackground : Colors.white;
  const dynamicInputBg = isDarkMode ? '#1E1E1E' : '#F6F6F6';
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const [trail, setTrail] = useState(challengeName);
  const [distance, setDistance] = useState('');
  const [time, setTime] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [videoUri, setVideoUri] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const label = useMemo(() => {
    if (format?.includes('Fastest Time')) {
      return 'Time';
    } else if (format?.includes('Reps')) {
      return 'Repetition';
    } else {
      return 'Weight';
    }
  }, [format]);
  const handleSave = async () => {
    try {
      setLoading(true);
      let body;
      body = {
        [label === 'Time'
          ? 'time'
          : label === 'Repetition'
          ? 'repetition'
          : 'weight']:
          label === 'Time'
            ? `${time} min`
            : label === 'Repetition'
            ? `${time} rep`
            : `${time} kg`,
      };
      // console.log('Body ', body);
      // return;
      const result = await updatePerformanceChallenge(_id, body);
      if (result?.status === 201 || result?.status === 200) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name:
                  role === 'athlete' ? 'AthleteBottomTab' : 'OwnerBottomTab',
                params: {
                  screen:
                    role === 'athlete' ? 'MyPerformance' : 'GymPerformance',
                  params: {refresh: true},
                },
              },
            ],
          }),
        );
      }
    } catch (error) {
      utils.errorMessage(error);
    } finally {
      setLoading(false);
    }
    // if (minutes > 30) {
    //   setShowPopup(true);
    // } else {
    //   setLoading(true);

    //   setTimeout(() => {
    //     setLoading(false);
    //     navigation.navigate('RunningChallenges', {
    //       selectedTab: 'Completed',
    //       challengeName,
    //     });
    //   }, 2000);
    // }
  };

  return (
    <View style={{flex: 1, backgroundColor}}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <BackHeader
          title={`${challengeName} `}
          showBackIcon
          containerStyle={{marginBottom: 0}}
        />

        <View style={styles.inputContainer}>
          {/* <InputField
            label=""
            value={trail}
            onChangeText={setTrail}
            placeholder={t('Trail')}
            editable={false}
          /> */}
          {/* <InputField
            label=""
            value={distance}
            onChangeText={setDistance}
            placeholder={t('Distance')}
          /> */}

          <InputField
            label={label}
            value={time}
            onChangeText={setTime}
            placeholder={label}
            keyboardType={'numeric'}
          />

          {/* <TouchableOpacity
            style={[
              styles.uploadInput,
              {backgroundColor: dynamicInputBg, marginTop: hp(3)},
            ]}
            onPress={() => {
              launchImageLibrary(
                {mediaType: 'video', videoQuality: 'high'},
                response => {
                  if (
                    !response.didCancel &&
                    !response.errorCode &&
                    response.assets?.[0]?.uri
                  ) {
                    setVideoUri(response.assets[0].uri);
                  }
                },
              );
            }}>
            <Text style={styles.uploadPlaceholder}>
              {videoUri ? 'Video Selected' : t('Upload photo/Video')}
            </Text>
            <View style={styles.uploadIcons}>
              <AnySvg name="attachment" size={20} />
              <View style={styles.iconDivider} />
              <AnySvg name="camera" size={20} />
            </View>
          </TouchableOpacity>

          {videoUri && (
            <View
              style={{
                marginTop: 10,
                position: 'relative',
                width: 74,
                height: 74,
                borderRadius: 11,
              }}>
              <Video
                source={{uri: videoUri}}
                style={{width: 74, height: 74}}
                resizeMode="cover"
                paused={true}
              />
              <TouchableOpacity
                onPress={() => setVideoUri(null)}
                style={styles.remove}>
                <AnySvg name="removeIcon" size={16} />
              </TouchableOpacity>
            </View>
          )} */}

          {/* <View
            style={[
              styles.reviewBox,
              {backgroundColor: dynamicInputBg, marginTop: 6},
            ]}>
            <TextInput
              style={[styles.reviewInput, {color: textColor}]}
              multiline
              numberOfLines={4}
              value={reviewText}
              onChangeText={setReviewText}
              placeholder={t('Notes')}
              placeholderTextColor={'#9E9E9E'}
            />
          </View> */}
        </View>
      </ScrollView>

      <CustomButton
        onPress={handleSave}
        disable={!time?.length}
        containerStyle={{marginTop: '10%', marginBottom: '10%'}}>
        {t('Save Result')}
      </CustomButton>

      <Modal visible={showPopup} transparent animationType="fade">
        <View style={styles.popupOverlay}>
          <View style={styles.popupContainer}>
            <TouchableOpacity
              style={styles.closeIcon}
              onPress={() => setShowPopup(false)}>
              <AnySvg name="crossIcon" size={16} />
            </TouchableOpacity>

            <Text style={styles.popupTitle}>{t('OOPS!')}</Text>
            <Text style={styles.popupMessage}>
              You have not completed the 1KM Challenge in “30 Min” Please make
              sure to complete within time frame
            </Text>

            <TouchableOpacity
              onPress={() => setShowPopup(false)}
              style={{marginTop: 20}}>
              <Text
                style={{
                  fontSize: 24,
                  fontFamily: fonts.UrbanistBold,
                  color: Colors.primaryColor,
                }}>
                {t('Try Again')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {loading && (
        <View style={styles.loaderOverlay}>
          <ActivityIndicator
            size={80}
            color={isDarkMode ? Colors.white : Colors.black}
          />
        </View>
      )}
    </View>
  );
};

export default InputChallenges;

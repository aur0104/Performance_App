import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {useRoute} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import styles from './styles';
import {Colors} from '../../../utils/Colors';
import AnySvg from '../../../components/AnySvg';
import {IMAGES} from '../../../assets/images';
import CustomButton from '../../../components/CustomButton';
import {createUserChallenge} from '../../../services/calls';
import {wp} from '../../../utils/responsivesness';

interface ChallengeDetailProps {
  navigation?: any;
}

interface Challenge {
  _id: string;
  __v: number;
  community: string;
  createdAt: string;
  createdBy: {
    _id: string;
    name: string;
    email: string;
    role: string;
    profileImage?: string;
    adminStatus: string;
    gender?: string;
    dob?: string;
    friends?: any[];
    token?: string;
    __v: number;
    createdAt: string;
    updatedAt: string;
  };
  daysLeft: number | string;
  endDate: string | null;
  exercise: {
    _id: string;
    name: string;
    challengeCategory: string;
    rules: any[];
    __v: number;
    createdAt: string;
    updatedAt: string;
  };
  format: string | null;
  mediaUrl: string;
  name: string;
  participants: any[];
  requiredVideo: boolean;
  time: string;
  type: {
    _id: string;
    name: string;
    image: string;
    __v: number;
    createdAt: string;
    updatedAt: string;
  };
  updatedAt: string;
  sessionGoals?: string;
  completionCount?: string;
  distance?: string | null;
  duration?: string | null;
}

const ChallengeDetail: React.FC<ChallengeDetailProps> = ({navigation}) => {
  const {t} = useTranslation();
  const route = useRoute();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const user = useSelector((state: any) => state.user?.user);

  const [isLoading, setIsLoading] = useState(false);
  const loaderColor = isDarkMode ? Colors.white : Colors.black;

  // Get challenge data from navigation params
  const challengeData: Challenge | null =
    (route.params as any)?.challengeData || null;
  const challengeId = (route.params as any)?.id;
  // Check if current user has already participated
  const currentUserId = user?.user?._id || user?._id;
  const hasParticipated = challengeData?.participants?.some(
    (participant: any) =>
      participant._id === currentUserId || participant === currentUserId,
  );
  const backgroundColor = isDarkMode
    ? Colors.darkBackground
    : Colors.lightBackground;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const textColor2 = isDarkMode ? Colors.gray : Colors.black;
  const separaterColor = isDarkMode ? '#424242' : '#E0E0E0';

  const handleButtonClick = async () => {
    if (!challengeId) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Challenge ID not found',
      });
      return;
    }

    try {
      setIsLoading(true);
      const participationData = {
        challenge: challengeId,
        status: 'active',
      };
      const response = await createUserChallenge(participationData);
      if (response?.status === 200 || response?.status == 201) {
        Toast.show({
          type: 'success',
          text1: 'Success!',
          text2: 'Successfully joined the challenge',
        });

        // Navigate back after a short delay to show the toast
        setTimeout(() => {
          navigation.goBack();
        }, 1500);
      } else {
        // throw new Error(response?.data?.message || 'Failed to join challenge');
      }
    } catch (error: any) {
      console.error('Error participating in challenge:', error?.response);

      let errorMessage = 'Failed to join challenge';
      if (error?.response?.data?.message) {
        errorMessage = error.response.data.error;
      } else if (error?.message) {
        errorMessage = error.message;
      }

      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error?.response?.data?.error || 'Failed to join challange',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate days left
  const getDaysLeft = () => {
    if (!challengeData) return 'No deadline';

    if (typeof challengeData.daysLeft === 'number') {
      return challengeData.daysLeft > 0
        ? `${challengeData.daysLeft} Days Left`
        : 'Expired';
    }

    if (typeof challengeData.daysLeft === 'string') {
      return challengeData.daysLeft;
    }

    return 'No deadline';
  };
  // Calculate duration
  const getDuration = () => {
    if (!challengeData) return '1 Week';

    if (challengeData.endDate) {
      const startDate = new Date(challengeData?.createdAt);
      const endDate = new Date(challengeData?.endDate);
      const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays <= 7) return `${diffDays} Days`;
      if (diffDays <= 30) return `${Math.ceil(diffDays / 7)} Weeks`;
      return `${Math.ceil(diffDays / 30)} Months`;
    }

    return '1 Week';
  };

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <View>
          <Image
            source={
              challengeData?.mediaUrl
                ? {uri: challengeData.mediaUrl}
                : challengeData?.type?.image
                ? {uri: challengeData.type.image}
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

            <AnySvg
              name="informationCircle"
              size={28}
              svgStyle={{marginTop: 4}}
              onPress={() => navigation.navigate('ChallengeRules')}
            />
          </View>
        </View>

        <Text style={[styles.challengeTitle, {color: textColor}]}>
          {challengeData?.name}
        </Text>

        <View style={[styles.separator, {backgroundColor: separaterColor}]} />

        <View
          style={[
            styles.row,
            {justifyContent: 'space-between', flexWrap: 'wrap'},
          ]}>
          <View style={{flexDirection: 'row', gap: 6}}>
            <Text style={[styles.subtitle, {color: textColor}]}>
              {t('Challenge Type')}:
            </Text>
            <Text style={[styles.subtitleValue, {color: textColor2}]}>
              {challengeData?.type?.name}
            </Text>
          </View>
          {challengeData?.type?.name != 'Attendance Based' && (
            <View style={{flexDirection: 'row', gap: 6}}>
              <Text style={[styles.subtitle, {color: textColor}]}>
                {t('Exercise')}:
              </Text>
              <Text style={[styles.subtitleValue, {color: textColor2}]}>
                {challengeData?.exercise?.name}
              </Text>
            </View>
          )}
        </View>
        {challengeData?.format && (
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
                  {t('Challenge Format')}:
                </Text>
                <Text style={[styles.subtitleValue, {color: textColor2}]}>
                  {typeof challengeData.format === 'string'
                    ? challengeData.format
                    : challengeData.format?.name}
                </Text>
              </View>
            </View>
          </>
        )}
        {challengeData?.time && (
          <>
            <View
              style={[styles.separator, {backgroundColor: separaterColor}]}
            />

            <View style={styles.row}>
              <Text style={[styles.subtitle, {color: textColor}]}>
                {t('Time :')}
              </Text>
              <Text style={[styles.dateValue, {color: textColor2}]}>
                {challengeData?.time}
              </Text>
            </View>
          </>
        )}
        {challengeData?.distance && (
          <>
            <View
              style={[styles.separator, {backgroundColor: separaterColor}]}
            />
            <View style={styles.row}>
              <Text style={[styles.subtitle, {color: textColor}]}>
                {t('Challenge Distance:')}
              </Text>
              <Text style={[styles.dateValue, {color: textColor2}]}>
                {challengeData?.distance}
              </Text>
            </View>
          </>
        )}
        {challengeData?.duration && (
          <>
            <View
              style={[styles.separator, {backgroundColor: separaterColor}]}
            />
            <View style={styles.row}>
              <Text style={[styles.subtitle, {color: textColor}]}>
                {t('Challenge Duration:')}
              </Text>
              <Text style={[styles.dateValue, {color: textColor2}]}>
                {challengeData?.duration}
              </Text>
            </View>
          </>
        )}
        <>
          {challengeData?.daysLeft && (
            <>
              <View
                style={[styles.separator, {backgroundColor: separaterColor}]}
              />
              <View style={styles.row}>
                <Text style={[styles.subtitle, {color: textColor}]}>
                  {t('Days Left:')}
                </Text>
                <Text style={[styles.dateValue, {color: textColor2}]}>
                  {getDaysLeft()}
                </Text>
              </View>
            </>
          )}
        </>
        <View style={[styles.separator, {backgroundColor: separaterColor}]} />

        {/* <View style={styles.row}>
          <Text style={[styles.subtitle, {color: textColor}]}>
            {t('Participants:')}
          </Text>
          <Text style={[styles.dateValue, {color: textColor2}]}>
            {challengeData?.participants?.length || 0}
          </Text>
        </View> */}

        {/* <View style={[styles.separator, {backgroundColor: separaterColor}]} /> */}

        <View style={styles.row}>
          {challengeData?.type?.name != 'Attendance Based' && (
            <View style={styles.leftColumn}>
              <Text style={[styles.subtitle, {color: textColor}]}>
                {t('Require Video Proof')}
              </Text>
              <Text style={[styles.dateValue, {color: textColor2}]}>
                {challengeData?.requiredVideo ? 'Yes' : 'No'}
              </Text>
            </View>
          )}
        </View>
        {challengeData?.sessionGoals && (
          <>
            <View style={styles.row}>
              <View style={styles.leftColumn}>
                <Text style={[styles.subtitle, {color: textColor}]}>
                  {t('Session Goals')}
                </Text>
                <Text style={[styles.dateValue, {color: textColor2}]}>
                  {challengeData?.sessionGoals}
                </Text>
              </View>
            </View>
          </>
        )}
        {challengeData?.completionCount && (
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
                  {challengeData?.completionCount}
                </Text>
              </View>
            </View>
          </>
        )}
        {getDaysLeft() == 'Expired' ? null : (
          <>
            {!hasParticipated ? (
              <CustomButton
                onPress={handleButtonClick}
                containerStyle={{marginBottom: '16%', marginTop: '15%'}}
                disable={isLoading}>
                {isLoading ? t('Joining...') : t('Join')}
              </CustomButton>
            ) : (
              <View
                style={{
                  marginBottom: '16%',
                  marginTop: '15%',
                  padding: 16,
                  backgroundColor: Colors.green,
                  borderRadius: 8,
                  width: wp(60),
                  alignSelf: 'center',

                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}>
                  {t('Joined')}
                </Text>
              </View>
            )}
          </>
        )}

        {isLoading && (
          <View style={styles.loaderOverlay}>
            <ActivityIndicator size={86} color={loaderColor} />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default ChallengeDetail;

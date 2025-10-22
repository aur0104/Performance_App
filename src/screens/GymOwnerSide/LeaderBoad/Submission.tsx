import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {useRoute} from '@react-navigation/native';
import {Colors} from '../../../utils/Colors';
import BackHeader from '../../../components/BackHeader';
import CustomButton from '../../../components/CustomButton';
import styles from '../../AthleteSide/TraningCalendar/TrainingDetail/styles';
import {hp, wp} from '../../../utils/responsivesness';
import AnySvg from '../../../components/AnySvg';
import VideoPlayer from 'react-native-video';
import videoStyles from './styles';
import fonts from '../../../utils/Fonts';
import {updateSubmissionStatus} from '../../../services/calls';
import utils from '../../../utils/utils';
import {ChallengeStatus} from '../../../utils/enum';

interface SubmissionProps {
  navigation?: any;
  route?: any;
}

const Submission: React.FC<SubmissionProps> = ({navigation}) => {
  const {t} = useTranslation();
  const route = useRoute();
  const [loading, setLoading] = useState(false);
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);

  // Get userChallenge data from route params
  const userChallenge = (route.params as any)?.userChallenge || null;
  // console.log('Params here ', JSON.stringify(route.params));
  const user = userChallenge?.user;
  const challenge = userChallenge?.challenge;
  const dailySubmissions = userChallenge?.dailySubmissions || [];
  console.log('Daily sumbmission ', userChallenge?.dailySubmissions);
  const backgroundColor = isDarkMode
    ? Colors.darkBackground
    : Colors.lightBackground;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const textColor2 = isDarkMode ? '#797979' : '#424242';

  // State to track currently playing video
  const [currentlyPlayingId, setCurrentlyPlayingId] = useState<
    string | number | null
  >(null);
  // Refs for each video player
  const videoRefs = useRef<{[key: string]: any}>({});

  // Initialize all videos as paused when component mounts or dailySubmissions changes
  useEffect(() => {
    // Reset currently playing video when submissions change
    setCurrentlyPlayingId(null);
  }, [dailySubmissions]);

  const togglePause = (id: string | number) => {
    if (currentlyPlayingId === id) {
      // If clicking the currently playing video, pause it
      setCurrentlyPlayingId(null);
    } else {
      // If clicking a different video, pause current one and play new one
      setCurrentlyPlayingId(id);
    }
  };

  const handleVideoEnd = (id: string | number) => {
    // When video ends, reset to beginning and clear currently playing
    setCurrentlyPlayingId(null);

    // Seek to beginning after a small delay
    setTimeout(() => {
      if (videoRefs.current[id]) {
        videoRefs.current[id].seek(0);
      }
    }, 100);
  };

  const handleApproval = async (
    status: ChallengeStatus.Accepted | ChallengeStatus.Rejected,
  ) => {
    if (!userChallenge?._id) {
      Alert.alert('Error', 'No challenge data found');
      return;
    }

    // Get the first submission ID for approval/rejection
    const firstSubmission = dailySubmissions[0];
    if (!firstSubmission?._id) {
      Alert.alert('Error', 'No submission found to approve/reject');
      return;
    }

    try {
      setLoading(true);

      const response = await updateSubmissionStatus(
        route?.params?.chalId,
        firstSubmission._id,
        status,
      );

      if (response.status === 200) {
        Alert.alert(
          'Success',
          `Submission ${
            status === ChallengeStatus.Accepted ? 'approved' : 'rejected'
          } successfully`,
          [
            {
              text: 'OK',
              onPress: () => navigation.popToTop(),
            },
          ],
        );
      }
    } catch (error: any) {
      console.error('Error updating submission:', error);
      utils.errorMessage(error);
      // Alert.alert(
      //   'Error',
      //   error.message || 'Failed to update submission status',
      // );
    } finally {
      setLoading(false);
    }
  };
  const [videoDimensions, setVideoDimensions] = useState<{
    [key: string]: {width: number; height: number};
  }>({});
  const handleVideoLoad = (id: string | number, naturalSize: any) => {
    setVideoDimensions(prev => ({
      ...prev,
      [id]: {
        width: naturalSize.width,
        height: naturalSize.height,
      },
    }));
  };
  // Calculate dynamic height based on aspect ratio
  const getVideoHeight = (videoId: string | number) => {
    const dimensions = videoDimensions[videoId];
    if (!dimensions || dimensions.width === 0) return 200; // Default height

    const aspectRatio = dimensions.height / dimensions.width;
    const containerWidth = wp(90); // 90% of screen width (adjust as needed)
    const calculatedHeight = containerWidth * aspectRatio;

    // Set min and max height limits
    return Math.max(150, Math.min(400, calculatedHeight)); // Min 150, Max 400
  };

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <ScrollView
        style={[styles.container, {backgroundColor}]}
        showsVerticalScrollIndicator={false}>
        <BackHeader title={user?.name} showBackIcon />

        <View style={[styles.rowItem, {paddingHorizontal: 15}]}>
          <Text style={[styles.label, {color: textColor}]}>{t('Type')}:</Text>
          <Text
            style={[
              styles.value,
              {color: textColor, fontFamily: fonts.UrbanistLight},
            ]}>
            {challenge?.name}
          </Text>
        </View>

        <View
          style={[
            styles.rowItem,
            {justifyContent: 'space-between', paddingHorizontal: 15},
          ]}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Text style={[styles.label, {color: textColor, marginRight: 2}]}>
              {t('Start Date')}:
            </Text>
            <Text
              style={[
                styles.value,
                {
                  color: textColor,
                  fontSize: 15,
                  fontFamily: fonts.UrbanistLight,
                },
              ]}>
              {challenge?.createdAt
                ? new Date(challenge.createdAt).toLocaleDateString()
                : 'N/A'}
            </Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row', marginLeft: hp(4)}}>
            <Text style={[styles.label, {color: textColor, marginRight: 2}]}>
              {t('End Date')}:
            </Text>
            <Text
              style={[
                styles.value,
                {
                  color: textColor,
                  fontSize: 15,
                  fontFamily: fonts.UrbanistLight,
                },
              ]}>
              {challenge?.endDate
                ? new Date(challenge?.endDate).toLocaleDateString()
                : 'N/A'}
            </Text>
          </View>
        </View>

        <Text
          style={[
            styles.sectionTitle,
            {color: textColor, paddingHorizontal: 15},
          ]}>
          {t('Daily Submissions')}
        </Text>

        {dailySubmissions.length > 0 ? (
          <View style={{paddingHorizontal: 15, marginBottom: hp(2)}}>
            {dailySubmissions.map((submission: any, index: number) => (
              <View
                key={submission._id || index}
                style={{
                  backgroundColor: isDarkMode ? '#2A2A2A' : '#F5F5F5',
                  padding: 15,
                  borderRadius: 10,
                  marginBottom: 10,
                  borderLeftWidth: 4,
                  borderLeftColor:
                    submission.ownerApprovalStatus === 'approved'
                      ? Colors.green
                      : submission.ownerApprovalStatus === 'rejected'
                      ? Colors.red
                      : Colors.orange,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 8,
                  }}>
                  <Text
                    style={[
                      {
                        color: textColor,
                        fontFamily: fonts.UrbanistBold,
                        fontSize: 14,
                      },
                    ]}>
                    Day {index + 1}
                  </Text>
                  <Text
                    style={[
                      {
                        color:
                          submission.ownerApprovalStatus === 'approved'
                            ? Colors.green
                            : submission.ownerApprovalStatus === 'rejected'
                            ? Colors.red
                            : Colors.orange,
                        fontFamily: fonts.UrbanistBold,
                        fontSize: 12,
                        textTransform: 'uppercase',
                      },
                    ]}>
                    {submission.ownerApprovalStatus || 'Pending'}
                  </Text>
                </View>

                <View style={{flexDirection: 'row', marginBottom: 5}}>
                  <Text
                    style={[
                      {color: textColor2, fontSize: 12, marginRight: 10},
                    ]}>
                    Time: {submission.time}min
                  </Text>
                  <Text style={[{color: textColor2, fontSize: 12}]}>
                    Reps: {submission.reps}
                  </Text>
                </View>

                {submission.note && (
                  <Text
                    style={[
                      {
                        color: textColor,
                        fontSize: 12,
                        fontFamily: fonts.UrbanistLight,
                        marginTop: 5,
                      },
                    ]}>
                    Note: {submission.note}
                  </Text>
                )}

                <Text
                  style={[
                    {
                      color: textColor2,
                      fontSize: 10,
                      marginTop: 5,
                    },
                  ]}>
                  Submitted: {new Date(submission.createdAt).toLocaleString()}
                </Text>
              </View>
            ))}
          </View>
        ) : (
          <Text
            style={[
              {
                color: textColor2,
                marginBottom: hp(6),
                paddingHorizontal: 15,
                fontFamily: fonts.UrbanistLight,
                textAlign: 'center',
              },
            ]}>
            No submissions found for this challenge.
          </Text>
        )}

        {/* Video section - keeping original structure */}
        {dailySubmissions.map((sub: any, index: number) =>
          sub.mediaUrl ? (
            <View key={sub._id || index} style={[videoStyles.videoWrapper]}>
              <VideoPlayer
                ref={ref => {
                  videoRefs.current[sub._id || sub.mediaUrl] = ref;
                }}
                source={{uri: sub.mediaUrl}}
                style={videoStyles.video}
                paused={currentlyPlayingId !== (sub._id || sub.mediaUrl)}
                resizeMode="cover"
                onLoad={data =>
                  handleVideoLoad(sub._id || sub.mediaUrl, data.naturalSize)
                }
                onEnd={() => handleVideoEnd(sub._id || sub.mediaUrl)}
                onError={error => {
                  console.error('Video playback error:', error);
                }}
              />
              <TouchableOpacity
                onPress={() => togglePause(sub._id || sub.mediaUrl)}
                style={videoStyles.videoButton}>
                <AnySvg
                  name={
                    currentlyPlayingId === (sub._id || sub.mediaUrl)
                      ? 'pauseIcon'
                      : 'playIcon'
                  }
                  size={20}
                  svgStyle={{alignSelf: 'center'}}
                />
              </TouchableOpacity>
            </View>
          ) : null,
        )}
      </ScrollView>
      {/* Only show Accept/Reject buttons for pending submissions */}
      {userChallenge?.dailySubmissions[0]?.ownerApprovalStatus == 'pending' && (
        <>
          {loading ? (
            <ActivityIndicator
              style={{
                position: 'absolute',
                alignSelf: 'center',
                bottom: hp(10),
              }}
              size={30}
              color={Colors.gray}
            />
          ) : (
            <>
              <CustomButton
                onPress={() => handleApproval(ChallengeStatus.Accepted)}
                containerStyle={{
                  marginBottom: hp(2),
                }}
                disable={loading}>
                {loading ? (
                  <ActivityIndicator color={Colors.white} />
                ) : (
                  t('Accept')
                )}
              </CustomButton>
              <TouchableOpacity
                onPress={() => handleApproval(ChallengeStatus.Rejected)}
                style={{
                  marginBottom: hp(8),
                  backgroundColor: loading ? Colors.gray : Colors.red,
                  borderColor: loading ? Colors.gray : Colors.red,
                  borderWidth: 1,
                  width: '90%',
                  height: 58,
                  borderRadius: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                }}
                disabled={loading}>
                {loading ? (
                  <ActivityIndicator color={Colors.white} />
                ) : (
                  <Text
                    style={{
                      fontSize: 16,
                      color: Colors.white,
                      fontFamily: fonts.UrbanistBold,
                    }}>
                    {t('Reject')}
                  </Text>
                )}
              </TouchableOpacity>
            </>
          )}
        </>
      )}

      {/* Show status message for completed/rejected submissions */}
      {dailySubmissions.every(
        (sub: any) =>
          sub.ownerApprovalStatus === 'approved' ||
          sub.ownerApprovalStatus === 'rejected' ||
          sub.ownerApprovalStatus === 'cancelled',
      ) && (
        <View
          style={{
            marginBottom: hp(8),
            padding: 20,
            backgroundColor: isDarkMode ? '#2A2A2A' : '#F5F5F5',
            borderRadius: 10,
            marginHorizontal: 20,
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: textColor,
              fontSize: 16,
              fontFamily: fonts.UrbanistBold,
              textAlign: 'center',
            }}>
            {dailySubmissions.some(
              (sub: any) => sub.ownerApprovalStatus === 'approved',
            )
              ? 'All submissions have been approved'
              : 'All submissions have been rejected'}
          </Text>
        </View>
      )}
    </View>
  );
};

export default Submission;

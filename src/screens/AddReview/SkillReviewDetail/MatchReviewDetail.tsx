import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import VideoPlayer from 'react-native-video';
import {Colors} from '../../../utils/Colors';
import BackHeader from '../../../components/BackHeader';
import styles from './styles';
import CustomButton from '../../../components/CustomButton';
import AnySvg from '../../../components/AnySvg';
import SwitchButton from '../../../components/SwitchButton';
import CustomSliderWithThumb from '../../../components/CustomSlider';
import DeletePopupModal from '../../../components/DeleteModal';
import utils from '../../../utils/utils';
import {
  getReviewById,
  deleteReview,
  updateReview,
} from '../../../services/calls';
import {useBackHandler} from '../../../hooks/useBackHandler';

interface ApiResponse {
  __v: number;
  _id: string;
  comment: string;
  createdAt: string;
  matchResult: string;
  matchType: string;
  media: string[];
  peerFeedback?: {
    friend?: {
      _id: string;
      name: string;
    };
    coach?: {
      _id: string;
      name: string;
    };
  };
  coachFeedback?: {
    friend?: {
      _id: string;
      name: string;
    };
    coach?: {
      _id: string;
      name: string;
    };
  };
  rating: number;
  score: number;
  sessionType: string;
  updatedAt: string;
  user: {
    _id: string;
    name: string;
    email: string;
    nationality: string;
  };
  opponent: string;
  clubOrTeam: string;
  private: boolean;
}

const MatchReviewDetail = (props: any) => {
  const {t} = useTranslation();
  const _id = props?.route?.params?._id;
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const {width} = useWindowDimensions();
  const backgroundColor = isDarkMode
    ? Colors.darkBackground
    : Colors.lightBackground;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const textColor2 = isDarkMode ? Colors.gray : Colors.black;
  const dynamicBg = isDarkMode ? '#212121' : '#F2F2F2';
  const separaterColor = isDarkMode ? '#424242' : '#E0E0E0';
  const [paused, setPaused] = useState(true);
  const [rating, setRating] = useState(5);
  const [access, setAccess] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [apiResult, setApiResult] = useState<ApiResponse | null>(null);
  const [loader, setLoader] = useState(false);
  const handleToggle = () => setAccess(!access);
  const getReviewDetails = async () => {
    try {
      setLoader(true);
      if (!_id) return;
      const result = await getReviewById(_id);
      if (result.status === 200 || result.status === 201) {
        setApiResult(result.data);
        setRating(result.data.rating);
      }
    } catch (error) {
      console.log('Error here ', error);
      utils.showToast('error', 'Failed to fetch review details');
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getReviewDetails();
  }, [_id]);
  useEffect(() => {
    setAccess(apiResult?.private ?? false);
  }, [apiResult?.private]);
  console.log('Api result here ', JSON.stringify(apiResult));
  const deleteReviewBackend = async () => {
    try {
      const result = await deleteReview(_id);
      if (result.status === 200 || result.status === 201) {
        utils.showToast('success', 'Review deleted successfully');
        props.navigation.popToTop();
      }
    } catch (error) {
      utils.showToast('error', 'Failed to delete review');
    }
  };

  useBackHandler(() => {
    props.navigation.navigate('AthleteBottomTab');
    return true; // block default back
  });

  return (
    <ScrollView
      style={[styles.container, {backgroundColor}]}
      showsVerticalScrollIndicator={false}>
      <BackHeader
        title={t('Detail')}
        showBackIcon
        onBackPress={() => {
          props.navigation.navigate('AthleteBottomTab');
        }}
      />

      {apiResult ? (
        <>
          {/* Match Type */}
          <View style={styles.rowItem}>
            <Text style={[styles.label, {color: textColor}]}>
              {t('Match Type')}:
            </Text>
            <Text style={[styles.value, {color: textColor2}]}>
              {apiResult.matchType}
            </Text>
          </View>
          <View style={[styles.separater, {backgroundColor: separaterColor}]} />

          {/* Result + Score */}
          <View
            style={[
              styles.rowItem,
              {
                alignItems: 'center',

                width: width * 0.9,
                alignSelf: 'center',
                paddingHorizontal: 0,
              },
            ]}>
            <View
              style={{
                width: '35%',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={[styles.label, {color: textColor}]}>
                {t('Result')}:
              </Text>
              <Text style={[styles.value, {color: textColor2}]}>
                {apiResult.matchResult || '-'}
              </Text>
            </View>
            {apiResult?.score && (
              <View
                style={{
                  flexDirection: 'row',
                  width: '65%',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: 10,
                }}>
                <Text
                  style={[styles.label, {color: textColor, marginRight: 0}]}>
                  {t('Score Result')}:
                </Text>
                <Text style={[styles.value, {color: textColor2}]}>
                  {apiResult.score}
                </Text>
              </View>
            )}
          </View>
          <View style={[styles.separater, {backgroundColor: separaterColor}]} />

          {/* Opponent */}
          <View style={styles.rowItem}>
            <Text style={[styles.label, {color: textColor}]}>
              {t('Opponent/Team Name')}:
            </Text>
            <Text style={[styles.value, {color: textColor2, fontSize: 14}]}>
              {apiResult?.opponent || 'N/A'}
            </Text>
          </View>
          <View style={[styles.separater, {backgroundColor: separaterColor}]} />
          {apiResult?.coachFeedback?.coach && (
            <View style={styles.rowItem}>
              <Text style={[styles.label, {color: textColor, marginTop: 14}]}>
                {t('Coach')}:
              </Text>
              <View style={[styles.userView, {backgroundColor: dynamicBg}]}>
                <Text style={[styles.userName, {color: textColor}]}>
                  {apiResult?.coachFeedback?.coach?.name}
                </Text>
              </View>
            </View>
          )}

          {/* Friends */}
          {apiResult?.peerFeedback?.friend && (
            <>
              <View
                style={[styles.separater, {backgroundColor: separaterColor}]}
              />
              <View style={styles.rowItem}>
                <Text style={[styles.label, {color: textColor, marginTop: 14}]}>
                  {t('Friends')}:
                </Text>
                <View style={[styles.userView, {backgroundColor: dynamicBg}]}>
                  <Text style={[styles.userName, {color: textColor}]}>
                    {apiResult?.peerFeedback?.friend?.name}
                  </Text>
                </View>
              </View>
            </>
          )}

          <View style={[styles.separater, {backgroundColor: separaterColor}]} />

          {/* Gym */}
          <View style={styles.rowItem}>
            <Text style={[styles.label, {color: textColor}]}>
              {t('Your Gym')}:
            </Text>
            <Text style={[styles.value, {color: textColor2}]}>
              {apiResult?.clubOrTeam ?? ''}
            </Text>
          </View>

          <View style={[styles.separater, {backgroundColor: separaterColor}]} />

          {/* Personal Review */}
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={[styles.sectionTitle, {color: textColor}]}>
              {t('Personal Review')}
            </Text>
            <AnySvg
              name="informationCircle"
              size={34}
              svgStyle={{marginRight: 14}}
              onPress={() => props.navigation.navigate('AddReviewInformation')}
            />
          </View>
          <CustomSliderWithThumb rating={rating} setRating={setRating} />

          {/* Private toggle */}
          <View
            style={{
              width: '96%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={[styles.sectionTitle, {color: textColor}]}>
              {t('Private')}
            </Text>
            <SwitchButton isOn={access} onPress={handleToggle} />
          </View>
          {apiResult?.peerFeedback && (
            <>
              <View
                style={[styles.separater, {backgroundColor: separaterColor}]}
              />

              {/* Peer Feedback */}
              <Text style={[styles.sectionTitle, {color: textColor}]}>
                {t('Peer Feedback')}
              </Text>
              <Text style={[styles.description, {color: Colors.red}]}>
                Peer review in progress. It’ll appear here once submitted
              </Text>
            </>
          )}
          {apiResult?.coachFeedback && (
            <>
              <View
                style={[styles.separater, {backgroundColor: separaterColor}]}
              />

              {/* Coach Feedback */}
              <Text style={[styles.sectionTitle, {color: textColor}]}>
                {t('Coach Feedback')}
              </Text>
              <Text style={[styles.description, {color: Colors.red}]}>
                Coach review in progress. It’ll appear here once submitted
              </Text>
            </>
          )}

          <View style={[styles.separater, {backgroundColor: separaterColor}]} />

          {/* Additional Comments */}
          <Text style={[styles.sectionTitle, {color: textColor}]}>
            {t('Additional Comments')}
          </Text>
          <Text style={[styles.description, {color: textColor2}]}>
            {apiResult?.comment}
          </Text>

          {apiResult?.media?.length ? (
            <>
              <View
                style={[styles.separater, {backgroundColor: separaterColor}]}
              />
              <Text style={[styles.sectionTitle, {color: textColor}]}>
                {t(utils.isVideo(apiResult?.media?.[0]) ? 'Video' : 'Image')}
              </Text>

              {utils.isVideo(apiResult?.media?.[0]) ? (
                <View style={styles.videoWrapper}>
                  <VideoPlayer
                    source={{
                      uri: apiResult?.media?.[0],
                    }}
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
              ) : utils.isImage(apiResult?.media?.[0]) ? (
                <Image
                  source={{uri: apiResult?.media?.[0]}}
                  style={styles.imageStyle}
                />
              ) : (
                <View />
              )}
            </>
          ) : (
            <View style={{marginBottom: 10}} />
          )}

          {/* Buttons */}
          <CustomButton
            onPress={() => [
              props.navigation.navigate('EditMatchType', {
                existingReview: apiResult,
              }),
            ]}>
            {t('Make Update')}
          </CustomButton>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => setShowDelete(true)}>
            <Text style={styles.deleteText}>{t('Delete')}</Text>
          </TouchableOpacity>

          <DeletePopupModal
            visible={showDelete}
            onCancel={() => setShowDelete(false)}
            onDelete={() => {
              setShowDelete(false);
              deleteReviewBackend();
            }}
          />
        </>
      ) : loader ? (
        <Text style={{color: textColor, alignSelf: 'center', marginTop: 20}}>
          Loading...
        </Text>
      ) : (
        <Text style={{color: textColor, alignSelf: 'center', marginTop: 20}}>
          No apiResult available
        </Text>
      )}
    </ScrollView>
  );
};

export default MatchReviewDetail;

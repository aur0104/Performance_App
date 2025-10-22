import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
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
import {
  deleteReview,
  getReviewById,
  updateReview,
} from '../../../services/calls';
import utils from '../../../utils/utils';
import {Friend} from '../../../interfaces';
import {useBackHandler} from '../../../hooks/useBackHandler';
interface ApiResponse {
  __v: number;
  _id: string;
  category: Category;
  comment: string;
  createdAt: string;
  media: string[];
  rating: number;
  sessionType: string;
  skill: Skill[];
  sport: Sport;
  updatedAt: string;
  user: User;
  coachFeedback: CoachFeedback;
  peerFeedback: PeerFeedBack;
  private: boolean;
  clubOrTeam: string;
}

interface Category {
  categoryId: {
    _id: string;
    name: string;
    sport: string;
    user: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  categoryModel: 'User_Sport_Category' | 'Sport_Category';
}

export interface Skill {
  _id: string; // wrapper _id
  skillId: {
    _id: string;
    name: string;
    category: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  skillModel: 'User_Sport_Category_Skill' | 'Sport_Category_Skill';
}

interface Sport {
  _id: string;
  createdAt: string;
  image: string;
  name: string;
  skillLevelSet: string | null;
  skillSet: string;
  sportsType: string | null;
  updatedAt: string;
}

interface User {
  __v: number;
  _id: string;
  adminStatus: string;
  createdAt: string;
  dob: string;
  email: string;
  friends: string[];
  gender: string;
  name: string;
  nationality: string;
  password: string;
  phoneNumber: string;
  preference: Preference;
  role: string;
  token: string;
  updatedAt: string;
}
interface Preference {
  height: string;
  weight: string;
}
interface CoachFeedback {
  coach: Coach;
}
interface PeerFeedBack {
  friend: Coach;
}
interface Coach {
  preference: Preference;
  adminStatus: string;
  friends: Friend[];
  _id: string;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  gender: string;
  nationality: string;
  dob: string; // ISO date string
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  gym: string;
}
const SkillReviewDetail = (props: any) => {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const _id = props?.route?.params?._id;
  const backgroundColor = isDarkMode
    ? Colors.darkBackground
    : Colors.lightBackground;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const textColor2 = isDarkMode ? Colors.gray : Colors.black;
  const separaterColor = isDarkMode ? '#424242' : '#E0E0E0';
  const [paused, setPaused] = useState(true);
  const [rating, setRating] = useState(5);
  const [showDelete, setShowDelete] = useState(false);
  const [apiResult, setApiResult] = useState<ApiResponse | null>(null);
  const [access, setAccess] = useState(apiResult?.private ?? false);
  const handleToggle = () => {
    setAccess(!access);
  };
  const [loader, setLoader] = useState(false);
  const getReviewDetails = async () => {
    try {
      setLoader(true);
      if (!_id) {
        return;
      }
      const result = await getReviewById(_id);
      if (result.status === 200 || result.status === 201) {
        setApiResult(result.data);
      }
    } catch (error) {
      utils.showToast('error', 'Failed to fetch apiResult details');
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

  const deleteReviewBackend = async () => {
    try {
      const result = await deleteReview(_id);
      if (result.status === 200 || result.status === 201) {
        utils.showToast('success', 'Review deleted successfully');
        props.navigation.navigate('AthleteBottomTab', {
          screen: 'SelectSessionScreen',
        });
      }
    } catch (error) {
      utils.showToast('error', 'Failed to delete apiResult');
    }
  };

  useBackHandler(() => {
    props.navigation.navigate('AthleteBottomTab');
    return true; // block default back
  });

  return (
    <ScrollView style={[styles.container, {backgroundColor}]}>
      <BackHeader
        title={t('Detail')}
        showBackIcon
        onBackPress={() => {
          props.navigation.navigate('AthleteBottomTab');
        }}
      />
      {apiResult ? (
        <>
          <View style={styles.rowItem}>
            <Text style={[styles.label, {color: textColor}]}>
              {apiResult?.sessionType}:
            </Text>
            <Text style={[styles.value, {color: textColor2}]}>
              {apiResult?.sport?.name}
            </Text>
          </View>
          <View style={[styles.separater, {backgroundColor: separaterColor}]} />
          <View style={styles.rowItem}>
            <Text style={[styles.label, {color: textColor}]}>
              {t('Category')}:
            </Text>
            <Text style={[styles.value, {color: textColor2}]}>
              {apiResult?.category?.categoryId?.name}
            </Text>
          </View>

          {apiResult?.clubOrTeam && (
            <>
              <View
                style={[styles.separater, {backgroundColor: separaterColor}]}
              />
              <View style={styles.rowItem}>
                <Text style={[styles.label, {color: textColor}]}>
                  {t('Your Gym')}:
                </Text>
                <Text style={[styles.value, {color: textColor2}]}>
                  {apiResult?.clubOrTeam ?? ''}
                </Text>
              </View>
            </>
          )}

          {apiResult?.coachFeedback && (
            <>
              <View
                style={[styles.separater, {backgroundColor: separaterColor}]}
              />
              <View style={styles.rowItem}>
                <Text style={[styles.label, {color: textColor}]}>
                  {t('Coach')}:
                </Text>
                <Text style={[styles.value, {color: textColor2}]}>
                  {apiResult?.coachFeedback?.coach?.name}
                </Text>
              </View>
            </>
          )}
          {apiResult?.peerFeedback?.friend && (
            <>
              <View
                style={[
                  styles.separater,
                  {backgroundColor: separaterColor, marginBottom: 10},
                ]}
              />
              <View style={[styles.rowItem, {marginTop: 0}]}>
                <Text style={[styles.label, {color: textColor, marginTop: 14}]}>
                  {t('Friends')}:
                </Text>
                <View style={[styles.userView, {marginTop: 12}]}>
                  <Text style={[styles.userName, {color: textColor}]}>
                    {apiResult?.peerFeedback?.friend?.name}
                  </Text>
                </View>
              </View>
            </>
          )}
          <View style={[styles.separater, {backgroundColor: separaterColor}]} />
          <Text style={[styles.sectionTitle, {color: textColor}]}>
            {t('Skills')}:
          </Text>
          <View style={styles.skillsContainer}>
            {apiResult?.skill.map(item => (
              <View style={styles.skillBadge} key={item?._id}>
                <Text style={{color: '#797979'}}>{item?.skillId?.name}</Text>
              </View>
            ))}
          </View>
          <View style={[styles.separater, {backgroundColor: separaterColor}]} />
          <Text style={[styles.sectionTitle, {color: textColor}]}>
            {t('Rate Your Session')}
          </Text>

          <CustomSliderWithThumb
            rating={apiResult?.rating}
            setRating={setRating}
          />

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

          {apiResult?.peerFeedback?.friend && (
            <>
              <View
                style={[styles.separater, {backgroundColor: separaterColor}]}
              />
              <Text style={[styles.sectionTitle, {color: textColor}]}>
                {t('Peer Feedback')}
              </Text>
              <Text style={[styles.description, {color: Colors.red}]}>
                Peer apiResult in progress. It’ll appear here once submitted to
                guide your next step
              </Text>
            </>
          )}
          {apiResult?.coachFeedback?.coach && (
            <>
              <View
                style={[styles.separater, {backgroundColor: separaterColor}]}
              />

              <Text style={[styles.sectionTitle, {color: textColor}]}>
                {t('Coach Feedback')}
              </Text>
              <Text style={[styles.description, {color: Colors.red}]}>
                Coach apiResult in progress. It’ll appear here once submitted to
                guide your next step
              </Text>
            </>
          )}

          <View style={[styles.separater, {backgroundColor: separaterColor}]} />

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
          <CustomButton
            onPress={() => {
              props.navigation.navigate('EditReviewScreen', {
                existingReview: apiResult,
              });
            }}>
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
          No data available
        </Text>
      )}
    </ScrollView>
  );
};

export default SkillReviewDetail;

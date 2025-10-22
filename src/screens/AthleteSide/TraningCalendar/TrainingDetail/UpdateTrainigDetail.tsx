import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import moment from 'moment';
import {Colors} from '../../../../utils/Colors';
import BackHeader from '../../../../components/BackHeader';
import CustomButton from '../../../../components/CustomButton';
import styles from './styles';
import {hp} from '../../../../utils/responsivesness';
import {IMAGES} from '../../../../assets/images';
import {getTrainingCalendarById} from '../../../../services/calls';

interface DetailProps {
  navigation?: any;
  route?: any;
}

interface TrainingDetailData {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  attendees: any[];
  coaches: any[];
  trainingName: string;
  sport: {
    _id: string;
    name: string;
  };
  category: {
    _id: string;
    name: string;
  };
  skill: {
    _id: string;
    name: string;
  };
  trainingScope: string;
  date: string;
  startTime: string;
  finishTime: string;
  recurrence: any;
  recurrenceStatus: string;
  note: string;
  createdAt: string;
  updatedAt: string;
}

const profileImages = [IMAGES.community1, IMAGES.community2, IMAGES.community3];

const coachProfile = IMAGES.profileImage;

const UpdateTrainingDetail: React.FC<DetailProps> = ({navigation, route}) => {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const [checkIn, setCheckIn] = useState(false);
  const [trainingData, setTrainingData] = useState<TrainingDetailData | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  const backgroundColor = isDarkMode
    ? Colors.darkBackground
    : Colors.lightBackground;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const textColor2 = isDarkMode ? Colors.gray : Colors.black;
  const borderColor = isDarkMode ? Colors.gray : '#C9C9C9';
  const separaterColor = isDarkMode ? '#424242' : '#E0E0E0';

  // Fetch training detail data
  useEffect(() => {
    const fetchTrainingDetail = async () => {
      const trainingId = route?.params?.trainingId;
      if (!trainingId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await getTrainingCalendarById(trainingId);

        if (response?.status === 200 && response?.data) {
          setTrainingData(response.data);
        } else {
          setTrainingData(null);
        }
      } catch (error) {
        setTrainingData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainingDetail();
  }, [route?.params?.trainingId]);

  const formatDate = (dateString: string) => {
    return moment(dateString).format('DD MMMM YYYY');
  };

  const formatTime = (timeString: string) => {
    return timeString;
  };

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          {backgroundColor, justifyContent: 'center', alignItems: 'center'},
        ]}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </View>
    );
  }

  if (!trainingData) {
    return (
      <View style={[styles.container, {backgroundColor}]}>
        <BackHeader title={t('Detail')} showBackIcon />
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={[styles.label, {color: textColor}]}>
            {t('Training not found')}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <ScrollView
        style={[styles.container, {backgroundColor}]}
        showsVerticalScrollIndicator={false}>
        <BackHeader title={t('Detail')} showBackIcon />

        <View style={styles.rowItem}>
          <Text style={[styles.label, {color: textColor}]}>
            {t('Training Name')}:
          </Text>
          <Text style={[styles.value, {color: textColor2}]}>
            {trainingData.trainingName}
          </Text>
        </View>

        <View style={[styles.separater, {backgroundColor: separaterColor}]} />

        <View style={styles.rowItem}>
          <Text style={[styles.label, {color: textColor}]}>
            {t('Sport Type')}:
          </Text>
          <Text style={[styles.value, {color: textColor2}]}>
            {trainingData.sport?.name}
          </Text>
        </View>

        <View style={[styles.separater, {backgroundColor: separaterColor}]} />

        <View style={styles.rowItem}>
          <Text style={[styles.label, {color: textColor}]}>
            {t('Category')}:
          </Text>
          <Text style={[styles.value, {color: textColor2}]}>
            {trainingData.category?.name}
          </Text>
        </View>

        <View style={[styles.separater, {backgroundColor: separaterColor}]} />

        <Text style={[styles.sectionTitle, {color: textColor}]}>
          {t('Skills')}
        </Text>
        <View style={styles.skillsContainer}>
          {trainingData.skill?.name && (
            <View style={styles.skillBadge}>
              <Text style={{color: Colors.black}}>
                {trainingData.skill.name}
              </Text>
            </View>
          )}
        </View>

        <View style={[styles.separater, {backgroundColor: separaterColor}]} />

        <View style={[styles.rowItem, {justifyContent: 'space-between'}]}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Text style={[styles.label, {color: textColor}]}>{t('Date')}:</Text>
            <Text style={[styles.value, {color: Colors.red}]}>
              {formatDate(trainingData.date)}
            </Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row', marginLeft: hp(16)}}>
            <Text style={[styles.label, {color: textColor}]}>{t('Time')}:</Text>
            <Text style={[styles.value, {color: Colors.red, maxWidth: '45%'}]}>
              {formatTime(trainingData.startTime)} -{' '}
              {formatTime(trainingData.finishTime)}
            </Text>
          </View>
        </View>
        <View style={[styles.separater, {backgroundColor: separaterColor}]} />

        <View
          style={[
            styles.rowItem,
            {justifyContent: 'space-between', marginTop: hp(1)},
          ]}>
          <Text style={[styles.label, {color: textColor}]}>
            {t('Attendees')}:
          </Text>
          <View style={styles.avatarGroup}>
            {trainingData.attendees && trainingData.attendees.length > 0 ? (
              trainingData.attendees.map((attendee, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.avatarWrapper,
                    {zIndex: trainingData.attendees.length - index},
                  ]}
                  onPress={() => navigation.navigate('TrainingAttendees')}>
                  <Image
                    source={profileImages[index % profileImages.length]}
                    style={styles.avatarImage}
                  />
                </TouchableOpacity>
              ))
            ) : (
              <Text style={[styles.value, {color: textColor2}]}>
                {t('No attendees')}
              </Text>
            )}
          </View>
        </View>

        <View
          style={[
            styles.separater,
            {backgroundColor: separaterColor, marginTop: hp(1.5)},
          ]}
        />

        <View
          style={[
            styles.rowItem,
            {alignItems: 'center', justifyContent: 'space-between'},
          ]}>
          <Text style={[styles.label, {color: textColor}]}>{t('Coach')}:</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {trainingData.coaches && trainingData.coaches.length > 0 ? (
              <>
                <Image source={coachProfile} style={styles.profile} />
                <View>
                  <Text
                    style={[styles.label, {color: textColor, fontSize: 15}]}>
                    {trainingData.coaches[0]?.name || 'Coach Name'}
                  </Text>
                  <Text
                    style={[styles.value, {color: textColor2, fontSize: 12}]}>
                    {trainingData.sport?.name}
                  </Text>
                </View>
              </>
            ) : (
              <Text style={[styles.value, {color: textColor2}]}>
                {t('No coach assigned')}
              </Text>
            )}
          </View>
        </View>

        <View style={[styles.separater, {backgroundColor: separaterColor}]} />

        <Text style={[styles.sectionTitle, {color: textColor}]}>
          {t('General Comments:')}
        </Text>
        <Text
          style={[
            styles.description,
            {color: textColor2, marginBottom: hp(6)},
          ]}>
          {trainingData.note || t('No comments available')}
        </Text>
      </ScrollView>

      <CustomButton
        onPress={() => setCheckIn(!checkIn)}
        containerStyle={{
          marginBottom: hp(4),
          backgroundColor: checkIn ? Colors.green : Colors.primaryColor,
        }}>
        {checkIn ? t('Request Sent') : t('Check In')}
      </CustomButton>
    </View>
  );
};

export default UpdateTrainingDetail;

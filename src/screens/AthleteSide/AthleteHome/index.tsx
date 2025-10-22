import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import moment from 'moment';
import styles from './styles';
import {Colors} from '../../../utils/Colors';
import {IMAGES} from '../../../assets/images';
import AnySvg from '../../../components/AnySvg';
import SkillPraticeGraph from '../../../components/MatchReviewGraph/SkillPractice';
import TrainingCalendar from '../../../components/TrainingCalendar';
import SkillTrainingGraph from '../../../components/SkillTraining';
import AttendenceGraph from '../../../components/AttendenceGraph';
import {
  getSportsWithSkillLevels,
  getSportCategories,
} from '../../../services/calls';
import {store} from '../../../store';

interface HomeProps {
  navigation?: any;
}

const AthleteHome: React.FC<HomeProps> = ({navigation}) => {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state?.theme?.switchDarkTheme);
  const backgroundColor = isDarkMode
    ? Colors.darkBackground
    : Colors.lightBackground;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const textColor2 = isDarkMode ? '#9E9E9E' : Colors.black;
  const borderColor = isDarkMode ? Colors.gray : '#C9C9C9';
  const userInfo = useSelector((state: any) => state.user.user);

  const [selectedDate, setSelectedDate] = useState(moment());

  const handleSelectDate = (date: moment.Moment) => {
    setSelectedDate(date);

    navigation.navigate('UpdateTrainingDetail');
  };

  const handleDateChange = (dateString: string) => {
    const date = moment(dateString, 'DD-MM-YYYY');
    setSelectedDate(date);
  };

  const [sportsTypes, setSportsTypes] = useState<any[]>([]);
  const [selectedSport, setSelectedSport] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [loadingSports, setLoadingSports] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [sportsError, setSportsError] = useState<string | null>(null);
  const [sportModalVisible, setSportModalVisible] = useState(false);

  React.useEffect(() => {
    const fetchSportsTypes = async () => {
      setLoadingSports(true);
      setSportsError(null);
      try {
        const res = await getSportsWithSkillLevels();
        if (res?.status === 200) {
          const user = store.getState().user?.user;

          const sports =
            user?.user?.athlete_details?.sports ||
            user?.user?.athlete_details?.sportsAndSkillLevels;

          const selectedNames = sports.map(item =>
            item.sport.name.toLowerCase(),
          );

          // filter out matching names from rsss
          const filtered = res?.data?.data?.filter(item =>
            selectedNames.includes(item.name.toLowerCase()),
          );
          console.log('Filed', filtered);
          if (filtered?.length > 0) {
            setSelectedSport(filtered[0]);
          }
          setSportsTypes(filtered);
        } else {
          setSportsError('Failed to load sports');
        }
      } catch (e) {
        setSportsError('Failed to load sports');
      } finally {
        setLoadingSports(false);
      }
    };
    fetchSportsTypes();
  }, []);

  // Fetch categories when sport changes
  React.useEffect(() => {
    const fetchCategories = async () => {
      if (!selectedSport?._id) return;

      setLoadingCategories(true);
      try {
        const res = await getSportCategories(
          selectedSport.sportsType || selectedSport._id,
          selectedSport._id,
        );
        if (res?.status === 200) {
          setCategories(res.data);
          if (res.data?.length > 0) {
            setSelectedCategory(res.data[0]);
          } else {
            setSelectedCategory(null);
          }
        }
      } catch (e) {
        console.error('Error fetching categories:', e);
        setCategories([]);
        setSelectedCategory(null);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, [selectedSport]);

  const handleSelectSport = (sport: any) => {
    setSelectedSport(sport);
    setSportModalVisible(false);
  };

  return (
    <View style={[{flex: 1, backgroundColor}]}>
      <View style={[styles.headerContainer]}>
        <Image
          source={IMAGES.splashImg}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.headerTextContainer}>
          <Text style={[styles.welcomeText, {color: textColor}]}>
            {t(`Welcome ${userInfo?.user?.name}`)}
          </Text>
          <Text style={[styles.subtitleText, {color: textColor2}]}>
            {t('Track it, Own it, Elevate it')}
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.notificationButton, {backgroundColor: borderColor}]}
          onPress={() => navigation.navigate('Notification')}>
          <AnySvg
            name={isDarkMode ? 'notificationIcon' : 'lightNotification'}
            width={24}
            height={24}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={{paddingBottom: 10}}
        showsVerticalScrollIndicator={false}>
        <SkillPraticeGraph
          showReviewDropdown={true}
          monthOptions={['January', 'February', 'March', 'April']}
          yearOptions={[2022, 2023, 2024, 2025]}
          sportsList={sportsTypes}
          selectedSport={selectedSport}
          onSelectSport={handleSelectSport}
          onDateChange={handleDateChange}
        />
        <TrainingCalendar
          title="Training Calendar"
          selectedDate={selectedDate}
          onSelectDate={handleSelectDate}
          sportId={selectedSport?._id}
          categoryId={selectedCategory?._id}
          navigation={navigation}
        />
        <SkillTrainingGraph
          selectedDate={selectedDate}
          selectedSport={selectedSport}
        />
        <AttendenceGraph style={{}} />
      </ScrollView>
    </View>
  );
};

export default AthleteHome;

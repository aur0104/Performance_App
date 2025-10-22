import React, {useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import VideoPlayer from 'react-native-video';
import styles from '../../../AddReview/SkillReviewDetail/styles';
import {Colors} from '../../../../utils/Colors';
import CustomSliderWithThumb from '../../../../components/CustomSlider';
import AnySvg from '../../../../components/AnySvg';
import CustomButton from '../../../../components/CustomButton';
import BackHeader from '../../../../components/BackHeader';
import {hp} from '../../../../utils/responsivesness';

interface DetailProps {
  navigation?: any;
}

const ReceivedRequestDetail: React.FC<DetailProps> = ({navigation}) => {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);

  const backgroundColor = isDarkMode
    ? Colors.darkBackground
    : Colors.lightBackground;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const textColor2 = isDarkMode ? Colors.gray : Colors.black;
  const separaterColor = isDarkMode ? '#424242' : '#E0E0E0';
  const [paused, setPaused] = useState(true);
  const [rating, setRating] = useState(5);

  const skills = [
    'Lap Time 10 seconds)',
    'Stroke Efficiency ',
    'Endurance Level 5',
    'Turn Speed 20 sec',
    'Breath Control 1 min',
  ];

  return (
    <ScrollView style={[styles.container, {backgroundColor}]}>
      <BackHeader title={t('Requests')} showBackIcon />

      <View style={styles.rowItem}>
        <Text style={[styles.label, {color: textColor}]}>
          {t('Sport Type')}:
        </Text>
        <Text style={[styles.value, {color: textColor}]}>Rugby</Text>
      </View>
      <View style={[styles.separater, {backgroundColor: separaterColor}]} />
      <View style={styles.rowItem}>
        <Text style={[styles.label, {color: textColor}]}>
          {t('Member Name:')}:
        </Text>
        <Text style={[styles.value, {color: textColor}]}>Adam Scout</Text>
      </View>

      <View style={[styles.separater, {backgroundColor: separaterColor}]} />
      <Text style={[styles.sectionTitle, {color: textColor}]}>
        {t('Skills')}:
      </Text>
      <View style={styles.skillsContainer}>
        {skills.map((skill, index) => (
          <View key={index} style={styles.skillBadge}>
            <Text style={{color: '#797979'}}>{skill}</Text>
          </View>
        ))}
      </View>
      <View style={[styles.separater, {backgroundColor: separaterColor}]} />
      <Text style={[styles.sectionTitle, {color: textColor}]}>
        {t('Please Rate Review')}
      </Text>

      <CustomSliderWithThumb rating={rating} setRating={setRating} />

      <View style={[styles.separater, {backgroundColor: separaterColor}]} />

      <Text style={[styles.sectionTitle, {color: textColor}]}>
        {t('Notes (Optional)')}
      </Text>
      <Text style={[styles.description, {color: textColor2, marginBottom: 16}]}>
        I've completed today's challenge in 30 seconds, and I'm feeling super
        accomplished! I pushed myself hard and learned a lot from today's
        session. Excited to keep improving and ready for the next challenge!"
      </Text>

      <View style={[styles.videoWrapper, {marginTop: hp(1)}]}>
        <VideoPlayer
          source={require('../../../../assets/images/SafetyVideo.mp4')}
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

      <CustomButton
        onPress={() => navigation.goBack()}
        containerStyle={{marginBottom: '10%'}}>
        {t('Submit')}
      </CustomButton>
    </ScrollView>
  );
};

export default ReceivedRequestDetail;

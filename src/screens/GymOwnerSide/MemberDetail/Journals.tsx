import React, {useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {Colors} from '../../../utils/Colors';
import AnySvg from '../../../components/AnySvg';
import styles from '../../AthleteSide/Journals/styles';
import VideoPlayer from 'react-native-video';
import CustomSliderWithThumb from '../../../components/CustomSlider';
import {hp} from '../../../utils/responsivesness';

interface JournalsProps {
  navigation?: any;
}

const GymJournals: React.FC<JournalsProps> = ({navigation}) => {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);

  const backgroundColor = isDarkMode ? Colors.darkBackground : Colors.white;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const textColor2 = isDarkMode ? Colors.gray : Colors.black;
  const separaterColor = isDarkMode ? '#424242' : '#E0E0E0';
  const [paused, setPaused] = useState(true);
  const [rating, setRating] = useState(5);

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <ScrollView
        contentContainerStyle={{paddingBottom: 20}}
        showsVerticalScrollIndicator={false}>
        <View
          style={[styles.sectionTitle, {backgroundColor: Colors.primaryColor}]}>
          <Text style={styles.text}>{t('Personal Feedback')}</Text>
        </View>
        <Text style={[styles.description, {color: textColor2}]}>
          I’ve completed the timed 5K run and beat my previous record! Need to
          work on pacing the first mile better next time.
        </Text>

        <CustomSliderWithThumb rating={rating} editable={false} />

        <View style={[styles.separater, {backgroundColor: separaterColor}]} />
        <View style={[styles.sectionTitle, {backgroundColor: Colors.green}]}>
          <Text style={styles.text}>{t('Peer Feedback')}</Text>
        </View>
        <Text style={[styles.description, {color: textColor2}]}>
          Adam has done a fantastic job improving his snatch technique—his hip
          contact is much sharper now. Let’s focus on faster turnover under the
          bar next.
        </Text>
        <CustomSliderWithThumb rating={rating} editable={false} />

        <View style={[styles.separater, {backgroundColor: separaterColor}]} />

        <View style={[styles.sectionTitle, {backgroundColor: Colors.yellow}]}>
          <Text style={[styles.text, {color: Colors.black}]}>
            {t('Coach Feedback')}
          </Text>
        </View>
        <Text style={[styles.description, {color: textColor2}]}>
          You’ve used all your available coach reviews for this period. Keep
          training hard—your next review window will open soon!
        </Text>
        <CustomSliderWithThumb rating={rating} editable={false} />

        <View
          style={[
            styles.separater,
            {backgroundColor: separaterColor, marginTop: hp(6)},
          ]}
        />

        <Text style={[styles.title, {color: textColor, marginBottom: 15}]}>
          {t('Video')}
        </Text>

        <View style={styles.videoWrapper}>
          <VideoPlayer
            source={require('../../../assets/images/SafetyVideo.mp4')}
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
      </ScrollView>
    </View>
  );
};

export default GymJournals;

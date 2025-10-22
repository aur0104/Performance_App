import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView, Text, View, Image, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {Colors} from '../../../utils/Colors';
import styles from './styles';
import AnySvg from '../../../components/AnySvg';
import {IMAGES} from '../../../assets/images';
import SkillTrainingGraph from '../../../components/SkillTraining';
import AllAttendenceGraph from '../../../components/OverallAttendence';
import CommunityCardList from '../../../components/GymCards';
import GymStatsGraph from '../../../components/GymStats';

interface HomeProps {
  navigation?: any;
}

const OwnerHome: React.FC<HomeProps> = ({navigation}) => {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const backgroundColor = isDarkMode ? Colors.darkBackground : Colors.white;
  const borderColor = isDarkMode ? Colors.darkInputBg : Colors.lightInputBg;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const textColor2 = isDarkMode ? '#797979' : '#424242';
  const userInfo = useSelector((state: any) => state.user.user);
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
        <Text style={[styles.text, {color: textColor}]}>
          {t('Overall Attendance')}
        </Text>
        <AllAttendenceGraph />
        <SkillTrainingGraph />
        <CommunityCardList />
        <GymStatsGraph />
      </ScrollView>
    </View>
  );
};

export default OwnerHome;

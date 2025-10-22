import React, {useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {IMAGES} from '../../../assets/images';
import {Colors} from '../../../utils/Colors';
import BackHeader from '../../../components/BackHeader';
import CustomButton from '../../../components/CustomButton';
import styles from '../../AthleteSide/TraningCalendar/TrainingDetail/styles';
import {hp} from '../../../utils/responsivesness';

interface DetailProps {
  navigation?: any;
}

const profileImages = [IMAGES.community1, IMAGES.community2, IMAGES.community3];

const coachProfile = IMAGES.profileImage;

const SchedulePlanDetail: React.FC<DetailProps> = ({navigation}) => {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);

  const backgroundColor = isDarkMode
    ? Colors.darkBackground
    : Colors.lightBackground;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const textColor2 = isDarkMode ? Colors.gray : Colors.black;
  const separaterColor = isDarkMode ? '#424242' : '#E0E0E0';

  const skills = ['One-handed Pick-up', 'Two-handed Pick-up'];

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
          <Text style={[styles.value, {color: textColor}]}>
            Aussie Rules Football training
          </Text>
        </View>

        <View style={[styles.separater, {backgroundColor: separaterColor}]} />

        <View style={styles.rowItem}>
          <Text style={[styles.label, {color: textColor}]}>
            {t('Sport Type')}:
          </Text>
          <Text style={[styles.value, {color: textColor}]}>
            Aussie Rules Football
          </Text>
        </View>

        <View style={[styles.separater, {backgroundColor: separaterColor}]} />

        <View style={styles.rowItem}>
          <Text style={[styles.label, {color: textColor}]}>
            {t('Category')}:
          </Text>
          <Text style={[styles.value, {color: textColor}]}>
            Ball Handling & Control
          </Text>
        </View>

        <View style={[styles.separater, {backgroundColor: separaterColor}]} />

        <Text style={[styles.sectionTitle, {color: textColor}]}>
          {t('Skills')}
        </Text>
        <View style={styles.skillsContainer}>
          {skills.map((skill, index) => (
            <View key={index} style={styles.skillBadge}>
              <Text style={{color: Colors.black}}>{skill}</Text>
            </View>
          ))}
        </View>

        <View style={[styles.separater, {backgroundColor: separaterColor}]} />

        <View style={[styles.rowItem, {justifyContent: 'space-between'}]}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Text style={[styles.label, {color: textColor}]}>{t('Date')}:</Text>
            <Text style={[styles.value, {color: Colors.red}]}>
              19 March 2025
            </Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row', marginLeft: hp(16)}}>
            <Text style={[styles.label, {color: textColor}]}>{t('Time')}:</Text>
            <Text style={[styles.value, {color: Colors.red}]}>10 PM</Text>
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
            {profileImages.map((imgSrc, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.avatarWrapper,
                  {zIndex: profileImages.length - index},
                ]}
                onPress={() => navigation.navigate('Attendees')}>
                <Image source={imgSrc} style={styles.avatarImage} />
              </TouchableOpacity>
            ))}
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
            <Image source={coachProfile} style={styles.profile} />
            <View>
              <Text style={[styles.label, {color: textColor, fontSize: 15}]}>
                Jame John
              </Text>
              <Text style={[styles.value, {color: textColor2, fontSize: 12}]}>
                Basket Ball
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.separater, {backgroundColor: separaterColor}]} />

        <Text style={[styles.sectionTitle, {color: textColor}]}>
          {t('General Comments:')}
        </Text>
        <Text
          style={[styles.description, {color: textColor, marginBottom: hp(6)}]}>
          Please accept the request I wanted to be in today’s session where we
          will learn a lot of things. So please reach out to gym on time.
        </Text>
      </ScrollView>

      <CustomButton
        onPress={() => navigation.navigate('AddSchedule')}
        containerStyle={{
          marginBottom: hp(4),
        }}>
        {t('Edit Detail')}
      </CustomButton>
    </View>
  );
};

export default SchedulePlanDetail;

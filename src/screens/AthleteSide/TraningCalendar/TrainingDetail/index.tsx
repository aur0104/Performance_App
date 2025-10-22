import React, {useRef, useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {Colors} from '../../../../utils/Colors';
import BackHeader from '../../../../components/BackHeader';
import CustomButton from '../../../../components/CustomButton';
import styles from './styles';
import {hp} from '../../../../utils/responsivesness';

interface DetailProps {
  navigation?: any;
}

const TrainingDetail: React.FC<DetailProps> = ({navigation}) => {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);

  const backgroundColor = isDarkMode
    ? Colors.darkBackground
    : Colors.lightBackground;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const textColor2 = isDarkMode ? Colors.gray : Colors.black;
  const borderColor = isDarkMode ? Colors.gray : '#C9C9C9';
  const separaterColor = isDarkMode ? '#424242' : '#E0E0E0';

  const skills = ['One-handed Pick-up', 'Two-handed Pick-up'];

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <ScrollView style={[styles.container, {backgroundColor}]}>
        <BackHeader title={t('Detail')} showBackIcon />

        <View style={styles.rowItem}>
          <Text style={[styles.label, {color: textColor}]}>
            {t('Training Name')}:
          </Text>
          <Text style={[styles.value, {color: textColor2}]}>
            Aussie Rules Football training
          </Text>
        </View>
        <View style={[styles.separater, {backgroundColor: separaterColor}]} />
        <View style={styles.rowItem}>
          <Text style={[styles.label, {color: textColor}]}>
            {t('Sport Type')}:
          </Text>
          <Text style={[styles.value, {color: textColor2}]}>
            Aussie Rules Football
          </Text>
        </View>
        <View style={[styles.separater, {backgroundColor: separaterColor}]} />

        <View style={styles.rowItem}>
          <Text style={[styles.label, {color: textColor}]}>
            {t('Category')}:
          </Text>
          <Text style={[styles.value, {color: textColor2}]}>
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
        <Text style={[styles.sectionTitle, {color: textColor}]}>
          {t('General Comments:')}
        </Text>
        <Text style={[styles.description, {color: textColor2}]}>
          Please accept the request i wanted to be a today’s sessions where we
          will learn a lot of things . So please reach out to gym on time.
        </Text>
      </ScrollView>

      <CustomButton
        onPress={() => {
          navigation.navigate('EditTraining');
        }}
        containerStyle={{marginBottom: hp(6)}}>
        {t('Edit Detail')}
      </CustomButton>
    </View>
  );
};

export default TrainingDetail;

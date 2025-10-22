import React, {useRef, useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import styles from './styles';
import {Colors} from '../../utils/Colors';
import BackHeader from '../BackHeader';
import {hp} from '../../utils/responsivesness';

interface DetailProps {
  navigation?: any;
}

const PiePiecesDetail: React.FC<DetailProps> = ({navigation, route}) => {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const {data} = route.params;

  const backgroundColor = isDarkMode
    ? Colors.darkBackground
    : Colors.lightBackground;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const textColor2 = isDarkMode ? Colors.gray : Colors.black;
  const separaterColor = isDarkMode ? '#424242' : '#E0E0E0';

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <ScrollView style={[styles.container, {backgroundColor}]}>
        <BackHeader title={t(data?.name ?? 'Detail')} showBackIcon />

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
          {t('Skills')}:
        </Text>
        <View style={styles.skillsContainer}>
          <View style={styles.skillBadge}>
            <Text style={{color: Colors.black}}>{data?.name ?? 'N/A'}</Text>
          </View>
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
    </View>
  );
};

export default PiePiecesDetail;

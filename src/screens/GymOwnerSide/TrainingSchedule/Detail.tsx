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

const ScheduleDetail: React.FC<DetailProps> = ({navigation}) => {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);

  const backgroundColor = isDarkMode
    ? Colors.darkBackground
    : Colors.lightBackground;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const textColor2 = isDarkMode ? Colors.gray : Colors.black;
  const separaterColor = isDarkMode ? '#424242' : '#E0E0E0';

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
          <Text style={[styles.label, {color: textColor}]}>{t('Date')}:</Text>
          <Text style={[styles.value, {color: Colors.red}]}>19 March 2025</Text>
        </View>

        <View style={[styles.separater, {backgroundColor: separaterColor}]} />

        <View style={[styles.rowItem, {justifyContent: 'space-between'}]}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Text style={[styles.label, {color: textColor}]}>
              {t('Start Time')}:
            </Text>
            <Text style={[styles.value, {color: Colors.red}]}>9 PM</Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row', marginLeft: hp(10)}}>
            <Text style={[styles.label, {color: textColor}]}>
              {t('End Time')}:
            </Text>
            <Text style={[styles.value, {color: Colors.red}]}>10 PM</Text>
          </View>
        </View>
        <View style={[styles.separater, {backgroundColor: separaterColor}]} />

        <View style={[styles.rowItem]}>
          <Text style={[styles.label, {color: textColor}]}>
            {t('Class Limit')}:
          </Text>
          <Text style={[styles.value, {color: Colors.red}]}>50</Text>
        </View>

        <View
          style={[
            styles.separater,
            {backgroundColor: separaterColor, marginTop: hp(1.5)},
          ]}
        />

        <View style={[styles.rowItem]}>
          <Text style={[styles.label, {color: textColor}]}>
            {t('Recurring Class')}:
          </Text>
          <Text style={[styles.value, {color: textColor}]}>Weekly</Text>
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
          marginBottom: hp(8),
        }}>
        {t('Edit Detail')}
      </CustomButton>
    </View>
  );
};

export default ScheduleDetail;

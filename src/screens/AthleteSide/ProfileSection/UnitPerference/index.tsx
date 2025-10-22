import React, {useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {Colors} from '../../../../utils/Colors';
import BackHeader from '../../../../components/BackHeader';
import styles from './styles';
import CustomButton from '../../../../components/CustomButton';
import {hp} from '../../../../utils/responsivesness';

interface UnitPerferenceProps {
  navigation?: any;
}

const UnitPreference: React.FC<UnitPerferenceProps> = ({navigation}) => {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);

  const backgroundColor = isDarkMode
    ? Colors.darkBackground
    : Colors.lightBackground;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const textColor2 = isDarkMode ? '#9E9E9E' : '#424242';
  const separaterColor = isDarkMode ? '#424242' : '#E0E0E0';

  const metricUnits = {
    weight: '60 kg',
    height: '5.5 cm',
    distance: '10 km',
  };

  return (
    <View style={{flex: 1, backgroundColor: backgroundColor}}>
      <ScrollView style={{flex: 1, backgroundColor: backgroundColor}}>
        <BackHeader title={t('Unit Preference')} showBackIcon />

        <View style={styles.contentContainer}>
          <Text style={[styles.title, {color: textColor}]}>
            {t('Unit Preferences')}
          </Text>
          <Text style={[styles.description, {color: textColor2}]}>
            {t(
              'Your weight, height, and distance units to suit your personal preferences.',
            )}
          </Text>

          <View style={styles.unitRow}>
            <Text style={[styles.label, {color: textColor}]}>
              {t('Weight')}:
            </Text>
            <Text style={[styles.value, {color: textColor2}]}>
              {metricUnits.weight}
            </Text>
          </View>

          <View style={[styles.separator, {backgroundColor: separaterColor}]} />

          <View style={styles.unitRow}>
            <Text style={[styles.label, {color: textColor}]}>
              {t('Height')}:
            </Text>
            <Text style={[styles.value, {color: textColor2}]}>
              {metricUnits.height}
            </Text>
          </View>

          <View style={[styles.separator, {backgroundColor: separaterColor}]} />

          <View style={styles.unitRow}>
            <Text style={[styles.label, {color: textColor}]}>
              {t('Distance Unit')}:
            </Text>
            <Text style={[styles.value, {color: textColor2}]}>
              {metricUnits.distance}
            </Text>
          </View>
        </View>
      </ScrollView>
      <CustomButton
        onPress={() => navigation.navigate('ChangeUnits')}
        containerStyle={{marginBottom: hp(5)}}>
        {t('Change Units')}
      </CustomButton>
    </View>
  );
};

export default UnitPreference;

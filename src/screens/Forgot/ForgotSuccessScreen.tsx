import React from 'react';
import {View, Text, Image} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {IMAGES} from '../../assets/images';
import {Colors} from '../../utils/Colors';
import styles from './style/forgotPasswordStyle';

export default function ForgotSuccessScreen() {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme.switchDarkTheme);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDarkMode
            ? Colors.darkBackground
            : Colors.lightBackground,
        },
      ]}>
      <View style={styles.successBox}>
        <Image source={IMAGES.success} style={styles.successImage} />
        <Text style={styles.successTitle}>{t('Congratulations')}</Text>
        <Text style={styles.successDesc}>{t('RedirectHomeSoon')}</Text>
      </View>
    </View>
  );
}

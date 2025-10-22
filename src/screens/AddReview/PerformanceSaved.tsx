import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import CustomButton from '../../components/CustomButton';
import {Colors} from '../../utils/Colors';
import {IMAGES} from '../../assets/images';
import {hp, wp, rfs} from '../../utils/responsivesness';
import fonts from '../../utils/Fonts';

const PerformanceSaved = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const isDarkMode = useSelector((state: any) => state.theme.switchDarkTheme);
  const role = useSelector((state: any) => state.user.role);

  const handleContinue = () => {
    if (role === 'gymOwner' || role === 'coach') {
      navigation.navigate('OwnerBottomTab', {screen: 'GymPerformance'});
    } else {
      navigation.navigate('AthleteBottomTab', {screen: 'MyPerformance'});
    }
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: isDarkMode ? Colors.darkBackground : Colors.white},
      ]}>
      <Image source={IMAGES.Sucess} style={styles.icon} resizeMode="contain" />

      <Text
        style={[
          styles.title,
          {color: isDarkMode ? Colors.white : Colors.black},
        ]}>
        {t('Performance Saved')}
      </Text>

      <Text
        style={[
          styles.description,
          {color: isDarkMode ? Colors.white : Colors.black},
        ]}>
        Thank you for choosing <Text style={styles.boldText}>Prymo Sports</Text>
        . You{'\n'}have completed and submitted your performance. Please review
        your performance in graph.
      </Text>

      <CustomButton onPress={handleContinue}>{t('Continue')}</CustomButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp(8),
  },
  icon: {
    width: wp(55),
    height: wp(55),
    marginBottom: hp(1),
  },
  title: {
    fontSize: rfs(32),
    fontFamily: fonts.UrbanistBold,
    marginBottom: hp(2),
    textAlign: 'center',
  },
  description: {
    fontSize: rfs(18),
    fontFamily: fonts.UrbanistRegular,
    textAlign: 'center',
    marginBottom: hp(4),
  },
  boldText: {
    fontFamily: fonts.UrbanistBold,
  },
});

export default PerformanceSaved;

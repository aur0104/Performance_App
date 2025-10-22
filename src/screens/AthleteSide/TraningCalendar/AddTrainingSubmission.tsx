import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {Colors} from '../../../utils/Colors';
import {IMAGES} from '../../../assets/images';
import CustomButton from '../../../components/CustomButton';
import {hp, rfs, wp} from '../../../utils/responsivesness';
import fonts from '../../../utils/Fonts';

const AddTrainingSubmission = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const isDarkMode = useSelector((state: any) => state.theme.switchDarkTheme);
  const role = useSelector((state: any) => state.user.role);

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
        {t('Training Detail Added')}
      </Text>

      <Text
        style={[
          styles.description,
          {color: isDarkMode ? Colors.white : Colors.black},
        ]}>
        Thank you for choosing <Text style={styles.boldText}>Prymo Sports</Text>
        .{'\n'} Your Training is successfully added into your calendar. Please
        check and review
      </Text>

      <CustomButton
        onPress={() => {
          const screenName =
            role === 'gymOwner' || role === 'coach'
              ? 'OwnerProfile'
              : 'AthleteProfile';
          navigation.navigate(
            role === 'gymOwner' || role === 'coach'
              ? 'OwnerBottomTab'
              : 'AthleteBottomTab',
            {
              screen: screenName,
            },
          );
        }}>
        {t('Continue')}
      </CustomButton>
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
    width: wp(50),
    height: wp(50),
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
    lineHeight: 24,
  },
  boldText: {
    fontFamily: fonts.UrbanistBold,
  },
});

export default AddTrainingSubmission;

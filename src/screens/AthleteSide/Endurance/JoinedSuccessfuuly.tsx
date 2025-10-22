import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {IMAGES} from '../../../assets/images';
import {Colors} from '../../../utils/Colors';
import CustomButton from '../../../components/CustomButton';
import {hp, rfs, wp} from '../../../utils/responsivesness';
import fonts from '../../../utils/Fonts';

const JoinedSuccessfully = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const isDarkMode = useSelector((state: any) => state.theme.switchDarkTheme);

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
        {t('Successfully Joined')}
      </Text>

      <Text
        style={[
          styles.description,
          {color: isDarkMode ? Colors.white : Colors.black},
        ]}>
        Thank You for choosing “Prymo Sports App” You have successfully Joined
        the Challenge
      </Text>

      <CustomButton
        onPress={() => {
          navigation.navigate('RunningChallenges', {selectedTab: 'Active'});
        }}
        containerStyle={{marginTop: hp(25)}}>
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
    fontSize: rfs(25),
    fontFamily: fonts.UrbanistBold,
    marginBottom: hp(2),
    textAlign: 'center',
  },
  description: {
    fontSize: rfs(15),
    fontFamily: fonts.UrbanistRegular,
    textAlign: 'center',
    marginBottom: hp(4),
  },
  boldText: {
    fontFamily: fonts.UrbanistBold,
  },
});

export default JoinedSuccessfully;

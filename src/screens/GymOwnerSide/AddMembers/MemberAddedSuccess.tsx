import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {Colors} from '../../../utils/Colors';
import {IMAGES} from '../../../assets/images';
import CustomButton from '../../../components/CustomButton';
import {hp, rfs, wp} from '../../../utils/responsivesness';
import fonts from '../../../utils/Fonts';

const MemberAddedSuccess = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const isDarkMode = useSelector((state: any) => state.theme.switchDarkTheme);
  const route = useRoute();
  console.log('route', route?.params);
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
        {t('Successfully Created')}
      </Text>

      <Text
        style={[
          styles.description,
          {color: isDarkMode ? Colors.white : Colors.black},
        ]}>
        Your Member account is successfully created. Please ask the member to
        enter unique code that you have provide
      </Text>
      <Text
        style={[
          styles.title,
          {
            color: isDarkMode ? Colors.white : Colors.black,
            fontFamily: fonts.UrbanistSemiBold,
          },
        ]}>
        Code: {route?.params?.code}
      </Text>

      <CustomButton
        onPress={() => {
          navigation.navigate('OwnerBottomTab', {
            screen: 'Members',
          });
        }}
        containerStyle={{marginTop: '13%'}}>
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

export default MemberAddedSuccess;

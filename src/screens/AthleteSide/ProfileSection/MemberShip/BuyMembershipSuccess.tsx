import React from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {IMAGES} from '../../../../assets/images';
import {Colors} from '../../../../utils/Colors';
import CustomButton from '../../../../components/CustomButton';
import {hp, rfs, wp} from '../../../../utils/responsivesness';
import fonts from '../../../../utils/Fonts';
import BackHeader from '../../../../components/BackHeader';

export interface BuyPlanProps {
  navigation?: any;
}

const BuyMembershipSuccess: React.FC<BuyPlanProps> = ({navigation}) => {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme.switchDarkTheme);
  const role = useSelector((state: any) => state.user.role);

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: isDarkMode ? Colors.darkBackground : Colors.white},
      ]}>
      <BackHeader title={t('Buy Membership')} showBackIcon />
      <ScrollView style={{flex: 1}}>
        <Image
          source={IMAGES.Sucess}
          style={styles.icon}
          resizeMode="contain"
        />
        <Text
          style={[
            styles.title,
            {color: isDarkMode ? Colors.white : Colors.black},
          ]}>
          {t('🎉 Payment Successful! ')}
        </Text>

        <Text
          style={[
            styles.description,
            {color: isDarkMode ? Colors.white : Colors.black},
          ]}>
          Your membership is now active, and you have full access to all the
          features of Prymo Sports app. Get ready to experience the best of our
          services.
        </Text>
      </ScrollView>

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
        }}
        containerStyle={{marginBottom: hp(6)}}>
        {t('Continue')}
      </CustomButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: {
    width: wp(50),
    height: wp(50),
    marginTop: hp(8),
    marginBottom: hp(1),
    alignSelf: 'center',
  },
  title: {
    fontSize: rfs(25),
    fontFamily: fonts.UrbanistBold,
    marginBottom: hp(2),
    textAlign: 'center',
  },
  description: {
    fontSize: rfs(16),
    fontFamily: fonts.UrbanistRegular,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: hp(4),
    paddingHorizontal: hp(4),
  },
  boldText: {
    fontFamily: fonts.UrbanistBold,
  },
});

export default BuyMembershipSuccess;

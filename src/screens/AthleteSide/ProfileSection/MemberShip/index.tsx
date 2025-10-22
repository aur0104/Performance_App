import React from 'react';
import {View, Text, StyleSheet, Image, useWindowDimensions} from 'react-native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {Colors} from '../../../../utils/Colors';
import BackHeader from '../../../../components/BackHeader';
import CustomButton from '../../../../components/CustomButton';
import {hp} from '../../../../utils/responsivesness';
import fonts from '../../../../utils/Fonts';
import {IMAGES} from '../../../../assets/images';

interface MemberShipProps {
  navigation?: any;
}

const Membership: React.FC<MemberShipProps> = ({navigation}) => {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);

  const backgroundColor = isDarkMode ? Colors.darkBackground : Colors.white;
  const textColor = isDarkMode ? Colors.white : Colors.black;

  const {width} = useWindowDimensions();

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <BackHeader title={t('Membership')} showBackIcon />

      <View style={styles.content}>
        <Image
          source={IMAGES.membershipCard}
          style={styles.cardImage}
          resizeMode="contain"
        />

        <Text style={[styles.titleText, {color: textColor}]}>
          {t('You do not have any active Membership')}
        </Text>

        <Text style={[styles.descriptionText, {color: textColor}]}>
          {t(
            'You don’t have any active membership. Please explore our plans and buy a membership as per your need.',
          )}
        </Text>

        <CustomButton
          onPress={() => navigation.navigate('MembershipPlan')}
          containerStyle={styles.button}>
          {' '}
          {t('View Plan')}
        </CustomButton>
      </View>
    </View>
  );
};

export default Membership;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: hp(8),
  },
  cardImage: {
    width: 206,
    height: 206,
    marginBottom: 20,
  },
  titleText: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: fonts.UrbanistBold,
  },
  descriptionText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: fonts.UrbanistMedium,
  },
  button: {
    alignSelf: 'center',
  },
});

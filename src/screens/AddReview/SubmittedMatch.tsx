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
import {useBackHandler} from '../../hooks/useBackHandler';

const SubmittedMatch = (props: any) => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const isDarkMode = useSelector((state: any) => state.theme.switchDarkTheme);
  const _id = props?.route?.params?._id;
  useBackHandler(() => {
    props.navigation.navigate('AthleteBottomTab');
    return true; // block default back
  });
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
        {t('Request Submitted')}
      </Text>

      <Text
        style={[
          styles.description,
          {color: isDarkMode ? Colors.white : Colors.black},
        ]}>
        Thank you for choosing <Text style={styles.boldText}>Prymo Sports</Text>
        .{'\n'}Your request has been submitted to your coach and friends. Once
        they provide feedback, we will notify you.
      </Text>

      <CustomButton
        onPress={() => {
          navigation.navigate('MatchReviewDetail', {
            _id: _id,
          });
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
  },
  boldText: {
    fontFamily: fonts.UrbanistBold,
  },
});

export default SubmittedMatch;

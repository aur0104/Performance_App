import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {Colors} from '../../../../utils/Colors';
import {IMAGES} from '../../../../assets/images';
import CustomButton from '../../../../components/CustomButton';
import fonts from '../../../../utils/Fonts';
import {hp, rfs, wp} from '../../../../utils/responsivesness';

interface ChallengeTrainingProps {
  navigation?: any;
}

const ChallengeSubmitted: React.FC<ChallengeTrainingProps> = ({navigation}) => {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme.switchDarkTheme);

  const backgroundColor = isDarkMode
    ? Colors.darkBackground
    : Colors.lightBackground;

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
        {t('Challenge Submitted')}
      </Text>

      <Text
        style={[
          styles.description,
          {color: isDarkMode ? Colors.white : Colors.black},
        ]}>
        Your have successfully Submitted your “Challenge” Please hand tight
        Coach wil approve it
      </Text>

      <CustomButton
        onPress={() => {
          navigation.pop(3);
        }}>
        {t('Continue')}
      </CustomButton>
      <CustomButton
        onPress={() => {
          navigation.navigate('');
        }}
        isBackground={false}
        containerStyle={{marginTop: 15, backgroundColor: backgroundColor}}
        textColor={Colors.white}>
        {t('Invite')}
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
    fontSize: 18,
    fontFamily: fonts.UrbanistRegular,
    textAlign: 'center',
    marginBottom: hp(4),
  },
  boldText: {
    fontFamily: fonts.UrbanistBold,
  },
});

export default ChallengeSubmitted;

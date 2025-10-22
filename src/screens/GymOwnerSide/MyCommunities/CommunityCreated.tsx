import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {Colors} from '../../../utils/Colors';
import CustomButton from '../../../components/CustomButton';
import {IMAGES} from '../../../assets/images';
import {hp, rfs, wp} from '../../../utils/responsivesness';
import fonts from '../../../utils/Fonts';
import {store} from '../../../store';

const CommunityCreated = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const route = useRoute();
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
        {t('Community Created')}
      </Text>

      <Text
        style={[
          styles.description,
          {color: isDarkMode ? Colors.white : Colors.black},
        ]}>
        You have successfully created your community and now you are able manage
        your athletes
      </Text>

      <CustomButton
        onPress={() => {
          //if user role is gym owner then navigate to gym community else navigate to public community
          const user = store.getState().user?.user;
          if (user?.user?.role == 'gymOwner') {
            navigation.replace('GymCommunity', {
              community: route?.params?.community,
            });
          } else {
            navigation.replace(
              route?.params?.community?.scope == 'public'
                ? 'PublicCommunityDetail'
                : 'GymCommunity',
              {
                community: route?.params?.community,
              },
            );
          }
        }}>
        {t('View Detail')}
      </CustomButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp(5),
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

export default CommunityCreated;

import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {Colors} from '../../utils/Colors';
import CustomButton from '../../components/CustomButton';
import fonts from '../../utils/Fonts';
import {IMAGES} from '../../assets/images';
import {hp, rfs, wp} from '../../utils/responsivesness';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import AnySvg from '../../components/AnySvg';

interface WelcomeProps {
  navigation?: any;
}

const WelcomeScreen: React.FC<WelcomeProps> = ({navigation}) => {
  const isDarkMode = useSelector((state: any) => state?.theme?.switchDarkTheme);
  const {t} = useTranslation();

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[
        styles.mainContainer,
        {
          backgroundColor: isDarkMode
            ? Colors.darkBackground
            : Colors.lightBackground,
        },
      ]}>
      <View style={{width: '100%', maxHeight: hp(60)}}>
        <Image
          source={IMAGES.splashImg}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <Text
        style={[
          styles.titleText,
          {color: isDarkMode ? Colors.white : Colors.black},
        ]}>
        {t('Welcome to')}
      </Text>

      <Text style={[styles.appName, {color: Colors.primaryColor}]}>
        {t('Prymo Sports')}
      </Text>

      <Text
        style={[
          styles.tagline,
          {color: isDarkMode ? Colors.white : Colors.black},
        ]}>
        {t('Track it, Own it, Elevate it')}
      </Text>

      <CustomButton
        onPress={() => navigation.navigate('SelectTheme')}
        rightIcon={'darkRight'}
        containerStyle={{
          alignSelf: 'center',
          marginTop: hp(12),
          width: '90%',
          marginBottom: hp(4),
        }}>
        {t('Start Now ')}
      </CustomButton>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  image: {
    width: wp(102),
    height: 360,
    alignSelf: 'center',
    marginTop: hp(8),
  },
  titleText: {
    fontSize: rfs(40),

    textAlign: 'center',
    fontFamily: fonts.UrbanistExtraBold,
  },
  appName: {
    fontSize: 40,
    textAlign: 'center',
    fontFamily: fonts.UrbanistExtraBold,
  },
  tagline: {
    fontSize: rfs(21),
    fontFamily: fonts.UrbanistBold,
    marginTop: 5,
    textAlign: 'center',
  },
});

export default WelcomeScreen;

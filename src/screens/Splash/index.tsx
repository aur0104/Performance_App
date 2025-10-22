import {Animated} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {styles} from './styles';
import {useSelector} from 'react-redux';
import {IMAGES} from '../../assets/images';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../utils/Colors';
import {store} from '../../store';

interface SplashProps {
  navigation?: any;
}

const Splash: React.FC<SplashProps> = ({navigation}) => {
  const isLight = !useSelector((state: any) => state?.theme?.switchDarkTheme);
  const scaleValue = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    const user = store.getState().user?.user;
    const timeout = setTimeout(() => {
      if (user) {
        if (user?.user?.role == 'gymOwner') {
          navigation.replace('OwnerBottomTab');
        } else {
          navigation.replace('AthleteBottomTab');
        }
      } else {
        navigation.replace('WelcomeScreen');
      }
    }, 3000);

    return () => clearTimeout(timeout);
  }, [navigation, scaleValue]);

  return (
    <LinearGradient
      colors={
        isLight
          ? [Colors.white, '#f0f0f0']
          : ['#1E1E1E', Colors.black, Colors.black]
      }
      style={styles.mainContainer(isLight)}>
      <Animated.Image
        source={IMAGES.splashImg}
        style={[styles.imageStyle, {transform: [{scale: scaleValue}]}]}
      />
    </LinearGradient>
  );
};

export default Splash;

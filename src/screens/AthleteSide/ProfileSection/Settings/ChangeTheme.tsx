import React, {useRef, useEffect} from 'react';
import {View, Text, Animated, Pressable, Easing} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setSwitchDarkTheme} from '../../../../store/Slices/themeSlice';
import AnySvg from '../../../../components/AnySvg';
import {hp} from '../../../../utils/responsivesness';
import {Colors} from '../../../../utils/Colors';
import styles from '../../../SelectTheme/styles';
import BackHeader from '../../../../components/BackHeader';

const ChangeTheme = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: any) => state.theme.switchDarkTheme);
  const {t} = useTranslation();

  const translateX = useRef(new Animated.Value(isDarkMode ? 75 : 0)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: isDarkMode ? 75 : 0,
      duration: 10,
      useNativeDriver: true,
    }).start();
  }, [isDarkMode]);

  const onTogglePress = async () => {
    const newValue = !isDarkMode;

    Animated.timing(translateX, {
      toValue: newValue ? 75 : 0,
      duration: 10,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      dispatch(setSwitchDarkTheme(newValue));
      AsyncStorage.setItem('isDarkTheme', JSON.stringify(newValue));
    });
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDarkMode
            ? Colors.darkBackground
            : Colors.lightBackground,
        },
      ]}>
      <BackHeader title="" showBackIcon />
      <View style={styles.logoWrapper}>
        <AnySvg name={isDarkMode ? 'themeIcon' : 'lightTheme'} size={256} />
      </View>

      <Text
        style={[
          styles.titleText,
          {
            color: isDarkMode ? Colors.white : Colors.black,
            marginTop: hp(42),
          },
        ]}>
        {isDarkMode ? t('Dark Mode') : t('Light Mode')}
      </Text>

      <Pressable onPress={onTogglePress}>
        <View
          style={[
            styles.toggleTrack,
            {
              backgroundColor: isDarkMode ? Colors.primaryColor : Colors.gray,
            },
          ]}>
          <Animated.View
            style={[
              styles.toggleThumb,
              {
                transform: [{translateX}],
              },
            ]}>
            <View
              style={[
                styles.inner,
                {
                  backgroundColor: Colors.white,
                },
              ]}
            />
          </Animated.View>
        </View>
      </Pressable>
    </View>
  );
};

export default ChangeTheme;

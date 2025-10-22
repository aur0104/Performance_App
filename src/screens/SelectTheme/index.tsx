import React, {useRef, useEffect} from 'react';
import {View, Text, Animated, Pressable, Easing} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setSwitchDarkTheme} from '../../store/Slices/themeSlice';
import {Colors} from '../../utils/Colors';
import AnySvg from '../../components/AnySvg';
import {hp} from '../../utils/responsivesness';
import styles from './styles';
import CustomButton from '../../components/CustomButton';

interface ThemeProps {
  navigation?: any;
}

const SelectTheme: React.FC<ThemeProps> = ({navigation}) => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: any) => state.theme.switchDarkTheme);
  const {t} = useTranslation();

  const translateX = useRef(new Animated.Value(isDarkMode ? 75 : 0)).current;

  useEffect(() => {
    translateX.setValue(isDarkMode ? 75 : 0);
  }, [isDarkMode]);

  const onTogglePress = async () => {
    const newValue = !isDarkMode;

    Animated.timing(translateX, {
      toValue: newValue ? 75 : 0,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.inOut(Easing.ease),
    }).start();

    dispatch(setSwitchDarkTheme(newValue));
    await AsyncStorage.setItem('isDarkTheme', JSON.stringify(newValue));
  };

  const onPress = () => {
    navigation.navigate('Language');
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
                  backgroundColor: isDarkMode
                    ? Colors.primaryColor
                    : Colors.gray,
                },
              ]}
            />
          </Animated.View>
        </View>
      </Pressable>
      <CustomButton
        containerStyle={{
          marginTop: hp(10),
          marginBottom: hp(4),
          alignSelf: 'center',
        }}
        onPress={onPress}>
        {t('Continue')}
      </CustomButton>
    </View>
  );
};

export default SelectTheme;

import React from 'react';
import {View, Text, Image, TouchableOpacity, SafeAreaView} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../../utils/Colors';
import {IMAGES} from '../../assets/images';
import styles from './styles';
import {setRole} from '../../store/Slices/userSlice';

const roles = [
  {
    labelKey: 'Gym/Club Owner',
    image: IMAGES.club,
    value: 'gymOwner',
  },
  {
    labelKey: 'Coach',
    image: IMAGES.coach,
    value: 'coach',
  },
];

const SelectRole = () => {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme.switchDarkTheme);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleRoleSelect = (roleValue: any) => {
    dispatch(setRole(roleValue));
    if (roleValue === 'gymOwner') {
      navigation.navigate('GymOwnerSignUp');
    } else if (roleValue === 'coach') {
      navigation.navigate('Login');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={
          isDarkMode ? ['#101010', '#313130'] : [Colors.white, Colors.lightGray]
        }
        style={styles.container}>
        <View style={styles.scroll}>
          <Text
            style={[
              styles.title,
              {color: isDarkMode ? Colors.white : Colors.black},
            ]}>
            {t('Select your role')}{' '}
          </Text>
          <Text
            style={[
              styles.description,
              {color: isDarkMode ? Colors.white : Colors.black},
            ]}>
            {t('How will you be using Prymo Sports?')}{' '}
          </Text>
          {roles.map((role, index) => (
            <View key={index} style={styles.card}>
              <Image source={role.image} style={styles.image} />
              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    paddingHorizontal: 12,
                    width: 160,
                    alignItems: 'center',
                    height: 45,
                    justifyContent: 'center',
                    borderRadius: 47,
                  },
                ]}
                onPress={() => handleRoleSelect(role.value)}>
                <Text style={styles.buttonText}>{t(role.labelKey)}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default SelectRole;

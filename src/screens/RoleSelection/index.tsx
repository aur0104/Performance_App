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
    labelKey: 'JoinAthlete',
    image: IMAGES.athlete,
    value: 'athlete',
  },
  {
    labelKey: 'JoinGymOwner',
    image: IMAGES.gymowner,
    value: 'gymOwner',
  },
];

const RoleSelection = () => {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme.switchDarkTheme);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleRoleSelect = (roleValue: any) => {
    dispatch(setRole(roleValue));
    if (roleValue === 'gymOwner') {
      navigation.navigate('SelectRole');
    } else {
      navigation.navigate('LetsGoScreen');
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
            {t('Choose')}
          </Text>

          <Text
            style={[
              styles.subtitle,
              {color: isDarkMode ? Colors.white : Colors.black},
            ]}>
            {t('YourChoiceMessage')}
          </Text>

          {roles.map((role, index) => (
            <View key={index} style={styles.card}>
              <Image source={role.image} style={styles.image} />
              <TouchableOpacity
                style={styles.button}
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

export default RoleSelection;

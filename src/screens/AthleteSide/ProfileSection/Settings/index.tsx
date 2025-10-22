import React from 'react';
import {View, Text, TouchableOpacity, FlatList, Linking} from 'react-native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import BackHeader from '../../../../components/BackHeader';
import {Colors} from '../../../../utils/Colors';
import styles from './styles';
import {setUser} from '../../../../store/Slices/userSlice';
import {store} from '../../../../store';
import {CommonActions} from '@react-navigation/native';

interface SettingsScreenProps {
  navigation?: any;
}

const settingsOptions = [
  {id: '1', title: 'My Account', route: 'UpdateAccount'},
  {id: '1', title: 'Part of Gym', route: 'VerifySignUp'},
  {id: '2', title: 'Privacy Policy', route: 'PrivacyPolicy'},
  {id: '3', title: 'Terms & Conditions', route: 'TermsConditions'},
  {id: '4', title: 'Language', route: 'ChangeLanguage'},
  {id: '5', title: 'FAQ’s', route: 'FAQs'},
  {id: '6', title: 'Add unit preference', route: 'UnitPreference'},
  {id: '7', title: 'Change Theme', route: 'ChangeTheme'},
];

const AthleteSettings: React.FC<SettingsScreenProps> = ({navigation}) => {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);

  const backgroundColor = isDarkMode
    ? Colors.darkBackground
    : Colors.lightBackground;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const itemBgColor = isDarkMode ? Colors.darkInputBg : Colors.lightInputBg;

  const renderItem = ({item}: any) => (
    <TouchableOpacity
      style={[styles.optionContainer, {backgroundColor: itemBgColor}]}
      onPress={() => {
        if (item?.route == 'Login') {
          store?.dispatch(setUser(null));
          navigation.dispatch(
            CommonActions.reset({
              index: 0, // Set the target screen as the first screen in the stack
              routes: [{name: 'RoleSelection'}], // Replace stack with this screen
            }),
          );
          return;
        } else if (item.title === 'Part of Gym') {
          const user = store?.getState().user?.user;
          console.log('Ede', user?.user?.email);
          navigation.navigate('VerifySignUp', {
            email: user?.user?.email,
          });
          return;
        }
        if (item.title === 'FAQ’s') {
          Linking.openURL('https://prymosports.com/faq');
        } else {
          navigation.navigate(item.route);
        }
      }}>
      <Text style={[styles.optionText, {color: textColor}]}>
        {t(item.title)}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <BackHeader title={t('Settings')} showBackIcon />
      <FlatList
        data={settingsOptions}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default AthleteSettings;

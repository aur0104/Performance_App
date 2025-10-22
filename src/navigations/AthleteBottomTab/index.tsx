import React from 'react';
import {StyleSheet, View, Text, Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {Colors} from '../../utils/Colors';
import AnySvg from '../../components/AnySvg';
import fonts from '../../utils/Fonts';
import AthleteHome from '../../screens/AthleteSide/AthleteHome';
import AthleteCommunity from '../../screens/AthleteSide/AthleteCommunity';
import SelectSessionScreen from '../../screens/AddReview/SelectSessionScreen';
import MyPerformance from '../../screens/AthleteSide/MyPerformance';
import AthleteProfile from '../../screens/AthleteSide/ProfileSection';
import {hp} from '../../utils/responsivesness';

const Tab = createBottomTabNavigator();

const AthleteTabNavigation = () => {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const backgroundColor = isDarkMode ? Colors.darkInputBg : Colors.lightInputBg;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {display: 'none'},
        tabBarHideOnKeyboard: true,

        tabBarStyle: [
          styles.tabBarBase,
          {
            borderColor: backgroundColor,
            backgroundColor: backgroundColor,
            height: Platform.OS === 'ios' ? hp(12) : hp(12),
          },
        ],
      }}>
      <Tab.Screen
        name="AthleteHome"
        component={AthleteHome}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.tabBarIconContainer}>
              <AnySvg
                name={
                  focused
                    ? isDarkMode
                      ? 'activeHome'
                      : 'activeLightHome'
                    : 'home'
                }
                size={25}
                containerStyle={{alignSelf: 'center'}}
              />
              <Text
                style={[
                  styles.title,
                  {color: focused ? Colors.primaryColor : '#5F6368'},
                ]}>
                {t('Home')}
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="MyPerformance"
        component={MyPerformance}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.tabBarIconContainer}>
              <AnySvg
                name={focused ? 'activeGraph' : 'graph'}
                size={24}
                containerStyle={{alignSelf: 'center'}}
              />
              <Text
                style={[
                  styles.title,
                  {color: focused ? Colors.primaryColor : '#5F6368'},
                ]}>
                {t('Performance')}
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="SelectSessionScreen"
        component={SelectSessionScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={[
                styles.addButton,
                {
                  borderColor: isDarkMode
                    ? Colors.darkInputBg
                    : Colors.lightInputBg,
                },
              ]}>
              <AnySvg
                name={isDarkMode ? 'addDarkIcon' : 'addLightIcon'}
                size={24}
                containerStyle={{alignSelf: 'center'}}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="AthleteCommunity"
        component={AthleteCommunity}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.tabBarIconContainer}>
              <AnySvg
                name={focused ? 'activeCommunity' : 'userIcon'}
                size={24}
                containerStyle={{alignSelf: 'center'}}
              />
              <Text
                style={[
                  styles.title,
                  {color: focused ? Colors.primaryColor : '#5F6368'},
                ]}>
                {t('Community')}
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="AthleteProfile"
        component={AthleteProfile}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.tabBarIconContainer}>
              <AnySvg
                name={focused ? 'activeProfile' : 'profileIcon'}
                size={24}
                containerStyle={{alignSelf: 'center'}}
              />
              <Text
                style={[
                  styles.title,
                  {color: focused ? Colors.primaryColor : '#5F6368'},
                ]}>
                {t('Profile')}
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AthleteTabNavigation;

const styles = StyleSheet.create({
  tabBarBase: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -3},
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 10,
    borderWidth: 1,
  },
  tabBarIconContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 50,
    height: 96,
    alignItems: 'center',
  },
  addButton: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: -20,
    height: 60,
    width: 60,
    borderRadius: 50,
    borderWidth: 4,
    alignItems: 'center',
    backgroundColor: Colors.primaryColor,
  },
  title: {
    width: 90,
    fontSize: 12,
    marginTop: 6,
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: fonts.UrbanistSemiBold,
  },
});

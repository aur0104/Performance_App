import React from 'react';
import {StyleSheet, View, Text, Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {Colors} from '../../utils/Colors';
import AnySvg from '../../components/AnySvg';
import fonts from '../../utils/Fonts';
import {hp} from '../../utils/responsivesness';
import OwnerProfile from '../../screens/GymOwnerSide/ProfileSection';
import GymPerformance from '../../screens/GymOwnerSide/Performance';
import TotalMember from '../../screens/GymOwnerSide/TotalMembers';
import OwnerHome from '../../screens/GymOwnerSide/HomeSection';
import MyCommunities from '../../screens/GymOwnerSide/MyCommunities';

const Tab = createBottomTabNavigator();

const OwnerTabNavigation = () => {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const backgroundColor = isDarkMode
    ? Colors.darkInputBg
    : Colors.lightBackground;

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
            height: Platform.OS === 'ios' ? hp(12) : hp(11),
          },
        ],
      }}>
      <Tab.Screen
        name="OwnerHome"
        component={OwnerHome}
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
                size={24}
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
        name="Members"
        component={TotalMember}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.tabBarIconContainer}>
              <AnySvg
                name={focused ? 'activeCategory' : 'Category'}
                size={24}
                containerStyle={{alignSelf: 'center'}}
              />
              <Text
                style={[
                  styles.title,
                  {color: focused ? Colors.primaryColor : '#5F6368'},
                ]}>
                {t('Members')}
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="MyCommunities"
        component={MyCommunities}
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
                {t('My Communities')}
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="GymPerformance"
        component={GymPerformance}
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
        name="OwnerProfile"
        component={OwnerProfile}
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

export default OwnerTabNavigation;

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
    fontSize: 10,
    marginTop: 6,
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: fonts.UrbanistSemiBold,
  },
});

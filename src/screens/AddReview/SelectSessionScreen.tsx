import React, {useState} from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import styles from './styles/selectSessionStyle';
import {Colors} from '../../utils/Colors';
import AnySvg from '../../components/AnySvg';
import CustomButton from '../../components/CustomButton';
import BackHeader from '../../components/BackHeader';

export default function SelectSessionScreen() {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const isDarkMode = useSelector((state: any) => state.theme.switchDarkTheme);
  const [selected, setSelected] = useState<string | null>(null);

  const sessionTypes = [
    {
      title: 'Skill Practice',
      icon: 'skillPractice',
      selectedIcon: 'skillPracticewhite',
      screen: 'AddReviewScreen',
    },
    {
      title: 'Match Type',
      icon: 'matchType',
      selectedIcon: 'matchTypewhite',
      screen: 'MatchType',
    },
    {
      title: 'Physical Performance',
      icon: 'performance',
      selectedIcon: 'performancewhite',
      screen: 'PhysicalPerformance',
    },
  ];

  const handleSessionSelect = (type: string) => {
    setSelected(type);
  };

  const handleContinue = () => {
    const selectedSession = sessionTypes.find(item => item.title === selected);
    if (selectedSession) {
      navigation.navigate(selectedSession.screen as never);
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: isDarkMode
            ? Colors.darkBackground
            : Colors.lightBackground,
        },
      ]}>
      <ScrollView
        contentContainerStyle={{paddingBottom: 40}}
        showsVerticalScrollIndicator={false}>
        <BackHeader title="Add Reviews" containerStyle={{marginTop: 0}} />

        <Text
          style={[
            styles.subtitle,
            {color: isDarkMode ? Colors.white : Colors.black, marginBottom: 12},
          ]}>
          {t('Session Type')}
        </Text>

        {sessionTypes.map((item, index) => {
          const isActive = selected === item.title;
          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleSessionSelect(item.title)}
              style={[
                styles.card,
                {
                  backgroundColor: isActive
                    ? Colors.primaryColor
                    : isDarkMode
                    ? Colors.darkCard
                    : Colors.lightCard,
                },
              ]}>
              <View style={styles.cardInner}>
                <View
                  style={[
                    styles.iconWrapper,
                    {
                      backgroundColor: isActive
                        ? 'rgba(255, 255, 255, 0.2)'
                        : isDarkMode
                        ? '#212121'
                        : '#EEEEEE',
                    },
                  ]}>
                  <AnySvg
                    name={isActive ? item.selectedIcon : item.icon}
                    width={34}
                    height={34}
                  />
                </View>
                <Text
                  style={[
                    styles.cardText,
                    {
                      color: isActive
                        ? Colors.white
                        : isDarkMode
                        ? Colors.white
                        : Colors.black,
                    },
                  ]}>
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={styles.bottomButtonWrapper}>
        <CustomButton onPress={handleContinue} disable={!selected}>
          {t('Continue')}
        </CustomButton>
      </View>
    </SafeAreaView>
  );
}

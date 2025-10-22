import React, {useState} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {Colors} from '../../../utils/Colors';
import BackHeader from '../../../components/BackHeader';
import fonts from '../../../utils/Fonts';

interface ChallengeRulesProps {
  navigation?: any;
}

const ChallengeRules: React.FC<ChallengeRulesProps> = ({navigation}) => {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);

  const backgroundColor = isDarkMode
    ? Colors.darkBackground
    : Colors.lightBackground;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const secondaryTextColor = isDarkMode ? Colors.gray : Colors.black;
  const separatorColor = isDarkMode ? '#424242' : '#E0E0E0';

  const sections = [
    {
      title: t('1. General Guidelines'),
      bullets: [
        t('All challenge settings are locked once launched'),
        t('Participants can join any time while the challenge is active'),
        t('Only one entry per participant per challenge is allowed'),
        t(
          'Cheating, dishonesty or suspicious entries may result in disqualification',
        ),
        t('Challenge creators may review or remove invalid entries'),
      ],
    },
    {
      title: t('2. Submitting Results'),
      bullets: [
        t(
          'Your result must match the challenge format (e.g. time, reps, weight, distance)',
        ),
        t('Results must be submitted before the challenge deadline'),
        t(
          'If the challenge requires video proof, your entry will not be counted without it',
        ),
        t('Make sure your result is complete, accurate and easy to verify'),
      ],
    },
    {
      title: t('3. Video Proof (If Required)'),
      bullets: [
        t('Record the entire movement or effort in one continuous clip'),
        t('Timer, equipment or result screen must be clearly visible'),
        t('Use a stable filming angle and keep the athlete in frame'),
        t('No edited or filtered videos are allowed'),
        t('See the [Video Proof Guidelines] for full details.'),
      ],
    },
    {
      title: t('4. Attendance & Streak Challenges'),
      bullets: [
        t(
          'Sessions must be logged or class check-ins completed through the app',
        ),
        t(
          'Streaks are only valid if the required number of sessions is completed within the set timeframe',
        ),
        t('Daily streaks will reset if a day is missed'),
      ],
    },
  ];

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <BackHeader title={t('Challenge Rules')} showBackIcon />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        {sections.map((section, index) => (
          <View key={index} style={styles.sectionContainer}>
            <Text style={[styles.sectionTitle, {color: textColor}]}>
              {section.title}
            </Text>
            {section.bullets.map((bullet, idx) => (
              <View key={idx} style={styles.bulletItem}>
                <Text style={[styles.bulletPoint, {color: textColor}]}>•</Text>
                <Text style={[styles.bulletText, {color: secondaryTextColor}]}>
                  {bullet}
                </Text>
              </View>
            ))}
            {index !== sections.length - 1 && (
              <View
                style={[styles.separator, {backgroundColor: separatorColor}]}
              />
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default ChallengeRules;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingVertical: 6,
    paddingHorizontal: 20,
  },
  sectionContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 8,
    fontFamily: fonts.UrbanistSemiBold,
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  bulletPoint: {
    fontSize: 14,
    marginRight: 8,
    lineHeight: 20,
  },
  bulletText: {
    fontSize: 18,
    flex: 1,
    lineHeight: 20,
    fontFamily: fonts.UrbanistRegular,
  },
  separator: {
    height: 1,
    width: '100%',
    marginTop: 12,
  },
});

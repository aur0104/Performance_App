import React from 'react';
import {SafeAreaView, Text, View, ScrollView, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {Colors} from '../../../../utils/Colors';
import BackHeader from '../../../../components/BackHeader';
import fonts from '../../../../utils/Fonts';
import {hp, rfs, rhp, rwp} from '../../../../utils/responsivesness';

interface VideoGuidelinesProps {
  navigation?: any;
}

const VideoGuidelines: React.FC<VideoGuidelinesProps> = ({navigation}) => {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);

  const backgroundColor = isDarkMode
    ? Colors.darkBackground
    : Colors.lightBackground;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const subTextColor = isDarkMode ? Colors.gray : Colors.darkGray;
  const cardBackground = isDarkMode ? '#1E1E1E' : '#F6F6F6';

  const guidelines = [
    {
      title: 'Video Quality',
      content:
        'Record in high definition (HD) for best results. Ensure good lighting and clear visibility of your movements.',
    },
    {
      title: 'Video Duration',
      content:
        'Keep videos between 15 seconds to 2 minutes. Focus on showing the complete exercise movement.',
    },
    {
      title: 'Camera Position',
      content:
        'Position camera at an angle that shows your full body and proper form. Avoid shaky footage.',
    },
    {
      title: 'Exercise Form',
      content:
        'Demonstrate proper exercise technique. Show the full range of motion for each repetition.',
    },
    {
      title: 'Background',
      content:
        'Choose a clean, uncluttered background. Ensure there are no distractions in the frame.',
    },
    {
      title: 'Audio',
      content:
        'Clear audio is optional but recommended. You can add commentary about your performance.',
    },
    {
      title: 'Safety First',
      content:
        'Always prioritize safety over performance. Use proper equipment and ensure adequate space.',
    },
    {
      title: 'File Format',
      content:
        'Supported formats: MP4, MOV, AVI. Maximum file size: 100MB per video.',
    },
  ];

  return (
    <SafeAreaView style={[styles.container, {backgroundColor}]}>
      <BackHeader title={t('Video Guidelines')} showBackIcon />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <Text style={[styles.description, {color: subTextColor}]}>
          {t(
            'Follow these guidelines to create effective workout videos for your challenge submissions.',
          )}
        </Text>

        {guidelines.map((guideline, index) => (
          <View
            key={index}
            style={[styles.guidelineCard, {backgroundColor: cardBackground}]}>
            <Text style={[styles.guidelineTitle, {color: textColor}]}>
              {index + 1}. {guideline.title}
            </Text>
            <Text style={[styles.guidelineContent, {color: subTextColor}]}>
              {guideline.content}
            </Text>
          </View>
        ))}

        <View
          style={[
            styles.tipCard,
            {backgroundColor: Colors.primaryColor + '20'},
          ]}>
          <Text style={[styles.tipTitle, {color: Colors.primaryColor}]}>
            💡 Pro Tip
          </Text>
          <Text style={[styles.tipContent, {color: textColor}]}>
            Watch other successful submissions in the leaderboard for
            inspiration and to see examples of well-recorded videos.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 60,
  },
  description: {
    fontSize: rfs(16),
    fontFamily: fonts.UrbanistMedium,
    lineHeight: 24,
    marginBottom: rhp(24),
    marginTop: rhp(16),
  },
  guidelineCard: {
    padding: rwp(16),
    borderRadius: 12,
    marginBottom: rhp(16),
  },
  guidelineTitle: {
    fontSize: rfs(16),
    fontFamily: fonts.UrbanistBold,
    marginBottom: rhp(8),
  },
  guidelineContent: {
    fontSize: rfs(14),
    fontFamily: fonts.UrbanistMedium,
    lineHeight: 20,
  },
  tipCard: {
    padding: rwp(16),
    borderRadius: 12,
    marginTop: rhp(8),
    marginBottom: rhp(16),
  },
  tipTitle: {
    fontSize: rfs(16),
    fontFamily: fonts.UrbanistBold,
    marginBottom: rhp(8),
  },
  tipContent: {
    fontSize: rfs(14),
    fontFamily: fonts.UrbanistMedium,
    lineHeight: 20,
  },
});

export default VideoGuidelines;

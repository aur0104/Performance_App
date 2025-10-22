// CompletedRunningChallenges.tsx (updated)
import React, {useState} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {Colors} from '../../../../utils/Colors';
import styles from './styles';
import AnySvg from '../../../../components/AnySvg';
import {hp} from '../../../../utils/responsivesness';
import fonts from '../../../../utils/Fonts';

interface CompletedRunningChallengesProps {
  completedChallenges?: any[];
}

const CompletedRunningChallenges: React.FC<CompletedRunningChallengesProps> = ({
  completedChallenges = [],
}) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const backgroundColor = isDarkMode
    ? Colors.darkBackground
    : Colors.lightBackground;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const viewBg = isDarkMode ? Colors.darkInputBg : Colors.lightInputBg;
  const separaterColor = isDarkMode ? '#424242' : '#E0E0E0';
  const {t} = useTranslation();

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const renderItem = ({item, index}: any) => {
    const isExpanded = expandedIndex === index;
    const challenge = item.challenge || item;
    return (
      <TouchableOpacity
        style={[styles.challengeBox, {backgroundColor: viewBg}]}
        onPress={() => toggleExpand(index)}>
        <View style={styles.headerRow}>
          <Text style={[styles.title, {color: textColor, width: '58%'}]}>
            {challenge.title}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <AnySvg name="completed" width={22} height={22} />
              <Text
                style={{
                  color: Colors.green,
                  marginLeft: 4,
                  fontFamily: fonts.UrbanistSemiBold,
                }}>
                Completed
              </Text>
            </View>
            <TouchableOpacity onPress={() => toggleExpand(index)}>
              <AnySvg
                name={
                  isExpanded
                    ? isDarkMode
                      ? 'darkDrop'
                      : 'lightDrop'
                    : isDarkMode
                    ? 'darkRight'
                    : 'lightRight'
                }
                size={28}
              />
            </TouchableOpacity>
          </View>
        </View>

        {isExpanded && (
          <>
            <View
              style={[styles.separator, {backgroundColor: separaterColor}]}
            />

            <Text style={[styles.levelsTitle, {color: textColor}]}>
              Category: {challenge.category?.name}
            </Text>

            <Text
              style={[styles.description, {color: textColor, marginTop: 4}]}>
              Format: {challenge.format?.name}
            </Text>
            <Text
              style={[
                styles.description,
                {color: textColor, fontFamily: fonts.UrbanistBold},
              ]}>
              Description:
            </Text>
            <Text
              style={[styles.description, {color: textColor, marginTop: 2}]}>
              {challenge.description}
            </Text>

            <Text
              style={[
                styles.description,
                {color: textColor, fontFamily: fonts.UrbanistBold},
              ]}>
              Coach's Tip:
            </Text>
            <Text
              style={[styles.description, {color: textColor, marginTop: 2}]}>
              {challenge.coachTip}
            </Text>
            <View
              style={[styles.separator, {backgroundColor: separaterColor}]}
            />

            <Text style={[styles.levelsTitle, {color: textColor}]}>
              Submissions:
            </Text>
            <Text
              style={[styles.description, {color: textColor, marginTop: 2}]}>
              {item?.submissions && Object.values(item.submissions)[0]}
            </Text>
            <View
              style={[styles.separator, {backgroundColor: separaterColor}]}
            />
            <Text style={[styles.levelsTitle, {color: textColor}]}>
              Levels:
            </Text>
            {challenge?.levels.map((level: any, i: number) => (
              <View key={i}>
                <View style={styles.levelRow}>
                  <View style={styles.levelLeft}>
                    <View
                      style={[
                        styles.levelImage,
                        {backgroundColor: getBadgeColor(level.badge)},
                      ]}>
                      <Text style={styles.badgeText}>
                        {level.badge.charAt(0)}
                      </Text>
                    </View>
                    <Text style={[styles.levelText, {color: textColor}]}>
                      <Text
                        style={[
                          styles.levelText,
                          {
                            color: textColor,
                            fontFamily: fonts.UrbanistSemiBold,
                          },
                        ]}>
                        {level.badge}
                      </Text>{' '}
                      - {level.value}
                    </Text>
                  </View>
                  <AnySvg name="greenCheck" size={22} svgStyle={styles.check} />
                </View>

                <View
                  style={[styles.separator, {backgroundColor: separaterColor}]}
                />
                {/* You can add actual submission data here when available */}
                <Text
                  style={[
                    styles.levelText,
                    {
                      color: textColor,
                      fontFamily: fonts.UrbanistSemiBold,
                      marginBottom: hp(2),
                    },
                  ]}>
                  {t('Status')}: Completed
                </Text>
              </View>
            ))}
          </>
        )}
      </TouchableOpacity>
    );
  };

  // Helper function for badge colors
  const getBadgeColor = (badge: string) => {
    switch (badge.toLowerCase()) {
      case 'bronze':
        return '#CD7F32';
      case 'silver':
        return '#C0C0C0';
      case 'gold':
        return '#FFD700';
      case 'platinum':
        return '#E5E4E2';
      default:
        return '#CCCCCC';
    }
  };

  if (completedChallenges.length === 0) {
    return (
      <View
        style={[
          styles.container,
          {backgroundColor, justifyContent: 'center', alignItems: 'center'},
        ]}>
        <Text style={[styles.contentText, {color: textColor}]}>
          No completed challenges found
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <FlatList
        data={completedChallenges}
        renderItem={renderItem}
        keyExtractor={(item, index) => item._id || index.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
      />
    </View>
  );
};

export default CompletedRunningChallenges;

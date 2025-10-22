import React, {useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {Colors} from '../../../../utils/Colors';
import CustomButton from '../../../../components/CustomButton';
import styles from './styles';
import AnySvg from '../../../../components/AnySvg';
import {hp} from '../../../../utils/responsivesness';
import fonts from '../../../../utils/Fonts';
import {useNavigation} from '@react-navigation/native';
import {joinPerformanceChallenge} from '../../../../services/calls';
import utils from '../../../../utils/utils';

interface AllRunningChallengesProps {
  dataMapKey?: string;
  refreshFlag?: boolean;
  allChallenges?: any[];
  onChallengeJoin: (status: number) => void;
}

const AllRunningChallenges: React.FC<AllRunningChallengesProps> = ({
  dataMapKey,
  refreshFlag,
  allChallenges = [],
  onChallengeJoin,
}) => {
  const navigation = useNavigation();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const backgroundColor = isDarkMode
    ? Colors.darkBackground
    : Colors.lightBackground;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const viewBg = isDarkMode ? Colors.darkInputBg : Colors.lightInputBg;
  const separaterColor = isDarkMode ? '#424242' : '#E0E0E0';
  const {t} = useTranslation();
  const [loader, setLoader] = useState(false);
  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  // Function to handle starting a challenge
  const handleStartChallenge = async (challenge: any) => {
    try {
      setLoader(true);
      let body = {
        challenge: challenge?._id,
      };
      const result = await joinPerformanceChallenge(body);
      if (result.status == 201 || result.status === 200) {
        onChallengeJoin(result?.status);
      }
    } catch (error: any) {
      onChallengeJoin(error?.status);
      utils.errorMessage(error);
    } finally {
      setLoader(false);
    }
  };
  const renderItem = ({item, index}: any) => {
    const isExpanded = expandedIndex === index;
    const challenge = item;
    console.log('challnege here ', challenge?.description);
    return (
      <TouchableOpacity
        style={[styles.challengeBox, {backgroundColor: viewBg}]}
        onPress={() => toggleExpand(index)}>
        <View style={styles.headerRow}>
          <Text style={[styles.title, {color: textColor, width: '85%'}]}>
            {challenge.title}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: 12,
              }}>
              <AnySvg name="challenge" width={18} height={23} />
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
            {challenge?.description && (
              <>
                <Text
                  style={[
                    styles.description,
                    {color: textColor, fontFamily: fonts.UrbanistBold},
                  ]}>
                  Description:
                </Text>
                <Text
                  style={[
                    styles.description,
                    {color: textColor, marginTop: 2},
                  ]}>
                  {challenge.description}
                </Text>
              </>
            )}

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
              Levels:
            </Text>

            {challenge.levels.map((level: any, i: number) => (
              <View key={i} style={[styles.levelRow]}>
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
                        {color: textColor, fontFamily: fonts.UrbanistSemiBold},
                      ]}>
                      {level.badge}
                    </Text>{' '}
                    - {level.value}
                  </Text>
                </View>
                <AnySvg
                  name={isDarkMode ? 'darkCheck' : 'lightCheck'}
                  size={22}
                  svgStyle={styles.check}
                />
              </View>
            ))}

            <CustomButton
              disable={loader}
              loading={loader}
              onPress={() => handleStartChallenge(challenge)}
              containerStyle={{
                alignSelf: 'center',
                width: '90%',
                marginTop: hp(2),
                marginBottom: hp(2),
              }}>
              {t('Join Challenge')}
            </CustomButton>
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

  if (allChallenges.length === 0) {
    return (
      <View
        style={[
          styles.container,
          {backgroundColor, justifyContent: 'center', alignItems: 'center'},
        ]}>
        <Text style={[styles.contentText, {color: textColor}]}>
          No challenges available
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <FlatList
        data={allChallenges}
        renderItem={renderItem}
        keyExtractor={(item, index) => item._id || index.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        extraData={refreshFlag}
      />
    </View>
  );
};

// Add these styles to your existing styles file if needed
const additionalStyles = {
  badgeContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  badgeText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 12,
  },
  contentText: {
    fontSize: 16,
    fontFamily: fonts.UrbanistSemiBold,
  },
};

export default AllRunningChallenges;

import React, {useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {Colors} from '../../../utils/Colors';
import styles from './styles';
import AnySvg from '../../../components/AnySvg';
import {CompletedSpeedData} from '../../../utils/DummyData';
import {hp} from '../../../utils/responsivesness';
import fonts from '../../../utils/Fonts';

const CompletedRunningChallenges = () => {
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

    return (
      <TouchableOpacity
        style={[styles.challengeBox, {backgroundColor: viewBg}]}
        onPress={() => toggleExpand(index)}>
        <View style={styles.headerRow}>
          <Text style={[styles.title, {color: textColor}]}>{item.title}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: 12,
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
            <Text
              style={[
                styles.description,
                {color: textColor, fontFamily: fonts.UrbanistBold},
              ]}>
              Description:
            </Text>
            <Text
              style={[styles.description, {color: textColor, marginTop: 2}]}>
              {item.description}
            </Text>
            <Text
              style={[
                styles.description,
                {color: textColor, fontFamily: fonts.UrbanistBold},
              ]}>
              Coach’s Tip:
            </Text>
            <Text
              style={[styles.description, {color: textColor, marginTop: 2}]}>
              {item.tip}
            </Text>
            <View
              style={[styles.separator, {backgroundColor: separaterColor}]}
            />

            <Text style={[styles.levelsTitle, {color: textColor}]}>
              Levels:
            </Text>

            {item.levels.map((level: any, i: number) => (
              <View key={i}>
                <View style={styles.levelRow}>
                  <View style={styles.levelLeft}>
                    <Image source={level.image} style={styles.levelImage} />
                    <Text style={[styles.levelText, {color: textColor}]}>
                      <Text
                        style={[
                          styles.levelText,
                          {
                            color: textColor,
                            fontFamily: fonts.UrbanistSemiBold,
                          },
                        ]}>
                        {level.coin}
                      </Text>{' '}
                      {level.label}
                    </Text>
                  </View>
                  <AnySvg
                    name={
                      level.label === 'Under 6:00'
                        ? 'greenCheck'
                        : isDarkMode
                        ? 'darkCheck'
                        : 'lightCheck'
                    }
                    size={22}
                    svgStyle={styles.check}
                  />
                </View>

                <View
                  style={[styles.separator, {backgroundColor: separaterColor}]}
                />
                <Text
                  style={[
                    styles.levelText,
                    {
                      color: textColor,
                      fontFamily: fonts.UrbanistSemiBold,
                      marginBottom: hp(2),
                    },
                  ]}>
                  {t('Time')}: {level.time}
                </Text>
              </View>
            ))}
          </>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <FlatList
        data={CompletedSpeedData}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
      />
    </View>
  );
};

export default CompletedRunningChallenges;

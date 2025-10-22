import React, {useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {Colors} from '../../../utils/Colors';
import CustomButton from '../../../components/CustomButton';
import styles from './styles';
import AnySvg from '../../../components/AnySvg';
import {ActiveStrengthData} from '../../../utils/DummyData';
import {hp} from '../../../utils/responsivesness';
import fonts from '../../../utils/Fonts';
import {useNavigation} from '@react-navigation/native';

const ActiveRunningChallenges = () => {
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
              <AnySvg name="active" width={18} height={23} />
              <Text
                style={{
                  color: Colors.yellow,
                  marginLeft: 4,
                  fontFamily: fonts.UrbanistSemiBold,
                }}>
                Active
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
              <View key={i} style={[styles.levelRow]}>
                <View style={styles.levelLeft}>
                  <Image source={level.image} style={styles.levelImage} />
                  <Text style={[styles.levelText, {color: textColor}]}>
                    <Text
                      style={[
                        styles.levelText,
                        {color: textColor, fontFamily: fonts.UrbanistSemiBold},
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
            ))}
            <CustomButton
              onPress={() => {
                navigation.navigate('InputChallenges', {name: item.title});
              }}
              containerStyle={{
                alignSelf: 'center',
                width: '90%',
                marginTop: hp(2),
                marginBottom: hp(2),
              }}>
              {t('Input Challenge')}
            </CustomButton>
          </>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <FlatList
        data={ActiveStrengthData}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
      />
    </View>
  );
};

export default ActiveRunningChallenges;

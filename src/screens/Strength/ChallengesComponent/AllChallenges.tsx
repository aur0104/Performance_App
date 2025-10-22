import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {Colors} from '../../../utils/Colors';
import CustomButton from '../../../components/CustomButton';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {ActivityIndicator} from 'react-native';
import AnySvg from '../../../components/AnySvg';
import {strengthChallengesData} from '../../../utils/DummyData';
import {hp} from '../../../utils/responsivesness';
import fonts from '../../../utils/Fonts';

const AllRunningChallenges = ({dataMapKey}: {dataMapKey: string}) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const backgroundColor = isDarkMode
    ? Colors.darkBackground
    : Colors.lightBackground;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const viewBg = isDarkMode ? Colors.darkInputBg : Colors.lightInputBg;
  const separaterColor = isDarkMode ? '#424242' : '#E0E0E0';
  const {t} = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const challengesData = strengthChallengesData[dataMapKey] ?? [];

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const renderItem = ({item, index}: any) => (
    <TouchableOpacity
      style={[styles.challengeBox, {backgroundColor: viewBg}]}
      onPress={() => toggleExpand(index)}>
      <View style={styles.headerRow}>
        <Text style={[styles.title, {color: textColor}]}>{item.title}</Text>
        <TouchableOpacity onPress={() => toggleExpand(index)}>
          <TouchableOpacity onPress={() => toggleExpand(index)}>
            <AnySvg
              name={
                expandedIndex === index
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
        </TouchableOpacity>
      </View>

      {expandedIndex === index && (
        <>
          <Text
            style={[
              styles.description,
              {color: textColor, fontFamily: fonts.UrbanistBold},
            ]}>
            Description:
          </Text>
          <Text style={[styles.description, {color: textColor, marginTop: 2}]}>
            {item.description}
          </Text>

          <Text
            style={[
              styles.description,
              {color: textColor, fontFamily: fonts.UrbanistBold},
            ]}>
            Coach’s Tip:
          </Text>
          <Text style={[styles.description, {color: textColor, marginTop: 2}]}>
            {item.tip}
          </Text>

          <View style={[styles.separator, {backgroundColor: separaterColor}]} />

          <Text style={[styles.levelsTitle, {color: textColor}]}>Levels:</Text>

          {item.levels.map((level: any, i: number) => (
            <View key={i} style={styles.levelRow}>
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
                  level.coin === 'Bronze:'
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
              setIsLoading(true);
              setTimeout(() => {
                setIsLoading(false);
                navigation.navigate('JoinedSuccessfully');
              }, 2000);
            }}
            containerStyle={{
              width: '100%',
              marginTop: hp(2),
              marginBottom: hp(4),
            }}>
            {' '}
            {t('Join Challenge')}
          </CustomButton>
        </>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <FlatList
        data={challengesData}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
      />
      {isLoading && (
        <View style={styles.loaderOverlay}>
          <ActivityIndicator
            size={86}
            color={isDarkMode ? Colors.white : Colors.black}
          />
        </View>
      )}
    </View>
  );
};

export default AllRunningChallenges;

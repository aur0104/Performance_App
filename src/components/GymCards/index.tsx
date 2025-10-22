import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {Colors} from '../../utils/Colors';
import {useNavigation} from '@react-navigation/native';
import {IMAGES} from '../../assets/images';
import {hp} from '../../utils/responsivesness';
import fonts from '../../utils/Fonts';

const CommunityCardList = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);

  const textColor = isDarkMode ? Colors.white : Colors.black;
  const background = isDarkMode ? Colors.darkInputBg : Colors.lightInputBg;

  const profileImages = [
    IMAGES.community1,
    IMAGES.community2,
    IMAGES.community3,
    IMAGES.profileImage,
  ];

  const communityData = [
    {
      id: '1',
      image: IMAGES.detailImage,
      lineColor: Colors.primaryColor,
      title: 'AVX Training Club',
      members: '310k members in this community',
    },
    {
      id: '2',
      image: IMAGES.detailImage,
      lineColor: Colors.yellow,
      title: 'Yoga Flex Zone',
      members: '120k members in this community',
    },
  ];

  const renderItem = ({item}: any) => (
    <TouchableOpacity
      style={[styles.card, {backgroundColor: background}]}
      onPress={() => navigation.navigate('GymCommunity')}>
      <View style={styles.topRow}>
        <Image source={item.image} style={styles.topImage} />
        <View style={styles.titleRow}>
          <View style={[styles.line, {backgroundColor: item.lineColor}]} />
          <Text style={[styles.title, {color: textColor}]}>{item.title}</Text>
        </View>
      </View>

      <Text style={[styles.memberText, {color: textColor}]}>
        {item.members}
      </Text>
      <View style={styles.bottomRow}>
        <View style={styles.avatarGroup}>
          {profileImages.map((imageSource, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.avatarWrapper,
                {zIndex: profileImages.length - index},
              ]}
              onPress={() => navigation.navigate('MemberList')}>
              <Image source={imageSource} style={styles.avatarImage} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={communityData}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 20,
    marginBottom: hp(3),
  },
  card: {
    width: 236,
    height: 131,
    borderRadius: 8,
    marginRight: 12,
    padding: 10,
    justifyContent: 'space-between',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topImage: {
    width: 38,
    height: 35,
    borderRadius: 5,
  },
  line: {
    width: 11,
    height: 2.5,
    marginLeft: 8,
    borderRadius: 1.25,
  },
  titleRow: {
    marginTop: 5,
    marginLeft: 6,
  },
  title: {
    fontSize: 13,
    marginTop: 6,
    fontFamily: fonts.UrbanistBold,
  },
  memberText: {
    fontSize: 12,
    marginTop: 4,
    opacity: 0.8,
    fontFamily: fonts.UrbanistMedium,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  avatarGroup: {
    flexDirection: 'row',
  },
  avatarWrapper: {
    marginLeft: -8,
    borderRadius: 20,
    overflow: 'hidden',
  },
  avatarImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.white,
  },
  viewText: {
    fontSize: 12,
    fontFamily: fonts.UrbanistMedium,
  },
});

export default CommunityCardList;

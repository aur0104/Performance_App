import React from 'react';
import {View, Text, SafeAreaView, FlatList, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import ProgressBar from 'react-native-progress/Bar';
import styles from './styles';
import {Colors} from '../../../utils/Colors';
import AnySvg from '../../../components/AnySvg';
import {badgeSections} from '../../../utils/DummyData';
import BackHeader from '../../../components/BackHeader';

interface BadgesProps {
  navigation?: any;
}

const Badges: React.FC<BadgesProps> = () => {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);

  const backgroundColor = isDarkMode ? Colors.darkBackground : Colors.white;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const textColor2 = isDarkMode ? Colors.gray : Colors.black;
  const separaterColor = isDarkMode ? '#424242' : '#E0E0E0';

  const renderBadgeSection = ({item}: any) => (
    <View style={styles.sectionContainer}>
      <View style={styles.badgeRow}>
        <View style={styles.badgeIconView}>
          <AnySvg name={item.iconName} width={31} height={31} />
        </View>

        <View style={{flex: 1, marginLeft: 12}}>
          <Text style={[styles.badgeTitle, {color: textColor}]}>
            {item.title}
          </Text>

          <ProgressBar
            progress={item.progress}
            width={null}
            height={4}
            color={Colors.primaryColor}
            unfilledColor={
              isDarkMode ? Colors.darkInputBg : Colors.lightInputBg
            }
            borderColor={isDarkMode ? Colors.darkInputBg : Colors.lightInputBg}
            borderWidth={1}
            style={{marginTop: 6}}
          />

          <View style={styles.progressLabels}>
            <Text style={[styles.progressLabelText, {color: textColor}]}>
              {item.progressMin}
            </Text>
            <Text style={[styles.progressLabelText, {color: textColor}]}>
              {item.progressMax}
            </Text>
          </View>
        </View>
      </View>

      {item.badges.map((badge: any, index: number) => (
        <View key={index}>
          <View style={styles.coinRow}>
            <AnySvg name={badge.iconName} size={35} />
            <View
              style={{
                flex: 1,
                marginLeft: 10,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View style={{flex: 1}}>
                <Text style={[styles.coinText, {color: textColor}]}>
                  {badge.title}
                </Text>
                <Text style={[styles.descriptionText, {color: textColor2}]}>
                  {badge.description}
                </Text>
              </View>
              {badge.checked && (
                <AnySvg name="completed" svgStyle={{marginTop: 20}} size={25} />
              )}
            </View>
          </View>

          <View style={[styles.separator, {backgroundColor: separaterColor}]} />
        </View>
      ))}
    </View>
  );

  return (
    <ScrollView
      style={[styles.safeArea, {backgroundColor}]}
      showsVerticalScrollIndicator={false}>
      <BackHeader title="Badges" showBackIcon />
      <Text style={[styles.updatedText, {color: textColor2}]}>
        Last updated 5/12/2022
      </Text>

      <FlatList
        data={badgeSections}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderBadgeSection}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
      />
    </ScrollView>
  );
};

export default Badges;

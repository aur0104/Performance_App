import React from 'react';
import {FlatList, ScrollView, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import BackHeader from '../../../components/BackHeader';
import {Colors} from '../../../utils/Colors';
import styles from '../../AddReview/AddReviewInformation/styles';
import {communityGuide, levels} from '../../../utils/DummyData';
import {hp} from '../../../utils/responsivesness';

interface InformationProps {
  navigation?: any;
}

const CommunityGuide: React.FC<InformationProps> = ({navigation}) => {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);

  const backgroundColor = isDarkMode ? Colors.darkBackground : Colors.white;
  const textColor2 = isDarkMode ? '#EEEEEE' : '#424242';
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const separaterColor = isDarkMode ? '#424242' : '#E0E0E0';

  const renderItem = ({item, index}: any) => (
    <View style={styles.itemContainer}>
      <Text style={[styles.headerText, {color: textColor}]}>{item.header}</Text>
      <Text style={[styles.descriptionText, {color: textColor2}]}>
        {item.description}
      </Text>

      {index < communityGuide.length - 1 && (
        <View
          style={[
            styles.separator,
            {backgroundColor: separaterColor, marginTop: hp(2)},
          ]}
        />
      )}
    </View>
  );

  return (
    <ScrollView
      style={[styles.container, {backgroundColor}]}
      showsVerticalScrollIndicator={false}>
      <BackHeader title={t('Community Guideline')} showBackIcon />

      <FlatList
        data={communityGuide}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={[styles.listContent, {paddingBottom: 0}]}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
      />

      <Text style={[styles.emailText, {textDecorationLine: 'underline'}]}>
        support@prymosport.com
      </Text>
    </ScrollView>
  );
};

export default CommunityGuide;

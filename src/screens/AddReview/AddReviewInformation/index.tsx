import React, {useRef, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import BackHeader from '../../../components/BackHeader';
import {Colors} from '../../../utils/Colors';
import styles from './styles';
import {levels} from '../../../utils/DummyData';
import CustomSliderWithThumb from '../../../components/CustomSlider';

interface InformationProps {
  navigation?: any;
}

const AddReviewInformation: React.FC<InformationProps> = ({navigation}) => {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);

  const [rating] = useState(5);

  const backgroundColor = isDarkMode ? Colors.darkBackground : Colors.white;
  const textColor2 = isDarkMode ? '#EEEEEE' : '#424242';
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const separaterColor = isDarkMode ? '#424242' : '#E0E0E0';

  const renderItem = ({item}: any) => (
    <View style={styles.itemContainer}>
      <Text style={[styles.headerText, {color: textColor}]}>{item.header}</Text>
      <Text style={[styles.descriptionText, {color: textColor2}]}>
        {item.description}
      </Text>
      <View style={[styles.separator, {backgroundColor: separaterColor}]} />
    </View>
  );

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <BackHeader title={t('Review Information')} showBackIcon />

      <CustomSliderWithThumb rating={rating} editable={false} />

      <FlatList
        data={levels}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default AddReviewInformation;

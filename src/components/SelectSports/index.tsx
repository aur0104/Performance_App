import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  ActivityIndicator,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {Colors} from '../../utils/Colors';
import fonts from '../../utils/Fonts';
import {sportData} from '../../utils/DummyData';
import AnySvg from '../AnySvg';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

interface Props {
  visible: boolean;
  onClose: () => void;
  onSelectSport: (sport: any) => void;
  data: any[]; // <-- Accepts array of sports from API
  selectedSports?: any[]; // <-- Array of already selected sports
  loader?: boolean;
}

const SelectSportModal: React.FC<Props> = ({
  visible,
  onClose,
  onSelectSport,
  data = [], // <-- Use API data
  selectedSports = [], // <-- Already selected sports
  loader = false,
}) => {
  const {t} = useTranslation();
  const navigation = useNavigation();

  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const backgroundColor = isDarkMode ? Colors.darkBackground : Colors.white;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const sportBgColor = isDarkMode ? '#1C1C1C' : '#F2F2F2';

  const handleSelect = (item: any) => {
    onSelectSport(item);
    // Don't auto-close to allow multiple selections
  };

  const handleInfoPress = (item: any) => {
    onClose();
    setTimeout(() => {
      navigation.navigate('SportInformation', {sport: item});
    }, 50);
  };

  const renderSportItem = ({item}: any) => {
    const isSelected = selectedSports.some(sport => sport._id === item._id);
    return (
      <TouchableOpacity
        onPress={() => handleSelect(item)}
        style={[
          styles.sportItem,
          {backgroundColor: isSelected ? Colors.primaryColor : sportBgColor},
        ]}>
        <View style={styles.leftRow}>
          <View style={[styles.iconWrapper, {backgroundColor: '#FFFFFF0D'}]}>
            <Image
              source={{uri: item.image}}
              style={{
                width: 30,
                height: 30,
                resizeMode: 'contain',
                tintColor: isSelected ? Colors.white : '#2976BA',
              }}
            />
          </View>
          <Text
            style={[
              styles.sportName,
              {color: isSelected ? Colors.white : textColor},
            ]}>
            {item.name}
          </Text>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {/* <TouchableOpacity
            onPress={() => handleInfoPress(item)}
            style={{marginRight: 12}}>
            <AnySvg
              name={isDarkMode ? 'informationCircle' : 'darkInformation'}
              size={25}
            />
          </TouchableOpacity> */}

          <View
            style={[
              styles.checkbox,
              {
                backgroundColor: isSelected
                  ? Colors.primaryColor
                  : 'transparent',
                borderColor: isSelected ? Colors.primaryColor : textColor,
              },
            ]}>
            {isSelected && (
              <Text style={{color: Colors.white, fontSize: 12}}>✓</Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={[styles.container, {backgroundColor}]}>
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={onClose}>
              <AnySvg name={isDarkMode ? 'darkCross' : 'lightCross'} />
            </TouchableOpacity>
            <Text style={[styles.headerTitle, {color: textColor}]}>
              {t('Select Sport')}
            </Text>
            <View style={{width: 20}} />
          </View>

          {loader ? (
            <ActivityIndicator size="large" color={Colors.primaryColor} />
          ) : (
            <>
              <FlatList
                data={data}
                keyExtractor={item => item._id}
                showsVerticalScrollIndicator={false}
                style={{flex: 1, marginBottom: 20}}
                renderItem={renderSportItem}
              />

              <TouchableOpacity
                onPress={onClose}
                style={{
                  backgroundColor: Colors.primaryColor,
                  paddingVertical: 16,
                  borderRadius: 12,
                  alignItems: 'center',
                  marginBottom: 20,
                }}>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: 16,
                    fontFamily: fonts.UrbanistSemiBold,
                  }}>
                  Done ({selectedSports.length} selected)
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width,
    height,
    paddingTop: 30,
    paddingHorizontal: 24,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: fonts.UrbanistBold,
  },
  categoryTitle: {
    fontSize: 18,
    fontFamily: fonts.UrbanistSemiBold,
    marginVertical: 12,
  },
  sportItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 86,
    borderRadius: 10,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    width: 53,
    height: 53,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  sportName: {
    fontSize: 16,
    fontFamily: fonts.UrbanistMedium,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SelectSportModal;

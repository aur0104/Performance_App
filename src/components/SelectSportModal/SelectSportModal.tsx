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
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {Colors} from '../../utils/Colors';
import fonts from '../../utils/Fonts';
import AnySvg from '../AnySvg';
import {useNavigation} from '@react-navigation/native';
import {Sport} from '../../interfaces';
import utils from '../../utils/utils';
const {width, height} = Dimensions.get('window');
interface SportItem {
  _id: string;
  name: string;
  image: string; // or type of your IMAGES object if not just string
}
interface SportCategory {
  category: string;
  data: SportItem[];
}
interface Props {
  sportsCategories: Sport[];
  visible: boolean;
  onClose: () => void;
  onSelectSport: (sport: any) => void;
}
const SelectSportModal: React.FC<Props> = ({
  visible,
  onClose,
  onSelectSport,
  sportsCategories,
}) => {
  const {t} = useTranslation();
  const navigation = useNavigation();

  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const backgroundColor = isDarkMode ? Colors.darkBackground : Colors.white;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const sportBgColor = isDarkMode ? '#1C1C1C' : '#F2F2F2';

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const handleSelect = (item: Sport) => {
    setSelectedId(item._id);
    onSelectSport(item);
    onClose();
  };

  const handleInfoPress = (item: any) => {
    onClose();
    setTimeout(() => {
      navigation.navigate('SportInformation', {sport: item});
    }, 50);
  };

  const renderSportItem = ({item}: any) => {
    const selected = item._id === selectedId;
    return (
      <TouchableOpacity
        onPress={() => handleSelect(item)}
        style={[
          styles.sportItem,
          {backgroundColor: selected ? Colors.primaryColor : sportBgColor},
        ]}>
        <View style={styles.leftRow}>
          <View style={[styles.iconWrapper, {backgroundColor: '#FFFFFF0D'}]}>
            <Image
              source={{uri: item.image}}
              style={{
                width: 30,
                height: 30,
                resizeMode: 'contain',
                tintColor: selected ? Colors.white : '#2976BA',
              }}
            />
          </View>
          <Text
            style={[
              styles.sportName,
              {color: selected ? Colors.white : textColor},
            ]}>
            {item.name}
          </Text>
        </View>

        {/* <TouchableOpacity onPress={() => handleInfoPress(item)}>
          <AnySvg
            name={isDarkMode ? 'informationCircle' : 'darkInformation'}
            size={25}
          />
        </TouchableOpacity> */}
      </TouchableOpacity>
    );
  };
  const renderItem = ({item}: {item: Sport}) => (
    <TouchableOpacity
      onPress={() => handleSelect(item)}
      style={[
        styles.sportItem,
        {
          backgroundColor:
            item._id === selectedId ? Colors.primaryColor : sportBgColor,
        },
      ]}>
      <View style={styles.leftRow}>
        <View style={[styles.iconWrapper, {backgroundColor: '#FFFFFF0D'}]}>
          <Image
            source={{uri: item.image}}
            style={{
              width: 30,
              height: 30,
              resizeMode: 'contain',
              tintColor: item._id === selectedId ? Colors.white : '#2976BA',
            }}
          />
        </View>
        <Text
          style={[
            styles.sportName,
            {color: item._id === selectedId ? Colors.white : textColor},
          ]}>
          {utils.capitalizeWords(item?.name)}
        </Text>
      </View>
    </TouchableOpacity>
  );
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

          <FlatList
            data={sportsCategories ?? []}
            keyExtractor={item => item._id}
            showsVerticalScrollIndicator={false}
            style={{marginBottom: '5%'}}
            renderItem={({item}) => (
              <View>
                {/* <Text style={[styles.categoryTitle, {color: textColor}]}>
                  {item?.category}
                </Text> */}
                {renderItem({item})}
                {/* <FlatList
                  data={item.data}
                  keyExtractor={sport => sport.id}
                  renderItem={renderSportItem}
                  scrollEnabled={false}
                /> */}
              </View>
            )}
            ListEmptyComponent={
              <Text
                style={{color: textColor, textAlign: 'center', marginTop: 20}}>
                {t('No sports available')}
              </Text>
            }
          />
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
});

export default SelectSportModal;

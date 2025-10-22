import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import styles from './styles';
import {Colors} from '../../../utils/Colors';
import BackHeader from '../../../components/BackHeader';
import {useTranslation} from 'react-i18next';
import {PerformanceType} from '../../../interfaces';
import {getCategoryPerformance} from '../../../services/calls';
import utils from '../../../utils/utils';

interface EnduranceItem {
  _id: string;
  name: string;
  image: string;
  category: {
    _id: string;
    name: string;
    image: string;
  };
}

const Endurance: React.FC = () => {
  const route = useRoute();
  const type = route.params?.performance?.name as PerformanceType;
  const _id = route?.params?.performance?._id;
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const backgroundColor = isDarkMode
    ? Colors.darkBackground
    : Colors.lightBackground;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const viewBg = isDarkMode ? Colors.darkInputBg : Colors.lightInputBg;
  const navigation = useNavigation<any>();
  const [selected, setSelected] = useState<string | null>(null);
  const [enduranceItems, setEnduranceItems] = useState<EnduranceItem[]>([]);
  const [loader, setLoader] = useState(false);
  const getCategoryFromBackEnd = async () => {
    try {
      setLoader(true);
      if (_id) {
        const result = await getCategoryPerformance(_id as string);
        if (result?.data?.data) {
          setEnduranceItems(result.data.data);
        }
      }
    } catch (error: any) {
      utils.showToast('error', error?.message);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getCategoryFromBackEnd();
  }, []);

  const handleSelect = (id: string, screen: string, dataKey: EnduranceItem) => {
    setSelected(id);
    navigation.navigate(screen, {dataKey});
  };

  const renderItem = ({item}: {item: EnduranceItem}) => {
    const isSelected = selected === item._id;
    const borderStyle: StyleProp<ViewStyle> = isSelected
      ? {borderColor: Colors.primaryColor}
      : {borderColor: 'transparent'};
    return (
      <TouchableOpacity
        key={item._id}
        style={[
          styles.card,
          {backgroundColor: viewBg, borderColor: borderStyle.borderColor},
        ]}
        activeOpacity={0.7}
        onPress={() => handleSelect(item._id, 'RunningChallenges', item)}>
        <View style={styles.iconTextContainer}>
          {item.image?.length ? (
            <Image
              source={{uri: item.image}}
              style={{width: 40, height: 40, resizeMode: 'contain'}}
            />
          ) : (
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: Colors.gray,
              }}
            />
          )}

          <Text style={[styles.cardText, {color: textColor}]}>
            {t(item.name)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <BackHeader title={t(type)} showBackIcon />
      <FlatList
        data={enduranceItems}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        contentContainerStyle={[styles.scrollContainer, {flexGrow: 1}]}
        ListEmptyComponent={() => {
          return (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              {loader ? (
                <ActivityIndicator
                  color={isDarkMode ? Colors.white : Colors.black}
                />
              ) : (
                <Text style={[styles.cardText, {color: textColor}]}>
                  Category Not Found
                </Text>
              )}
            </View>
          );
        }}
      />
    </View>
  );
};

export default Endurance;

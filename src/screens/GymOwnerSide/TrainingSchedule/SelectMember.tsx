import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {useRoute, RouteProp} from '@react-navigation/native';
import BackHeader from '../../../components/BackHeader';
import {Colors} from '../../../utils/Colors';
import fonts from '../../../utils/Fonts';
import {hp} from '../../../utils/responsivesness';
import CustomButton from '../../../components/CustomButton';

type SelectMemberRouteProp = RouteProp<
  {SelectMember: {onSelect: (item: any[]) => void}},
  'SelectMember'
>;

interface TotalMemberProps {
  navigation?: any;
}

const membersData = [
  {id: '1', name: 'Jame John', sport: 'Basket Ball'},
  {id: '2', name: 'Emily Rose', sport: 'Basket Ball'},
  {id: '3', name: 'Alex Smith', sport: 'Basket Ball'},
  {id: '4', name: 'Lara Croft', sport: 'Basket Ball'},
  {id: '5', name: 'Tom Hardy', sport: 'Basket Ball'},
  {id: '6', name: 'Steve Nash', sport: 'Basket Ball'},
  {id: '7', name: 'John Doe', sport: 'Basket Ball'},
  {id: '8', name: 'Jane Doe', sport: 'Basket Ball'},
  {id: '9', name: 'Chris Paul', sport: 'Basket Ball'},
];

const SCREEN_WIDTH = Dimensions.get('window').width;
const ITEM_SIZE = (SCREEN_WIDTH - 48) / 3;
const numColumns = 3;

const SelectMember: React.FC<TotalMemberProps> = ({navigation}) => {
  const {t} = useTranslation();
  const route = useRoute<SelectMemberRouteProp>();
  const onSelect = route.params?.onSelect;

  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);

  const backgroundColor = isDarkMode
    ? Colors.darkBackground
    : Colors.lightBackground;
  const textColor = isDarkMode ? Colors.white : Colors.black;

  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  const toggleSelect = (id: string) => {
    setSelectedMembers(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id],
    );
  };

  const renderMember = ({item}: any) => {
    const isSelected = selectedMembers.includes(item.id);
    return (
      <TouchableOpacity
        style={{
          backgroundColor,
          alignItems: 'center',
          justifyContent: 'center',
          margin: 8,
          width: ITEM_SIZE,
          borderRadius: 12,
          paddingVertical: 6,
          marginLeft: 4,
        }}
        onPress={() => toggleSelect(item.id)}>
        <Image
          source={require('../../../assets/images/member1.png')}
          style={{
            width: 95,
            height: 95,
            borderRadius: 49,
            borderWidth: 4,
            borderColor: isSelected ? Colors.primaryColor : textColor,
          }}
        />
        <Text
          style={{
            color: textColor,
            fontSize: 18,
            fontFamily: fonts.UrbanistSemiBold,
          }}>
          {item.name}
        </Text>
        <Text
          style={{
            color: textColor,
            fontSize: 12,
            marginTop: 4,
            fontFamily: fonts.UrbanistMedium,
          }}>
          {item.sport}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor}}>
      <BackHeader title={t('Members')} showBackIcon />
      <FlatList
        data={membersData}
        numColumns={numColumns}
        key={`members_${numColumns}_columns`}
        keyExtractor={item => item.id}
        renderItem={renderMember}
        contentContainerStyle={{padding: 8, paddingBottom: 20}}
        showsVerticalScrollIndicator={false}
      />

      <CustomButton
        onPress={() => {
          const selectedData = membersData.filter(m =>
            selectedMembers.includes(m.id),
          );
          onSelect?.(selectedData);
          navigation.goBack();
        }}
        containerStyle={{marginBottom: hp(6)}}>
        {' '}
        {t('Done')}
      </CustomButton>
    </View>
  );
};

export default SelectMember;

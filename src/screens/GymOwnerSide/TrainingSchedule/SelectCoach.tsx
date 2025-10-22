import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {useRoute, RouteProp} from '@react-navigation/native';
import {Colors} from '../../../utils/Colors';
import styles from '../../AthleteSide/CommunityMember/styles';
import BackHeader from '../../../components/BackHeader';
import {Memberdata} from '../../../utils/DummyData';

interface CommunityMemberProps {
  navigation?: any;
}

type SelectCoachRouteProp = RouteProp<
  {SelectCoach: {onSelect: (item: any) => void}},
  'SelectCoach'
>;

const SelectCoach: React.FC<CommunityMemberProps> = ({navigation}) => {
  const {t} = useTranslation();
  const route = useRoute<SelectCoachRouteProp>();
  const onSelect = route.params?.onSelect;

  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const backgroundColor = isDarkMode
    ? Colors.darkBackground
    : Colors.lightBackground;

  const textColor = isDarkMode ? Colors.white : Colors.black;
  const separatorColor = isDarkMode ? '#424242' : '#E0E0E0';

  const renderItem = ({item}: any) => (
    <TouchableOpacity
      onPress={() => {
        onSelect?.(item);
        navigation.goBack();
      }}>
      <View style={[styles.memberContainer, {backgroundColor}]}>
        <View style={styles.leftRow}>
          <View style={styles.profileWrapper}>
            <Image source={item.profileImage} style={styles.profileImage} />
          </View>
          <View style={styles.memberTextInfo}>
            <Text style={[styles.nameText, {color: textColor}]}>
              {item.name}
            </Text>
            <Text style={[styles.sportText, {color: textColor}]}>
              Info@nikitaalex.com
            </Text>
          </View>
        </View>
      </View>
      <View
        style={[styles.horizontalSeparator, {backgroundColor: separatorColor}]}
      />
    </TouchableOpacity>
  );

  return (
    <View style={{flex: 1, backgroundColor}}>
      <ScrollView style={{flex: 1, backgroundColor}}>
        <BackHeader title={t('My Coaches')} showBackIcon />
        <FlatList
          data={Memberdata}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          scrollEnabled={false}
          contentContainerStyle={{paddingHorizontal: 16, paddingTop: 0}}
        />
      </ScrollView>
    </View>
  );
};

export default SelectCoach;

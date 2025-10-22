import React, {useState} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {Colors} from '../../../../utils/Colors';
import BackHeader from '../../../../components/BackHeader';
import styles from '../../../AthleteSide/ProfileSection/Settings/styles';
import AnySvg from '../../../../components/AnySvg';
import DeletePopupModal from '../../../../components/DeleteModal';
import {CommonActions} from '@react-navigation/native';
import {store} from '../../../../store';
import {setUser} from '../../../../store/Slices/userSlice';

interface AccountScreenProps {
  navigation?: any;
}

const AccountOptions = [
  {id: '2', title: 'Personal Information', route: 'UpdateInformation'},
  {id: '3', title: 'Gym Information', route: 'UpdateGymInformation'},
  {id: '5', title: 'Identity Verification', route: 'IdentityVerification'},
];

const OwnerAccount: React.FC<AccountScreenProps> = ({navigation}) => {
  const {t} = useTranslation();
  const [showDelete, setShowDelete] = useState(false);
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);

  const backgroundColor = isDarkMode
    ? Colors.darkBackground
    : Colors.lightBackground;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const itemBgColor = isDarkMode ? Colors.darkInputBg : Colors.lightInputBg;

  const renderItem = ({item}: any) => (
    <TouchableOpacity
      style={[
        styles.optionContainer,
        {
          backgroundColor: itemBgColor,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
      ]}
      onPress={() => {
        if (item?.route == 'Login') {
          store?.dispatch(setUser(null));
          navigation.dispatch(
            CommonActions.reset({
              index: 0, // Set the target screen as the first screen in the stack
              routes: [{name: 'RoleSelection'}], // Replace stack with this screen
            }),
          );
          return;
        }
        navigation.navigate(item.route);
      }}>
      <Text style={[styles.optionText, {color: textColor}]}>
        {t(item.title)}
      </Text>
      <AnySvg name={'farwordIcon'} width={8} height={14} />
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <BackHeader
        title={t('My Account')}
        showBackIcon
        rightIconName="deleteIcon"
        onRightIconPress={() => setShowDelete(true)}
      />
      <FlatList
        data={AccountOptions}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
      <DeletePopupModal
        visible={showDelete}
        onCancel={() => setShowDelete(false)}
        onDelete={() => {
          setShowDelete(false);
        }}
      />
    </View>
  );
};

export default OwnerAccount;

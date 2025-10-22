import React from 'react';
import {FlatList, Text, View, useColorScheme} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Colors} from '../../../utils/Colors';
import {styles} from './styles';
import BackHeader from '../../../components/BackHeader';
import {notifications} from '../../../utils/DummyData';
import {useSelector} from 'react-redux';

interface NotificationProps {
  navigation?: any;
}

const Notification: React.FC<NotificationProps> = ({navigation}) => {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);

  const backgroundColor = isDarkMode ? Colors.darkInputBg : '#F5F5F5';
  const textColor = isDarkMode ? Colors.white : Colors.black;

  const separatorColor = isDarkMode ? '#424242' : '#E0E0E0';

  const renderItem = ({item}: {item: (typeof notifications)[0]}) => (
    <View style={[styles.notificationContainer, {backgroundColor}]}>
      <Text style={[styles.notificationText, {color: textColor}]}>
        {t(item.messageKey)}
      </Text>
      <Text style={[styles.notificationTime, {color: '#9E9E9E'}]}>
        {item.time}
      </Text>
    </View>
  );

  const ItemSeparator = () => (
    <View style={[styles.separator, {backgroundColor: separatorColor}]} />
  );

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <BackHeader title={t('Notifications')} showBackIcon />
      <FlatList
        data={notifications}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparator}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default Notification;

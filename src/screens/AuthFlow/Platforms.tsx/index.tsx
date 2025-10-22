import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
  FlatList,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {Colors} from '../../../utils/Colors';
import BackHeader from '../../../components/BackHeader';
import CustomButton from '../../../components/CustomButton';
import styles from './styles';
import InputField from '../../../components/CustomInputField';

interface PlatformsProps {
  navigation?: any;
}

const Platforms: React.FC<PlatformsProps> = ({navigation}) => {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const backgroundColor = isDarkMode ? Colors.darkBackground : Colors.white;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const textColor2 = isDarkMode ? '#9E9E9E' : '#424242';
  const separatorColor = isDarkMode ? '#424242' : '#E0E0E0';

  const socialOptions = [
    'Facebook',
    'Instagram',
    'Linkedin',
    'Google Search',
    'A Friend or teammate',
    'Other',
  ];

  const [selectedSocial, setSelectedSocial] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelectSocial = (option: string) => {
    setSelectedSocial(option);
    setModalVisible(false);
  };

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <ScrollView
        contentContainerStyle={[styles.container, {backgroundColor}]}
        keyboardShouldPersistTaps="handled">
        <BackHeader title={t('Sign Up')} showBackIcon />
        <Text style={[styles.title, {color: textColor}]}>
          {t('Tell us how you found us')}
        </Text>
        <Text style={[styles.subtitle, {color: textColor2}]}>
          {t(
            'Let us know how you found us — it helps us improve and grow! You can skip this if you prefer.',
          )}
        </Text>

        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{paddingHorizontal: 20}}>
          <InputField
            label=""
            value={selectedSocial}
            onChangeText={() => {}}
            onRightIconClick={() => setModalVisible(true)}
            placeholder={t('How did you hear about us (Optional)')}
            iconRightName={isDarkMode ? 'darkDown' : 'lightDown'}
            editable={false}
          />
        </TouchableOpacity>

        <Modal visible={modalVisible} transparent animationType="fade">
          <Pressable
            style={styles.modalOverlay}
            onPress={() => setModalVisible(false)}>
            <Pressable
              style={[
                styles.modalContainer,
                {
                  backgroundColor: isDarkMode
                    ? Colors.darkInputBg
                    : Colors.white,
                },
              ]}
              onPress={() => {}}>
              <FlatList
                data={socialOptions}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={() => (
                  <View
                    style={[
                      styles.separator,
                      {backgroundColor: separatorColor},
                    ]}
                  />
                )}
                renderItem={({item}) => (
                  <TouchableOpacity onPress={() => handleSelectSocial(item)}>
                    <Text style={[styles.optionText, {color: textColor}]}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </Pressable>
          </Pressable>
        </Modal>
      </ScrollView>

      <CustomButton
        onPress={() => navigation.navigate('AcceptTerms')}
        disable={!selectedSocial}>
        {t('Continue')}
      </CustomButton>

      <TouchableOpacity
        onPress={() => navigation.navigate('AcceptTerms')}
        style={styles.button}>
        <Text style={[styles.skipText, {color: textColor}]}>
          {t('Skip for later')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Platforms;

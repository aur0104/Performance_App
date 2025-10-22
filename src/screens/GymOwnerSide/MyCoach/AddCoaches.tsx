import React, {useState} from 'react';
import {View, ScrollView, Image, TouchableOpacity, Text} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';
import BackHeader from '../../../components/BackHeader';
import CustomButton from '../../../components/CustomButton';
import {Colors} from '../../../utils/Colors';
import styles from '../AddChallenges/styles';
import InputField from '../../../components/CustomInputField';
import {hp} from '../../../utils/responsivesness';

const AddCoaches = ({navigation}: any) => {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);

  const backgroundColor = isDarkMode
    ? Colors.darkBackground
    : Colors.lightBackground;

  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [photo, setPhoto] = useState<any>(null);

  const handleImagePick = async () => {
    const result = await launchImageLibrary({mediaType: 'photo'});
    if (result?.assets?.length) {
      setPhoto(result.assets[0]);
    }
  };

  const handleChange = (field: string) => (text: string) =>
    setValues({...values, [field]: text});

  const handleButtonClick = () => {
    navigation.navigate('ProfileCreated');
  };

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <BackHeader
        title={t('Add Coach')}
        showBackIcon
        containerStyle={{marginBottom: 0}}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <InputField
          label=""
          value={values.name}
          onChangeText={handleChange('name')}
          placeholder="Coach Name"
        />

        <InputField
          label=""
          value={values.email}
          onChangeText={handleChange('email')}
          placeholder="Coach Email"
        />

        <InputField
          label=" "
          value={values.password}
          onChangeText={handleChange('password')}
          placeholder="Password"
        />

        <InputField
          label=""
          value={values.confirmPassword}
          onChangeText={handleChange('confirmPassword')}
          placeholder="Confirm Password"
        />

        <InputField
          label=""
          value={photo?.fileName || ''}
          placeholder="Photo/video"
          onRightIconClick={handleImagePick}
          iconRightName={'attachment'}
          editable={false}
        />

        {photo && (
          <View style={styles.photoRow}>
            <Image
              source={{uri: photo.uri}}
              style={styles.photoPreview}
              resizeMode="cover"
            />
          </View>
        )}
      </ScrollView>
      <CustomButton
        onPress={handleButtonClick}
        containerStyle={{marginBottom: hp(5)}}>
        {t('Save Now')}
      </CustomButton>
    </View>
  );
};

export default AddCoaches;

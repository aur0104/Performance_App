import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import BackHeader from '../../../components/BackHeader';
import CustomButton from '../../../components/CustomButton';
import {Colors} from '../../../utils/Colors';
import styles from '../AddChallenges/styles';
import InputField from '../../../components/CustomInputField';
import {hp} from '../../../utils/responsivesness';

const UpdateCoachPassword = ({navigation}: any) => {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);

  const backgroundColor = isDarkMode
    ? Colors.darkBackground
    : Colors.lightBackground;

  const [values, setValues] = useState({
    password: '',
    confirmPassword: '',
  });

  const handleChange = (field: string) => (text: string) =>
    setValues({...values, [field]: text});

  const handleButtonClick = () => {
    navigation.goBack();
  };

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <BackHeader
        title={t('Password')}
        showBackIcon
        containerStyle={{marginBottom: 0}}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <InputField
          label=" "
          value={values.password}
          onChangeText={handleChange('password')}
          placeholder="New Password"
        />

        <InputField
          label=""
          value={values.confirmPassword}
          onChangeText={handleChange('confirmPassword')}
          placeholder="Confirm Password"
        />
      </ScrollView>
      <CustomButton
        onPress={handleButtonClick}
        containerStyle={{marginBottom: hp(5)}}>
        {t('Update Password')}
      </CustomButton>
    </View>
  );
};

export default UpdateCoachPassword;

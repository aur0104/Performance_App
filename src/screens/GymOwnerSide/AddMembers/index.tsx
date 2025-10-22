import React, {useState} from 'react';
import {View, ScrollView, ActivityIndicator} from 'react-native';
import {Formik} from 'formik';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import * as Yup from 'yup';
import styles from '../../AuthFlow/SignUp/styles';
import {Colors} from '../../../utils/Colors';
import BackHeader from '../../../components/BackHeader';
import InputField from '../../../components/CustomInputField';
import CustomButton from '../../../components/CustomButton';
import Toast from 'react-native-toast-message';
import {apiClient} from '../../../services/client';

interface AddMemberProps {
  navigation?: any;
}

const AddMemberValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Name must be at least 3 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  contact: Yup.string()
    .matches(/^[0-9]{7,15}$/, 'Phone number must be between 7 and 15 digits')
    .required('Phone number is required'),
  address: Yup.string()
    .min(10, 'Address must be at least 10 characters')
    .required('Address is required'),
});
const AddMember: React.FC<AddMemberProps> = ({navigation}) => {
  const {t} = useTranslation();
  const [loading, setLoading] = useState(false);
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const user = useSelector((state: any) => state.user.user);
  const backgroundColor = isDarkMode ? Colors.darkBackground : Colors.white;
  const handleAddMember = async (values: any) => {
    try {
      setLoading(true);
      const response = await apiClient.post(
        '/profile/add-gym-awaiting-member',
        {
          name: values.name,
          email: values.email,
          contact: values.contact,
          address: values.address,
          gym: user?.gym?._id,
        },
      );

      setLoading(false);
      if (response.data) {
        navigation.navigate('MemberAddedSuccess', response?.data);
      }
    } catch (error: any) {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.response?.data?.message || 'Failed to add member',
      });
    }
  };

  return (
    <View style={{flex: 1, backgroundColor}}>
      <Formik
        initialValues={{
          name: '',
          email: '',
          contact: '',
          address: '',
        }}
        validationSchema={AddMemberValidationSchema}
        onSubmit={handleAddMember}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
          isValid,
          dirty,
        }) => (
          <>
            <ScrollView
              style={styles.container}
              showsVerticalScrollIndicator={false}>
              <BackHeader
                title={t('Add Member')}
                showBackIcon
                containerStyle={{marginBottom: 0}}
              />
              <View style={styles.inputContainer}>
                <InputField
                  label=""
                  value={values.name}
                  onChangeText={handleChange('name')}
                  placeholder={t('Name')}
                  onBlur={handleBlur('name')}
                  error={errors.name}
                  showError={touched.name}
                />
                <InputField
                  label=""
                  value={values.email}
                  onChangeText={handleChange('email')}
                  placeholder={t('Email')}
                  onBlur={handleBlur('email')}
                  error={errors.email}
                  showError={touched.email}
                />
                <InputField
                  label=""
                  value={values.address}
                  onChangeText={handleChange('address')}
                  placeholder={t('Address')}
                  onBlur={handleBlur('address')}
                  error={errors.address}
                  showError={touched.address}
                />
                <InputField
                  label=""
                  value={values.contact}
                  onChangeText={handleChange('contact')}
                  placeholder={t('Phone')}
                  onBlur={handleBlur('contact')}
                  iconLeftName="call"
                  keyboardType="numeric"
                  error={errors.contact}
                  isPhoneNumber={true}
                  showError={touched.contact}
                />
              </View>
            </ScrollView>
            <CustomButton
              onPress={handleSubmit}
              disable={!isValid || !dirty || loading}
              containerStyle={{marginBottom: '12%'}}>
              {loading ? <ActivityIndicator color={Colors.white} /> : t('Save')}
            </CustomButton>
          </>
        )}
      </Formik>
    </View>
  );
};

export default AddMember;

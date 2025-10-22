import React, {useState} from 'react';
import {View, TouchableOpacity, ScrollView, Text} from 'react-native';
import {Formik} from 'formik';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import styles from '../../AuthFlow/SignUp/styles';
import {Colors} from '../../../utils/Colors';
import BackHeader from '../../../components/BackHeader';
import InputField from '../../../components/CustomInputField';
import CustomButton from '../../../components/CustomButton';
import DeletePopupModal from '../../../components/DeleteModal';

interface EditMemberProps {
  navigation?: any;
}

const EditMember: React.FC<EditMemberProps> = ({navigation}) => {
  const {t} = useTranslation();
  const [showDelete, setShowDelete] = useState(false);
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const backgroundColor = isDarkMode ? Colors.darkBackground : Colors.white;

  return (
    <View style={{flex: 1, backgroundColor}}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <BackHeader
          title={t('Add Member')}
          showBackIcon
          containerStyle={{marginBottom: 0}}
        />

        <Formik
          initialValues={{
            name: 'James John',
            email: 'Info@JameJohn.com',
            number: '13456778856',
            location: 'Street 8 Mian carbe international',
          }}
          // validationSchema={SignUPValidationSchema}
          onSubmit={values => console.log(values)}>
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
                value={values.location}
                onChangeText={handleChange('location')}
                placeholder={t('Address')}
                onBlur={handleBlur('location')}
                error={errors.email}
                showError={touched.email}
              />
              <InputField
                label=""
                value={values.number}
                onChangeText={handleChange('number')}
                placeholder={t('Phone')}
                onBlur={handleBlur('number')}
                iconLeftName="call"
                keyboardType="numeric"
                error={errors.number}
                isPhoneNumber={true}
                showError={touched.number}
              />
            </View>
          )}
        </Formik>
      </ScrollView>
      <CustomButton
        onPress={() => navigation.goBack()}
        //disable={isValid || !dirty}
        containerStyle={{marginBottom: '4%'}}>
        {t('Save')}
      </CustomButton>
      <TouchableOpacity
        style={[styles.deleteButton, {marginBottom: 30}]}
        onPress={() => setShowDelete(true)}>
        <Text style={styles.deleteText}>{t('Delete')}</Text>
      </TouchableOpacity>
      <DeletePopupModal
        visible={showDelete}
        onCancel={() => setShowDelete(false)}
        onDelete={() => navigation.goBack()}
      />
    </View>
  );
};

export default EditMember;

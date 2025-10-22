import React, {useState} from 'react';
import {View, TouchableOpacity, ScrollView} from 'react-native';
import {Formik} from 'formik';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {Colors} from '../../../../utils/Colors';
import BackHeader from '../../../../components/BackHeader';
import {SignUPValidationSchema} from '../../../../utils/Validations';
import InputField from '../../../../components/CustomInputField';
import CustomButton from '../../../../components/CustomButton';
import styles from '../../../AuthFlow/SignUp/styles';

interface SignUpProps {
  navigation?: any;
}

const UpdateInformation: React.FC<SignUpProps> = ({navigation}) => {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const backgroundColor = isDarkMode ? Colors.darkBackground : Colors.white;
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  return (
    <View style={{flex: 1, backgroundColor}}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <BackHeader title={t('Personal Information')} showBackIcon />

        <Formik
          initialValues={{
            name: 'Adam Scout',
            email: 'info@adamscout.com',
            dob: '23 march 1997',
          }}
          validationSchema={SignUPValidationSchema}
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
                placeholder={t('Your Name')}
                onBlur={handleBlur('name')}
                error={errors.name}
                showError={touched.name}
              />
              <InputField
                label=""
                value={values.email}
                onChangeText={handleChange('email')}
                placeholder={t('Email Address')}
                onBlur={handleBlur('email')}
                error={errors.email}
                showError={touched.email}
              />
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                activeOpacity={0.8}>
                <InputField
                  label=""
                  value={selectedDate || values.dob}
                  placeholder={t('Date of Birth')}
                  onBlur={handleBlur('dob')}
                  editable={false}
                  error={errors.dob}
                  showError={touched.dob}
                  pointerEvents="none"
                />
              </TouchableOpacity>

              {showDatePicker && (
                <DateTimePicker
                  isVisible={showDatePicker}
                  mode="date"
                  maximumDate={new Date()}
                  onConfirm={date => {
                    const day = date.getDate().toString().padStart(2, '0');
                    const month = (date.getMonth() + 1)
                      .toString()
                      .padStart(2, '0');
                    const year = date.getFullYear();
                    const formattedDate = `${day}-${month}-${year}`;
                    setSelectedDate(formattedDate);
                    setFieldValue('dob', formattedDate);
                    setShowDatePicker(false);
                  }}
                  onCancel={() => setShowDatePicker(false)}
                />
              )}
            </View>
          )}
        </Formik>
      </ScrollView>
      <CustomButton
        onPress={() => navigation.goBack()}
        //disable={isValid || !dirty}
        containerStyle={{marginBottom: '12%'}}>
        {t('Update')}
      </CustomButton>
    </View>
  );
};

export default UpdateInformation;

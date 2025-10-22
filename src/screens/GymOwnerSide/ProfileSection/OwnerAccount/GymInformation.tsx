import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import {Formik} from 'formik';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import styles from '../../../AuthFlow/SignUp/styles';
import {Colors} from '../../../../utils/Colors';
import BackHeader from '../../../../components/BackHeader';
import {SignUPValidationSchema} from '../../../../utils/Validations';
import InputField from '../../../../components/CustomInputField';
import CustomButton from '../../../../components/CustomButton';
import SelectSportModal from '../../../../components/SelectSports';

interface SignUpProps {
  navigation?: any;
}

const UpdateGymInformation: React.FC<SignUpProps> = ({navigation}) => {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const backgroundColor = isDarkMode ? Colors.darkBackground : Colors.white;
  const viewBg = isDarkMode ? Colors.darkInputBg : Colors.lightInputBg;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const [sportModalVisible, setSportModalVisible] = useState(false);
  const [selectedSports, setSelectedSports] = useState<any[]>([]);

  const removeSport = (id: string) => {
    setSelectedSports(prev => prev.filter(sport => sport.id !== id));
  };

  return (
    <View style={{flex: 1, backgroundColor}}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <BackHeader title={t('Gym Information')} showBackIcon />

        <Formik
          initialValues={{
            name: 'AVX Training Club',
            address: 'Street 8 Mian carbe international',
            sports: 'Bjj',
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
                placeholder={t('Gym Name')}
                onBlur={handleBlur('name')}
                error={errors.name}
                showError={touched.name}
              />
              <InputField
                label=""
                value={values.address}
                onChangeText={handleChange('address')}
                placeholder={t('Enter Address')}
                onBlur={handleBlur('address')}
                error={errors.address}
                showError={touched.address}
                // iconRightName={isDarkMode ? 'darkDown' : 'lightDown'}
              />

              <InputField
                label=""
                value={
                  selectedSports.length > 0
                    ? `${selectedSports.length} ${t('sport(s) selected')}`
                    : ''
                }
                placeholder={t('Select Sports')}
                iconRightName={isDarkMode ? 'darkDown' : 'lightDown'}
                onRightIconClick={() => setSportModalVisible(true)}
                editable={false}
              />

              <View
                style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 10}}>
                {selectedSports.map(sport => (
                  <View
                    key={sport.id}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: viewBg,
                      paddingHorizontal: 12,
                      height: 36,
                      borderRadius: 80,
                      marginRight: 8,
                      marginBottom: 8,
                    }}>
                    <Text style={{color: textColor, marginRight: 8}}>
                      {sport.name}
                    </Text>
                    <TouchableOpacity onPress={() => removeSport(sport.id)}>
                      <Text style={{color: Colors.red}}>✕</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
      <CustomButton
        onPress={() => navigation.goBack()}
        //disable={isValid || !dirty}
        containerStyle={{marginBottom: '12%'}}>
        {t('Updated')}
      </CustomButton>

      <SelectSportModal
        visible={sportModalVisible}
        onClose={() => setSportModalVisible(false)}
        onSelectSport={(sport: any) => {
          const isAlreadySelected = selectedSports.some(s => s.id === sport.id);
          if (!isAlreadySelected) {
            setSelectedSports([...selectedSports, sport]);
          }
          setSportModalVisible(false);
        }}
      />
    </View>
  );
};

export default UpdateGymInformation;

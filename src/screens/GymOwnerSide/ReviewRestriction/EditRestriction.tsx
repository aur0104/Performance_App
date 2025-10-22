import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView, Modal} from 'react-native';
import {Formik} from 'formik';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import styles from '../../AuthFlow/SignUp/styles';
import BackHeader from '../../../components/BackHeader';
import InputField from '../../../components/CustomInputField';
import {Colors} from '../../../utils/Colors';
import CustomButton from '../../../components/CustomButton';
import SelectSportModal from '../../../components/SelectSports';

interface RestrictionProps {
  navigation?: any;
}

const EditRestriction: React.FC<RestrictionProps> = ({navigation}) => {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const backgroundColor = isDarkMode ? Colors.darkBackground : Colors.white;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const separaterColor = isDarkMode ? '#424242' : '#E0E0E0';
  const [sportModalVisible, setSportModalVisible] = useState(false);
  const [selectedSport, setSelectedSport] = useState(
    'Australian Rules Football',
  );
  const [monthModalVisible, setMonthModalVisible] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(t('Weekly'));
  const [restrictionModalVisible, setRestrictionModalVisible] = useState(false);
  const [selectedRestriction, setSelectedRestriction] = useState('1');

  return (
    <View style={{flex: 1, backgroundColor}}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <BackHeader title={t('Review Restriction')} showBackIcon />

        <Formik
          initialValues={{
            restriction: selectedRestriction,
            month: selectedMonth,
            sport: 'Australian Rules Football',
          }}
          onSubmit={values => {}}>
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
                value={selectedSport?.name || 'Australian Rules Football'}
                placeholder={t('Select Sport')}
                iconRightName={isDarkMode ? 'darkDown' : 'lightDown'}
                onRightIconClick={() => setSportModalVisible(true)}
                editable={false}
              />

              <InputField
                label=""
                value={selectedMonth}
                placeholder={t('Select Type')}
                iconRightName={isDarkMode ? 'darkDown' : 'lightDown'}
                onRightIconClick={() => setMonthModalVisible(true)}
                editable={false}
              />

              <InputField
                label=""
                value={selectedRestriction}
                placeholder={t('Restriction Limit')}
                iconRightName={isDarkMode ? 'darkDown' : 'lightDown'}
                onRightIconClick={() => setRestrictionModalVisible(true)}
                editable={false}
              />
            </View>
          )}
        </Formik>
      </ScrollView>
      <CustomButton
        onPress={() => navigation.goBack()}
        //  disable={!dirty || !isValid}
        containerStyle={{marginBottom: '12%'}}>
        {t('Save')}
      </CustomButton>

      <SelectSportModal
        visible={sportModalVisible}
        onClose={() => setSportModalVisible(false)}
        onSelectSport={(sport: any) => {
          setSelectedSport(sport);
          setSportModalVisible(false);
        }}
      />

      <Modal transparent visible={monthModalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.genderModal, {backgroundColor}]}>
            {[t('Weekly'), t('Monthly')].map((monthName, index) => (
              <React.Fragment key={monthName}>
                {index > 0 && (
                  <View
                    style={[
                      styles.separator,
                      {backgroundColor: separaterColor},
                    ]}
                  />
                )}
                <TouchableOpacity
                  style={styles.genderOption}
                  onPress={() => {
                    setSelectedMonth(monthName);
                    setMonthModalVisible(false);
                  }}>
                  <Text style={[styles.genderText, {color: textColor}]}>
                    {monthName}
                  </Text>
                </TouchableOpacity>
              </React.Fragment>
            ))}
          </View>
        </View>
      </Modal>
      <Modal transparent visible={restrictionModalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <ScrollView
            style={[styles.genderModal, {backgroundColor}]}
            showsVerticalScrollIndicator={false}>
            {Array.from({length: 30}, (_, i) => (i + 1).toString()).map(
              (num, index) => (
                <React.Fragment key={num}>
                  {index > 0 && (
                    <View
                      style={[
                        styles.separator,
                        {backgroundColor: separaterColor},
                      ]}
                    />
                  )}
                  <TouchableOpacity
                    style={styles.genderOption}
                    onPress={() => {
                      setSelectedRestriction(num);
                      setRestrictionModalVisible(false);
                    }}>
                    <Text style={[styles.genderText, {color: textColor}]}>
                      {num}
                    </Text>
                  </TouchableOpacity>
                </React.Fragment>
              ),
            )}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default EditRestriction;

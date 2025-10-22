import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {Colors} from '../../../../utils/Colors';
import BackHeader from '../../../../components/BackHeader';
import InputField from '../../../../components/CustomInputField';
import styles from './styles';
import CustomButton from '../../../../components/CustomButton';
import AnySvg from '../../../../components/AnySvg';

export interface BuyPlanProps {
  navigation?: any;
}

const BuyPlan: React.FC<BuyPlanProps> = ({navigation}) => {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);

  const backgroundColor = isDarkMode ? Colors.darkBackground : Colors.white;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const textColor2 = isDarkMode ? '#616161' : '#424242';
  const separaterColor = isDarkMode ? '#424242' : '#E0E0E0';

  const [selectedMethod, setSelectedMethod] = useState<string>('mastercard');
  const [values, setValues] = useState({
    cardHolder: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const handleChange = (field: string) => (text: string) => {
    setValues({...values, [field]: text});
  };

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <BackHeader title={t('Buy Membership')} showBackIcon />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.paymentRow}>
          <TouchableOpacity
            style={[
              styles.paymentButton,
              {
                borderColor:
                  selectedMethod === 'mastercard'
                    ? Colors.primaryColor
                    : separaterColor,
              },
            ]}
            onPress={() => setSelectedMethod('mastercard')}>
            <AnySvg name="mastercard" width={50} height={32} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.paymentButton,
              {
                borderColor:
                  selectedMethod === 'googlepay'
                    ? Colors.primaryColor
                    : separaterColor,
              },
            ]}
            onPress={() => setSelectedMethod('googlepay')}>
            <AnySvg name="googleIcon" size={20} />
            <Text style={[styles.paymentText, {color: textColor2}]}>
              {t('Pay')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.paymentButton,
              {
                borderColor:
                  selectedMethod === 'applepay'
                    ? Colors.primaryColor
                    : separaterColor,
              },
            ]}
            onPress={() => setSelectedMethod('applepay')}>
            <AnySvg
              name={isDarkMode ? 'appleIcon' : 'appleIconblack'}
              size={20}
            />
            <Text style={[styles.paymentText, {color: textColor2}]}>
              {t('Pay')}
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={[styles.labelText, {color: textColor}]}>
          {t('Add Payment Details')}
        </Text>
        <Text style={[styles.subText, {color: textColor2}]}>
          {t('Add your card detail and pay for premium plan')}
        </Text>

        <InputField
          label=""
          value={values.cardHolder}
          onChangeText={handleChange('cardHolder')}
          placeholder={t('Card Holder Name')}
          placeholderTextColor={textColor2}
          containerStyle={styles.input}
        />
        <InputField
          label=""
          value={values.cardNumber}
          onChangeText={handleChange('cardNumber')}
          placeholder={t('Your Card Number')}
          placeholderTextColor={textColor2}
          containerStyle={styles.input}
          keyboardType="numeric"
        />

        <View style={styles.rowInputs}>
          <InputField
            label=""
            value={values.expiry}
            onChangeText={handleChange('expiry')}
            placeholder={t('Expiry Date')}
            containerStyle={styles.halfInput}
            placeholderTextColor={textColor2}
            keyboardType="numeric"
          />
          <InputField
            label=""
            value={values.cvv}
            onChangeText={handleChange('cvv')}
            placeholder={t('CVV')}
            containerStyle={styles.halfInput}
            placeholderTextColor={textColor2}
            keyboardType="numeric"
          />
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <CustomButton
          onPress={() => navigation.navigate('BuyMembershipSuccess')}>
          {' '}
          {t('Proceed Payment')}
        </CustomButton>
      </View>
    </View>
  );
};

export default BuyPlan;

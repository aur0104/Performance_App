import React, {useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import CustomButton from '../../../../components/CustomButton';
import {hp} from '../../../../utils/responsivesness';
import {Colors} from '../../../../utils/Colors';
import BackHeader from '../../../../components/BackHeader';
import styles from './styles';

export interface MemberShipProps {
  navigation?: any;
}

const MemberShipPlan: React.FC<MemberShipProps> = ({navigation}) => {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const [selectedPlan, setSelectedPlan] = useState<'basic' | 'premium' | null>(
    null,
  );

  const backgroundColor = isDarkMode ? Colors.darkBackground : Colors.white;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const secondaryTextColor = isDarkMode ? '#9E9E9E' : '#424242';
  const separatorColor = isDarkMode ? '#424242' : '#E0E0E0';

  return (
    <ScrollView
      style={[styles.container, {backgroundColor}]}
      showsVerticalScrollIndicator={false}>
      <BackHeader title={t('Membership')} showBackIcon />
      <Text style={[styles.selectPlanText, {color: textColor}]}>
        {t('Select a plan')}
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.planScrollContainer}>
        <TouchableOpacity
          style={[
            styles.planCard,
            {
              backgroundColor:
                selectedPlan === 'basic' ? Colors.primaryColor : '#BFBFBF',
            },
          ]}
          onPress={() => setSelectedPlan('basic')}>
          <View style={styles.planCardHeader}>
            <Text
              style={[
                styles.planTitle,
                {
                  color: selectedPlan === 'basic' ? Colors.white : Colors.black,
                },
              ]}>
              {t('Basic Plan')}
            </Text>
            {selectedPlan === 'basic' && (
              <Text style={{fontSize: 20, color: Colors.white}}>✓</Text>
            )}
          </View>
          <Text
            style={[
              styles.planSubtitle,
              {
                color: selectedPlan === 'basic' ? Colors.white : Colors.black,
              },
            ]}>
            {t('Individual users Plan')}
          </Text>
          <View
            style={[
              styles.separator,
              {
                backgroundColor:
                  selectedPlan === 'basic' ? Colors.white : separatorColor,
              },
            ]}
          />
          <Text
            style={[
              styles.planPrice,
              {
                color: selectedPlan === 'basic' ? Colors.white : Colors.black,
              },
            ]}>
            {t('$20/month')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.planCard,
            {
              backgroundColor:
                selectedPlan === 'premium' ? Colors.primaryColor : '#BFBFBF',
            },
          ]}
          onPress={() => setSelectedPlan('premium')}>
          <View style={styles.planCardHeader}>
            <Text
              style={[
                styles.planTitle,
                {
                  color:
                    selectedPlan === 'premium' ? Colors.white : Colors.black,
                },
              ]}>
              {t('Premium Plan')}
            </Text>
            {selectedPlan === 'premium' && (
              <Text style={{fontSize: 20, color: Colors.white}}>✓</Text>
            )}
          </View>
          <Text
            style={[
              styles.planSubtitle,
              {color: selectedPlan === 'premium' ? Colors.white : Colors.black},
            ]}>
            {t('Gym Owner/Club')}
          </Text>
          <View
            style={[
              styles.separator,
              {
                backgroundColor:
                  selectedPlan === 'premium' ? Colors.white : separatorColor,
              },
            ]}
          />
          <Text
            style={[
              styles.planPrice,
              {color: selectedPlan === 'premium' ? Colors.white : Colors.black},
            ]}>
            {t('$250/month')}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.benefitsContainer}>
        <View style={[styles.benefitsHeader, {backgroundColor: '#BFBFBF'}]}>
          <Text style={[styles.benefitsHeaderText, {color: Colors.black}]}>
            {t('Benefits included')}
          </Text>
        </View>
        <View style={styles.benefitsList}>
          {[
            t('Self review/training journal+calendar'),
            t(
              'Customisable training logs for tracking personal workouts, metrics and goals',
            ),
            t(
              'Visual progress reports – athletes can monitor their improvements over time',
            ),
            t('Use community functions'),
            t('Use public community groups'),
            t('Post training clips and receive peer to peer feedback'),
            t(
              'Custom skill tracking, Upload photos & videos (stored for 60 days)',
            ),
          ].map((benefit, index) => (
            <View style={styles.benefitItem} key={index}>
              <Text style={{fontSize: 16, color: Colors.primaryColor}}>✓</Text>
              <Text style={[styles.benefitText, {color: secondaryTextColor}]}>
                {benefit}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <Text style={[styles.disclaimerText, {color: secondaryTextColor}]}>
        {t(
          'By tapping Continue, you will be charged, your subscription will auto-renew for the same price and package length until you cancel via App Store settings, and you agree to our Terms.',
        )}
      </Text>

      <CustomButton
        onPress={() => navigation.navigate('BuyPlan')}
        disable={!selectedPlan}
        containerStyle={{marginBottom: hp(5)}}>
        {t('Buy Plan')}
      </CustomButton>
    </ScrollView>
  );
};

export default MemberShipPlan;

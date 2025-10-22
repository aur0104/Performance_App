import React, {useState} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';
import LanguageCard from '../../../Language/LanguageCard';
import CustomButton from '../../../../components/CustomButton';
import {languageData} from '../../../Language/languageData';
import {styles} from '../../../Language/styles';
import {Colors} from '../../../../utils/Colors';
import BackHeader from '../../../../components/BackHeader';
import {hp} from '../../../../utils/responsivesness';

const ChangeLanguage = ({navigation}: any) => {
  const isDarkMode = useSelector((state: any) => state.theme.switchDarkTheme);
  const {t} = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const handleCardPress = (name: string) => {
    setSelectedLanguage(name);
  };
  const handleContinue = () => {
    if (selectedLanguage) {
      navigation.goBack();
    }
  };
  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: isDarkMode
            ? Colors.darkBackground
            : Colors.lightBackground,
        },
      ]}>
      <LinearGradient
        colors={
          isDarkMode
            ? ['#101010', '#313130']
            : [Colors.white, Colors.lightBackground]
        }
        style={[styles.gradient, {paddingTop: hp(0)}]}>
        <BackHeader title={t('Language')} showBackIcon />
        <View style={styles.grid}>
          {languageData.map(item => (
            <LanguageCard
              key={item.id}
              name={item.name}
              image={item.image}
              isDarkMode={isDarkMode}
              isSelected={selectedLanguage === item.name}
              onPress={() => handleCardPress(item.name)}
            />
          ))}
        </View>
        <View style={[styles.buttonWrapper, {marginTop: hp(26)}]}>
          <CustomButton onPress={handleContinue} disable={!selectedLanguage}>
            {t('Continue')}
          </CustomButton>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};
export default ChangeLanguage;

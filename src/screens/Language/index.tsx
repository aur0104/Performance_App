import React, {useState} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../utils/Colors';
import {styles} from './styles';
import {languageData} from './languageData';
import LanguageCard from './LanguageCard';
import CustomButton from '../../components/CustomButton';
const Language = ({navigation}: any) => {
  const isDarkMode = useSelector((state: any) => state.theme.switchDarkTheme);
  const {t} = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const handleCardPress = (name: string) => {
    setSelectedLanguage(name);
  };
  const handleContinue = () => {
    if (selectedLanguage) {
      navigation.navigate('Onboarding');
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
        style={styles.gradient}>
        <Text
          style={[
            styles.title,
            {color: isDarkMode ? Colors.white : Colors.black},
          ]}>
          {t('Language')}
        </Text>
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
        <View style={styles.buttonWrapper}>
          <CustomButton onPress={handleContinue} disabled={!selectedLanguage}>
            {t('Continue')}
          </CustomButton>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};
export default Language;

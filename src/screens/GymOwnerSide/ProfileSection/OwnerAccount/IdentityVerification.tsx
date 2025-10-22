import React from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {Colors} from '../../../../utils/Colors';
import BackHeader from '../../../../components/BackHeader';
import {IMAGES} from '../../../../assets/images';
import fonts from '../../../../utils/Fonts';

interface SignUpProps {
  navigation?: any;
}

const IdentityVerification: React.FC<SignUpProps> = ({navigation}) => {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);

  const backgroundColor = isDarkMode ? Colors.darkBackground : Colors.white;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const separaterColor = isDarkMode ? '#424242' : '#E0E0E0';

  return (
    <ScrollView
      style={[styles.container, {backgroundColor}]}
      contentContainerStyle={styles.content}>
      <BackHeader title={t('IdentityVerification')} showBackIcon />

      <Text style={[styles.sectionTitle, {color: textColor}]}>
        {t('RegistrationDocument')}
      </Text>
      <Image
        source={IMAGES.doc}
        style={[styles.image, {marginHorizontal: 20}]}
      />

      <View style={[styles.separator, {backgroundColor: separaterColor}]} />

      <Text style={[styles.sectionTitle, {color: textColor}]}>{t('CNIC')}</Text>
      <View style={styles.row}>
        <Image source={IMAGES.cnic1} style={styles.image} />
        <Image source={IMAGES.cnic2} style={styles.image} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 20,
    fontFamily: fonts.UrbanistSemiBold,
  },
  image: {
    width: 58,
    height: 56,
    borderRadius: 7,
    marginRight: 10,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
  },
  separator: {
    height: 1,
    width: '92%',
    alignSelf: 'center',
    marginVertical: 20,
  },
});

export default IdentityVerification;

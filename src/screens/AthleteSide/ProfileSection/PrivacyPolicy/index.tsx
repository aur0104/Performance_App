import React from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import BackHeader from '../../../../components/BackHeader';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {Colors} from '../../../../utils/Colors';
import fonts from '../../../../utils/Fonts';
import {privacyPolicy} from '../../../../utils/DummyData';

interface PrivacyPolicyProps {
  navigation?: any;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({navigation}) => {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);

  const backgroundColor = isDarkMode ? Colors.darkBackground : Colors.white;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const separatorColor = isDarkMode ? '#424242' : '#D4D4D4';

  const renderItem = ({item}: any) => (
    <View style={[styles.miniContainer, {borderBottomColor: separatorColor}]}>
      <Text style={[styles.Header, {color: textColor}]}>{item.title}</Text>
      <Text style={[styles.topText, {color: textColor}]}>{item.des}</Text>
    </View>
  );

  return (
    <ScrollView
      style={[styles.container, {backgroundColor}]}
      showsVerticalScrollIndicator={false}>
      <BackHeader title={t('Privacy policy')} showBackIcon />
      <View style={styles.formikContainer}>
        <Text
          style={[styles.topText, {color: textColor, paddingHorizontal: 20}]}>
          {t(
            'By using our services, you agree to be bound by the following Privacy policy. Please read them carefully.',
          )}
        </Text>
        <FlatList
          data={privacyPolicy}
          scrollEnabled={false}
          contentContainerStyle={styles.flatlist}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />

        <View style={styles.emailContainer}>
          <Text style={[styles.Header, {color: textColor}]}>
            Email:{' '}
            <Text
              style={{
                fontFamily: fonts.UrbanistBold,
                color: Colors.primaryColor,
              }}>
              info@prymosports.com
            </Text>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Header: {
    fontFamily: fonts.UrbanistSemiBold,
    fontSize: 16,
    marginBottom: 15,
  },
  topText: {
    fontFamily: fonts.UrbanistRegular,
    fontSize: 14,
    lineHeight: 22,
  },
  miniContainer: {
    borderBottomWidth: 1,
    paddingTop: 15,
    paddingBottom: 25,
  },
  flatlist: {
    paddingTop: 15,
    marginLeft: 10,
    paddingHorizontal: 8,
  },
  formikContainer: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 20,
  },
  emailContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});

import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {Table, Row} from 'react-native-table-component';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../../../utils/Colors';
import BackHeader from '../../../components/BackHeader';
import CustomButton from '../../../components/CustomButton';
import styles from './styles';

interface CommunityProps {
  navigation?: any;
}

const ReviewRestriction: React.FC<CommunityProps> = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);

  const backgroundColor = isDarkMode
    ? Colors.darkBackground
    : Colors.lightBackground;
  const viewBg = isDarkMode ? Colors.darkInputBg : Colors.lightInputBg;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const separaterColor = isDarkMode ? '#424242' : '#E0E0E0';

  const tableHead = ['Sport Type', 'Type', 'Restriction'];
  const widthArr = [120, 120, 120];
  const tableData = [
    ['Football', 'Weekly', '10'],
    ['Tennis', 'Monthly', '16'],
    ['Basketball', 'Weekly', '4'],
  ];

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <BackHeader title="Review Restriction" showBackIcon />
      <Text style={[styles.memberLabel, {color: textColor}]}>
        Member Name: <Text style={styles.memberName}>{''} John Doe</Text>
      </Text>

      <ScrollView horizontal style={{paddingHorizontal: 16, width: '100%'}}>
        <View style={{alignItems: 'center'}}>
          <Table
            borderStyle={{
              borderWidth: 1,
              borderColor: separaterColor,
            }}>
            <Row
              data={tableHead}
              widthArr={widthArr}
              style={[styles.header, {backgroundColor: viewBg}]}
              textStyle={[styles.text, {color: textColor}]}
            />
          </Table>
          <ScrollView style={styles.dataWrapper}>
            <Table borderStyle={{borderWidth: 1, borderColor: separaterColor}}>
              {tableData.map((rowData, index) => (
                <Row
                  key={index}
                  data={rowData}
                  widthArr={widthArr}
                  style={[styles.row, index % 2 && {backgroundColor: viewBg}]}
                  textStyle={[styles.text, {color: textColor, opacity: 0.8}]}
                />
              ))}
            </Table>
          </ScrollView>
        </View>
      </ScrollView>

      <CustomButton
        onPress={() => navigation.navigate('EditRestriction')}
        containerStyle={{marginBottom: '12%'}}>
        {t('Edit Restriction')}
      </CustomButton>
    </View>
  );
};

export default ReviewRestriction;

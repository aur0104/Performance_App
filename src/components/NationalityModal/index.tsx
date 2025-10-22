import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import fonts from '../../utils/Fonts';
import {Colors} from '../../utils/Colors';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';

interface NationalityModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (country: {flag: string; name: string}) => void;
}

const countryList = [
  {flag: '🇦🇪', name: 'United Arab Emirates'},
  {flag: '🇦🇷', name: 'Argentina'},
  {flag: '🇦🇺', name: 'Australia'},
  {flag: '🇦🇹', name: 'Austria'},
  {flag: '🇧🇭', name: 'Bahrain'},
  {flag: '🇧🇪', name: 'Belgium'},
  {flag: '🇧🇷', name: 'Brazil'},
  {flag: '🇨🇦', name: 'Canada'},
  {flag: '🇨🇱', name: 'Chile'},
  {flag: '🇨🇴', name: 'Colombia'},
  {flag: '🇨🇷', name: 'Costa Rica'},
  {flag: '🇩🇪', name: 'Germany'},
  {flag: '🇩🇴', name: 'Dominican Republic'},
  {flag: '🇬🇹', name: 'Guatemala'},
  {flag: '🇮🇳', name: 'India'},
  {flag: '🇮🇪', name: 'Ireland'},
  {flag: '🇮🇹', name: 'Italy'},
  {flag: '🇯🇲', name: 'Jamaica'},
  {flag: '🇯🇵', name: 'Japan'},
  {flag: '🇰🇪', name: 'Kenya'},
  {flag: '🇰🇼', name: 'Kuwait'},
  {flag: '🇱🇺', name: 'Luxembourg'},
  {flag: '🇲🇽', name: 'Mexico'},
  {flag: '🇳🇱', name: 'Netherlands'},
  {flag: '🇳🇬', name: 'Nigeria'},
  {flag: '🇳🇴', name: 'Norway'},
  {flag: '🇳🇿', name: 'New Zealand'},
  {flag: '🇴🇲', name: 'Oman'},
  {flag: '🇵🇦', name: 'Panama'},
  {flag: '🇵🇪', name: 'Peru'},
  {flag: '🇵🇭', name: 'Philippines'},
  {flag: '🇵🇱', name: 'Poland'},
  {flag: '🇵🇹', name: 'Portugal'},
  {flag: '🇵🇾', name: 'Paraguay'},
  {flag: '🇶🇦', name: 'Qatar'},
  {flag: '🇸🇦', name: 'Saudi Arabia'},
  {flag: '🇸🇪', name: 'Sweden'},
  {flag: '🇸🇬', name: 'Singapore'},
  {flag: '🇨🇭', name: 'Switzerland'},
  {flag: '🇿🇦', name: 'South Africa'},
  {flag: '🇰🇷', name: 'South Korea'},
  {flag: '🇪🇸', name: 'Spain'},
  {flag: '🇹🇭', name: 'Thailand'},
  {flag: '🇺🇬', name: 'Uganda'},
  {flag: '🇬🇧', name: 'United Kingdom'},
  {flag: '🇺🇸', name: 'United States'},
  {flag: '🇺🇾', name: 'Uruguay'},
  {flag: '🇻🇪', name: 'Venezuela'},
];

const sortedCountryList = countryList.sort((a, b) =>
  a.name.localeCompare(b.name),
);

const NationalityModal: React.FC<NationalityModalProps> = ({
  visible,
  onClose,
  onSelect,
}) => {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state?.theme?.switchDarkTheme);
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const backgroundColor = isDarkMode
    ? Colors.darkBackground
    : Colors.lightBackground;

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={[styles.modalContainer, {backgroundColor}]}>
          <FlatList
            data={sortedCountryList}
            keyExtractor={(item, index) => `${item.name}-${index}`}
            style={{marginTop: 10}}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.countryItem}
                onPress={() => {
                  onSelect(item);
                  onClose();
                }}>
                <Text style={[styles.countryText, {color: textColor}]}>
                  {item.flag} {t(item.name)}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    maxHeight: 400,
    borderRadius: 12,
    shadowColor: Colors.darkGray,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    paddingVertical: 10,
  },
  countryItem: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  countryText: {
    fontSize: 16,
    fontFamily: fonts.UrbanistMedium,
  },
});

export default NationalityModal;

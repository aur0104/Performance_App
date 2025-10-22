import React from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  Text,
  Image,
  ActivityIndicator,
} from 'react-native';
import styles from './dropdownStyles';
import {IMAGES} from '../../assets/images';
import {Colors} from '../../utils/Colors';
import {useSelector} from 'react-redux';

const fallbackSportOptions = [
  'Strength',
  'Power',
  'Speed',
  'Endurance',
  'Attendance Based',
];

const SportDropdown = ({
  visible,
  onSelect,
  onClose,
  challengeCategories = [],
  loading = false,
}: any) => {
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const separatorColor = isDarkMode ? '#C9C9C9' : '#424242';

  // Use API data if available, otherwise fallback to hardcoded options
  const sportsToDisplay =
    challengeCategories.length > 0
      ? (() => {
          // Check if "Attendance Based" already exists in the API data
          const hasAttendanceBased = challengeCategories.some(
            (category: any) =>
              category.name?.toLowerCase() === 'attendance based' ||
              category.name?.toLowerCase() === 'attendance',
          );

          // Only add "Attendance Based" if it doesn't already exist
          return hasAttendanceBased
            ? challengeCategories
            : challengeCategories.concat([
                {_id: 'attendance', name: 'Attendance Based', image: null},
              ]);
        })()
      : fallbackSportOptions.map(sport => ({
          name: sport,
          _id: sport.toLowerCase().replace(' ', '_'),
        }));

  return (
    <Modal transparent visible={visible} animationType="fade">
      <TouchableOpacity
        style={styles.modalBackground}
        onPress={onClose}
        activeOpacity={1}>
        <View style={styles.popup}>
          {loading ? (
            <View style={{padding: 20, alignItems: 'center'}}>
              <ActivityIndicator size="small" color={Colors.primaryColor} />
              <Text style={[styles.popupItemText, {marginTop: 10}]}>
                Loading...
              </Text>
            </View>
          ) : (
            sportsToDisplay.map((sport: any, index: number) => {
              const iconKey =
                sport.name.toLowerCase() === 'attendance based'
                  ? 'attendance'
                  : sport.name.toLowerCase();

              return (
                <View key={sport._id || index}>
                  <TouchableOpacity
                    style={[styles.popupItem, {flexDirection: 'row'}]}
                    onPress={() => onSelect(sport)}>
                    {sport.image ? (
                      <Image
                        source={{uri: sport.image}}
                        style={{
                          width: 25,
                          height: 25,
                          marginRight: 8,
                          resizeMode: 'contain',
                        }}
                      />
                    ) : (
                      <Image
                        source={IMAGES[iconKey]}
                        style={{
                          width: 25,
                          height: 25,
                          marginRight: 8,
                          resizeMode: 'contain',
                          tintColor: Colors.primaryColor,
                        }}
                      />
                    )}
                    <Text style={styles.popupItemText}>{sport.name}</Text>
                  </TouchableOpacity>
                  {index < sportsToDisplay.length - 1 && (
                    <View
                      style={{
                        height: 0.8,
                        backgroundColor: separatorColor,
                      }}
                    />
                  )}
                </View>
              );
            })
          )}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default SportDropdown;

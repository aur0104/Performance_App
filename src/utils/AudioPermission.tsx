import {PermissionsAndroid, Platform, Alert, Linking} from 'react-native';

/**
 * Check if audio recording permissions are granted
 * @returns Promise<boolean> - true if permissions are granted
 */
export const checkPermissions = async (): Promise<boolean> => {
  if (Platform.OS === 'android') {
    try {
      const audioPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      );
      const writePermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      const readPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );

      return audioPermission && writePermission && readPermission;
    } catch (err) {
      console.warn('Error checking permissions:', err);
      return false;
    }
  }
  // iOS handles permissions differently
  return true;
};

/**
 * Request audio recording permissions
 * @returns Promise<boolean> - true if permissions are granted
 */
export const requestPermissions = async (): Promise<boolean> => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ]);

      const allGranted =
        granted['android.permission.RECORD_AUDIO'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.WRITE_EXTERNAL_STORAGE'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.READ_EXTERNAL_STORAGE'] ===
          PermissionsAndroid.RESULTS.GRANTED;

      return allGranted;
    } catch (err) {
      console.warn('Error requesting permissions:', err);
      return false;
    }
  }
  return true;
};

/**
 * Handle audio permissions with proper user guidance
 * @returns Promise<boolean> - true if permissions are granted
 */
// Store permission status to avoid repeated checks
let permissionsGranted = false;

export const handleAudioPermissions = async (): Promise<boolean> => {
  // If we've already confirmed permissions, return immediately
  if (permissionsGranted) {
    return true;
  }

  // First check if permissions are already granted
  const hasPermissions = await checkPermissions();

  if (hasPermissions) {
    permissionsGranted = true;
    return true;
  }

  // If not granted, request permissions
  const granted = await requestPermissions();

  if (granted) {
    permissionsGranted = true;
    return true;
  }

  // If permissions denied, show dialog to guide user to settings
  Alert.alert(
    'Permission Required',
    'Microphone permission is needed for audio recording. Would you like to open settings to grant permission?',
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Open Settings',
        onPress: () => Linking.openSettings(),
      },
    ],
  );

  return false;
};

// Force check permissions again (useful after returning from settings)
export const resetPermissionCache = () => {
  permissionsGranted = false;
};

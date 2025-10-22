import React from 'react';
import {Platform, Alert} from 'react-native';
import {
  launchImageLibrary,
  ImagePickerResponse,
  Asset,
} from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import {handleAudioPermissions, resetPermissionCache} from './AudioPermission';

/**
 * Opens image picker to select media files
 * @param options Optional configuration for image picker
 * @returns Promise with selected media assets
 */
export const pickMedia = async (
  options = {
    mediaType: 'photo' as const,
    selectionLimit: 5,
    includeBase64: false,
  },
): Promise<Asset[]> => {
  try {
    const result = await launchImageLibrary(options);

    if (result.didCancel || !result.assets) {
      return [];
    }

    return result.assets;
  } catch (error) {
    console.error('Error picking media:', error);
    return [];
  }
};

/**
 * Generates a path for audio recording
 * @returns String path for audio file
 */
export const getAudioPath = (): string => {
  const fileName = `audio_${Date.now()}.mp4`;
  return Platform.OS === 'android'
    ? `${RNFS.DocumentDirectoryPath}/${fileName}`
    : `${RNFS.TemporaryDirectoryPath}/${fileName}`;
};

/**
 * Prepares media files for sending in a message
 * @param files Array of media assets
 * @returns Formatted files ready for FormData
 */
export const prepareMediaFiles = (files: Asset[]): any[] => {
  return files.map(file => ({
    uri: file.uri,
    type: file.type || 'image/jpeg',
    name: file.fileName || `image_${Date.now()}.jpg`,
  }));
};

/**
 * Checks and requests necessary permissions for audio recording
 * @returns Promise<boolean> indicating if permissions are granted
 */
export const checkAudioPermissions = async (): Promise<boolean> => {
  return await handleAudioPermissions();
};

/**
 * Resets the permission cache to force a fresh check
 * Call this when returning to the app from settings
 */
export const resetAudioPermissionCache = (): void => {
  resetPermissionCache();
};

/**
 * Validates if a video file duration is within the allowed limit
 * @param videoUri URI of the video file
 * @param maxDuration Maximum allowed duration in seconds (default: 30)
 * @returns Promise<{isValid: boolean, duration?: number, message?: string}>
 */
export const validateVideoDuration = async (
  videoUri: string,
  maxDuration: number = 30,
): Promise<{isValid: boolean; duration?: number; message?: string}> => {
  try {
    // For now, we'll show a warning to users about the duration limit
    // In a production app, you might want to use react-native-video-info
    // or react-native-video-metadata to get accurate video duration

    return {
      isValid: true, // Allow selection but show warning in UI
      message: getVideoWarningMessage(maxDuration),
    };
  } catch (error) {
    console.error('Error validating video duration:', error);
    return {
      isValid: false,
      message: getVideoErrorMessage('general'),
    };
  }
};

/**
 * Checks if a media asset is a video and validates its duration
 * @param asset Media asset from image picker
 * @param maxDuration Maximum allowed duration in seconds (default: 30)
 * @returns Promise<{isValid: boolean, message?: string}>
 */
export const validateVideoAsset = async (
  asset: Asset,
  maxDuration: number = 30,
): Promise<{isValid: boolean; message?: string}> => {
  // Check if it's a video
  if (asset.type?.startsWith('video/')) {
    // Check if the asset has duration property (some platforms provide this)
    if (asset.duration && asset.duration > maxDuration) {
      return {
        isValid: false,
        message: getVideoErrorMessage('duration_exceeded', maxDuration),
      };
    }

    // If no duration info available, show warning but allow selection
    return {
      isValid: true,
      message: getVideoWarningMessage(maxDuration),
    };
  }

  return {isValid: true};
};

/**
 * Opens video picker with duration validation
 * @param maxDuration Maximum allowed duration in seconds (default: 30)
 * @param onSuccess Callback when video is selected and valid
 * @param onError Callback when validation fails
 * @returns Promise<void>
 */
export const pickVideoWithDurationValidation = async (
  maxDuration: number = 30,
  onSuccess: (asset: Asset) => void,
  onError: (message: string) => void,
): Promise<void> => {
  try {
    const result = await launchImageLibrary({
      mediaType: 'video',
      videoQuality: 'high',
      selectionLimit: 1,
    });

    if (result.didCancel || !result.assets?.[0]) {
      return;
    }

    const asset = result.assets[0];

    // Validate the video asset
    const validation = await validateVideoAsset(asset, maxDuration);

    if (validation.isValid) {
      onSuccess(asset);

      // Show warning if it's a video (even if valid)
      if (asset.type?.startsWith('video/') && validation.message) {
        Alert.alert('Video Duration Notice', validation.message, [
          {text: 'OK'},
        ]);
      }
    } else {
      onError(validation.message || getVideoErrorMessage('general'));
    }
  } catch (error) {
    console.error('Error picking video:', error);
    onError(getVideoErrorMessage('general'));
  }
};

/**
 * Shows user-friendly error messages for video validation
 * @param errorType Type of error
 * @param maxDuration Maximum allowed duration
 * @returns User-friendly error message
 */
export const getVideoErrorMessage = (
  errorType:
    | 'duration_exceeded'
    | 'invalid_format'
    | 'file_too_large'
    | 'general',
  maxDuration: number = 30,
): string => {
  switch (errorType) {
    case 'duration_exceeded':
      return `Your video is too long. Please select a video that is ${maxDuration} seconds or shorter.`;
    case 'invalid_format':
      return 'Please select a valid video file (MP4, MOV, AVI, etc.).';
    case 'file_too_large':
      return 'The video file is too large. Please select a smaller video file.';
    case 'general':
    default:
      return 'There was an error processing your video. Please try again.';
  }
};

/**
 * Shows user-friendly warning messages for video selection
 * @param maxDuration Maximum allowed duration
 * @returns User-friendly warning message
 */
export const getVideoWarningMessage = (maxDuration: number = 30): string => {
  return `Please ensure your video is ${maxDuration} seconds or less for optimal performance and user experience.`;
};

/**
 * Formats a media message for the chat UI
 * @param mediaType Type of media ('image' or 'audio')
 * @param uri URI of the media file
 * @param userId Current user ID
 * @param userName Current user name
 * @returns Formatted message object
 */
export const formatMediaMessage = (
  mediaType: 'image' | 'audio',
  uri: string,
  userId: string,
  userName: string = 'You',
) => {
  return {
    _id: Date.now().toString(),
    type: mediaType,
    [mediaType]: uri,
    createdAt: new Date(),
    user: {
      _id: userId,
      name: userName,
    },
  };
};

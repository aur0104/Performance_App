import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {Asset} from 'react-native-image-picker';
import {pickVideoWithDurationValidation} from '../../utils/mediaUtils';
import AnySvg from '../AnySvg';
import {Colors} from '../../utils/Colors';

interface VideoPickerProps {
  onVideoSelected: (asset: Asset) => void;
  onError?: (message: string) => void;
  maxDuration?: number;
  disabled?: boolean;
  style?: any;
  textStyle?: any;
  placeholder?: string;
  showIcon?: boolean;
  loading?: boolean;
}

const VideoPicker: React.FC<VideoPickerProps> = ({
  onVideoSelected,
  onError,
  maxDuration = 30,
  disabled = false,
  style,
  textStyle,
  placeholder = 'Select Video',
  showIcon = true,
  loading = false,
}) => {
  const handleVideoSelection = async () => {
    if (disabled || loading) return;

    await pickVideoWithDurationValidation(
      maxDuration,
      asset => {
        onVideoSelected(asset);
      },
      errorMessage => {
        if (onError) {
          onError(errorMessage);
        } else {
          Alert.alert('Video Selection Error', errorMessage, [{text: 'OK'}]);
        }
      },
    );
  };

  return (
    <TouchableOpacity
      style={[styles.container, style, disabled && styles.disabled]}
      onPress={handleVideoSelection}
      disabled={disabled || loading}>
      {loading ? (
        <ActivityIndicator size="small" color={Colors.primary} />
      ) : (
        <>
          {showIcon && <AnySvg name="camera" size={20} />}
          <Text style={[styles.text, textStyle]}>{placeholder}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: Colors.lightGray,
    borderWidth: 1,
    borderColor: Colors.border,
    minHeight: 48,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    marginLeft: 8,
    fontSize: 16,
    color: Colors.text,
    fontWeight: '500',
  },
});

export default VideoPicker;

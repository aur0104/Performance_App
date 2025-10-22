import React, {useState} from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Video from 'react-native-video';
import {Asset} from 'react-native-image-picker';
import {
  pickVideoWithDurationValidation,
  validateVideoAsset,
} from '../../utils/mediaUtils';
import AnySvg from '../AnySvg';
import {Colors} from '../../utils/Colors';
import {useSelector} from 'react-redux';

interface VideoPickerWithPreviewProps {
  onVideoSelected: (asset: Asset) => void;
  onVideoRemoved?: () => void;
  onError?: (message: string) => void;
  maxDuration?: number;
  disabled?: boolean;
  style?: any;
  placeholder?: string;
  showPreview?: boolean;
  previewStyle?: any;
}

const VideoPickerWithPreview: React.FC<VideoPickerWithPreviewProps> = ({
  onVideoSelected,
  onVideoRemoved,
  onError,
  maxDuration = 30,
  disabled = false,
  style,
  placeholder = 'Select Video (Max 30s)',
  showPreview = true,
  previewStyle,
}) => {
  const [selectedVideo, setSelectedVideo] = useState<Asset | null>(null);
  const [loading, setLoading] = useState(false);
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);

  const placeHolderColor = isDarkMode ? Colors.black : Colors.black;

  const handleVideoSelection = async () => {
    if (disabled || loading) return;

    setLoading(true);

    await pickVideoWithDurationValidation(
      maxDuration,
      asset => {
        setSelectedVideo(asset);
        onVideoSelected(asset);
        setLoading(false);
      },
      errorMessage => {
        setLoading(false);
        if (onError) {
          onError(errorMessage);
        } else {
          Alert.alert('Video Selection Error', errorMessage, [{text: 'OK'}]);
        }
      },
    );
  };

  const handleRemoveVideo = () => {
    setSelectedVideo(null);
    if (onVideoRemoved) {
      onVideoRemoved();
    }
  };

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={[styles.container, style]}>
      {selectedVideo && showPreview ? (
        <View style={[styles.previewContainer, previewStyle]}>
          <Video
            source={{uri: selectedVideo.uri}}
            style={styles.videoPreview}
            resizeMode="cover"
            paused={true}
            onLoad={data => {
              // Video loaded successfully
            }}
            onError={error => {
              console.error('Video preview error:', error);
            }}
          />

          <View style={styles.videoInfo}>
            <Text style={styles.videoName} numberOfLines={1}>
              {selectedVideo.fileName || 'Selected Video'}
            </Text>
            {selectedVideo.duration && (
              <Text style={styles.duration}>
                Duration: {formatDuration(selectedVideo.duration)}
              </Text>
            )}
          </View>

          <TouchableOpacity
            style={styles.removeButton}
            onPress={handleRemoveVideo}>
            <AnySvg name="removeIcon" size={16} color={Colors.white} />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={[styles.pickerButton, disabled && styles.disabled]}
          onPress={handleVideoSelection}
          disabled={disabled || loading}>
          {loading ? (
            <ActivityIndicator size="small" color={Colors.primary} />
          ) : (
            <>
              <AnySvg name="camera" size={20} />
              <Text style={[styles.pickerText, {color: placeHolderColor}]}>
                {placeholder}
              </Text>
            </>
          )}
        </TouchableOpacity>
      )}

      {selectedVideo &&
        selectedVideo.duration &&
        selectedVideo.duration > maxDuration && (
          <View style={styles.warningContainer}>
            <AnySvg name="warning" size={16} color={Colors.warning} />
            <Text style={styles.warningText}>
              Video duration exceeds {maxDuration} seconds limit
            </Text>
          </View>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  pickerButton: {
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
  pickerText: {
    marginLeft: 8,
    fontSize: 16,
    color: Colors.black,
    fontWeight: '500',
  },
  previewContainer: {
    position: 'relative',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: Colors.lightGray,
  },
  videoPreview: {
    width: '100%',
    height: 200,
  },
  videoInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 12,
  },
  videoName: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '500',
  },
  duration: {
    color: Colors.white,
    fontSize: 12,
    marginTop: 4,
  },
  removeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  warningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    padding: 8,
    backgroundColor: Colors.warningBackground,
    borderRadius: 4,
  },
  warningText: {
    marginLeft: 8,
    color: Colors.warning,
    fontSize: 12,
    flex: 1,
  },
});

export default VideoPickerWithPreview;

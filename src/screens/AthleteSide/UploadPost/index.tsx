import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {launchImageLibrary, Asset} from 'react-native-image-picker';
import VideoPickerWithPreview from '../../../components/VideoPickerWithPreview';
import Video from 'react-native-video';
import {Colors} from '../../../utils/Colors';
import AnySvg from '../../../components/AnySvg';
import styles from './styles';
import InputField from '../../../components/CustomInputField';
import CustomButton from '../../../components/CustomButton';
import {createCommunityPost} from '../../../services/calls';

interface UploadPostProps {
  navigation?: any;
  route?: any;
}

const UploadPost: React.FC<UploadPostProps> = ({navigation, route}) => {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);

  const backgroundColor = isDarkMode
    ? Colors.darkBackground
    : Colors.lightBackground;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const loaderColor = isDarkMode ? Colors.white : Colors.black;

  const [postText, setPostText] = useState('');
  const [mediaUris, setMediaUris] = useState<
    {uri: string; type: 'image' | 'video'}[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  // Get community ID from route params
  const communityId = route?.params?.id;

  const handleChange = (text: string) => setPostText(text);

  const handleSelectMedia = (mediaType: 'photo' | 'video') => {
    launchImageLibrary(
      {
        mediaType,
        selectionLimit: 0,
        quality: mediaType === 'video' ? 0.8 : 1,
      },
      response => {
        if (!response.didCancel && response.assets?.length) {
          const newMedia = response.assets
            .map(asset => ({
              uri: asset.uri,
              type: mediaType === 'photo' ? 'image' : 'video',
            }))
            .filter(media => media.uri) as {
            uri: string;
            type: 'image' | 'video';
          }[];
          setMediaUris(prev => [...prev, ...newMedia]);
        }
      },
    );
  };

  const handleDeleteMedia = (index: number) => {
    setMediaUris(prev => prev.filter((_, i) => i !== index));
  };

  const handleClose = () => navigation.goBack();

  const createFormData = async (): Promise<FormData> => {
    const formData = new FormData();

    // Add caption
    formData.append('caption', postText);

    // Add media files (images and videos)
    for (let i = 0; i < mediaUris.length; i++) {
      const media = mediaUris[i];
      const filename = media.uri.split('/').pop() || `media_${i}`;

      if (media.type === 'image') {
        formData.append('images', {
          uri: media.uri,
          type: 'image/jpeg',
          name: filename,
        } as any);
      } else if (media.type === 'video') {
        formData.append('videos', {
          uri: media.uri,
          type: 'video/mp4',
          name: filename,
        } as any);
      }
    }

    return formData;
  };

  const handleUploadPost = async () => {
    if (!communityId) {
      Alert.alert('Error', 'Community ID is required');
      return;
    }

    if (!postText.trim()) {
      Alert.alert('Error', 'Please enter some text for your post');
      return;
    }

    setIsLoading(true);

    try {
      const formData = await createFormData();
      const response = await createCommunityPost(communityId, formData);
      Alert.alert('Success', 'Post uploaded successfully!');
      navigation.goBack();
    } catch (error: any) {
      console.error('Error uploading post:', error);
      const errorMessage =
        error.response?.data?.message ||
        'Failed to upload post. Please try again.';
      Alert.alert('Error', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const isPostValid = postText.trim().length > 0;

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleClose}>
          <AnySvg
            width={26}
            height={26}
            name={isDarkMode ? 'crossIcon' : 'lightCross'}
          />
        </TouchableOpacity>
        <Text style={[styles.headerText, {color: textColor}]}>
          {t('New post')}
        </Text>
        <View style={{width: 24}} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <InputField
          label=""
          value={postText}
          multiline={true}
          onChangeText={handleChange}
          placeholder={t('Say something about this photo.....')}
          containerStyle={styles.inputField}
        />

        {mediaUris.length > 0 && (
          <View style={styles.imageListContainer}>
            {mediaUris.map((media, index) => (
              <View key={index} style={styles.imageContainer}>
                {media.type === 'image' ? (
                  <Image source={{uri: media.uri}} style={styles.postImage} />
                ) : (
                  <Video
                    source={{uri: media.uri}}
                    style={styles.postImage}
                    controls={true}
                    resizeMode="cover"
                    paused={true}
                  />
                )}
                <TouchableOpacity
                  style={styles.deleteIcon}
                  onPress={() => handleDeleteMedia(index)}>
                  <AnySvg width={34} height={34} name="deleteIcon" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        <View style={styles.mediaButtonsContainer}>
          <TouchableOpacity
            style={styles.selectImageBtn}
            onPress={() => handleSelectMedia('photo')}>
            <AnySvg
              width={26}
              height={26}
              name={mediaUris.length > 0 ? 'addMore' : 'imageFrame'}
            />
            <Text style={styles.selectImageText}>{t('Upload Image')}</Text>
          </TouchableOpacity>

          <VideoPickerWithPreview
            onVideoSelected={(asset: Asset) => {
              const newMedia = {
                uri: asset.uri,
                type: 'video' as const,
              };
              setMediaUris(prev => [...prev, newMedia]);
            }}
            onError={(message: string) => {
              Alert.alert('Video Selection Error', message, [{text: 'OK'}]);
            }}
            maxDuration={30}
            placeholder={t('Upload Video')}
            style={styles.selectVideoBtn}
            showPreview={false}
          />
        </View>
      </ScrollView>

      <View style={styles.uploadBtnContainer}>
        <CustomButton
          onPress={handleUploadPost}
          disable={!isPostValid || isLoading}>
          {t('Upload Post')}
        </CustomButton>
      </View>

      {isLoading && (
        <View style={styles.loaderOverlay}>
          <ActivityIndicator size={86} color={loaderColor} />
        </View>
      )}
    </View>
  );
};

export default UploadPost;

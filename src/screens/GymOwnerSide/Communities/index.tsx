import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  FlatList,
  StyleSheet,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {useIsFocused, useRoute} from '@react-navigation/native';
import {launchImageLibrary, Asset} from 'react-native-image-picker';
import Video from 'react-native-video';
import {validateVideoAsset} from '../../../utils/mediaUtils';
import {Colors} from '../../../utils/Colors';
import AnySvg from '../../../components/AnySvg';
import {IMAGES} from '../../../assets/images';
import InputField from '../../../components/CustomInputField';
import PostComponent from '../../../components/CommunityPost';
import {postData} from '../../../utils/DummyData';
import {hp} from '../../../utils/responsivesness';
import Challenges from './Challenges';
import styles from '../../AthleteSide/CommunityDetail/style';
import fonts from '../../../utils/Fonts';
import {
  getCommunityById,
  getCommunityPosts,
  createCommunityPost,
} from '../../../services/calls';

interface CommunityProps {
  navigation?: any;
}

interface RouteParams {
  communityId?: string;
  community?: {
    _id: string;
    name?: string;
    description?: string;
    image?: string;
    members?: any[];
  };
}

const GymCommunity: React.FC<CommunityProps> = ({navigation}) => {
  const {t} = useTranslation();
  const route = useRoute();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const [selectedView, setSelectedView] = useState('Feeds');
  const [modalVisible, setModalVisible] = useState(false);
  const [communityData, setCommunityData] = useState<any>(null);
  const [communityPosts, setCommunityPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [postText, setPostText] = useState('');
  const [imageUris, setImageUris] = useState<string[]>([]);
  const [isPosting, setIsPosting] = useState(false);
  const isFocused = useIsFocused();
  // Get community ID from route params
  const communityId = (route.params as RouteParams)?.community?._id;

  const user = useSelector((state: any) => state.user?.user);
  // Fetch community data and posts
  useEffect(() => {
    const fetchCommunityData = async () => {
      if (!communityId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        // Fetch community details
        const communityResponse = await getCommunityById(communityId);
        // console.log('Community Response:', communityResponse?.data);
        // console.log('Community Name:', communityResponse?.data?.name);
        // console.log(
        //   'Community Description:',
        //   communityResponse?.data?.description,
        // );
        // console.log('Community Members:', communityResponse?.data?.members);

        if (communityResponse?.status === 200 && communityResponse?.data) {
          setCommunityData(communityResponse.data);
        }

        // Fetch community posts
        const postsResponse = await getCommunityPosts(communityId);

        if (postsResponse?.status === 200 && postsResponse?.data) {
          setCommunityPosts(postsResponse.data?.data);
        }
      } catch (error) {
        console.error('Error fetching community data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isFocused) {
      fetchCommunityData();
    }
  }, [communityId, isFocused]);

  const handleChange = useCallback((text: string) => {
    setPostText(text);
  }, []);

  const handleSelectImage = useCallback(async () => {
    launchImageLibrary(
      {
        mediaType: 'mixed',
        selectionLimit: 0,
      },
      async response => {
        if (!response.didCancel && response.assets?.length) {
          const validAssets: string[] = [];
          let hasVideoWarning = false;

          for (const asset of response.assets) {
            if (asset.uri) {
              // Validate video duration if it's a video
              const validation = await validateVideoAsset(asset, 30);

              if (validation.isValid) {
                validAssets.push(asset.uri);

                // Show warning for videos
                if (asset.type?.startsWith('video/') && validation.message) {
                  hasVideoWarning = true;
                }
              } else {
                Alert.alert(
                  'Invalid Video',
                  validation.message ||
                    'Video duration exceeds 30 seconds limit.',
                  [{text: 'OK'}],
                );
              }
            }
          }

          if (validAssets.length > 0) {
            setImageUris(prev => [...prev, ...validAssets]);

            // Show warning if any videos were selected
            if (hasVideoWarning) {
              Alert.alert(
                'Video Duration Notice',
                'Please ensure your videos are 30 seconds or less. Videos exceeding this limit may not upload properly.',
                [{text: 'OK'}],
              );
            }
          }
        }
      },
    );
  }, []);

  const handleDeleteImage = useCallback((index: number) => {
    setImageUris(prev => prev.filter((_, i) => i !== index));
  }, []);

  const createFormData = useCallback((): FormData => {
    const formData = new FormData();
    formData.append('caption', postText);

    // Add all media (images and videos)
    for (let i = 0; i < imageUris.length; i++) {
      const uri = imageUris[i];
      const filename = uri.split('/').pop() || `media_${i}`;

      // Determine file type based on extension or use default
      const isVideo =
        filename.toLowerCase().includes('.mp4') ||
        filename.toLowerCase().includes('.mov') ||
        filename.toLowerCase().includes('.avi');

      formData.append('images', {
        uri: uri,
        type: isVideo ? 'video/mp4' : 'image/jpeg',
        name: filename,
      } as any);
    }

    return formData;
  }, [postText, imageUris]);

  const handleSendPost = useCallback(async () => {
    if (!postText.trim()) {
      Alert.alert('Error', 'Please enter some text for your post');
      return;
    }

    setIsPosting(true);

    try {
      const formData = createFormData();
      const response = await createCommunityPost(communityId!, formData);

      // Reset form
      setPostText('');
      setImageUris([]);

      // Refresh posts
      const postsResponse = await getCommunityPosts(communityId!);
      if (postsResponse?.status === 200 && postsResponse?.data) {
        setCommunityPosts(postsResponse.data?.data);
      }
    } catch (error: any) {
      console.error('Error uploading post:', error);
      const errorMessage =
        error.response?.data?.message ||
        'Failed to upload post. Please try again.';
      Alert.alert('Error', errorMessage);
    } finally {
      setIsPosting(false);
    }
  }, [postText, imageUris, communityId, createFormData]);

  const formatDate = useCallback((dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60),
    );

    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  }, []);

  const backgroundColor = isDarkMode
    ? Colors.darkBackground
    : Colors.lightBackground;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const background = isDarkMode ? Colors.darkInputBg : Colors.lightInputBg;
  const separaterColor = isDarkMode ? '#424242' : '#E0E0E0';

  const profileImages = [
    IMAGES.community1,
    IMAGES.community2,
    IMAGES.community3,
  ];

  const FeedsView = useMemo(
    () => (
      <View style={{paddingHorizontal: 20}}>
        {/* Post input section */}
        <View
          style={[
            localStyles.postInputContainer,
            {backgroundColor: background},
          ]}>
          <TextInput
            value={postText}
            onChangeText={handleChange}
            placeholder={t('Post an update or ask a question')}
            placeholderTextColor={
              isDarkMode ? Colors.lightGray : Colors.darkGray
            }
            style={[localStyles.postInput, {color: textColor}]}
            multiline
            onSubmitEditing={handleSendPost}
            returnKeyType="send"
          />
          <View style={localStyles.postActions}>
            <View style={localStyles.mediaSection}>
              <TouchableOpacity
                onPress={handleSelectImage}
                style={localStyles.mediaButton}>
                <AnySvg name="imageFrame" width={24} height={24} />
              </TouchableOpacity>
              <Text style={[localStyles.mediaButtonText, {color: textColor}]}>
                {t('Media')}
              </Text>
            </View>
            <TouchableOpacity
              onPress={handleSendPost}
              style={[
                localStyles.sendButton,
                {opacity: postText.trim() ? 0.7 : 0.5},
              ]}
              disabled={!postText.trim() || isPosting}>
              {isPosting ? (
                <ActivityIndicator size={16} color={Colors.white} />
              ) : (
                <Text style={{color: 'white'}}>Send</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
        {/* Media preview section */}
        {imageUris.length > 0 && (
          <View style={localStyles.mediaPreviewContainer}>
            <FlatList
              data={imageUris}
              horizontal
              renderItem={({item, index}) => {
                // Determine if it's a video based on filename
                const filename = item.split('/').pop() || '';
                const isVideo =
                  filename.toLowerCase().includes('.mp4') ||
                  filename.toLowerCase().includes('.mov') ||
                  filename.toLowerCase().includes('.avi');

                return (
                  <View style={localStyles.mediaPreviewItem}>
                    {isVideo ? (
                      <>
                        <Video
                          source={{uri: item}}
                          style={localStyles.previewVideo}
                          resizeMode="cover"
                          paused={true}
                        />
                        <View style={localStyles.videoOverlay}>
                          <AnySvg name="play" width={24} height={24} />
                        </View>
                      </>
                    ) : (
                      <Image
                        source={{uri: item}}
                        style={localStyles.previewImage}
                      />
                    )}
                    <TouchableOpacity
                      onPress={() => handleDeleteImage(index)}
                      style={localStyles.deleteMediaButton}>
                      <AnySvg name="cross" width={16} height={16} />
                    </TouchableOpacity>
                  </View>
                );
              }}
              keyExtractor={(item, index) => `media_${index}`}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        )}
        <FlatList
          data={communityPosts}
          renderItem={({item}) => {
            // Handle API post data structure
            if (item._id) {
              // This is from API
              return (
                <PostComponent
                  profileImage={IMAGES.profileImage} // Use default profile image since createdBy is just an ID
                  name={item?.createdBy?.name || 'Community Member'} // Use generic name since we don't have user details
                  timeAgo={
                    item.createdAt ? formatDate(item.createdAt) : 'Unknown time'
                  }
                  description={item.caption || 'No caption'}
                  postImages={
                    item.images && item.images.length > 0
                      ? item.images
                      : undefined
                  }
                  likes={item.likes?.toString() || '0'}
                  comments={item.totalComments?.toString() || '0'}
                />
              );
            }
            return null;
          }}
          scrollEnabled={false}
          keyExtractor={(item, index) => item._id || index.toString()}
          contentContainerStyle={{paddingBottom: hp(12), marginTop: hp(2)}}
          showsVerticalScrollIndicator={false}
        />
      </View>
    ),
    [
      postText,
      imageUris,
      isPosting,
      communityPosts,
      background,
      textColor,
      isDarkMode,
      t,
      handleChange,
      handleSelectImage,
      handleSendPost,
      handleDeleteImage,
      formatDate,
    ],
  );

  const ChallengesView = useMemo(
    () => <Challenges communityId={communityId} />,
    [communityId],
  );

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          {backgroundColor, justifyContent: 'center', alignItems: 'center'},
        ]}>
        <Text style={{color: textColor}}>Loading community data...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <ScrollView
        style={[styles.container, {backgroundColor}]}
        showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={
            (route?.params as RouteParams)?.community?.image
              ? {uri: (route?.params as RouteParams)?.community?.image}
              : IMAGES.detailImage
          }
          style={styles.headerImage}
          resizeMode="cover">
          <View style={styles.headerIcons}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AnySvg name="backArrow" width={24} height={24} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <AnySvg name="dot" width={28} height={28} />
            </TouchableOpacity>
          </View>
        </ImageBackground>

        <View style={styles.titleRow}>
          <Text style={[styles.titleText, {color: textColor, maxWidth: '80%'}]}>
            {communityData?.name || 'Elite Athletes Hub'}
          </Text>
          <View style={styles.avatarGroup}>
            {communityData?.members
              ?.slice(0, 3)
              .map((member: any, index: number) => (
                <>
                  {member?.profileImage ? (
                    <TouchableOpacity
                      key={member._id || index}
                      style={[
                        styles.avatarWrapper,
                        {zIndex: (communityData?.members?.length || 3) - index},
                      ]}
                      onPress={() =>
                        navigation.navigate('CommunityMember', {
                          communityId: communityData?._id,
                        })
                      }>
                      <Image
                        source={{uri: member.profileImage}}
                        style={styles.avatarImage}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('CommunityMember', {
                          communityId: communityData?._id,
                        })
                      }
                      style={{
                        borderRadius: 100,
                        width: 30,
                        height: 30,
                        backgroundColor: Colors.gray,
                      }}
                    />
                  )}
                </>
              )) ||
              profileImages.map((imageSource, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.avatarWrapper,
                    {zIndex: profileImages.length - index},
                  ]}
                  onPress={() => navigation.navigate('MemberList')}>
                  <Image source={imageSource} style={styles.avatarImage} />
                </TouchableOpacity>
              ))}
          </View>
        </View>

        <Text style={[styles.description, {color: textColor}]}>
          {communityData?.description ||
            'For high-performance athletes to share training tips and progress.'}
        </Text>

        <View style={[styles.toggleContainer, {backgroundColor: background}]}>
          <TouchableOpacity
            onPress={() => setSelectedView('Feeds')}
            style={[
              styles.toggleButton,
              selectedView === 'Feeds' && styles.activeToggle,
            ]}>
            <Text
              style={[
                styles.toggleText,
                selectedView === 'Feeds'
                  ? styles.activeText
                  : {color: textColor},
              ]}>
              {t('Feeds')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setSelectedView('Challenges')}
            style={[
              styles.toggleButton,
              selectedView === 'Challenges' && styles.activeToggle,
            ]}>
            <Text
              style={[
                styles.toggleText,
                selectedView === 'Challenges'
                  ? styles.activeText
                  : {color: textColor},
              ]}>
              {t('Challenges')}
            </Text>
          </TouchableOpacity>
        </View>

        {selectedView === 'Feeds' ? FeedsView : ChallengesView}
      </ScrollView>
      {selectedView === 'Challenges' && (
        <TouchableOpacity
          style={localStyles.addButton}
          onPress={() => navigation.navigate('AddChallenge', communityId)}>
          <AnySvg
            name={isDarkMode ? 'addDarkIcon' : 'addLightIcon'}
            size={32}
            svgStyle={{alignSelf: 'center'}}
          />
        </TouchableOpacity>
      )}
      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={localStyles.modalOverlay}>
            <View
              style={[
                localStyles.modalContainer,
                {backgroundColor: backgroundColor},
              ]}>
              {communityData?.createdBy?._id == user?.user?._id ? (
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false);
                    navigation.navigate('EditCommunity', {communityData});
                  }}>
                  <Text style={[localStyles.modalText, {color: textColor}]}>
                    {t('Edit Community')}
                  </Text>
                </TouchableOpacity>
              ) : null}

              {communityData?.createdBy?._id == user?.user?._id ? (
                <View
                  style={[
                    localStyles.separator,
                    {backgroundColor: separaterColor},
                  ]}
                />
              ) : null}

              {communityData?.createdBy?._id == user?.user?._id ? (
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false);
                    navigation.navigate('Requests', {communityId});
                  }}>
                  <Text style={[localStyles.modalText, {color: textColor}]}>
                    {t('Requests')}
                  </Text>
                </TouchableOpacity>
              ) : null}

              {communityData?.createdBy?._id == user?.user?._id ? (
                <View
                  style={[
                    localStyles.separator,
                    {backgroundColor: separaterColor},
                  ]}
                />
              ) : null}

              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate('CommunityGuide');
                }}
                style={localStyles.informationRow}>
                <Text style={[localStyles.modalText, {color: textColor}]}>
                  {t('Information')}
                </Text>
                <AnySvg
                  name={isDarkMode ? 'informationCircle' : 'darkInformation'}
                  width={20}
                  height={20}
                  svgStyle={{marginRight: 6}}
                />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const localStyles = StyleSheet.create({
  addButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primaryColor,
    position: 'absolute',
    bottom: hp(6),
    right: 24,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: 193,
    height: 141,
    paddingVertical: 12,
    top: hp(8),
    alignSelf: 'flex-end',
    marginRight: hp(3),
    justifyContent: 'space-around',
  },
  modalText: {
    fontSize: 16,
    paddingHorizontal: 12,
    fontFamily: fonts.UrbanistSemiBold,
  },
  separator: {
    height: 1,
    width: '100%',
  },
  informationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  postInputContainer: {
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  postInput: {
    fontSize: 16,
    fontFamily: fonts.UrbanistRegular,
    minHeight: 40,
    maxHeight: 120,
    textAlignVertical: 'top',
    marginBottom: 8,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mediaButton: {
    padding: 8,
  },
  sendButton: {
    backgroundColor: Colors.primaryColor,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 60,
  },
  mediaPreviewContainer: {
    marginBottom: 12,
  },
  mediaPreviewItem: {
    marginRight: 8,
    position: 'relative',
  },
  previewImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  previewVideo: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  videoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteMediaButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 10,
    padding: 4,
  },
  mediaSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mediaButtonText: {
    marginLeft: 8,
    fontSize: 14,
    fontFamily: fonts.UrbanistRegular,
  },
});

export default GymCommunity;

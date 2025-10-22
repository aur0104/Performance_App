import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  FlatList,
  ActivityIndicator,
  TextInput,
  Alert,
  StyleSheet,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {useRoute, useIsFocused} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import {Colors} from '../../../utils/Colors';
import AnySvg from '../../../components/AnySvg';
import styles from './style';
import {IMAGES} from '../../../assets/images';
import InputField from '../../../components/CustomInputField';
import PostComponent from '../../../components/CommunityPost';
import CustomButton from '../../../components/CustomButton';
import {hp} from '../../../utils/responsivesness';
import ChallengeList from './ChallengesList';
import fonts from '../../../utils/Fonts';
import {
  getCommunityById,
  getCommunityPosts,
  createCommunityPost,
  joinCommunityRequest,
  leaveCommunity,
} from '../../../services/calls';
import {validateVideoAsset} from '../../../utils/mediaUtils';

interface CommunityDetailProps {
  navigation?: any;
}

interface RouteParams {
  community?: any;
}

const PublicCommunityDetail: React.FC<CommunityDetailProps> = ({
  navigation,
}) => {
  const {t} = useTranslation();
  const route = useRoute();
  const isFocused = useIsFocused();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const user = useSelector((state: any) => state.user?.user);

  const [selectedView, setSelectedView] = useState('Feeds');
  const [postText, setPostText] = useState('');
  const [loading, setLoading] = useState(true);
  const [communityData, setCommunityData] = useState<any>(null);
  const [communityPosts, setCommunityPosts] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [imageUris, setImageUris] = useState<string[]>([]);
  const [isPosting, setIsPosting] = useState(false);
  const [isRequested, setIsRequested] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  // Get community from route params
  const community = (route.params as RouteParams)?.community;

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

    for (let i = 0; i < imageUris.length; i++) {
      const uri = imageUris[i];
      const filename = uri.split('/').pop() || `image_${i}.jpg`;

      formData.append('images', {
        uri: uri,
        type: 'image/jpeg',
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

    // Check if user is a member before allowing to post
    if (!isRequested) {
      Alert.alert('Error', 'You must be a member to post in this community.');
      return;
    }

    setIsPosting(true);

    try {
      const formData = createFormData();
      const response = await createCommunityPost(community._id, formData);

      // Reset form
      setPostText('');
      setImageUris([]);

      // Refresh posts
      const postsResponse = await getCommunityPosts(community._id);
      if (postsResponse?.status === 200 && postsResponse?.data) {
        setCommunityPosts(postsResponse.data?.data || []);
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
  }, [postText, imageUris, community._id, createFormData, isRequested]);

  const handleJoinCommunity = useCallback(async () => {
    // Check if user is authenticated
    if (!user?.user?._id) {
      Alert.alert('Error', 'Please login to join communities.', [{text: 'OK'}]);
      return;
    }

    try {
      setIsJoining(true);

      const response = await joinCommunityRequest(community._id);

      if (response?.status === 200 || response?.status === 201) {
        console.log('res', response?.data);
        const isMember = response.data?.members?.some(
          (member: any) => member._id === user?.user?._id,
        );
        setIsRequested(isMember);
        // setIsRequested(true);
        console.log('Join request sent successfully');
        Alert.alert(
          'Success',
          'Join request sent successfully! You will be notified when your request is approved.',
          [{text: 'OK'}],
        );

        // Refetch community details after successful join request
        await fetchCommunityData();
      } else {
        throw new Error('Failed to send join request');
      }
    } catch (error: any) {
      console.error('Error joining community:', error);

      let errorMessage =
        error?.response?.data?.error ||
        'Failed to join community. Please try again.';

      if (error.message?.includes('timeout')) {
        errorMessage = 'Request timeout. Please try again.';
      } else if (error.message?.includes('Network error')) {
        errorMessage =
          'Network error. Please check your connection and try again.';
      } else if (error.response?.status === 409) {
        errorMessage = 'You have already requested to join this community.';
      } else if (error.response?.status === 400) {
        errorMessage =
          error.response?.data?.message ||
          'Invalid request. Please check your information.';
      }

      Alert.alert('Error', errorMessage, [{text: 'OK'}]);
    } finally {
      setIsJoining(false);
    }
  }, [community._id, user?.user?._id]);

  const handleLeaveCommunity = useCallback(async () => {
    // Check if user is authenticated
    if (!user?.user?._id) {
      Alert.alert('Error', 'Please login to leave communities.', [
        {text: 'OK'},
      ]);
      return;
    }

    try {
      setIsLeaving(true);

      const response = await leaveCommunity(community._id);

      if (response?.status === 200 || response?.status === 201) {
        console.log('Left community successfully');

        // Show success toast
        Alert.alert('Success', 'You have successfully left the community.', [
          {
            text: 'OK',
            onPress: () => {
              // Navigate back on success
              navigation.goBack();
            },
          },
        ]);
      } else {
        throw new Error('Failed to leave community');
      }
    } catch (error: any) {
      console.error('Error leaving community:', error);

      let errorMessage =
        error?.response?.data?.error ||
        'Failed to leave community. Please try again.';

      if (error.message?.includes('timeout')) {
        errorMessage = 'Request timeout. Please try again.';
      } else if (error.message?.includes('Network error')) {
        errorMessage =
          'Network error. Please check your connection and try again.';
      } else if (error.response?.status === 400) {
        errorMessage =
          error.response?.data?.message ||
          'Invalid request. Please check your information.';
      }

      Alert.alert('Error', errorMessage, [{text: 'OK'}]);
    } finally {
      setIsLeaving(false);
    }
  }, [community._id, user?.user?._id, navigation]);

  const backgroundColor = isDarkMode
    ? Colors.darkBackground
    : Colors.lightBackground;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const background = isDarkMode ? Colors.darkInputBg : Colors.lightInputBg;

  const profileImages = [
    IMAGES.community1,
    IMAGES.community2,
    IMAGES.community3,
  ];

  // Fetch community data and posts
  const fetchCommunityData = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      if (community?._id) {
        // Fetch community details
        const communityResponse = await getCommunityById(community._id);

        if (communityResponse?.status === 200 && communityResponse?.data) {
          setCommunityData(communityResponse.data);
          console.log('Data==>', communityResponse?.data);

          // Check if user is a member
          const isMember = communityResponse.data?.members?.some(
            (member: any) => member._id === user?.user?._id,
          );
          setIsRequested(isMember);
        }

        // Fetch community posts
        const postsResponse = await getCommunityPosts(community._id);

        if (postsResponse?.status === 200 && postsResponse?.data) {
          setCommunityPosts(postsResponse.data?.data || []);
        }
      }
    } catch (err: any) {
      console.error('Error fetching community data:', err);
      setError(err?.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, [community?._id, user?.user?._id]);

  useEffect(() => {
    if (community?._id && isFocused) {
      fetchCommunityData();
    }
  }, [community?._id, isFocused, fetchCommunityData]);

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

  const FeedsView = useMemo(
    () => (
      <View style={{paddingHorizontal: 20}}>
        {/* Post input section - only show for members */}
        {isRequested ? (
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
                <Text
                  style={[
                    localStyles.mediaHint,
                    {color: isDarkMode ? Colors.lightGray : Colors.darkGray},
                  ]}>
                  Videos max 30s
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
        ) : (
          <View
            style={[
              localStyles.postInputContainer,
              {backgroundColor: background, opacity: 0.5},
            ]}>
            <TextInput
              placeholder={t(
                'Join the community to post updates and ask questions',
              )}
              placeholderTextColor={
                isDarkMode ? Colors.lightGray : Colors.darkGray
              }
              style={[localStyles.postInput, {color: textColor}]}
              multiline
              editable={false}
            />
          </View>
        )}

        {/* Image preview section */}
        {imageUris.length > 0 && (
          <View style={localStyles.imagePreviewContainer}>
            <FlatList
              data={imageUris}
              horizontal
              renderItem={({item, index}) => (
                <View style={localStyles.imagePreviewItem}>
                  <Image
                    source={{uri: item}}
                    style={localStyles.previewImage}
                  />
                  <TouchableOpacity
                    onPress={() => handleDeleteImage(index)}
                    style={localStyles.deleteImageButton}>
                    <AnySvg name="cross" width={16} height={16} />
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
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
                  postVideos={
                    item.videos && item.videos.length > 0
                      ? item.videos
                      : undefined
                  }
                  likes={item.likes?.toString() || '0'}
                  comments={item.totalComments?.toString() || '0'}
                />
              );
            }
            return null; // Return null for items without _id
          }}
          scrollEnabled={false}
          keyExtractor={(item, index) => item._id || index.toString()}
          contentContainerStyle={{paddingBottom: hp(12), marginTop: hp(2)}}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text
              style={{textAlign: 'center', color: textColor, marginTop: 20}}>
              {t('No posts found')}
            </Text>
          }
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
      isRequested,
    ],
  );

  const ChallengesView = useMemo(
    () => <ChallengeList communityId={community._id} />,
    [community._id],
  );
  const renderLoading = () => (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" color={Colors.primaryColor} />
      <Text style={{color: textColor, marginTop: 10}}>
        Loading community data...
      </Text>
    </View>
  );

  const renderError = () => (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      }}>
      <Text style={{color: 'red', textAlign: 'center'}}>{error}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={[styles.container, {backgroundColor}]}>
        {renderLoading()}
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, {backgroundColor}]}>{renderError()}</View>
    );
  }

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <ScrollView
        style={[styles.container, {backgroundColor}]}
        showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={
            communityData?.image
              ? {uri: communityData.image}
              : IMAGES.detailImage
          }
          style={styles.headerImage}
          resizeMode="cover">
          <View style={styles.headerIcons}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AnySvg name="backArrow" width={24} height={24} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('CommunityGuide')}>
              <AnySvg name="informationCircle" width={24} height={24} />
            </TouchableOpacity>
          </View>
        </ImageBackground>

        <View style={styles.titleRow}>
          <Text style={[styles.titleText, {color: textColor}]}>
            {communityData?.name || 'Community'}
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
                        source={
                          member?.profileImage
                            ? {uri: member.profileImage}
                            : profileImages[index % profileImages.length]
                        }
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
                      activeOpacity={0.5}
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
                  onPress={() =>
                    navigation.navigate('CommunityMember', {
                      communityId: communityData?._id,
                    })
                  }>
                  <Image source={imageSource} style={styles.avatarImage} />
                </TouchableOpacity>
              ))}
          </View>
        </View>

        <Text style={[styles.description, {color: textColor}]}>
          {communityData?.description || 'No description available'}
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

          {isRequested ? (
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
          ) : null}
        </View>

        {selectedView === 'Feeds' ? FeedsView : ChallengesView}
      </ScrollView>

      {/* Conditional buttons for join/leave community */}
      {isRequested ? (
        <CustomButton
          onPress={handleLeaveCommunity}
          disable={isLeaving}
          loading={isLeaving}
          containerStyle={{
            backgroundColor: '#FF4444',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '12%',
            opacity: isLeaving ? 0.6 : 1,
          }}>
          <Text style={{color: 'white'}}>{t('Leave Community')}</Text>
        </CustomButton>
      ) : (
        <CustomButton
          onPress={() => {
            if (!communityData?.isRequested) handleJoinCommunity();
          }}
          disable={isJoining}
          loading={isJoining}
          containerStyle={{
            backgroundColor: communityData?.isRequested
              ? Colors.green
              : Colors.primaryColor,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '12%',
            opacity: isJoining ? 0.6 : 1,
          }}>
          <Text style={{color: 'white'}}>
            {communityData?.isRequested ? t('Requested') : t('Become a Member')}
          </Text>
        </CustomButton>
      )}
    </View>
  );
};

const localStyles = StyleSheet.create({
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
  mediaSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mediaButton: {
    padding: 8,
  },
  mediaHint: {
    fontSize: 12,
    fontFamily: fonts.UrbanistRegular,
    marginLeft: 4,
    opacity: 0.7,
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
  imagePreviewContainer: {
    marginBottom: 12,
  },
  imagePreviewItem: {
    marginRight: 8,
    position: 'relative',
  },
  previewImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  deleteImageButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 10,
    padding: 4,
  },
});

export default PublicCommunityDetail;

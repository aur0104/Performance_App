import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {useRoute, useIsFocused} from '@react-navigation/native';
import {Colors} from '../../../utils/Colors';
import AnySvg from '../../../components/AnySvg';
import styles from './style';
import CustomButton from '../../../components/CustomButton';
import {IMAGES} from '../../../assets/images';
import {
  getCommunityById,
  joinCommunityRequest,
  leaveCommunity,
} from '../../../services/calls';
import ChallengesList from './ChallengesList';

interface CommunityDetailProps {
  navigation?: any;
}

interface RouteParams {
  community?: any;
}

const CommunityDetail: React.FC<CommunityDetailProps> = ({navigation}) => {
  const {t} = useTranslation();
  const route = useRoute();
  const isFocused = useIsFocused();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const user = useSelector((state: any) => state.user?.user);

  const [isRequested, setIsRequested] = useState(false);
  const [loading, setLoading] = useState(true);
  const [communityData, setCommunityData] = useState<any>(null);
  const [error, setError] = useState('');
  const [isJoining, setIsJoining] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'about' | 'challenges'>('about');

  // Refs for timeout management
  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const isMountedRef = useRef(true);

  // Get community from route params
  const community = (route.params as RouteParams)?.community;

  const backgroundColor = isDarkMode
    ? Colors.darkBackground
    : Colors.lightBackground;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const separatorColor = isDarkMode ? '#424242' : '#E0E0E0';

  const profileImages = [
    IMAGES.community1,
    IMAGES.community2,
    IMAGES.community3,
  ];

  // Clear timeouts and abort controllers on unmount
  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const fetchCommunityDetails = async (showLoading = true) => {
    try {
      if (showLoading) {
        setLoading(true);
      }
      setError('');

      // Clear any existing timeout
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }

      // Create new abort controller
      abortControllerRef.current = new AbortController();

      if (community?._id) {
        // Set a loading timeout to prevent infinite loading
        loadingTimeoutRef.current = setTimeout(() => {
          if (loading && isMountedRef.current) {
            setLoading(false);
            setError('Request timeout. Please try again.');
            if (abortControllerRef.current) {
              abortControllerRef.current.abort();
            }
          }
        }, 35000); // 35 seconds timeout (slightly more than API timeout)

        const response = await getCommunityById(community._id);

        // Clear timeout on success
        if (loadingTimeoutRef.current) {
          clearTimeout(loadingTimeoutRef.current);
        }

        // Check if component is still mounted before updating state
        if (!isMountedRef.current) return;

        if (response?.status === 200 && response?.data) {
          const isMember = response.data?.members?.some(
            (member: any) => member._id === user?.user?._id,
          );
          setIsRequested(isMember);
          setCommunityData(response.data);
        } else {
          setError('Failed to fetch community details');
        }
      } else {
        if (isMountedRef.current) {
          setError('Invalid community ID');
        }
      }
    } catch (err: any) {
      // Clear timeout on error
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }

      // Check if component is still mounted before updating state
      if (!isMountedRef.current) return;

      console.error('Error fetching community details:', err);

      // Handle specific error types
      if (err.message?.includes('timeout')) {
        setError('Request timeout. Please try again.');
      } else if (err.message?.includes('Network error')) {
        setError('Network error. Please check your connection and try again.');
      } else if (err.message?.includes('Server error')) {
        setError('Server error. Please try again later.');
      } else if (err.code === 'NETWORK_ERROR') {
        setError(
          'No internet connection. Please check your network and try again.',
        );
      } else {
        setError(
          err?.response?.data?.message ||
            'Something went wrong. Please try again.',
        );
      }
    } finally {
      // Check if component is still mounted before updating state
      if (isMountedRef.current && showLoading) {
        setLoading(false);
      }
    }
  };

  const refetchCommunityDetails = async () => {
    await fetchCommunityDetails(false);
  };

  // Fetch community details
  useEffect(() => {
    if (community?._id && isFocused) {
      fetchCommunityDetails();
    } else if (!community?._id) {
      setLoading(false);
      setError('No community data provided');
    }
  }, [community?._id, isFocused]);

  const handleJoinCommunity = async () => {
    // Check if user is authenticated
    if (!user?.user?._id) {
      Alert.alert('Error', 'Please login to join communities.', [{text: 'OK'}]);
      return;
    }

    try {
      setIsJoining(true);

      const response = await joinCommunityRequest(community._id);

      if (response?.status === 200 || response?.status === 201) {
        setIsRequested(true);
        Alert.alert(
          'Success',
          'Join request sent successfully! You will be notified when your request is approved.',
          [{text: 'OK'}],
        );

        // Refetch community details after successful join request
        await refetchCommunityDetails();
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
  };

  const handleLeaveCommunity = async () => {
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
  };

  const handleToggleRequest = () => {
    if (isRequested) {
      setIsRequested(false);
    } else {
      handleJoinCommunity();
    }
  };

  const handleRetry = () => {
    setError('');
    setCommunityData(null);
    fetchCommunityDetails();
  };

  const renderLoading = () => (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" color={Colors.primaryColor} />
      <Text style={{color: textColor, marginTop: 10, fontSize: 16}}>
        Loading community details...
      </Text>
      <Text
        style={{color: textColor, marginTop: 5, fontSize: 12, opacity: 0.7}}>
        This may take a few moments
      </Text>
      <View
        style={{
          marginTop: 20,
          width: 200,
          height: 2,
          backgroundColor: separatorColor,
          borderRadius: 1,
        }}>
        <View
          style={{
            width: '60%',
            height: '100%',
            backgroundColor: Colors.primaryColor,
            borderRadius: 1,
            position: 'absolute',
            left: 0,
            top: 0,
          }}
        />
      </View>
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
      <View
        style={{
          backgroundColor: isDarkMode ? '#2a2a2a' : '#f8f8f8',
          padding: 20,
          borderRadius: 12,
          alignItems: 'center',
          borderWidth: 1,
          borderColor: isDarkMode ? '#424242' : '#e0e0e0',
        }}>
        <Text
          style={{
            color: 'red',
            textAlign: 'center',
            marginBottom: 15,
            fontSize: 16,
            fontWeight: '600',
          }}>
          Oops! Something went wrong
        </Text>
        <Text
          style={{
            color: textColor,
            textAlign: 'center',
            marginBottom: 20,
            fontSize: 14,
            opacity: 0.8,
          }}>
          {error}
        </Text>
        <TouchableOpacity
          onPress={handleRetry}
          style={{
            backgroundColor: Colors.primaryColor,
            paddingHorizontal: 20,
            paddingVertical: 12,
            borderRadius: 8,
            marginBottom: 10,
          }}>
          <Text style={{color: 'white', fontWeight: '600'}}>Try Again</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            backgroundColor: 'transparent',
            paddingHorizontal: 20,
            paddingVertical: 12,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: Colors.primaryColor,
          }}>
          <Text style={{color: Colors.primaryColor, fontWeight: '600'}}>
            Go Back
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Show loading state
  if (loading) {
    return (
      <View style={[styles.container, {backgroundColor}]}>
        {renderLoading()}
      </View>
    );
  }

  // Show error state
  if (error) {
    return (
      <View style={[styles.container, {backgroundColor}]}>{renderError()}</View>
    );
  }

  // Show main content
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
                            ? {uri: member?.profileImage}
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
                  onPress={() => navigation.navigate('CommunityMember')}>
                  <Image source={imageSource} style={styles.avatarImage} />
                </TouchableOpacity>
              ))}
          </View>
        </View>

        <Text style={[styles.description, {color: textColor}]}>
          {communityData?.description || 'No description available'}
        </Text>

        <View style={[styles.separator, {backgroundColor: separatorColor}]} />

        {/* Tab Navigation */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              activeTab === 'about' && styles.activeToggle,
            ]}
            onPress={() => setActiveTab('about')}>
            <Text
              style={[
                styles.toggleText,
                activeTab === 'about' && styles.activeText,
              ]}>
              About
            </Text>
          </TouchableOpacity>
          {isRequested ? (
            <TouchableOpacity
              style={[
                styles.toggleButton,
                activeTab === 'challenges' && styles.activeToggle,
              ]}
              onPress={() => {
                console.log(
                  'Challenges tab tapped, current communityId:',
                  community?._id,
                );
                setActiveTab('challenges');
              }}>
              <Text
                style={[
                  styles.toggleText,
                  activeTab === 'challenges' && styles.activeText,
                ]}>
                Challenges
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>

        {/* Tab Content */}
        {activeTab === 'about' ? (
          <>
            <Text style={[styles.sectionTitle, {color: textColor}]}>
              About Community
            </Text>
            <View style={styles.statsRow}>
              <Text style={[styles.statsText, {color: textColor}]}>
                Total Posts:{' '}
                <Text style={[styles.statsText, {color: '#797979'}]}>
                  {communityData?.postCount || 0}
                </Text>
              </Text>
              <View
                style={[styles.verticalLine, {backgroundColor: separatorColor}]}
              />
              <Text style={[styles.statsText, {color: textColor}]}>
                Total Members:{' '}
                <Text style={[styles.statsText, {color: '#797979'}]}>
                  {communityData?.memberCount || 0}
                </Text>
              </Text>
            </View>

            <Text style={[styles.createdText, {color: textColor}]}>
              Created:{' '}
              <Text style={{color: '#797979'}}>
                {communityData?.createdAt
                  ? new Date(communityData.createdAt).toLocaleDateString()
                  : 'Unknown'}
              </Text>
            </Text>
          </>
        ) : (
          <View style={styles.containers}>
            <ChallengesList
              key={`challenges-${community?._id}-${activeTab}`}
              communityId={community?._id}
            />
          </View>
        )}
      </ScrollView>
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
          onPress={handleToggleRequest}
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
            {communityData?.isRequested
              ? t('Request Sent')
              : t('Become a Member')}
          </Text>
        </CustomButton>
      )}
    </View>
  );
};

export default CommunityDetail;

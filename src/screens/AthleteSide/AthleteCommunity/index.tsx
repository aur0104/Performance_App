import React, {useState, useEffect} from 'react';
import {
  FlatList,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {styles} from './styles';
import {Colors} from '../../../utils/Colors';
import AnySvg from '../../../components/AnySvg';
import BackHeader from '../../../components/BackHeader';
import CustomButton from '../../../components/CustomButton';
import {useSelector} from 'react-redux';
import {getCommunities, joinCommunityRequest} from '../../../services/calls';
import {IMAGES} from '../../../assets/images';

interface CommunityProps {
  navigation?: any;
}

const AthleteCommunity: React.FC<CommunityProps> = ({navigation}) => {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const user = useSelector((state: any) => state.user?.user);

  const [isPublicSelected, setIsPublicSelected] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [requestedIds, setRequestedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [communities, setCommunities] = useState<{
    private: any[];
    public: any[];
  }>({private: [], public: []});
  const [error, setError] = useState('');

  const backgroundColor = isDarkMode
    ? Colors.darkBackground
    : Colors.lightBackground;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const separatorColor = isDarkMode ? '#424242' : '#E0E0E0';

  const isSearching = searchText.trim().length > 0;

  // Check if user is part of a gym
  const gymId = user?.gym?._id || user?.user?.gym?._id;
  const isUserPartOfGym = !!gymId;

  // Fetch communities from API
  const fetchCommunities = async () => {
    try {
      setLoading(true);
      setError('');
      // Get gym ID from user data or use a default one
      const gymId = user?.user?.gym?._id;
      //revert
      const response = await getCommunities({gym: gymId});
      if (response?.status == 200 || response?.status == 201) {
        setCommunities(response.data.data || {private: [], public: []});
      } else {
        setError('Failed to fetch communities');
      }
    } catch (err: any) {
      console.error('Error fetching communities:', err);
      setError(err?.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Only fetch communities if user is part of a gym
    if (isUserPartOfGym) {
      fetchCommunities();
    } else {
      setLoading(false);
    }
  }, [isUserPartOfGym]);

  const filteredData = isSearching
    ? (isPublicSelected ? communities.public : communities.private).filter(
        item =>
          item.name?.toLowerCase().includes(searchText.toLowerCase()) ||
          item.description?.toLowerCase().includes(searchText.toLowerCase()),
      )
    : isPublicSelected
    ? communities.public
    : communities.private;

  const handleJoinCommunity = async (communityId: string) => {
    try {
      const formData = new FormData();
      formData.append('userId', user?.user?._id || '');

      const response = await joinCommunityRequest(communityId, formData);

      if (response?.status === 200 || response?.status === 201) {
        // Add to requested IDs to show as requested
        setRequestedIds(prev => [...prev, communityId]);
      }
    } catch (error) {
      console.error('Error joining community:', error);
    }
  };

  const renderItem = ({item}) => {
    const isRequested = requestedIds.includes(item._id);

    const handleToggleRequest = () => {
      if (isRequested) {
        setRequestedIds(prev => prev.filter(id => id !== item._id));
      } else {
        handleJoinCommunity(item._id);
      }
    };

    return (
      <TouchableOpacity
        style={styles.communityItem}
        onPress={() => {
          navigation.navigate(
            isPublicSelected ? 'PublicCommunityDetail' : 'CommunityDetail',
            {community: item},
          );
        }}>
        <View style={styles.rowContainer}>
          <View style={styles.imageWrapper}>
            <Image
              source={item.image ? {uri: item.image} : ''}
              style={styles.profileImage}
            />
            {item.scope === 'private' && (
              <View
                style={[
                  styles.imageOverlay,
                  {
                    backgroundColor: isDarkMode
                      ? 'rgba(0,0,0,0.8)'
                      : 'rgba(255,255,255,0.9)',
                  },
                ]}>
                <AnySvg name="lockIcon" width={24} height={24} />
              </View>
            )}
          </View>

          <View style={styles.textColumn}>
            <Text style={[styles.communityName, {color: textColor}]}>
              {item.name || 'Community'}
            </Text>
            <Text style={[styles.communityDesc, {color: textColor}]}>
              {item.description || 'No description available'}
            </Text>

            {isSearching && (
              <CustomButton
                onPress={handleToggleRequest}
                containerStyle={{
                  width: '90%',
                  height: 45,
                  marginTop: 8,
                  marginRight: 20,
                  backgroundColor: isRequested
                    ? Colors.green
                    : Colors.primaryColor,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                leftIcon={isRequested ? 'crossIcon' : undefined}>
                <Text style={{color: 'white'}}>
                  {isRequested ? t('Request Sent') : t('Become a Member')}
                </Text>
              </CustomButton>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const ItemSeparator = () => (
    <View style={[styles.separator, {backgroundColor: separatorColor}]} />
  );

  const renderLoading = () => (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 100,
      }}>
      <ActivityIndicator size="large" color={Colors.primaryColor} />
      <Text style={{color: textColor, marginTop: 10}}>
        Loading communities...
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
        paddingTop: 100,
      }}>
      <Text style={{color: 'red', textAlign: 'center'}}>{error}</Text>
      <TouchableOpacity
        onPress={fetchCommunities}
        style={{
          marginTop: 10,
          padding: 10,
          backgroundColor: Colors.primaryColor,
          borderRadius: 5,
        }}>
        <Text style={{color: 'white'}}>Retry</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={[styles.container, {backgroundColor}]}>
        <BackHeader title={t('Community')} containerStyle={{marginTop: 8}} />
        {renderLoading()}
      </View>
    );
  }

  // Show message if user is not part of a gym
  if (!isUserPartOfGym) {
    return (
      <View style={[styles.container, {backgroundColor}]}>
        <BackHeader title={t('Community')} containerStyle={{marginTop: 8}} />
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 100,
          }}>
          {/* <AnySvg
            name="lockIcon"
            width={100}
            height={80}
            
            svgStyle={{marginBottom: 20}}
          /> */}
          <Text
            style={[
              styles.communityName,
              {color: textColor, textAlign: 'center', position: 'absolute'},
            ]}>
            You're not part of the gym
          </Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, {backgroundColor}]}>
        <BackHeader title={t('Community')} containerStyle={{marginTop: 8}} />
        {renderError()}
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.container, {backgroundColor}]}
      showsVerticalScrollIndicator={false}>
      <BackHeader title={t('Community')} containerStyle={{marginTop: 8}} />

      <View style={[styles.searchWrapper, {borderColor: separatorColor}]}>
        <AnySvg
          name={isDarkMode ? 'searchIcon' : 'lightSearch'}
          width={20}
          height={20}
        />
        <TextInput
          value={searchText}
          onChangeText={setSearchText}
          placeholder={t('Search your community')}
          placeholderTextColor="#AFAFAF"
          style={[styles.searchInput, {color: textColor}]}
        />
      </View>

      {!isSearching && (
        <View style={styles.rowContainer}>
          <TouchableOpacity
            onPress={() => setIsPublicSelected(true)}
            style={styles.tabContainer}>
            <Text
              style={
                isPublicSelected
                  ? styles.focusedTabText
                  : styles.unFocusedTabText
              }>
              {t('Public')}
            </Text>
            <View
              style={[
                isPublicSelected ? styles.focusedTab : styles.unFocusedTab,
                {borderTopLeftRadius: 10, borderBottomLeftRadius: 10},
              ]}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setIsPublicSelected(false)}
            style={styles.tabContainer}>
            <Text
              style={
                !isPublicSelected
                  ? styles.focusedTabText
                  : styles.unFocusedTabText
              }>
              {t('Private')}
            </Text>
            <View
              style={[
                !isPublicSelected ? styles.focusedTab : styles.unFocusedTab,
                {borderTopRightRadius: 10, borderBottomRightRadius: 10},
              ]}
            />
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={filteredData}
        keyExtractor={item => item._id || item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparator}
        scrollEnabled={false}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={{textAlign: 'center', color: textColor, marginTop: 20}}>
            {searchText
              ? t('No communities found for ') + searchText
              : t('No communities found')}
          </Text>
        }
      />
    </ScrollView>
  );
};

export default AthleteCommunity;

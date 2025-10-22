import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {Colors} from '../../../utils/Colors';
import {IMAGES} from '../../../assets/images';
import styles from './styles';
import BackHeader from '../../../components/BackHeader';
import CustomButton from '../../../components/CustomButton';
import {hp} from '../../../utils/responsivesness';
import {getCommunities} from '../../../services/calls';
import {useIsFocused} from '@react-navigation/native';

interface CommunityProps {
  navigation?: any;
}

const MyCommunities: React.FC<CommunityProps> = ({navigation}) => {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const user = useSelector((state: any) => state.user?.user);

  const [loading, setLoading] = useState(true);
  const [communities, setCommunities] = useState<{
    private: any[];
    public: any[];
  }>({private: [], public: []});
  const [error, setError] = useState('');
  const isFocused = useIsFocused();

  const backgroundColor = isDarkMode
    ? Colors.darkBackground
    : Colors.lightBackground;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const background = isDarkMode ? Colors.darkInputBg : Colors.lightInputBg;

  const profileImages = [
    IMAGES.community1,
    IMAGES.community2,
    IMAGES.community3,
    IMAGES.profileImage,
  ];
  // Fetch communities from API
  const fetchCommunities = async () => {
    try {
      setLoading(true);
      setError('');
      const gymId = user?.user?.gym?._id || user?.gym?._id;
      console.log('gymIdd', gymId);
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
    if (isFocused) fetchCommunities();
  }, [isFocused]);
  const renderItem = ({item}: any) => {
    return (
      <TouchableOpacity
        style={[styles.card, {backgroundColor: background}]}
        onPress={() => navigation.navigate('GymCommunity', {community: item})}>
        <View style={styles.topRow}>
          <Image
            source={item.image ? {uri: item.image} : IMAGES.detailImage}
            style={styles.topImage}
          />
          <View style={styles.titleRow}>
            <View
              style={[styles.line, {backgroundColor: Colors.primaryColor}]}
            />
            <View style={{flex: 1}}>
              <Text style={[styles.title, {color: textColor}]}>
                {item.name || item.title || 'Community'}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 2,
                }}>
                <View
                  style={{
                    backgroundColor:
                      item.scope === 'private'
                        ? Colors.yellow
                        : Colors.primaryColor,
                    paddingHorizontal: 8,
                    paddingVertical: 2,
                    borderRadius: 10,
                    marginRight: 5,
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 10,
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                    }}>
                    {item.scope}
                  </Text>
                </View>
                {item.description && (
                  <Text
                    style={{
                      color: textColor,
                      fontSize: 12,
                      opacity: 0.7,
                      flex: 1,
                    }}
                    numberOfLines={1}>
                    {item.description}
                  </Text>
                )}
              </View>
            </View>
          </View>
        </View>
        {item.memberCount > 0 ? (
          <View style={styles.bottomRow}>
            <View style={styles.avatarGroup}>
              {profileImages.map((imageSource, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.avatarWrapper,
                    {zIndex: profileImages.length - index},
                  ]}
                  onPress={() =>
                    navigation.navigate('MemberList', {community: item})
                  }>
                  <Image source={imageSource} style={styles.avatarImage} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ) : (
          <View style={styles.bottomRow}>
            <View style={styles.avatarGroup} />
          </View>
        )}

        <Text
          style={[
            styles.memberText,
            {
              color: textColor,
              marginTop: item.memberCount == 0 ? hp(3) : undefined,

              marginBottom: 0,
            },
          ]}>
          {item.members
            ? `${item.members?.length} members in this community`
            : '0 members in this community'}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderSection = (data: any[]) => {
    if (data.length === 0) return null;

    return (
      <FlatList
        data={data}
        keyExtractor={(item, index) => item.id || item._id || index.toString()}
        renderItem={renderItem}
        scrollEnabled={false}
        contentContainerStyle={styles.listContainer}
      />
    );
  };

  const renderLoading = () => (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" color={Colors.primaryColor} />
      <Text style={[styles.memberText, {color: textColor, marginTop: 10}]}>
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
      }}>
      <Text style={[styles.memberText, {color: 'red', textAlign: 'center'}]}>
        {error}
      </Text>
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

  const renderEmpty = () => (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      }}>
      <Text
        style={[styles.memberText, {color: textColor, textAlign: 'center'}]}>
        No communities found
      </Text>
    </View>
  );

  return (
    <View style={{flex: 1, backgroundColor}}>
      <ScrollView style={{flex: 1, backgroundColor}}>
        <BackHeader title={t('My Communities')} showBackIcon />

        {loading ? (
          renderLoading()
        ) : error ? (
          renderError()
        ) : communities.private.length === 0 &&
          communities.public.length === 0 ? (
          renderEmpty()
        ) : (
          <View>
            {renderSection(communities.private)}
            {renderSection(communities.public)}
          </View>
        )}
      </ScrollView>

      <CustomButton
        onPress={() => navigation.navigate('CreateCommunity')}
        containerStyle={{marginBottom: hp(18)}}>
        {t('Create My Community')}
      </CustomButton>
    </View>
  );
};

export default MyCommunities;

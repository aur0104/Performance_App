import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {Colors} from '../../../utils/Colors';
import AnySvg from '../../../components/AnySvg';
import BackHeader from '../../../components/BackHeader';
import styles from '../../AthleteSide/CommunityMember/styles';
import {
  getCommunityRequests,
  updateCommunityMemberStatus,
} from '../../../services/calls';

interface RequestsProps {
  navigation?: any;
  route?: any;
}

const Requests: React.FC<RequestsProps> = ({navigation, route}) => {
  const {t} = useTranslation();
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingRequestId, setProcessingRequestId] = useState<string | null>(
    null,
  );

  // Get community ID from route params (fallback to hardcoded ID if not provided)
  const communityId = route?.params?.communityId;

  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const backgroundColor = isDarkMode
    ? Colors.darkBackground
    : Colors.lightBackground;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const separatorColor = isDarkMode ? '#424242' : '#E0E0E0';

  // Fetch community requests on component mount
  useEffect(() => {
    fetchRequests();
  }, [communityId]);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const response = await getCommunityRequests(communityId);
      setRequests(response.data?.requests);
    } catch (error) {
      console.error('Error fetching community requests:', error);
      Alert.alert(
        'Error',
        'Failed to fetch community requests. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRequestAction = async (
    memberId: string,
    action: 'accept' | 'reject',
  ) => {
    try {
      setProcessingRequestId(memberId);

      // Map action to correct status for API
      const status = action === 'accept' ? 'approved' : 'rejected';

      const res = await updateCommunityMemberStatus(
        communityId,
        memberId,
        status,
      );
      if (res?.status == 200 || res?.status == 201) {
        Alert.alert(
          'Success',
          `Request ${
            action === 'accept' ? 'accepted' : 'rejected'
          } successfully!`,
          [
            {
              text: 'OK',
              onPress: () => {
                // Reload requests after showing success message
                fetchRequests();
              },
            },
          ],
        );
        fetchRequests();
      }
      // Show success message
    } catch (error) {
      console.error(`Error ${action}ing request:`, error?.response);
      Alert.alert('Error', `Failed to ${action} request. Please try again.`);
    } finally {
      setProcessingRequestId(null);
    }
  };

  const renderItem = ({item, index}: any) => {
    const isProcessing = processingRequestId === item.user?._id;

    return (
      <View>
        <View style={[styles.memberContainer, {backgroundColor}]}>
          <View style={styles.leftRow}>
            <View style={styles.profileWrapper}>
              <Image
                source={
                  item.user?.profileImage
                    ? {uri: item?.user?.profileImage}
                    : require('../../../assets/images/member1.png')
                }
                style={styles.profileImage}
              />
              {item.user?.role?.toLowerCase()?.includes('bjj') && (
                <View style={styles.beltIconWrapper}>
                  <AnySvg name="beltIcon" width={24} height={24} />
                </View>
              )}
            </View>
            <View style={styles.memberTextInfo}>
              <Text style={[styles.nameText, {color: textColor}]}>
                {item.user?.name || 'N/A'}
              </Text>
              <View style={styles.sportRow}>
                <Text style={[styles.sportText, {color: textColor}]}>
                  {item.user?.role || 'Athlete'}
                </Text>
                <View
                  style={[
                    styles.vertSeparator,
                    {backgroundColor: separatorColor},
                  ]}
                />
                <Text style={[styles.levelText, {color: textColor}]}>
                  {item.user?.gender || 'N/A'}
                </Text>
              </View>
            </View>
          </View>

          <TouchableOpacity
            disabled={isProcessing}
            onPress={() => handleRequestAction(item._id, 'reject')}
            style={[
              styles.iconButton,
              {backgroundColor: isProcessing ? Colors.gray : Colors.red},
            ]}>
            {isProcessing ? (
              <ActivityIndicator size="small" color={Colors.white} />
            ) : (
              <AnySvg name="crossIcon" width={22} height={22} />
            )}
          </TouchableOpacity>
          <View
            style={[
              styles.vertSeparator,
              {backgroundColor: separatorColor, height: 30},
            ]}
          />
          <TouchableOpacity
            disabled={isProcessing}
            onPress={() => handleRequestAction(item?._id, 'accept')}
            style={[
              styles.iconButton,
              {backgroundColor: isProcessing ? Colors.gray : Colors.green},
            ]}>
            {isProcessing ? (
              <ActivityIndicator size="small" color={Colors.white} />
            ) : (
              <AnySvg name="tickIcon" width={24} height={24} />
            )}
          </TouchableOpacity>
        </View>

        {index < requests.length - 1 && (
          <View
            style={[
              styles.horizontalSeparator,
              {backgroundColor: separatorColor},
            ]}
          />
        )}
      </View>
    );
  };

  const renderEmptyState = () => (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 100,
      }}>
      <Text style={[{color: textColor, fontSize: 16, textAlign: 'center'}]}>
        {loading ? 'Loading requests...' : 'No pending requests found'}
      </Text>
    </View>
  );

  return (
    <View style={{flex: 1, backgroundColor}}>
      <BackHeader title={t('Requests')} showBackIcon />

      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" color={Colors.primaryColor} />
          <Text style={[{color: textColor, marginTop: 16}]}>
            Loading requests...
          </Text>
        </View>
      ) : (
        <FlatList
          data={requests}
          keyExtractor={item =>
            item._id?.toString() || Math.random().toString()
          }
          renderItem={renderItem}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingTop: 12,
            flexGrow: 1,
          }}
          ListEmptyComponent={renderEmptyState}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default Requests;

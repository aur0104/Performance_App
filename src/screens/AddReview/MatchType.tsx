import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
  Image,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import styles from './styles/addReviewStyle';
import {Colors} from '../../utils/Colors';
import AnySvg from '../../components/AnySvg';
import CustomButton from '../../components/CustomButton';
import BackHeader from '../../components/BackHeader';
import {launchImageLibrary} from 'react-native-image-picker';
import MatchTypeDropdown from '../../components/Dropdown/MatchTypeDropdown';
import ResultDropdown from '../../components/Dropdown/ResultDropdown';
import Video from 'react-native-video';
import {rhp} from '../../utils/responsivesness';
import CustomSliderWithThumb from '../../components/CustomSlider';
import SwitchButton from '../../components/SwitchButton';
import MatchTypeTextInput from '../../components/Dropdown/MatchTypeTextInput';
import {useGymMembers} from '../../hooks/useGetMembers';

import {Friend, GymMember} from '../../interfaces';
import MembersMultiSelect from '../../components/Dropdown/MembersMultiSelect';
import {createReview} from '../../services/calls';
import utils from '../../utils/utils';
import FriendsMultiSelect from '../../components/Dropdown/FriendMultiSelect';

export default function MatchType({navigation}: any) {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme.switchDarkTheme);
  const {teamMembers, coaches} = useGymMembers();
  const [selectedFriends, setSelectedFriends] = useState<Friend[] | []>([]);
  const [selectedCoaches, setSelectedCoaches] = useState<GymMember[] | []>([]);

  const [matchType, setMatchType] = useState('');
  const [club, setClub] = useState('');
  const [result, setResult] = useState('');
  const [tagFriend, setTagFriend] = useState('');
  const [opponent, setOpponent] = useState('');
  const [score, setScore] = useState('');
  const [coach, setCoach] = useState('');
  const [friend, setFriend] = useState('');
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [videoUri, setVideoUri] = useState<string | null>(null);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [friendListModalVisible, setFriendListModalVisible] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState<Friend[] | []>([]);
  const dynamicTextColor = isDarkMode ? Colors.white : Colors.black;
  const dynamicSubTextColor = isDarkMode ? Colors.gray2 : Colors.black;
  const user = useSelector((state: any) => state.user.user);

  const dynamicInputBg = isDarkMode
    ? Colors.darkInputBg || '#333'
    : Colors.lightInputBg || '#F2F2F2';
  const separaterColor = isDarkMode ? '#424242' : '#E0E0E0';
  const [matchTypeDropdownVisible, setMatchTypeDropdownVisible] =
    useState(false);
  const [resultDropdownVisible, setResultDropdownVisible] = useState(false);
  const [gym, setGym] = useState<string | null>(null);
  const [gymModalVis, setGymModalVis] = useState(false);
  const [access, setAccess] = useState(false);
  const [tagFriendModalVis, setTagFriendModalVis] = useState(false);
  const [coachesMoalVis, setCoachesMoalVis] = useState(false);

  const handleToggle = () => {
    setAccess(!access);
  };

  const matchTypeOptions = [
    'Competition',
    'Practice Match',
    'Sparring',
    'Rolling (BJJ)',
  ];
  const resultOptions = ['Win', 'Draw', 'Loss'];
  const [loader, setLoader] = useState(false);

  const onPressContinue = async () => {
    try {
      setLoader(true);
      const formData = new FormData();
      // required fields
      formData.append('sessionType', 'Match Type');
      formData.append('matchType', matchType); // e.g. "Friendly"
      formData.append('matchResult', result); // e.g. "draw"
      if (gym?.length) formData.append('clubOrTeam', gym); // e.g. "Jiu-Jitsu Club"
      // opponent (optional)
      if (opponent) {
        formData.append('opponent', opponent); // opponent ID or name
      }

      // coach feedback (optional)
      if (selectedCoaches?.length) {
        formData.append('coachFeedback.coach', selectedCoaches[0]?.user?._id);
      }
      // peer feedback (optional, only first friend if multiple selected)
      if (selectedMembers.length > 0) {
        formData.append('peerFeedback.peer', selectedMembers[0]?._id);
      }
      if (selectedFriends?.length) {
        formData.append('peerFeedback.friend', selectedFriends[0]?._id);
      }
      // score
      if (score) {
        formData.append('score', score);
      }

      // rating
      formData.append('rating', rating.toString());

      // comment
      if (reviewText) {
        formData.append('comment', reviewText);
      }
      formData.append('private', access ? 1 : 0);
      // video/photo
      if (videoUri) {
        const fileName = videoUri.split('/').pop() || `match_${Date.now()}.mp4`;
        formData.append('media', {
          uri: videoUri,
          type: 'video/mp4',
          name: fileName,
        } as any);
      }
      if (imageUri) {
        const fileName =
          imageUri?.split('/').pop() || `performance_${Date.now()}.jpg`;
        formData.append('media', {
          uri: imageUri,
          type: 'image/jpeg', // or use the actual type from picker
          name: fileName,
        });
      }
      const response = await createReview(formData);

      if (response.status === 200 || response.status === 201) {
        navigation.navigate('SubmittedMatch', {
          _id: response?.data?.data?._id,
        });
        // Handle successful review creation
      }
    } catch (error: any) {
      utils.showToast('error', error?.message || 'Something went wrong');
    } finally {
      setLoader(false);
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: isDarkMode
            ? Colors.darkBackground
            : Colors.lightBackground,
        },
      ]}>
      <BackHeader title={t('Add Reviews')} showBackIcon />
      <ScrollView
        contentContainerStyle={{paddingBottom: 40}}
        showsVerticalScrollIndicator={false}>
        <Text style={[styles.subtitle, {color: dynamicTextColor}]}>
          {t('Log Your Match')}
        </Text>
        <Text style={[styles.helpText, {color: dynamicTextColor}]}>
          {t('Enter the key details from your performance.')}
        </Text>

        <MatchTypeDropdown
          options={matchTypeOptions}
          selected={matchType}
          onSelect={setMatchType}
          visible={matchTypeDropdownVisible}
          toggle={() => setMatchTypeDropdownVisible(prev => !prev)}
          label={t('Select Match Type')}
        />
        {/* <MatchTypeDropdown
          label={t('Select Club/Team/Gym')}
          value={club}
          onChange={setClub}
        /> */}

        <MatchTypeDropdown
          options={[user?.user?.gym?.name]}
          selected={gym}
          onSelect={value => {
            setGym(value);
          }}
          visible={gymModalVis}
          toggle={() => setGymModalVis(prev => !prev)}
          label={t('Select Club/Team/Gym')}
        />
        <ResultDropdown
          options={resultOptions}
          selected={result}
          onSelect={setResult}
          visible={resultDropdownVisible}
          toggle={() => setResultDropdownVisible(prev => !prev)}
          label={t('Select Result')}
        />
        {user?.user?.friends?.length > 0 && (
          <>
            <TouchableOpacity
              style={[styles.dropdown, {backgroundColor: dynamicInputBg}]}
              onPress={() => setTagFriendModalVis(true)}>
              <Text style={[styles.dropdownText]}>
                {' '}
                {t('Tag Friend or Teammate (optional)')}
              </Text>
              <AnySvg name={isDarkMode ? 'darkDown' : 'lightDown'} size={24} />
            </TouchableOpacity>
            {tagFriendModalVis && (
              <FriendsMultiSelect
                options={user?.user?.friends as Friend}
                selected={selectedFriends || []}
                onSelect={(friend: Friend) => {
                  setTagFriendModalVis(false);
                  setSelectedFriends(prev => {
                    const alreadyExists = prev.some(s => s._id === friend._id);
                    if (alreadyExists) {
                      return prev; // don’t add duplicate
                    }
                    return [friend];
                  });
                }}
                // }}
                onClose={() => {
                  setTagFriendModalVis(false);
                }}
                visible={true}
                toggle={() => {
                  setTagFriendModalVis(false);
                }}
              />
            )}

            {selectedFriends?.length > 0 && (
              <View style={[styles.selectedChipsContainer]}>
                {selectedFriends.map((member, memberIndex) => (
                  <View
                    key={memberIndex}
                    style={[
                      styles.skillChip,
                      {backgroundColor: dynamicInputBg},
                    ]}>
                    <Text style={[styles.chipText, {color: dynamicTextColor}]}>
                      {member?.name}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        let updatedMembers = selectedFriends.filter(
                          s => s._id !== member._id,
                        );
                        setSelectedFriends(updatedMembers);
                      }}>
                      <Text style={styles.chipClose}>✕</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
          </>
        )}

        <MatchTypeTextInput
          value={opponent}
          onChangeText={setOpponent}
          placeholder={t('Enter Opponent (Optional)')}
          label={t('Enter Opponent (Optional)')}
        />
        <MatchTypeTextInput
          value={score}
          onChangeText={setScore}
          keyboardType={'numeric'}
          placeholder={t('Enter Score (Optional)')}
          label={t('Enter Score (Optional)')}
        />
        {coaches.length > 0 && (
          <>
            <Text style={[styles.subtitle, {color: dynamicTextColor}]}>
              {t('Request Coach Feedback (Optional)')}
            </Text>
            <Text style={[styles.helpText, {color: dynamicSubTextColor}]}>
              {t(
                'Select a coach from your network to offer feedback on your performance.',
              )}
            </Text>
            <TouchableOpacity
              style={[styles.dropdown, {backgroundColor: dynamicInputBg}]}
              onPress={() => setCoachesMoalVis(true)}>
              <Text style={[styles.dropdownText]}>
                {' '}
                {coach || t('Select Coach')}
              </Text>
              <AnySvg name={isDarkMode ? 'darkDown' : 'lightDown'} size={24} />
            </TouchableOpacity>
            <MembersMultiSelect
              visible={coachesMoalVis}
              options={coaches}
              onSelect={(item: GymMember) => {
                setCoachesMoalVis(false);
                // setFriend(item?.user?.name);

                setSelectedCoaches(prev => {
                  // check if coach already exists in selected list
                  const alreadyExists = prev.some(
                    coach => coach?.user?._id === item?.user?._id,
                  );
                  if (alreadyExists) {
                    return prev; // don’t add duplicate
                  }
                  return [item];
                });
              }}
              selected={selectedCoaches || []}
              toggle={() => setCoachesMoalVis(false)}
            />
            {selectedCoaches?.length > 0 && (
              <View style={[styles.selectedChipsContainer]}>
                {selectedCoaches.map((member, memberIndex) => (
                  <View
                    key={memberIndex}
                    style={[
                      styles.skillChip,
                      {backgroundColor: dynamicInputBg},
                    ]}>
                    <Text style={[styles.chipText, {color: dynamicTextColor}]}>
                      {member?.user?.name}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        let updatedMembers = selectedCoaches.filter(
                          s => s.user._id !== member.user._id,
                        );
                        setSelectedCoaches(updatedMembers);
                      }}>
                      <Text style={styles.chipClose}>✕</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
          </>
        )}

        {user?.user?.friends?.length > 0 && (
          <>
            <Text style={[styles.subtitle, {color: dynamicTextColor}]}>
              {t('Peer Feedback')}
            </Text>
            <Text style={[styles.helpText, {color: dynamicSubTextColor}]}>
              {t('Select a teammate to review this session.')}
            </Text>

            <TouchableOpacity
              style={[styles.dropdown, {backgroundColor: dynamicInputBg}]}
              onPress={() => setFriendListModalVisible(true)}>
              <Text style={[styles.dropdownText]}>
                {' '}
                {friend || t('Select Friend')}
              </Text>
              <AnySvg name={isDarkMode ? 'darkDown' : 'lightDown'} size={24} />
            </TouchableOpacity>
            {friendListModalVisible && (
              <FriendsMultiSelect
                options={user?.user?.friends as Friend}
                selected={selectedMembers || []}
                onSelect={(friend: Friend) => {
                  setFriendListModalVisible(false);
                  setSelectedMembers(prev => {
                    const alreadyExists = prev.some(s => s._id === friend._id);
                    if (alreadyExists) {
                      return prev; // don’t add duplicate
                    }
                    return [friend];
                  });
                }}
                // }}
                onClose={() => {
                  setFriendListModalVisible(false);
                }}
                visible={true}
                toggle={() => {
                  setFriendListModalVisible(false);
                }}
              />
            )}

            {selectedMembers?.length > 0 && (
              <View style={[styles.selectedChipsContainer]}>
                {selectedMembers.map((member, memberIndex) => (
                  <View
                    key={memberIndex}
                    style={[
                      styles.skillChip,
                      {backgroundColor: dynamicInputBg},
                    ]}>
                    <Text style={[styles.chipText, {color: dynamicTextColor}]}>
                      {member?.name}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        let updatedMembers = selectedMembers.filter(
                          s => s._id !== member._id,
                        );
                        setSelectedMembers(updatedMembers);
                      }}>
                      <Text style={styles.chipClose}>✕</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
          </>
        )}

        <Text style={[styles.subtitle, {color: dynamicTextColor}]}>
          {t('Rate your Match')}
        </Text>
        <Text style={[styles.helpText, {color: dynamicTextColor}]}>
          {t('Give yourself a 1 to 10 rating.')}
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={[styles.sliderLabel, {color: dynamicTextColor}]}>
            {t('Personal Review')}
          </Text>
          <AnySvg
            name={isDarkMode ? 'informationCircle' : 'darkInformation'}
            size={34}
            svgStyle={{marginRight: 14}}
            onPress={() => navigation.navigate('AddReviewInformation')}
          />
        </View>

        <CustomSliderWithThumb rating={rating} setRating={setRating} />
        <View
          style={{
            width: '96%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={[styles.subtitle, {color: dynamicTextColor}]}>
            {t('Private')}
          </Text>
          <SwitchButton isOn={access} onPress={handleToggle} />
        </View>
        <View style={[styles.separater, {backgroundColor: separaterColor}]} />

        <View style={{marginTop: rhp(0)}}>
          <Text style={[styles.subtitle, {color: dynamicTextColor}]}>
            {t('Additional Comments')}
          </Text>
          <Text style={[styles.helpText, {color: dynamicSubTextColor}]}>
            Reflect on your match. Note your highs, lows or what you improve.
          </Text>
          <View style={[styles.reviewBox, {backgroundColor: dynamicInputBg}]}>
            <TextInput
              style={[styles.reviewInput, {color: dynamicTextColor}]}
              multiline
              numberOfLines={4}
              value={reviewText}
              onChangeText={setReviewText}
              placeholder={t('Write Review')}
              placeholderTextColor={'#9E9E9E'}
            />
          </View>
        </View>

        <TouchableOpacity
          style={[styles.uploadInput, {backgroundColor: dynamicInputBg}]}
          onPress={() => {
            launchImageLibrary(
              {mediaType: 'mixed', videoQuality: 'high'},
              response => {
                if (
                  !response.didCancel &&
                  !response.errorCode &&
                  response.assets?.[0]?.uri
                ) {
                  const {uri, type, duration} = response.assets[0];
                  console.log(type?.startsWith('image/'));
                  if (type?.startsWith('video/')) {
                    // It's a video
                    if (duration && duration > 30) {
                      utils.showToast(
                        'error',
                        'Your video must be 30 seconds or less.',
                      );
                      return;
                    }
                    setImageUri(null);
                    setVideoUri(uri);
                  } else if (type?.startsWith('image/')) {
                    // It's a photo
                    setVideoUri(null);
                    setImageUri(uri);
                  }
                }
              },
            );
          }}>
          <Text style={[styles.uploadPlaceholder]}>
            {videoUri
              ? 'Video Selected'
              : imageUri
              ? 'Image Selected'
              : t('Upload Video/Photo')}
          </Text>
          <View style={styles.uploadIcons}>
            <AnySvg name="attachment" size={20} />
            <View style={styles.iconDivider} />
            <AnySvg name="camera" size={20} />
          </View>
        </TouchableOpacity>

        {(videoUri || imageUri) && (
          <View
            style={{
              marginTop: 10,
              position: 'relative',
              width: 74,
              height: 74,
              paddingHorizontal: 20,
              borderRadius: 11,
            }}>
            {videoUri ? (
              <Video
                source={{uri: videoUri}}
                style={{
                  width: 74,
                  height: 74,
                }}
                resizeMode="cover"
                paused={true}
              />
            ) : (
              <Image
                source={{uri: imageUri ?? ''}}
                style={{
                  width: 74,
                  height: 74,
                }}
                resizeMode="cover"
              />
            )}
            <TouchableOpacity
              onPress={() => (videoUri ? setVideoUri(null) : setImageUri(null))}
              style={styles.remove}>
              <AnySvg name="removeIcon" size={16} />
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.bottomButtonWrapper}>
          <CustomButton
            loading={loader}
            disable={
              !matchType?.length ||
              !result?.length ||
              !reviewText?.length ||
              loader
            }
            onPress={() => {
              onPressContinue();
            }}>
            {t('Continue')}
          </CustomButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

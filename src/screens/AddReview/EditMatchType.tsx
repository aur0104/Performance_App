import React, {useState, useEffect} from 'react';
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
import {updateReview} from '../../services/calls';
import utils from '../../utils/utils';
import FriendsMultiSelect from '../../components/Dropdown/FriendMultiSelect';
import {useBackHandler} from '../../hooks/useBackHandler';

export default function EditMatchType({navigation, route}: any) {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme.switchDarkTheme);
  const {existingReview} = route.params || {};
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

  const matchTypeOptions = [
    'Competition',
    'Practice Match',
    'Sparring',
    'Rolling (BJJ)',
  ];

  const resultOptions = ['Win', 'Draw', 'Loss'];

  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (existingReview) {
      setMatchType(existingReview.matchType || '');
      setResult(existingReview.matchResult || '');
      setGym(existingReview.clubOrTeam || '');
      setOpponent(existingReview.opponent || '');
      setScore(existingReview.score || '');
      setRating(existingReview.rating || 5);
      setReviewText(existingReview.comment || '');
      setAccess(existingReview.private || false);

      // Set coach feedback if exists
      if (existingReview.coachFeedback?.coach) {
        setSelectedCoaches([existingReview.coachFeedback.coach]);
      }

      // Set peer feedback if exists
      if (existingReview.peerFeedback?.friend) {
        setSelectedMembers([existingReview.peerFeedback.friend]);
      }

      // Set media
      if (existingReview?.media?.length) {
        if (utils.isVideo(existingReview.media[0])) {
          setVideoUri(existingReview.media[0]);
        } else if (utils.isImage(existingReview.media[0])) {
          setImageUri(existingReview.media[0]);
        }
      }
    }
  }, [existingReview]);

  const handleToggle = () => {
    setAccess(!access);
  };

  const onPressContinue = async () => {
    try {
      setLoader(true);
      const formData = new FormData();

      // required fields
      formData.append('sessionType', 'Match Type');
      formData.append('matchType', matchType);
      formData.append('matchResult', result);

      if (gym?.length) formData.append('clubOrTeam', gym);
      if (opponent) formData.append('opponent', opponent);

      // coach feedback (optional)
      if (selectedCoaches?.length) {
        formData.append(
          'coachFeedback.coach',
          selectedCoaches[0]?.user?._id ?? selectedCoaches[0]?._id,
        );
      }

      // peer feedback (optional)
      if (selectedMembers.length > 0) {
        formData.append('peerFeedback.friend', selectedMembers[0]?._id);
      }

      if (score) {
        formData.append('score', score);
      }

      formData.append('rating', rating.toString());
      formData.append('comment', reviewText);
      formData.append('private', access ? 1 : 0);

      // video/photo
      if (videoUri && !videoUri.startsWith('http')) {
        const fileName = videoUri.split('/').pop() || `match_${Date.now()}.mp4`;
        formData.append('media', {
          uri: videoUri,
          type: 'video/mp4',
          name: fileName,
        } as any);
      }

      if (imageUri && !imageUri.startsWith('http')) {
        const fileName =
          imageUri?.split('/').pop() || `performance_${Date.now()}.jpg`;
        formData.append('media', {
          uri: imageUri,
          type: 'image/jpeg',
          name: fileName,
        });
      }

      const response = await updateReview(existingReview._id, formData);

      if (response.status === 200 || response.status === 201) {
        utils.showToast('success', 'Review Updated');
        navigation.navigate('AthleteBottomTab');
      }
    } catch (error: any) {
      utils.showToast('error', error?.message || 'Failed to update review');
    } finally {
      setLoader(false);
    }
  };

  useBackHandler(() => {
    navigation.navigate('AthleteBottomTab');
    return true;
  });

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
      <BackHeader
        title="Edit Match Review"
        showBackIcon={true}
        containerStyle={{padding: 0}}
        onBackPress={() => navigation.goBack()}
      />

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
                selected={selectedMembers || []}
                onSelect={(friend: Friend) => {
                  setTagFriendModalVis(false);
                  setSelectedMembers(prev => {
                    const alreadyExists = prev.some(s => s._id === friend._id);
                    if (alreadyExists) {
                      return prev;
                    }
                    return [friend];
                  });
                }}
                onClose={() => {
                  setTagFriendModalVis(false);
                }}
                visible={true}
                toggle={() => {
                  setTagFriendModalVis(false);
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
                setSelectedCoaches(prev => {
                  const alreadyExists = prev.some(
                    coach => coach?.user?._id === item?.user?._id,
                  );
                  if (alreadyExists) {
                    return prev;
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
                      {member?.name ?? member?.user?.name}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        let updatedMembers = selectedCoaches.filter(
                          s =>
                            s?.user?._id !== member?.user?._id ||
                            s?._id !== member?._id,
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

                  if (type?.startsWith('video/')) {
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
                    setVideoUri(null);
                    setImageUri(uri);
                  }
                }
              },
            );
          }}>
          <Text style={[styles.uploadPlaceholder]}>
            {' '}
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
            {t('Update')}
          </CustomButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
  Modal,
  Image,
} from 'react-native';
import {Video} from 'react-native-video';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import styles from './styles/addReviewStyle';
import {Colors} from '../../utils/Colors';
import AnySvg from '../../components/AnySvg';
import CustomButton from '../../components/CustomButton';
import SelectSportModal from '../../components/SelectSportModal/SelectSportModal';
import {launchImageLibrary} from 'react-native-image-picker';
import BackHeader from '../../components/BackHeader';
import {rhp, wp} from '../../utils/responsivesness';
import CategoryDropdown from '../../components/Dropdown/CategoryDropdown';
import SkillMultiSelect from '../../components/Dropdown/SkillMultiSelect';
import SwitchButton from '../../components/SwitchButton';
import CustomSliderWithThumb from '../../components/CustomSlider';
import fonts from '../../utils/Fonts';
import {
  createReview,
  deleteCustomCategory,
  deleteCustomSkill,
  getAllSportsCustomeCategories,
  getSportsDropdown,
} from '../../services/calls';
import {Category, Friend, GymMember, Skill, Sport} from '../../interfaces';
import utils from '../../utils/utils';
import {useGymMembers} from '../../hooks/useGetMembers';
import MembersMultiSelect from '../../components/Dropdown/MembersMultiSelect';
import MatchTypeDropdown from '../../components/Dropdown/MatchTypeDropdown';
import FriendsMultiSelect from '../../components/Dropdown/FriendMultiSelect';
import {useFocusEffect} from '@react-navigation/native';
export default function AddReviewScreen({navigation, route}: any) {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme.switchDarkTheme);
  const user = useSelector((state: any) => state.user.user);
  //console.log('User here *** ', JSON.stringify(user));
  const {coaches, teamMembers} = useGymMembers();
  // console.log('Team members ', teamMembers);
  const [selectedMembers, setSelectedMembers] = useState<Friend[] | []>([]);
  const [selectedCoaches, setSelectedCoaches] = useState<GymMember[] | []>([]);
  const [sportModalVisible, setSportModalVisible] = useState(false);
  const [selectedSport, setSelectedSport] = useState<Sport | null>(null);
  const [categoryDropdownVisible, setCategoryDropdownVisible] = useState(false);
  const [coach, setCoach] = useState('');
  const [friend, setFriend] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [videoUri, setVideoUri] = useState<string | null>(null);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [rating, setRating] = useState(5);
  const [access, setAccess] = useState(false);
  const separaterColor = isDarkMode ? '#424242' : '#E0E0E0';
  const [selectedCategories, setSelectedCategories] = useState<Category | null>(
    null,
  );
  const [categoryOptions, setCategoryOptions] = useState<Category[]>([]);
  const [categorySkills, setCategorySkills] = useState<Skill[] | []>([]);
  const [selectedSkills, setSelectedSkills] = useState<Skill[] | []>([]);
  const [skillDropDownOption, setSkillDropDownOption] = useState(false);
  const [gym, setGym] = useState<string | null>(null);
  const handleToggle = () => {
    setAccess(!access);
  };
  const [sportsData, setSportsData] = useState<Sport[]>([]);
  const dynamicTextColor = isDarkMode ? Colors.white : Colors.black;
  const dynamicSubTextColor = isDarkMode ? Colors.gray2 : Colors.darkGray;
  const dynamicInputBg = isDarkMode
    ? Colors.darkInputBg || '#333'
    : Colors.lightInputBg || '#F2F2F2';
  //Get Data from API
  const getSportsData = async () => {
    try {
      setSelectedSport(null);
      setSelectedCategories(null);
      const customResponse = await getAllSportsCustomeCategories(user.user._id);
      const response = await getSportsDropdown();
      const customSports = customResponse?.data || [];
      const adminSports = response?.data || [];
      const mergedSports = adminSports.map((adminSport: any) => {
        // find matching custom sport
        const customSport = customSports.find(
          (c: any) => c._id === adminSport._id,
        );
        let mergedCategories = adminSport.categories.map((adminCat: any) => {
          const customCat = customSport?.categories?.find(
            (c: any) => c._id === adminCat._id,
          );

          // merge skills
          let mergedSkills = adminCat.skills.map((adminSkill: any) => {
            const isCustom = !!customCat?.skills?.some(
              (cSkill: any) => cSkill._id === adminSkill._id,
            );
            return {...adminSkill, isCustom};
          });

          // add extra custom skills (not in admin)
          if (customCat) {
            const extraCustomSkills = customCat.skills.filter(
              (cSkill: any) =>
                !adminCat.skills.some(
                  (aSkill: any) => aSkill._id === cSkill._id,
                ),
            );
            mergedSkills = [
              ...mergedSkills,
              ...extraCustomSkills.map((s: any) => ({...s, isCustom: true})),
            ];
          }

          return {
            ...adminCat,
            isCustom: !!customCat,
            skills: mergedSkills,
          };
        });

        // add extra custom categories (not in admin)
        if (customSport) {
          const extraCustomCats = customSport.categories.filter(
            (c: any) =>
              !adminSport.categories.some((a: any) => a._id === c._id),
          );

          mergedCategories = [
            ...mergedCategories,
            ...extraCustomCats.map((c: any) => ({
              ...c,
              isCustom: true,
              skills: c.skills.map((s: any) => ({...s, isCustom: true})),
            })),
          ];
        }

        return {
          ...adminSport,
          isCustom: false, // sports are always admin
          categories: mergedCategories,
        };
      });
      setSportsData(mergedSports);
    } catch (error: any) {
      console.log('Error here ', error);
      utils.showToast('error', error?.message || 'Failed to fetch sports data');
    }
  };
  const [friendListModalVisible, setFriendListModalVisible] = useState(false);
  const [coachesMoalVis, setCoachesMoalVis] = useState(false);
  const [gymModalVis, setGymModalVis] = useState(false);
  useFocusEffect(
    useCallback(() => {
      getSportsData();
    }, []),
  );
  const [loader, setLoader] = useState(false);
  const onPressContinue = async () => {
    try {
      setLoader(true);
      const formData = new FormData();
      formData.append('sport', selectedSport?._id);
      formData.append('category[categoryId]', selectedCategories?._id);
      formData.append(
        'category[categoryModel]',
        selectedCategories?.isCustom ? 'User_Sport_Category' : 'Sport_Category',
      );

      selectedSkills.forEach((skill, index) => {
        formData.append(`skill[${index}][skillId]`, skill._id);
        formData.append(
          `skill[${index}][skillModel]`,
          skill.isCustom ? 'User_Sport_Category_Skill' : 'Sport_Category_Skill',
        );
      });
      formData.append('sessionType', 'Skill Practice');
      formData.append('rating', rating.toString());
      formData.append('comment', reviewText);
      formData.append('private', access ? 1 : 0);
      if (gym?.length) formData.append('clubOrTeam', gym);
      if (selectedCoaches.length > 0) {
        formData.append('coachFeedback.coach', selectedCoaches[0]?.user?._id);
      }
      if (selectedMembers.length > 0) {
        formData.append('peerFeedback.friend', selectedMembers[0]?._id);
      }
      // 👇 File part (React Native style)
      if (videoUri) {
        const fileName =
          videoUri?.split('/').pop() || `performance_${Date.now()}.mp4`;
        formData.append('media', {
          uri: videoUri,
          type: 'video/mp4',
          name: fileName,
        });
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
      // console.log('Form data ', JSON.stringify(formData));
      const result = await createReview(formData);

      if (result.status === 200 || result.status === 201) {
        navigation.navigate('RequestSubmittedScreen', {
          _id: result?.data?.data?._id,
        });
        // Handle successful review creation
      } else {
        // Handle error
      }
    } catch (error: any) {
      utils.showToast('error', error?.message || 'Failed to create review');
    } finally {
      setLoader(false);
    }
  };
  const deleteCustomCategoryBackend = async (
    _id: string,
    deleteCategory = true,
  ) => {
    const response = deleteCategory
      ? await deleteCustomCategory(_id)
      : await deleteCustomSkill(_id);
    if (response.status === 200 || response.status === 201) {
      utils.showToast('success', 'Category Deleted');
      getSportsData();
      setSelectedSport(null);
      setSelectedCategories(null);
      setSelectedSkills([]);
      return;
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
      <BackHeader
        title="Add Reviews"
        showBackIcon={true}
        containerStyle={{padding: wp(0)}}
      />
      <ScrollView
        contentContainerStyle={{paddingBottom: 40}}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <Text style={[styles.subtitle, {color: dynamicTextColor}]}>
          {t('Pick a Sport')}
        </Text>
        <Text style={[styles.helpText, {color: dynamicSubTextColor}]}>
          {t('Start by selecting your sport.')}
        </Text>

        <TouchableOpacity
          style={[styles.dropdown, {backgroundColor: dynamicInputBg}]}
          onPress={() => setSportModalVisible(true)}>
          <Text
            style={[
              styles.dropdownText,
              selectedSport && {color: dynamicTextColor},
            ]}>
            {selectedSport ? selectedSport.name : t('Select Sport')}
          </Text>
          <AnySvg name={isDarkMode ? 'darkDown' : 'lightDown'} size={24} />
        </TouchableOpacity>
        {user?.user?.gym && (
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
        )}

        {categoryOptions?.length > 0 && (
          <TouchableOpacity
            style={[styles.dropdown, {backgroundColor: dynamicInputBg}]}
            onPress={() => setCategoryDropdownVisible(true)}>
            <Text
              style={[
                styles.dropdownText,
                selectedCategories && {color: dynamicTextColor},
              ]}>
              {selectedCategories
                ? selectedCategories.name
                : t('Select Categories')}
            </Text>
            <AnySvg name={isDarkMode ? 'darkDown' : 'lightDown'} size={24} />
          </TouchableOpacity>
        )}

        {categoryDropdownVisible && (
          <CategoryDropdown
            categories={categoryOptions}
            selected={selectedCategories}
            onSelect={(value: Category) => {
              setSelectedCategories(value);
              setCategoryDropdownVisible(false);
              setCategorySkills(value.skills || []);
              setSelectedSkills([]);
            }}
            onRemove={(value: string) => {
              console.log('Remove category ', value);
              // setCategoryOptions(prev => (
              //   prev.filter(c => c !== value)
              // ));
              // setCategorySkills(prev => {
              //   const updated = {...prev};
              //   delete updated[value];
              //   return updated;
              // });
            }}
            onToggle={() => {}}
            visible={categoryDropdownVisible}
            toggle={() => setCategoryDropdownVisible(false)}
            onClose={() => setCategoryDropdownVisible(false)}
            showAddCategoryButton={true}
            onPressAddCategory={() => {
              navigation.navigate('AddCategory' as never, {
                payload: {
                  sport: selectedSport?._id,
                  user: user.user._id,
                },
              });
            }}
            onPressEdit={(category: Category) => {
              setCategoryDropdownVisible(false);
              setTimeout(() => {
                navigation.navigate('AddCategory' as never, {
                  payload: category,
                  forUdpate: true,
                });
              }, 600);
            }}
            onPressDelete={(category: Category) => {
              try {
                setCategoryDropdownVisible(false);
                deleteCustomCategoryBackend(category?._id);
              } catch (error: any) {
                utils.showToast('error', error?.message);
              }
            }}
          />
        )}
        {selectedCategories && selectedCategories?.skills && (
          <>
            <View style={{marginTop: 10}}>
              <Text
                style={[
                  styles.labelText,
                  {color: dynamicTextColor, fontSize: 16},
                ]}>
                {selectedCategories?.name} - {t('Select Skills')}
              </Text>
            </View>
            <TouchableOpacity
              style={[
                styles.dropdown,
                {backgroundColor: dynamicInputBg, marginHorizontal: 20},
              ]}
              onPress={() => {
                setSkillDropDownOption(true);
              }}>
              <Text style={[styles.dropdownText]}>
                {selectedSkills.length > 0
                  ? `${selectedSkills
                      .map(skill => skill.name)
                      .join(', ')} Skills Selected`
                  : t('Select Skills')}
              </Text>
              <AnySvg name={isDarkMode ? 'darkDown' : 'lightDown'} size={24} />
            </TouchableOpacity>
          </>
        )}

        <SkillMultiSelect
          showInfo={true}
          options={categorySkills}
          selected={selectedSkills || []}
          onSelect={(skill: Skill) => {
            setSkillDropDownOption(false);
            setSelectedSkills(prev => {
              const alreadyExists = prev.some(s => s._id === skill._id);
              if (alreadyExists) {
                return prev; // don’t add duplicate
              }
              return [...prev, skill];
            });
          }}
          // }}
          onClose={() => {
            setSkillDropDownOption(false);
          }}
          visible={skillDropDownOption}
          toggle={() => {
            setSkillDropDownOption(false);
          }}
          onPressAddSkill={() => {
            try {
              const payload = {
                category: selectedCategories?._id,
              };
              if (!selectedCategories?.isCustom) {
                utils.showToast(
                  'error',
                  'You can only add custom skill for custom category',
                );
                return;
              }
              navigation.navigate('AddSkills', {
                payload,
              });
            } catch (error) {}
          }}
          onPressEdit={(skill: Skill) => {
            try {
              setSkillDropDownOption(false);
              navigation.navigate('AddSkills', {
                payload: skill,
                forUpdate: true,
              });
            } catch (error) {}
          }}
          onPressDelete={(skill: Skill) => {
            setSkillDropDownOption(false);
            try {
              deleteCustomCategoryBackend(skill._id, false);
            } catch (error) {}
          }}
        />

        {selectedSkills?.length > 0 && (
          <View style={[styles.selectedChipsContainer]}>
            {selectedSkills.map((skill, skillIndex) => (
              <View
                key={skillIndex}
                style={[styles.skillChip, {backgroundColor: dynamicInputBg}]}>
                <Text style={[styles.chipText, {color: dynamicTextColor}]}>
                  {skill?.name}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    let updatedSkills = selectedSkills.filter(
                      s => s._id !== skill._id,
                    );
                    setSelectedSkills(updatedSkills);
                  }}>
                  <Text style={styles.chipClose}>✕</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
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
                    coach => coach.user._id === item.user._id,
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
          {t('Rate Your Session')}
        </Text>
        <Text style={[styles.helpText, {color: dynamicSubTextColor}]}>
          {t('Score your session from 1 to 10.')}
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={[
              styles.sliderLabel,
              {color: dynamicTextColor, fontSize: 16},
            ]}>
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
            Reflect on your performance. Note your highs, lows or what you
            improve.
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
            onPress={onPressContinue}
            loading={loader}
            disable={
              !selectedSport ||
              !selectedCategories ||
              selectedSkills.length === 0 ||
              loader ||
              reviewText.length === 0
            }>
            {t('Continue')}
          </CustomButton>
        </View>

        <SelectSportModal
          visible={sportModalVisible}
          onClose={() => setSportModalVisible(false)}
          onSelectSport={(item: Sport) => {
            setSelectedSport(item);
            setCategoryOptions(item.categories || []);
            setSportModalVisible(false);
          }}
          sportsCategories={sportsData}
        />
      </ScrollView>

      <Modal visible={showPopup} transparent animationType="fade">
        <View style={styles.popupOverlay}>
          <View style={styles.popupContainer}>
            <TouchableOpacity
              style={styles.closeIcon}
              onPress={() => {
                setShowPopup(false),
                  navigation.navigate('RequestSubmittedScreen');
              }}>
              <AnySvg name="crossIcon" size={16} />
            </TouchableOpacity>

            <Text style={styles.popupTitle}>{t('Limit Reached')}</Text>
            <Text style={styles.popupMessage}>
              ​Your monthly{' '}
              <Text style={{fontFamily: fonts.UrbanistBold}}>
                review submission
              </Text>{' '}
              limit has been reached. Please reach out to your coach or gym
              owner to adjust your review limit. Thank you.
            </Text>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

import React, {useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {Colors} from '../../../utils/Colors';
import AnySvg from '../../../components/AnySvg';
import styles from './styles';
import InputField from '../../../components/CustomInputField';
import VideoPlayer from 'react-native-video';
import CustomSliderWithThumb from '../../../components/CustomSlider';
import {IMAGES} from '../../../assets/images';
import FilterModal from './FilerModal';

interface JournalsProps {
  navigation?: any;
}

const Journals: React.FC<JournalsProps> = ({navigation}) => {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const [search, setSearch] = useState('');
  const [filterVisible, setFilterVisible] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<{
    skill: string;
    sessionType: string;
  }>({skill: '', sessionType: ''});

  const backgroundColor = isDarkMode ? Colors.darkBackground : Colors.white;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const iconButtonColor = isDarkMode ? '#797979' : '#EDEDED';
  const textColor2 = isDarkMode ? Colors.gray : Colors.black;
  const borderColor = isDarkMode ? Colors.gray : '#C9C9C9';
  const separaterColor = isDarkMode ? '#424242' : '#E0E0E0';
  const dynamicBg = isDarkMode ? '#212121' : '#F2F2F2';
  const [paused, setPaused] = useState(true);
  const [rating, setRating] = useState(5);

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <ScrollView
        contentContainerStyle={{paddingBottom: 20}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AnySvg
              name={isDarkMode ? 'backArrow' : 'lightBackArrow'}
              size={24}
            />
          </TouchableOpacity>

          <Text style={[styles.headerTitle, {color: textColor}]}>
            {t('Journal')}
          </Text>

          <View style={styles.headerRight}>
            <TouchableOpacity
              style={[styles.iconButton, {backgroundColor: iconButtonColor}]}>
              <AnySvg
                name={isDarkMode ? 'shareIcon' : 'lightShare'}
                size={15}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.iconButton, {backgroundColor: iconButtonColor}]}>
              <AnySvg
                name={isDarkMode ? 'downloadIcon' : 'lightDownload'}
                size={15}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.searchRow}>
          <InputField
            label=""
            placeholder={t('Search')}
            iconLeftName="searchIcon"
            value={search}
            onChangeText={setSearch}
            containerStyle={{
              borderRadius: 50,
              height: 45,
              width: '92%',
              backgroundColor: '#616161',
            }}
          />
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setFilterVisible(true)}>
            <AnySvg name="filter" size={20} />
          </TouchableOpacity>
        </View>

        <View style={[styles.rowItem, {alignItems: 'center'}]}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Text style={[styles.label, {color: textColor}]}>{t('Date')}:</Text>
            <Text style={[styles.value, {color: textColor2}]}>13 May 2025</Text>
          </View>

          <View
            style={{
              width: 1,
              height: '50%',
              backgroundColor: separaterColor,
              marginHorizontal: 20,
            }}
          />

          <View style={{flex: 1, flexDirection: 'row', marginVertical: 10}}>
            <Text style={[styles.label, {color: textColor}]}>
              {t('Sport')}:
            </Text>
            <Image source={IMAGES.rugby} style={styles.image} />
            <Text style={[styles.value, {color: textColor2}]}>Rugby</Text>
          </View>
        </View>

        {appliedFilters.sessionType === 'Sport' && (
          <>
            <View
              style={[styles.separater, {backgroundColor: separaterColor}]}
            />
            <View
              style={[
                styles.rowItem,
                {alignItems: 'center', justifyContent: 'space-between'},
              ]}>
              <View style={{flexDirection: 'row'}}>
                <Text style={[styles.label, {color: textColor}]}>
                  {t('Class')}:
                </Text>
                <Text style={[styles.value, {color: textColor2}]}>
                  2 Handed Pickup
                </Text>
              </View>

              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}>
                <Text style={[styles.label, {color: textColor}]}>
                  {t('Time')}:
                </Text>
                <Text style={[styles.value, {color: textColor2}]}>
                  10 PM - 11 PM{' '}
                </Text>
              </View>
            </View>
            <View
              style={[styles.separater, {backgroundColor: separaterColor}]}
            />

            <View style={styles.rowItem}>
              <Text style={[styles.label, {color: textColor}]}>
                {t('Category')}:
              </Text>
              <Text style={[styles.value, {color: textColor2}]}>Passing</Text>
            </View>
            <View
              style={[styles.separater, {backgroundColor: separaterColor}]}
            />
            <View style={styles.rowItem}>
              <Text style={[styles.label, {color: textColor}]}>
                {t('Skill Type')}:
              </Text>
              <Text style={[styles.value, {color: textColor2}]}>
                Cut Out Pass
              </Text>
            </View>
          </>
        )}

        {appliedFilters.sessionType === 'Match Type' && (
          <>
            <View
              style={[styles.separater, {backgroundColor: separaterColor}]}
            />
            <View
              style={{
                flexDirection: 'row',
                marginVertical: 10,
                paddingHorizontal: 20,
              }}>
              <Text style={[styles.label, {color: textColor}]}>
                {t('Match Type')}:
              </Text>
              <Text style={[styles.value, {color: textColor2}]}>
                {appliedFilters.sessionType}
              </Text>
            </View>
            <View
              style={[styles.separater, {backgroundColor: separaterColor}]}
            />
            <View style={[styles.rowItem, {alignItems: 'center'}]}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Text style={[styles.label, {color: textColor}]}>
                  {t('Result')}:
                </Text>
                <Text style={[styles.value, {color: textColor2}]}>Win</Text>
              </View>

              <View
                style={{
                  width: 1,
                  height: '80%',
                  backgroundColor: separaterColor,
                  marginHorizontal: 20,
                }}
              />

              <View style={{flexDirection: 'row'}}>
                <Text style={[styles.label, {color: textColor}]}>
                  {t('Score Result')}:
                </Text>
                <Text style={[styles.value, {color: textColor2}]}>
                  for BJJ, “2-1 win
                </Text>
              </View>
            </View>
            <View
              style={[styles.separater, {backgroundColor: separaterColor}]}
            />
            <View style={styles.rowItem}>
              <Text style={[styles.label, {color: textColor}]}>
                {t('Opponent/Team Name')}:
              </Text>
              <Text style={[styles.value, {color: textColor2, fontSize: 14}]}>
                Unline Group Of Teams
              </Text>
            </View>
            <View
              style={[styles.separater, {backgroundColor: separaterColor}]}
            />
            <View style={styles.rowItem}>
              <Text style={[styles.label, {color: textColor, marginTop: 14}]}>
                {t('Friends')}:
              </Text>
              <View style={[styles.userView, {backgroundColor: dynamicBg}]}>
                <Image
                  source={IMAGES.profile1}
                  style={[styles.profileImage, {borderColor: borderColor}]}
                />
                <Text style={[styles.userName, {color: textColor}]}>
                  {t('Jame John')}
                </Text>
              </View>
            </View>
            <View
              style={[styles.separater, {backgroundColor: separaterColor}]}
            />
            <View style={styles.rowItem}>
              <Text style={[styles.label, {color: textColor}]}>
                {t('Gym')}:
              </Text>
              <Text style={[styles.value, {color: textColor2}]}>
                Ex Training Club
              </Text>
            </View>
          </>
        )}

        <View
          style={[styles.sectionTitle, {backgroundColor: Colors.primaryColor}]}>
          <Text style={styles.text}>{t('Personal Feedback')}</Text>
        </View>
        <Text style={[styles.description, {color: textColor2}]}>
          I’ve completed the timed 5K run and beat my previous record! Need to
          work on pacing the first mile better next time.
        </Text>

        <CustomSliderWithThumb rating={rating} editable={false} />

        <View style={[styles.separater, {backgroundColor: separaterColor}]} />
        <View style={[styles.sectionTitle, {backgroundColor: Colors.green}]}>
          <Text style={styles.text}>{t('Peer Feedback')}</Text>
        </View>
        <Text style={[styles.description, {color: textColor2}]}>
          Adam has done a fantastic job improving his snatch technique—his hip
          contact is much sharper now. Let’s focus on faster turnover under the
          bar next.
        </Text>
        <CustomSliderWithThumb rating={rating} editable={false} />

        <View style={[styles.separater, {backgroundColor: separaterColor}]} />

        <View style={[styles.sectionTitle, {backgroundColor: Colors.yellow}]}>
          <Text style={[styles.text, {color: Colors.black}]}>
            {t('Coach Feedback')}
          </Text>
        </View>
        <Text style={[styles.description, {color: textColor2}]}>
          You’ve used all your available coach reviews for this period. Keep
          training hard—your next review window will open soon!
        </Text>
        <CustomSliderWithThumb rating={rating} editable={false} />

        <View style={[styles.separater, {backgroundColor: separaterColor}]} />

        <Text style={[styles.title, {color: textColor, marginBottom: 15}]}>
          {t('Video')}
        </Text>

        <View style={styles.videoWrapper}>
          <VideoPlayer
            source={require('../../../assets/images/SafetyVideo.mp4')}
            style={styles.video}
            paused={paused}
            resizeMode="cover"
          />
          <TouchableOpacity
            onPress={() => setPaused(!paused)}
            style={styles.videoButton}>
            <AnySvg
              name={paused ? 'playIcon' : 'pauseIcon'}
              size={20}
              svgStyle={{alignSelf: 'center'}}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <FilterModal
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        onApply={filters => {
          setAppliedFilters(filters);
          setFilterVisible(false);
        }}
      />
    </View>
  );
};

export default Journals;

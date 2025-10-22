import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  Animated,
  StatusBar,
  ScrollView,
  NativeScrollEvent,
  NativeSyntheticEvent,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {Colors} from '../../utils/Colors';
import {IMAGES} from '../../assets/images';
import {styles} from './styles';
import CustomButton from '../../components/CustomButton';
import {hp} from '../../utils/responsivesness';

const {width} = styles.constants;

const onboardingScreens = [
  IMAGES.onboarding1Image,
  IMAGES.onboarding2Image,
  IMAGES.onboarding3Image,
  IMAGES.onboarding4Image,
];

interface Props {
  navigation: any;
}

export default function Onboarding({navigation}: Props) {
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList<number>>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme.switchDarkTheme);

  const {width: SCREEN_WIDTH} = Dimensions.get('window');
  const isTablet = SCREEN_WIDTH >= 768;

  const IMAGE_ASPECT_RATIO = 450 / 400;
  const IMAGE_HEIGHT = SCREEN_WIDTH * IMAGE_ASPECT_RATIO;
  const finalImageHeight = isTablet ? IMAGE_HEIGHT : hp(55);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offset = event.nativeEvent.contentOffset.x;
    const index = Math.round(offset / width);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < onboardingScreens.length - 1) {
      flatListRef.current?.scrollToIndex({index: currentIndex + 1});
    } else {
      navigation.replace('RoleSelection');
    }
  };

  const renderItem = ({index}: {item: number; index: number}) => (
    <View style={styles.slide}>
      <View
        style={{
          flex: 1,
          width: '100%',
          height: finalImageHeight,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={onboardingScreens[index]}
          style={{width: '100%', height: '100%'}}
          resizeMode="cover"
        />
      </View>

      <View style={styles.content}>
        <Text
          style={[
            styles.title,
            {color: isDarkMode ? Colors.white : Colors.black},
          ]}>
          {t(`Onboarding${index + 1}_Title`)}{' '}
          <Text style={styles.highlight}>
            {t(`Onboarding${index + 1}_Highlight`)}
          </Text>
        </Text>

        <Text
          style={[
            styles.description,
            {color: isDarkMode ? Colors.white : Colors.black},
          ]}>
          {t(`Onboarding${index + 1}_Description`)}
        </Text>

        <View style={styles.dotsContainer}>
          {onboardingScreens.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, currentIndex === i && styles.dotActive]}
            />
          ))}
        </View>

        <View>
          <CustomButton onPress={handleNext}>
            {t(`Onboarding${index + 1}_Continue`)}
          </CustomButton>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('RoleSelection')}>
          <Text
            style={[
              styles.description,
              {color: isDarkMode ? Colors.white : Colors.black},
            ]}>
            {t(`Onboarding${index + 1}_Text`)}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[
        styles.page,
        {
          backgroundColor: isDarkMode
            ? Colors.darkBackground
            : Colors.lightBackground,
        },
      ]}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <FlatList
        ref={flatListRef}
        data={[0, 1, 2, 3]}
        keyExtractor={item => item.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {
            useNativeDriver: false,
            listener: handleScroll,
          },
        )}
        scrollEventThrottle={16}
      />
    </ScrollView>
  );
}

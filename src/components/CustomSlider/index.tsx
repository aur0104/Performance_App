import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  LayoutChangeEvent,
  Animated,
  ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {IMAGES} from '../../assets/images';
import styles from './styles';
import Slider from '@react-native-community/slider';
import fonts from '../../utils/Fonts';

interface CustomSliderWithThumbProps {
  rating: number;
  setRating?: (val: number) => void;
  editable?: boolean;
}

const CustomSliderWithThumb: React.FC<CustomSliderWithThumbProps> = ({
  rating,
  setRating,
  editable = true,
}) => {
  const [trackWidth, setTrackWidth] = useState(0);
  const [thumbLeft, setThumbLeft] = useState(0);

  const AnimatedImageBackground =
    Animated.createAnimatedComponent(ImageBackground);

  const handleLayout = (event: LayoutChangeEvent) => {
    const {width} = event.nativeEvent.layout;
    setTrackWidth(width);
    updateThumbPosition(rating, width);
  };

  const updateThumbPosition = (val: number, widthOverride?: number) => {
    const width = widthOverride ?? trackWidth;
    const newThumbLeft = (val / 10) * width;
    setThumbLeft(newThumbLeft);
  };

  useEffect(() => {
    updateThumbPosition(rating);
  }, [trackWidth, rating]);

  return (
    <View>
      <View style={styles.sliderTrack} onLayout={handleLayout}>
        <View style={styles.fullTrack} />
        <LinearGradient
          colors={['#F75555', '#09FD87']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={[styles.gradientLine, {width: `${(rating / 10) * 100}%`}]}
        />
        <AnimatedImageBackground
          source={IMAGES.box}
          style={[styles.thumbLabel, {left: thumbLeft - 12}]}
          imageStyle={{resizeMode: 'contain'}}>
          <Text style={styles.thumbLabelText}>{rating}</Text>
        </AnimatedImageBackground>

        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={10}
          step={1}
          value={rating}
          onValueChange={val => {
            if (editable && setRating) {
              setRating(val);
              updateThumbPosition(val);
            }
          }}
          disabled={!editable}
          minimumTrackTintColor="transparent"
          maximumTrackTintColor="transparent"
          thumbImage={IMAGES.thumbnail}
        />
      </View>

      <View style={styles.tickRow}>
        {[...Array(11)].map((_, i) => (
          <View key={i} style={{alignItems: 'center', flex: 1}}>
            <View
              style={{
                width: 1,
                height: 8,
                borderRadius: 2,
                backgroundColor: '#7e7d7dff',
              }}
            />
            {i % 2 === 0 && (
              <Text
                style={{
                  fontSize: 12,
                  color: '#706f6fff',
                  marginTop: 2,
                  fontFamily: fonts.UrbanistMedium,
                }}>
                {i}
              </Text>
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

export default CustomSliderWithThumb;

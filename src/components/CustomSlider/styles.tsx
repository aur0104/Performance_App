import {StyleSheet} from 'react-native';
import fonts from '../../utils/Fonts';
import {hp, rhp} from '../../utils/responsivesness';
import {Colors} from '../../utils/Colors';

const styles = StyleSheet.create({
  sliderTrack: {
    width: '90%',
    height: 24,
    justifyContent: 'center',
    position: 'relative',
    alignSelf: 'center',
    marginTop: 34,
    marginBottom: 12,
  },
  fullTrack: {
    position: 'absolute',
    width: '100%',
    height: 18,
    borderRadius: 138,
    backgroundColor: '#2F7ABE',
    opacity: 0.2,
    top: '52%',
    transform: [{translateY: -3}],
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradientLine: {
    position: 'absolute',
    height: 18,
    borderRadius: 138,
    top: '50%',
    left: 0,
    transform: [{translateY: -3}],
  },
  slider: {
    width: '108%',
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 0,
    marginTop: 15,
    right: 16,
  },
  sliderLabel: {
    color: '#FFFFFF',
    fontFamily: fonts.UrbanistBold,
    fontSize: 14,
    marginBottom: rhp(6),
    paddingHorizontal: 0,
  },
  thumbLabel: {
    position: 'absolute',
    top: -42,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    marginLeft: -10,
  },
  thumbLabelText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  tickRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: hp(2),
    paddingHorizontal: 5,
  },
  tickLabel: {
    fontSize: 10,
    fontFamily: fonts.UrbanistRegular,
    color: Colors.white,
    paddingHorizontal: 20,
  },

  thumbDot: {
    position: 'absolute',
    top: 8,
    width: 22,
    height: 22,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    zIndex: 7,
  },
});

export default styles;

import {StyleSheet} from 'react-native';
import {hp, rhp, wp} from '../../../utils/responsivesness';
import fonts from '../../../utils/Fonts';
import {Colors} from '../../../utils/Colors';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: wp(5),
    paddingBottom: hp(4),
  },
  itemContainer: {
    marginBottom: hp(3),
  },
  headerText: {
    fontSize: 20,
    fontFamily: fonts.UrbanistSemiBold,
    marginBottom: hp(0.8),
  },
  descriptionText: {
    fontSize: 18,
    fontFamily: fonts.UrbanistRegular,
    marginBottom: hp(1),
  },
  separator: {
    height: 1,
    width: '100%',
  },
  sliderTrack: {
    width: '90%',
    height: 20,
    justifyContent: 'center',
    position: 'relative',
    alignSelf: 'center',
    marginTop: 34,
    marginBottom: 12,
  },
  fullTrack: {
    position: 'absolute',
    width: '100%',
    height: 10,
    borderRadius: 138,
    backgroundColor: '#2F7ABE',
    opacity: 0.2,
    top: '50%',
    transform: [{translateY: -3}],
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradientLine: {
    position: 'absolute',
    height: 10,
    borderRadius: 138,
    top: '50%',
    left: 0,
    transform: [{translateY: -3}],
  },
  slider: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    marginTop: 12,
  },
  sliderLabel: {
    color: '#FFFFFF',
    fontFamily: fonts.UrbanistBold,
    fontSize: 14,
    marginBottom: rhp(6),
    paddingHorizontal: 20,
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
    justifyContent: 'space-between',
    marginTop: hp(0.5),
    marginBottom: hp(2),
  },
  tickLabel: {
    fontSize: 10,
    fontFamily: fonts.UrbanistRegular,
    color: Colors.white,
    paddingHorizontal: 20,
  },
  emailText: {
    fontSize: 18,
    color: Colors.primaryColor,
    fontFamily: fonts.UrbanistBold,
    paddingHorizontal: 20,
    marginBottom: 30,
    marginTop: -38,
  },
});

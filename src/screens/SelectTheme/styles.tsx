import {StyleSheet} from 'react-native';
import {hp, rfs} from '../../utils/responsivesness';
import fonts from '../../utils/Fonts';
import {Colors} from '../../utils/Colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  logoWrapper: {
    position: 'absolute',
    top: hp(6),
    alignItems: 'center',
  },
  titleText: {
    fontSize: rfs(32),
    marginTop: hp(48),
    fontFamily: fonts.UrbanistBold,
  },
  toggleTrack: {
    marginTop: hp(7),
    width: 180,
    height: 100,
    borderRadius: 100,
    backgroundColor: Colors.gray,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  toggleThumb: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    width: 36,
    height: 36,
    borderRadius: 35,
    alignSelf: 'center',
    backgroundColor: Colors.gray,
  },
});

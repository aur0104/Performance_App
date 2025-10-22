import {StyleSheet} from 'react-native';
import {hp, wp, rfs} from '../../utils/responsivesness';
import fonts from '../../utils/Fonts';
import {Colors} from '../../utils/Colors';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scroll: {
    alignItems: 'center',
    paddingVertical: hp(3),
  },
  title: {
    fontSize: 35,
    textAlign: 'center',
    fontFamily: fonts.UrbanistBold,
  },
  description: {
    fontSize: 14,
    fontFamily: fonts.UrbanistSemiBold,
    marginTop: 8,
  },
  titleHighlight: {
    color: Colors.meduimblue,
    fontFamily: fonts.UrbanistExtraBold,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: hp(1.5),
    paddingHorizontal: 30,
    fontFamily: fonts.UrbanistSemiBold,
  },
  card: {
    width: '90%',
    height: 250,
    borderRadius: hp(2),
    overflow: 'hidden',
    marginVertical: hp(1),
    marginTop: hp(2),
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  button: {
    position: 'absolute',
    bottom: hp(2.5),
    alignSelf: 'center',
    backgroundColor: Colors.white,
    paddingVertical: hp(1),
    paddingHorizontal: wp(10),
    borderRadius: hp(2.5),
  },
  buttonText: {
    color: Colors.black,
    fontFamily: fonts.UrbanistExtraBold,
    fontSize: rfs(14),
  },
});

export default styles;

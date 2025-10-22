import {StyleSheet} from 'react-native';
import fonts from '../../../utils/Fonts';
import {hp, wp} from '../../../utils/responsivesness';
import {Colors} from '../../../utils/Colors';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  headerImage: {
    width: '100%',
    height: 245,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingTop: 15,
  },
  headerIcons: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    paddingHorizontal: 20,
  },
  titleText: {
    fontSize: 24,
    fontFamily: fonts.UrbanistBold,
  },
  avatarGroup: {
    flexDirection: 'row',
  },
  avatarWrapper: {
    marginLeft: -10,
    borderWidth: 1.52,
    borderColor: '#F4F4FC',
    borderRadius: 27 / 2,
    overflow: 'hidden',
  },
  avatarImage: {
    width: 27,
    height: 27,
    borderRadius: 27 / 2,
  },
  description: {
    fontSize: 14,
    marginTop: 12,
    paddingHorizontal: 20,
    fontFamily: fonts.UrbanistMedium,
  },
  separator: {
    height: 1,
    marginVertical: hp(5),
    marginHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    paddingHorizontal: 20,
    marginBottom: 12,
    fontFamily: fonts.UrbanistBold,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  statsText: {
    fontSize: 16,
    fontFamily: fonts.UrbanistSemiBold,
  },
  verticalLine: {
    height: 20,
    width: 1,
    marginHorizontal: 8,
  },
  createdText: {
    fontSize: 16,
    marginTop: 12,
    paddingHorizontal: 20,
    marginBottom: 24,
    fontFamily: fonts.UrbanistSemiBold,
  },
  toggleContainer: {
    width: '90%',
    height: 43,
    borderRadius: 100,
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: hp(1),
    marginTop: hp(3),
  },
  toggleButton: {
    flex: 1,
    height: 43,
    borderRadius: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleText: {
    fontSize: 17,
    color: Colors.black,
  },
  activeToggle: {
    backgroundColor: Colors.primaryColor,
  },
  activeText: {
    color: Colors.white,
    fontFamily: fonts.UrbanistSemiBold,
  },
  containers: {
    width: '100%',
    height: 516,
    marginBottom: 20,
    padding: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(1),
    marginBottom: hp(2),
  },
  buttonWrapper: {
    alignItems: 'center',
  },
  typeButton: {
    width: wp(18),
    height: 54,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  icon: {
    width: 30,
    height: 30,
  },
  buttonText: {
    fontSize: 14,
    textAlign: 'center',
  },
});

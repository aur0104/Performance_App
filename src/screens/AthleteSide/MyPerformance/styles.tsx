import {StyleSheet} from 'react-native';
import {hp, wp} from '../../../utils/responsivesness';
import fonts from '../../../utils/Fonts';
import {Colors} from '../../../utils/Colors';

export default StyleSheet.create({
  screen: {
    flex: 1,
  },
  scrollContainer: {
    alignItems: 'center',
    paddingVertical: hp(1),
    marginBottom: hp(9),
  },
  container: {
    width: '90%',
    
    borderRadius: 18,
    padding: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(1),
    marginBottom: hp(2),
   
    // flexWrap:'wrap'
  },
  buttonWrapper: {
    alignItems: 'center',
    width: wp(22),
  },
  typeButton: {
    width: wp(18),
    paddingVertical: 12,
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
  ringRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(2),
  },
  ringContainer: {
    alignItems: 'center',
    flex: 1,
  },
  ring: {
    width: 70,
    height: 70,
    borderRadius: 52,
    borderWidth: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginBottom: 6,
  },
  ringValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  ringLabel: {
    fontSize: 13,
    textAlign: 'center',
  },
  challengeSection: {
    marginTop: hp(3),
    paddingHorizontal: 20,
  },
  challengeTitle: {
    fontSize: 20,
    fontFamily: fonts.UrbanistBold,
    marginBottom: 16,
  },
  challengeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  challengeItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: hp(3),
  },
  challengeBox: {
    width: '99%',
    height: 115,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  challengeImage: {
    width: 54,
    height: 54,
    tintColor: Colors.primaryColor,
  },
  challengeLabel: {
    fontSize: 20,
    fontFamily: fonts.UrbanistMedium,
    marginTop: 12,
  },
  challangeView: {
    width: '90%',
    height: 'auto',
    borderRadius: 18,
    padding: 16,
    marginTop: hp(1.5),
    marginBottom: hp(15),
  },
});

import {StyleSheet} from 'react-native';
import {Colors} from '../../../utils/Colors';
import fonts from '../../../utils/Fonts';

export default StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  challengeImage: {
    width: 84,
    height: 104,
    borderRadius: 21,
    marginRight: 8,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    marginBottom: 4,
    fontFamily: fonts.UrbanistBold,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 8,
    fontFamily: fonts.UrbanistMedium,
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressBackground: {
    width: '80%',
    height: 7,
    borderRadius: 80,
    overflow: 'hidden',
    marginRight: 8,
  },
  progressFill: {
    height: 7,
    backgroundColor: Colors.Yellow,
    borderRadius: 80,
  },
  progressText: {
    fontSize: 14,
    fontFamily: fonts.UrbanistRegular,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  participateBtn: {
    width: 91,
    height: 24,
    borderRadius: 70,
    marginRight: 16,
    backgroundColor: Colors.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  participateText: {
    color: Colors.white,
    fontSize: 14,
    fontFamily: fonts.UrbanistSemiBold,
  },
  daysLeft: {
    color: Colors.red,
    fontSize: 14,
    fontFamily: fonts.UrbanistMedium,
  },
  avatarGroup: {
    flexDirection: 'row',
    marginLeft: 10,
    marginBottom: 6,
  },
  avatarWrapper: {
    marginLeft: -10,
    borderWidth: 1.52,
    borderColor: '#F4F4FC',
    borderRadius: 27 / 2,
    overflow: 'hidden',
  },
  avatarImage: {
    width: 24,
    height: 24,
    borderRadius: 24 / 2,
  },
});

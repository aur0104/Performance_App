import {StyleSheet} from 'react-native';
import {hp, rfs, wp} from '../../../utils/responsivesness';
import fonts from '../../../utils/Fonts';
import {Colors} from '../../../utils/Colors';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  profileImageWrapper: {
    position: 'relative',
    marginRight: wp(2),
  },
  profileImage: {
    width: 112,
    height: 112,
    borderRadius: 56,
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
  medalContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoColumn: {
    flex: 1,
    justifyContent: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(0.5),
  },
  nameText: {
    fontSize: rfs(22),
    fontFamily: fonts.UrbanistBold,
  },
  verticalSeparator: {
    width: 1,
    height: 16,
    marginHorizontal: wp(3),
  },
  levelText: {
    fontSize: 14,
    fontFamily: fonts.UrbanistMedium,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: hp(0.5),
  },
  statusText: {
    fontSize: 15,
    fontFamily: fonts.UrbanistSemiBold,
  },
  badgeText: {
    fontSize: 14,
    color: '#FFB44F',
    fontFamily: fonts.UrbanistRegular,
  },
  progressRow: {
    marginTop: hp(1),
  },
  levelNumber: {
    fontSize: 12,
    marginTop: -10,
    fontFamily: fonts.UrbanistRegular,
    marginHorizontal: wp(1.5),
  },
  progressBarContainer: {
    width: wp(56),
    height: 11,
    borderRadius: 121.6,
    overflow: 'hidden',
    backgroundColor: '#EAEAEA',
    marginBottom: hp(2),
  },
  filledProgress: {
    height: '100%',
    borderRadius: 121.6,
  },
  editProfileRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(5),
    paddingVertical: hp(2),
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2),
  },
  optionText: {
    fontSize: 14,
    fontFamily: fonts.UrbanistMedium,
    marginLeft: wp(2),
  },
  separator: {
    height: 1,
    width: '100%',
  },
  flatListContent: {
    paddingTop: hp(1),
    marginBottom: hp(12),
  },
  optionRow: {
    width: '90%',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: hp(2.6),
  },
  editButton: {
    width: 112,
    height: 31,
    borderRadius: 84,
    marginTop: 6,
    marginLeft: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primaryColor,
  },
  loaderOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(4),
    paddingHorizontal: wp(5),
  },
  loadingText: {
    fontSize: 14,
    fontFamily: fonts.UrbanistMedium,
    marginTop: hp(1),
    textAlign: 'center',
  },
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(4),
    paddingHorizontal: wp(5),
  },
  errorText: {
    fontSize: 14,
    fontFamily: fonts.UrbanistMedium,
    textAlign: 'center',
    marginBottom: hp(2),
  },
  retryButton: {
    paddingHorizontal: wp(6),
    paddingVertical: hp(1.5),
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: fonts.UrbanistSemiBold,
  },
});

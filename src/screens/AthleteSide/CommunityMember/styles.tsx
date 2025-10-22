import {StyleSheet} from 'react-native';
import fonts from '../../../utils/Fonts';
import {hp, wp} from '../../../utils/responsivesness';
import {Colors} from '../../../utils/Colors';

const styles = StyleSheet.create({
  memberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    borderRadius: 8,
    paddingVertical: 8,
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  profileWrapper: {
    width: 60,
    height: 60,
    borderRadius: 31,
    borderWidth: 2.5,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 31,
  },
  beltIconWrapper: {
    position: 'absolute',
    bottom: -3,
    right: -2,
    backgroundColor: '#fff',
    borderRadius: 40,
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  memberTextInfo: {
    marginLeft: 5,
    justifyContent: 'center',
  },
  nameText: {
    fontSize: 20,
    fontFamily: fonts.UrbanistBold,
  },
  sportRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  sportText: {
    fontSize: 16,
    fontFamily: fonts.UrbanistMedium,
  },
  levelText: {
    fontSize: 12,
    fontFamily: fonts.UrbanistRegular,
  },
  vertSeparator: {
    width: 1,
    height: 16,
    marginHorizontal: hp(1),
    backgroundColor: '#E0E0E0',
  },
  rightButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    left: 6,
  },
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontalSeparator: {
    height: 1,
    marginTop: 12,
    marginBottom: 6,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    marginHorizontal: 16,
  },
  toggleText: {
    fontSize: 16,
    fontFamily: fonts.UrbanistSemiBold,
  },
  toggleSeparator: {
    height: 1,
    width: '100%',
    marginBottom: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: fonts.UrbanistMedium,
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: Colors.primaryColor,
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  retryText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: fonts.UrbanistSemiBold,
  },
});

export default styles;

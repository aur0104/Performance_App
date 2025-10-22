import {StyleSheet} from 'react-native';
import fonts from '../../../utils/Fonts';
import {hp} from '../../../utils/responsivesness';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 0,
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 74,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    marginBottom: 12,
  },
  profileName: {
    fontSize: 20,
    fontFamily: fonts.UrbanistSemiBold,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    fontFamily: fonts.UrbanistMedium,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
    marginHorizontal: 20,
  },
  infoLabel: {
    fontSize: 16,
    fontFamily: fonts.UrbanistSemiBold,
    marginRight: 8,
  },
  infoValue: {
    fontSize: 16,
    fontFamily: fonts.UrbanistMedium,
  },
  separator: {
    height: 1,
    marginVertical: 20,
    marginHorizontal: 20,
  },
  membersHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  totalMembersRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberListContainer: {
    padding: 0,
    paddingBottom: hp(12),
    paddingHorizontal: 8,
  },
  memberItem: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
    borderRadius: 12,
    paddingVertical: 12,
    marginLeft: 4,
  },
  memberImage: {
    width: 95,
    height: 95,
    borderRadius: 48,
    borderWidth: 2,
    marginBottom: 10,
  },
  memberName: {
    fontSize: 18,
    fontFamily: fonts.UrbanistSemiBold,
  },
  memberSport: {
    fontSize: 12,
    fontFamily: fonts.UrbanistMedium,
    marginTop: 4,
  },
});

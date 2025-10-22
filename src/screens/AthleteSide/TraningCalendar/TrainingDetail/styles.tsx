import {StyleSheet} from 'react-native';
import {rwp, rhp, rfs, hp} from '../../../../utils/responsivesness';
import fonts from '../../../../utils/Fonts';
import {Colors} from '../../../../utils/Colors';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  rowItem: {
    flexDirection: 'row',
    marginVertical: 6,
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 18,
    marginRight: 10,
    fontFamily: fonts.UrbanistSemiBold,
  },
  value: {
    fontSize: 17,
    marginTop: 2.5,
    fontFamily: fonts.UrbanistMedium,
  },
  sectionTitle: {
    marginTop: 13,
    marginBottom: 14,
    fontSize: 18,
    paddingHorizontal: 20,
    fontFamily: fonts.UrbanistBold,
  },
  description: {
    fontSize: 18,
    lineHeight: 20,
    paddingHorizontal: 20,
    fontFamily: fonts.UrbanistMedium,
  },
  separater: {
    height: 1,
    width: '90%',
    marginVertical: 18,
    alignSelf: 'center',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    paddingHorizontal: 20,
  },
  skillBadge: {
    backgroundColor: '#F2F2F2',
    borderRadius: 47,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 10,
  },

  deleteButton: {
    alignItems: 'center',
    marginVertical: 20,
  },
  deleteText: {
    color: Colors.red,
    fontSize: 16,
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
  profile: {
    width: 47,
    height: 47,
    borderRadius: 47 / 2,
    borderWidth: 1.99,
    borderColor: '#FFFFFF',
    marginRight: hp(1),
  },
});

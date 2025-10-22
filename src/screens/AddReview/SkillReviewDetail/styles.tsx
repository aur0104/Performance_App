import {StyleSheet} from 'react-native';
import {rwp, rhp, rfs, hp} from '../../../utils/responsivesness';
import fonts from '../../../utils/Fonts';
import {Colors} from '../../../utils/Colors';

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
    fontSize: 16,
    marginTop: 4,
    fontFamily: fonts.UrbanistMedium,
  },
  sectionTitle: {
    marginTop: 13,
    marginBottom: 10,
    fontSize: 18,
    paddingHorizontal: 20,
    fontFamily: fonts.UrbanistBold,
  },
  description: {
    fontSize: 16,
    lineHeight: 20,
    paddingHorizontal: 20,
    fontFamily: fonts.UrbanistMedium,
  },
  separater: {
    height: 1,
    width: '90%',
    marginVertical: 12,
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
  videoWrapper: {
    height: 200,
    backgroundColor: Colors.black,
    marginBottom: hp(6),
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  videoButton: {
    width: 50,
    height: 50,
    position: 'absolute',
    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButton: {
    alignItems: 'center',
    marginVertical: 20,
  },
  deleteText: {
    color: Colors.red,
    fontSize: 16,
  },
  userView: {
    borderRadius: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    justifyContent: 'center',
    marginTop: 10,
  },
  profileImage: {
    width: 42,
    height: 42,
    borderRadius: 42 / 2,
    borderWidth: 1.75,
  },
  userName: {
    fontSize: 14,
    fontFamily: fonts.UrbanistRegular,
  },
  imageStyle: {
    height: 200,
    width: '100%',
    borderRadius: 15,
    marginBottom: hp(6),
  },
});

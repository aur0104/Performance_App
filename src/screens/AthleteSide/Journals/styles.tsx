import {StyleSheet} from 'react-native';
import {Colors} from '../../../utils/Colors';
import fonts from '../../../utils/Fonts';
import {hp, rhp, wp} from '../../../utils/responsivesness';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 20,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: fonts.UrbanistBold,
    flex: 1,
    marginLeft: hp(6),
    textAlign: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 0,
  },
  iconButton: {
    width: 26,
    height: 26,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  filterButton: {
    width: 47,
    height: 45,
    borderRadius: 50,
    backgroundColor: Colors.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    right: hp(1),
    marginTop: hp(3),
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 28,
    justifyContent: 'center',
    marginBottom: hp(2),
  },
  rowItem: {
    flexDirection: 'row',
    marginVertical: 6,
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 18,
    marginRight: 8,
    fontFamily: fonts.UrbanistSemiBold,
  },
  value: {
    fontSize: 14,
    marginTop: 4,
    fontFamily: fonts.UrbanistMedium,
  },
  title: {
    marginTop: 14,
    fontSize: 18,
    paddingHorizontal: 20,
    fontFamily: fonts.UrbanistBold,
  },
  sectionTitle: {
    height: 41,
    marginTop: 13,
    marginBottom: 4,
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    paddingHorizontal: 20,
    color: Colors.white,
    fontFamily: fonts.UrbanistBold,
  },
  description: {
    fontSize: 18,
    lineHeight: 22,
    paddingHorizontal: 20,
    marginBottom: 12,
    fontFamily: fonts.UrbanistRegular,
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
  image: {
    width: 18,
    height: 18,
    marginTop: 4,
    marginRight: 4,
    tintColor: Colors.primaryColor,
  },
  userView: {
    width: 171,
    height: 55,
    borderRadius: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  profileImage: {
    width: 42,
    height: 42,
    borderRadius: 42 / 2,
    borderWidth: 1.75,
  },
  userName: {
    marginLeft: 12,
    fontSize: 18,
    fontFamily: fonts.UrbanistBold,
  },
});

export default styles;

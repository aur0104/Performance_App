import {StyleSheet} from 'react-native';
import {Colors} from '../../../utils/Colors';
import fonts from '../../../utils/Fonts';
import {hp} from '../../../utils/responsivesness';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    paddingHorizontal: 20,
    // marginBottom: hp(3),
  },
  card: {
    width: '100%',
    height: 116,
    borderRadius: 8,
    marginRight: 12,
    padding: 14,
    marginBottom: 16,
    justifyContent: 'space-between',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topImage: {
    width: 40,
    height: 38,
    borderRadius: 5,
  },
  line: {
    width: 11,
    height: 2.5,
    marginLeft: 8,
    borderRadius: 1.25,
  },
  titleRow: {
    marginTop: 5,
    marginLeft: 6,
  },
  title: {
    fontSize: 15,
    marginTop: 6,
    fontFamily: fonts.UrbanistBold,
  },
  memberText: {
    fontSize: 14,
    marginBottom: hp(8),
    opacity: 0.8,
    fontFamily: fonts.UrbanistMedium,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  avatarGroup: {
    flexDirection: 'row',
  },
  avatarWrapper: {
    marginLeft: -8,
    borderRadius: 20,
    overflow: 'hidden',
  },
  avatarImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.white,
  },
});

export default styles;

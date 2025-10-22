import {StyleSheet} from 'react-native';
import fonts from '../../../utils/Fonts';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    paddingBottom: 10,
    marginTop: 10,
  },
  challengeBox: {
    width: '95%',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    alignSelf: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 53,
  },
  title: {
    fontSize: 17,
    fontFamily: fonts.UrbanistSemiBold,
  },
  description: {
    marginTop: 10,
    fontSize: 18,
    fontFamily: fonts.UrbanistRegular,
  },
  separator: {
    height: 1,
    width: '100%',
    marginVertical: 14,
  },
  levelsTitle: {
    fontSize: 18,
    fontFamily: fonts.UrbanistSemiBold,
    marginBottom: 8,
  },
  levelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  levelLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  levelImage: {
    width: 21,
    height: 21,
    borderRadius: 21 / 2,
    marginRight: 5,
  },
  levelText: {
    fontSize: 16,
    fontFamily: fonts.UrbanistRegular,
  },
  check: {
    marginRight: 9,
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
});

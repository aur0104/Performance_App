import {StyleSheet} from 'react-native';
import {Colors} from '../../../utils/Colors';
import {hp} from '../../../utils/responsivesness';
import fonts from '../../../utils/Fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  searchWrapper: {
    width: '98%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 36,
    borderWidth: 1,
    paddingHorizontal: 22,
    paddingVertical: 8,
    marginBottom: hp(4),
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    marginLeft: 12,
    fontFamily: fonts.UrbanistMedium,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 6,
  },
  tabContainer: {
    flex: 1,
    alignItems: 'center',
  },
  focusedTabText: {
    fontSize: 16,
    color: Colors.primaryColor,
    marginBottom: 10,
    fontFamily: fonts.UrbanistBold,
  },
  unFocusedTabText: {
    fontSize: 16,
    color: '#AFAFAF',
    marginBottom: 10,
    fontFamily: fonts.UrbanistMedium,
  },
  focusedTab: {
    height: 4,
    backgroundColor: Colors.primaryColor,
    width: '100%',
  },
  unFocusedTab: {
    height: 4,
    backgroundColor: Colors.gray,
    width: '100%',
  },
  listContainer: {
    paddingBottom: 100,
  },
  communityItem: {
    marginTop: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'center',
  },
  imageWrapper: {
    position: 'relative',
    marginRight: 12,
  },
  profileImage: {
    width: 95,
    height: 95,
    borderRadius: 30,
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textColumn: {
    flex: 1,
  },
  communityName: {
    fontSize: 20,
    marginBottom: 4,
    fontFamily: fonts.UrbanistBold,
  },
  communityDesc: {
    fontSize: 14,
    fontFamily: fonts.UrbanistMedium,
  },
  separator: {
    height: 1,
    marginVertical: 10,
  },
});

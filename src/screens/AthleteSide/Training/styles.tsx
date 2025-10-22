import {StyleSheet} from 'react-native';
import {Colors} from '../../../utils/Colors';
import fonts from '../../../utils/Fonts';
import {hp} from '../../../utils/responsivesness';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  toggleContainer: {
    width: '100%',
    height: 34,
    backgroundColor: '#E8F0F9',
    borderRadius: 100,
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: hp(3),
  },
  toggleButton: {
    flex: 1,
    height: 34,
    borderRadius: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleText: {
    fontSize: 14,
    color: '#616161',
    fontFamily: fonts.UrbanistBold,
  },
  activeToggle: {
    backgroundColor: Colors.primaryColor,
  },
  activeText: {
    color: Colors.white,
    fontFamily: fonts.UrbanistBold,
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    width: '100%',
    height: 69,
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    marginBottom: 15,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: fonts.UrbanistBold,
  },
  cardDate: {
    fontSize: 14,
    marginTop: 8,
    fontFamily: fonts.UrbanistSemiBold,
  },
  cardDescription: {
    marginTop: 5,
    fontSize: 15,
    fontFamily: fonts.UrbanistMedium,
  },
});

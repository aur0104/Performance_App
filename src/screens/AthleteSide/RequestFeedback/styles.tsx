import {StyleSheet, Dimensions} from 'react-native';
import {Colors} from '../../../utils/Colors';
import fonts from '../../../utils/Fonts';
import {hp} from '../../../utils/responsivesness';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toggleContainer: {
    width: '90%',
    height: 43,
    borderRadius: 100,
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: hp(3),
    marginTop: hp(1),
  },
  toggleButton: {
    flex: 1,
    height: 43,
    borderRadius: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleText: {
    fontSize: 17,
    color: Colors.black,
  },
  activeToggle: {
    backgroundColor: Colors.primaryColor,
  },
  activeText: {
    color: Colors.white,
    fontFamily: fonts.UrbanistSemiBold,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  itemContainer: {
    width: '98%',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    alignSelf: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sportText: {
    fontSize: 18,
    fontFamily: fonts.UrbanistSemiBold,
  },
  dateText: {
    fontSize: 18,
    fontFamily: fonts.UrbanistRegular,
  },
  messageText: {
    marginTop: 16,
    fontSize: 18,
    marginBottom: 10,
    fontFamily: fonts.UrbanistRegular,
  },
});

export default styles;

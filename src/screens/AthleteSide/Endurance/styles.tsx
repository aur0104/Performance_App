import {StyleSheet} from 'react-native';
import {hp, wp} from '../../../utils/responsivesness';
import fonts from '../../../utils/Fonts';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 22,
    borderRadius: 18,
    paddingHorizontal: 8,
    marginBottom: 14,
    borderWidth: 2,
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 16,
    marginLeft: 8,
    fontFamily: fonts.UrbanistSemiBold,
  },
});

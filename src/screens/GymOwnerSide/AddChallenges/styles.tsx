import {StyleSheet} from 'react-native';
import {Colors} from '../../../utils/Colors';
import fonts from '../../../utils/Fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowItem: {
    flex: 1,
    marginRight: 8,
  },
  photoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  photoLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  attachIcon: {
    padding: 8,
  },
  photoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  photoPreview: {
    width: 115,
    height: 110,
    borderRadius: 20,
    marginRight: 16,
  },
  loaderOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  subHeader: {
    fontSize: 18,
    marginTop: 8,
    fontFamily: fonts.UrbanistSemiBold,
    paddingHorizontal: 6,
  },
  heading: {
    fontSize: 20,
    marginTop: 20,
    fontFamily: fonts.UrbanistBold,
    paddingHorizontal: 6,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    height: 56,
    borderRadius: 16,

    marginTop: 20,
  },
  dropdownText: {
    fontFamily: fonts.UrbanistSemiBold,
    fontSize: 14,
    letterSpacing: 0.2,
    lineHeight: 22,
    color: '#9E9E9E',
  },
  input: {
    marginTop: -5,
    marginBottom: 9,
  },
});

export default styles;

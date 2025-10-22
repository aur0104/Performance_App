import {StyleSheet} from 'react-native';
import {Colors} from '../../utils/Colors';
import fonts from '../../utils/Fonts';
import {hp, wp} from '../../utils/responsivesness';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: hp(1.8),
    marginBottom: hp(3),
  },
  headerRow: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontFamily: fonts.UrbanistBold,
  },
  dropDown: {
    height: 25,
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    justifyContent: 'space-between',
  },
  dropdownOverlay: {
    zIndex: 999,
    position: 'absolute',
    top: hp(4),
    left: hp(25),
    width: wp(25),
    borderRadius: 6,
    paddingVertical: 12,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    alignItems: 'center',
  },
  dropDownText: {
    fontSize: 12,
    marginRight: 6,
    fontFamily: fonts.UrbanistSemiBold,
  },
  filtersRow: {
    gap: 10,
    flexDirection: 'row',
    marginTop: '6%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButton: {
    width: 25,
    height: 25,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  graphStyle: {
    marginTop: hp(3),
    left: 40,
    padding: 0,
    alignSelf: 'center',
    transform: [{scaleX: -1}],
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    gap: 5,
    marginBottom: 20,
  },
  legendBox: {
    width: 15,
    height: 15,
    borderRadius: 3,
  },
  legendText: {
    fontSize: 12,
    marginRight: 6,
    fontFamily: fonts.UrbanistMedium,
  },
  separator: {
    height: 1,
    width: '90%',
    marginVertical: 16,
    alignSelf: 'center',
  },
  sectionTitle: {
    marginBottom: 8,
    fontSize: 18,
    fontFamily: fonts.UrbanistBold,
    paddingHorizontal: 20,
  },
  resultsRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  resultText: {
    fontSize: 15,
    fontFamily: fonts.UrbanistMedium,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#00000088',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    borderRadius: 12,
    padding: 16,
  },
  modalTitle: {
    fontSize: 18,
    paddingHorizontal: 12,
    fontFamily: fonts.UrbanistSemiBold,
  },
  buttonWrapper: {
    alignItems: 'center',
    marginBottom: hp(2),
  },
  typeButton: {
    width: wp(18),
    height: 54,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  icon: {
    width: 30,
    height: 30,
  },
  buttonText: {
    fontSize: 14,
    textAlign: 'center',
  },
});

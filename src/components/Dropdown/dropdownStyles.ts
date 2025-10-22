import {StyleSheet} from 'react-native';
import {Colors} from '../../utils/Colors';
import fonts from '../../utils/Fonts';

export default StyleSheet.create({
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 60,
    borderRadius: 16,
    backgroundColor: Colors.darkCard,
    marginBottom: 10,
  },
  dropdownText: {
    color: '#9E9E9E',
    lineHeight: 22,
    letterSpacing: 0.2,
    verticalAlign: 'middle',
    fontSize: 14,
    fontFamily: fonts.UrbanistSemiBold,
  },
  dropdownTextSelected: {
    fontSize: 14,
    color: Colors.white,
    lineHeight: 22,
    letterSpacing: 0.2,
    verticalAlign: 'middle',
    fontFamily: fonts.UrbanistSemiBold,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Background: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popup: {
    backgroundColor: '#616161',
    padding: 14,
    width: '90%',
  },
  popupItem: {
    paddingVertical: 14,
    width: '80%',
  },
  popupItemText: {
    fontFamily: fonts.UrbanistMedium,
    fontSize: 14,
    color: '#FFFFFF',
  },
  popupItemTextSelected: {
    fontSize: 14,
    fontFamily: fonts.UrbanistMedium,
    color: Colors.yellow,
  },
  addSkillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  addSkillText: {
    color: Colors.yellow,
    marginLeft: 6,
  },
  optionsModal: {
    width: 191,
    height: 99,
    padding: 12,
    alignSelf: 'center',
    marginTop: 50,
    marginRight: 20,
  },
  optionText: {
    fontSize: 16,
    marginTop: 4,
    fontFamily: fonts.UrbanistBold,
  },
  descriptionTooltip: {
    color: '#F5F5F5',
    fontSize: 14,
    fontFamily: fonts.UrbanistRegular,
  },
  separator: {
    height: 1,
    marginVertical: 8,
  },
  infoModal: {
    backgroundColor: '#616161',
    alignSelf: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  infoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  infoTitle: {
    fontSize: 20,
    color: Colors.white,
    fontFamily: fonts.UrbanistBold,
  },
  infoDesc: {
    fontSize: 18,
    color: Colors.white,
    // lineHeight: 20,
    fontFamily: fonts.UrbanistMedium,
  },
  popupItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#757575',
    flexWrap: 'wrap',
  },
  close: {
    width: 25,
    height: 25,
    borderRadius: 50,
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  chipClose: {
    fontSize: 12,
    color: '#616161',
    fontWeight: '900',
  },
});

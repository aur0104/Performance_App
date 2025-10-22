import {StyleSheet} from 'react-native';
import {hp} from '../../../../utils/responsivesness';
import fonts from '../../../../utils/Fonts';
import {Colors} from '../../../../utils/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    alignItems: 'center',
    padding: 20,
    paddingBottom: hp(2),
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 22,
  },
  paymentButton: {
    width: hp(14),
    height: 51,
    borderWidth: 1,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 0,
  },
  paymentText: {
    fontSize: 20,
    marginLeft: 5,
    fontFamily: fonts.UrbanistMedium,
  },
  labelText: {
    fontSize: 20,
    marginBottom: 4,
    marginTop: 6,
    fontFamily: fonts.UrbanistBold,
  },
  subText: {
    fontSize: 18,
    marginBottom: 4,
    fontFamily: fonts.UrbanistMedium,
  },
  rowInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  halfInput: {
    width: hp(21),
    height: 60,
    paddingHorizontal: 10,
  },
  input: {
    height: 60,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  selectPlanText: {
    fontSize: 24,
    marginTop: 16,
    marginBottom: 12,
    paddingHorizontal: 20,
    fontFamily: fonts.UrbanistBold,
  },
  planScrollContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
  },
  planCard: {
    width: 292,
    height: 182,
    borderRadius: 8,

    padding: 12,
    justifyContent: 'space-between',
  },
  planCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  planTitle: {
    fontSize: 18,
    marginTop: 8,
    fontFamily: fonts.UrbanistSemiBold,
  },
  planSubtitle: {
    fontSize: 24,
    fontFamily: fonts.UrbanistBold,
  },
  separator: {
    height: 1,
    width: '100%',
    marginVertical: 8,
  },
  planPrice: {
    fontSize: 24,
    fontFamily: fonts.UrbanistBold,
  },
  benefitsContainer: {
    width: '86%',
    height: 517,
    borderRadius: 7.65,
    borderWidth: 0.96,
    borderColor: '#303030',
    alignSelf: 'center',
    marginTop: hp(4),
    padding: 16,
    backgroundColor: 'transparent',
  },
  benefitsHeader: {
    position: 'absolute',
    top: -12,
    alignSelf: 'center',
    width: 155,
    height: 24,
    borderRadius: 15,
    borderWidth: 0.96,
    justifyContent: 'center',
    alignItems: 'center',
  },
  benefitsHeaderText: {
    fontSize: 16,
    fontFamily: fonts.UrbanistSemiBold,
    color: Colors.black,
  },
  benefitsList: {
    marginTop: 24,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  benefitText: {
    marginLeft: 8,
    fontSize: 16,
    marginTop: 4,
    flex: 1,
    fontFamily: fonts.UrbanistMedium,
  },
  disclaimerText: {
    fontSize: 14,
    marginTop: 24,
    paddingHorizontal: 20,
    lineHeight: 18,
    fontFamily: fonts.UrbanistRegular,
    marginBottom: hp(4),
  },
});

export default styles;

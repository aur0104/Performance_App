import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {Colors} from '../../utils/Colors';
import fonts from '../../utils/Fonts';
import BackHeader from '../../components/BackHeader';

const padelInformation = [
  {
    section: '1. Groundstrokes',
    items: [
      {
        title: 'Forehand Drive',
        detail:
          'Controlled topspin or flat shot from the forehand side to maintain or pressure pace.',
        tip: 'Keep your elbow slightly in front and hit through the ball - focus on depth not just speed.',
      },
      {
        title: 'Backhand Drive',
        detail:
          'Solid two-handed or one-handed backhand aimed deep and controlled.',
        tip: 'Rotate your shoulders early using your legs to generate power and stability.',
      },
      {
        title: 'Lob',
        detail:
          'High, deep shot used to push opponents off the net or relieve pressure.',
        tip: 'Open your racket face and aim high over their reach - perfect for regaining court position.',
      },
      {
        title: 'Chiquita',
        detail:
          'Soft, low speed groundstroke played at net player’s feet often to disrupt volley timing.',
        tip: 'Use short backswing and loose grip disguising it until the last moment.',
      },
      {
        title: 'Slice Groundstroke',
        detail:
          'Underspin shot that stays low ideal for fast surfaces or net pressure.',
        tip: 'Keep the racket face slightly open brushing under the ball and finish low.',
      },
      {
        title: 'Passing Shot',
        detail:
          'Fast, low drive aimed down the line or through the middle to beat net players.',
        tip: 'Stay compact and explode forward picking your line before they move.',
      },
      {
        title: 'Low Cross Court Drive',
        detail: 'Angled drive that forces wide movement or awkward rebounds.',
        tip: 'Aim just above net height with spin letting the angle do the damage.',
      },
    ],
  },
  {
    section: '2. Net Play & Volleys',
    items: [
      {
        title: 'Forehand Volley',
        detail:
          'Compact forehand volley to control pace and placement near the net.',
        tip: 'Punch the ball, don’t swing - hold firm and stay balanced through contact.',
      },
      {
        title: 'Backhand Volley',
        detail:
          'Controlled block or punch from the backhand side to direct the ball cleanly.',
        tip: 'Keep your elbows close and guide the ball with intent - angle beats power.',
      },
      {
        title: 'Drop Volley',
        detail:
          'Soft volley played short on the opponent’s side to surprise or finish the point.',
        tip: 'Soften your grip at contact disguising it like a standard volley.',
      },
      {
        title: 'Half Volley',
        detail: 'Low volley after a difficult bounce often close to the net.',
        tip: 'Stay low and still - focus on clean contact.',
      },
      {
        title: 'Reflex Volley',
        detail: 'Quick reaction volley during fast net exchanges.',
        tip: 'Stay compact and alert using your body to stay in position not just your arms.',
      },
      {
        title: 'Block Volley',
        detail: 'Firm volley that absorbs power and resets positioning.',
        tip: 'Let the ball do the work - keep the racket stable and soft.',
      },
      {
        title: 'Low Volley Scoop',
        detail:
          'Underspin scoop used to lift low shots near your feet back over the net.',
        tip: 'Open the racket face and lift smoothly - don’t swing up or rush.',
      },
    ],
  },
];

const SportInformation = () => {
  const route = useRoute();
  const {sport} = route.params || {sport: {name: 'PADEL'}};
  const {t} = useTranslation();

  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const backgroundColor = isDarkMode ? Colors.darkBackground : Colors.white;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const tipColor = isDarkMode ? Colors.gray : Colors.primaryColor;

  return (
    <View style={{flex: 1, backgroundColor}}>
      <BackHeader
        title={sport.name || 'Sport Information'}
        containerStyle={{marginBottom: 6}}
        showBackIcon
      />
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        {padelInformation.map(section => (
          <View key={section.section} style={styles.sectionContainer}>
            <Text style={[styles.sectionTitle, {color: textColor}]}>
              {section.section}
            </Text>
            {section.items.map(item => (
              <View key={item.title} style={styles.itemContainer}>
                <Text style={[styles.itemTitle, {color: textColor}]}>
                  {item.title}
                </Text>
                <Text style={[styles.itemDetail, {color: textColor}]}>
                  {item.detail}
                </Text>
                <Text style={[styles.coachTip, {color: tipColor}]}>
                  <Text style={{fontFamily: fonts.UrbanistBold}}>
                    Coach’s Tip:
                  </Text>{' '}
                  {''}
                  {item.tip}
                </Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  sectionContainer: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: fonts.UrbanistBold,
    marginBottom: 12,
  },
  itemContainer: {
    marginBottom: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.gray,
    paddingBottom: 8,
  },
  itemTitle: {
    fontSize: 16,
    fontFamily: fonts.UrbanistSemiBold,
    marginBottom: 4,
  },
  itemDetail: {
    fontSize: 14,
    fontFamily: fonts.UrbanistRegular,
    marginBottom: 4,
    lineHeight: 20,
  },
  coachTip: {
    fontSize: 14,
    fontFamily: fonts.UrbanistRegular,
    lineHeight: 20,
  },
});

export default SportInformation;

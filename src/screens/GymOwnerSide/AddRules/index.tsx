import React, {useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import BackHeader from '../../../components/BackHeader';
import {Colors} from '../../../utils/Colors';
import Checkbox from '../../../components/CheckBox';

interface RulesProps {
  navigation?: any;
}

const Rules: React.FC<RulesProps> = ({navigation}) => {
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);

  const [checked, setChecked] = useState(false);

  const backgroundColor = isDarkMode ? Colors.darkBackground : Colors.white;

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <BackHeader title="Rules" showBackIcon />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Checkbox
          checked={checked}
          setChecked={setChecked}
          title="Complete maximum reps at a set weight."
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
});

export default Rules;

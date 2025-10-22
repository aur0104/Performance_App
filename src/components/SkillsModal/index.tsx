import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {Colors} from '../../utils/Colors';
import fonts from '../../utils/Fonts';

interface LevelOption {
  id: string;
  title: string;
  description: string;
}

interface Props {
  visible: boolean;
  data: LevelOption[];
  onClose?: () => void;
  onSelect?: (item: LevelOption) => void;
}

const SkillModal: React.FC<Props> = ({visible, data, onClose, onSelect}) => {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const backgroundColor = isDarkMode ? Colors.darkBackground : Colors.white;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const separaterColor = isDarkMode ? '#424242' : '#E0E0E0';

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const renderItem = ({item}: {item: LevelOption}) => {
    const selected = item.id === selectedId;
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedId(item.id);
          onSelect?.(item);
        }}
        style={[styles.itemContainer]}>
        <View style={{flexDirection: 'row', gap: 10}}>
          {item?.image ? (
            <Image
              source={{uri: item?.image}}
              style={{width: 25, height: 25, marginTop: 8}}
            />
          ) : null}
          <View>
            <Text style={[styles.itemTitle, {color: textColor}]}>
              {item.title}
            </Text>
            <Text
              style={[
                styles.itemDesc,
                {color: textColor, maxWidth: item?.image ? '90%' : undefined},
              ]}>
              {item.description}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={[styles.modal, {backgroundColor}]}>
          <FlatList
            data={data}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => (
              <View
                style={[styles.separator, {backgroundColor: separaterColor}]}
              />
            )}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '90%',
    height: 560,
    padding: 20,
  },
  separator: {
    height: 1,
  },
  itemContainer: {
    padding: 12,
    marginBottom: 10,
  },
  itemTitle: {
    fontSize: 15,
    fontFamily: fonts.UrbanistSemiBold,
    marginBottom: 4,
  },
  itemDesc: {
    fontSize: 13,
    fontFamily: fonts.UrbanistRegular,
  },
});

export default SkillModal;

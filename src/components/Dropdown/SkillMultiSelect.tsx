import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import styles from './dropdownStyles';
import AnySvg from '../AnySvg';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../../utils/Colors';
import {useSelector} from 'react-redux';
import {RootStackParamList} from '../../utils/routes';
import {StackNavigationProp} from '@react-navigation/stack';
import {Skill} from '../../interfaces';
import DeletePopupModal from '../DeleteModal';
import Popover from 'react-native-popover-view';
import {CrossIcon, StarIcon} from '../../assets/svgIcons';

interface Props {
  options: Skill[];
  selected: Skill[];
  onSelect: (value: Skill) => void;
  visible: boolean;
  toggle: () => void;
  showInfo?: boolean;
  onClose: any;
  from?: 'AddReviewScreen' | 'AddTraining';
  onPressAddSkill: () => void;
  onPressEdit?: (skill: Skill) => void;
  onPressDelete?: (skill: Skill) => void;
  displayAddSkill?: boolean;
}

export default function SkillMultiSelect({
  options,
  selected,
  onSelect,
  visible,
  toggle,
  onClose,
  from,
  showInfo = false,
  onPressAddSkill,
  onPressEdit,
  onPressDelete,
  displayAddSkill = true,
}: Props) {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const isDark = useSelector((state: any) => state.theme.switchDarkTheme);
  const {width} = useWindowDimensions();
  const dynamicText = isDark ? Colors.white : Colors.black;
  const dynamicBg = isDark ? '#616161' : Colors.white;
  const separatorColor = isDark ? '#424242' : '#E0E0E0';

  const [showDelete, setShowDelete] = useState(false);
  const [optionModalVisible, setOptionModalVisible] = useState(false);
  const [currentSkill, setCurrentSkill] = useState<Skill | null>(null);

  // Popover state
  const [infoVisible, setInfoVisible] = useState(false);
  const [infoData, setInfoData] = useState<{
    title: string;
    desc: string;
    tip: string;
  }>({
    title: '',
    desc: '',
    tip: '',
  });
  const [anchorRect, setAnchorRect] = useState<any>(null);
  const [selectedItem, setSelectedItem] = useState<Skill | null>(null);
  // store refs for info buttons
  const anchorRefs = useRef<any[]>([]);

  const openInfo = (item: any) => {
    try {
      setSelectedItem(item);
      setInfoVisible(true);
    } catch (error) {}
  };

  return (
    <>
      {/* Main MultiSelect Modal */}
      <Modal visible={visible} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={toggle}>
          <View style={[styles.modalBackground]}>
            <TouchableWithoutFeedback>
              <View style={styles.popup}>
                <ScrollView>
                  {options &&
                    options.map((item, index) => (
                      <View key={index} style={styles.popupItemRow}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 7,
                          }}>
                          <StarIcon />
                          <TouchableOpacity
                            style={[
                              styles.popupItem,
                              item?.isCustom && {width: '68%'},
                            ]}
                            onPress={() => onSelect(item)}>
                            <Text
                              style={[
                                styles.popupItemText,
                                selected.includes(item) &&
                                  styles.popupItemTextSelected,
                              ]}
                              numberOfLines={1}>
                              {item.name}
                            </Text>
                          </TouchableOpacity>
                        </View>
                        {showInfo && (
                          <View style={{flexDirection: 'row', gap: 6}}>
                            {item?.isCustom ? (
                              <TouchableOpacity
                                onPress={() => {
                                  setCurrentSkill(item);
                                  setOptionModalVisible(true);
                                }}>
                                <AnySvg name="dotsIcon" size={22} />
                              </TouchableOpacity>
                            ) : (
                              <TouchableOpacity
                                ref={el => (anchorRefs.current[index] = el)}
                                onPress={() => openInfo(item)}>
                                <AnySvg name={'infoIcon'} size={20} />
                              </TouchableOpacity>
                            )}
                          </View>
                        )}
                      </View>
                    ))}
                  {displayAddSkill && (
                    <TouchableOpacity
                      style={styles.addSkillRow}
                      onPress={() => {
                        onClose();
                        onPressAddSkill();
                      }}>
                      <AnySvg name="add" size={14} />
                      <Text
                        style={[styles.addSkillText, {color: Colors.white}]}>
                        Add Skill
                      </Text>
                    </TouchableOpacity>
                  )}
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Options Modal (edit/delete custom skill) */}
      <Modal transparent visible={optionModalVisible} animationType="fade">
        <TouchableOpacity
          style={styles.modalBackground}
          onPress={() => setOptionModalVisible(false)}
          activeOpacity={1}>
          <View style={[styles.optionsModal, {backgroundColor: dynamicBg}]}>
            <TouchableOpacity
              onPress={() => {
                setOptionModalVisible(false);
                onPressEdit && onPressEdit(currentSkill!);
              }}>
              <Text style={[styles.optionText, {color: dynamicText}]}>
                Edit
              </Text>
            </TouchableOpacity>

            <View
              style={[styles.separator, {backgroundColor: separatorColor}]}
            />

            <TouchableOpacity
              onPress={() => {
                setOptionModalVisible(false);
                setShowDelete(true);
              }}>
              <Text style={[styles.optionText, {color: Colors.red}]}>
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      <DeletePopupModal
        visible={showDelete}
        onCancel={() => setShowDelete(false)}
        onDelete={() => {
          setShowDelete(false);
          onPressDelete && onPressDelete(currentSkill!);
        }}
      />

      {/* Popover for info */}
      <Popover
        isVisible={infoVisible}
        from={anchorRect}
        onRequestClose={() => {
          setSelectedItem(null);
          setInfoVisible(false);
        }}
        placement="auto">
        <View style={[styles.infoModal, {width: width * 0.9}]}>
          <View style={styles.infoHeader}>
            <Text style={[styles.popupItemText]}>{selectedItem?.name}</Text>
            <TouchableOpacity
              onPress={() => {
                setSelectedItem(null);
                setInfoVisible(false);
              }}>
              <CrossIcon />
            </TouchableOpacity>
          </View>
          <View style={{width: '100%', marginTop: 12}}>
            <Text style={styles.descriptionTooltip}>
              {selectedItem?.description ?? ''}
            </Text>
          </View>
        </View>
      </Popover>
    </>
  );
}

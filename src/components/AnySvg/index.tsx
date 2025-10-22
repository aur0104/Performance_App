import React from 'react';
import {StyleProp, TouchableOpacity, ViewStyle} from 'react-native';
import * as Svgs from '../../assets/svgIcons/index';

interface Props {
  name: string | undefined;
  width?: any;
  height?: any;
  containerStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
  disabled?: boolean;
  svgStyle?: StyleProp<ViewStyle>;
  size?: any;
  activeOpacity?: number;
}

const AnySvg: React.FC<Props> = ({
  name = '',
  width = 27,
  height = 27,
  containerStyle = {},
  onPress,
  disabled = false,
  svgStyle = {},
  size,
  activeOpacity,
  ...props
}) => {
  // @ts-ignore
  const Tag: any = name ? Svgs[name] : null;

  if (!Tag) {
    console.warn(`SVG with name "${name}" not found in Svgs.`);
    return null;
  }

  let isWidthString = typeof width === 'string';
  let isHeightString = typeof height === 'string';

  const renderSvg = (
    <Tag
      {...props}
      width={size || (isWidthString ? width : width)}
      height={size || (isHeightString || isWidthString ? height : height)}
      style={svgStyle}
    />
  );

  if (onPress) {
    return (
      <TouchableOpacity
        activeOpacity={activeOpacity || 0.7}
        style={[containerStyle]}
        disabled={disabled}
        onPress={onPress}>
        {renderSvg}
      </TouchableOpacity>
    );
  }

  return <>{renderSvg}</>;
};

export default AnySvg;

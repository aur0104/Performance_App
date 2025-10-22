import React from 'react';
import {View} from 'react-native';
import Svg, {Line, Polyline, Circle, Text as SvgText} from 'react-native-svg';
import {Colors} from '../../utils/Colors';

interface Props {
  data: number[];
  height?: number;
  width?: number;
  isDarkMode: boolean;
  labels?: string[];
  propsForDots?: {
    r?: string;
    strokeWidth?: string;
    stroke?: string;
    fill?: string;
  };
}

const CustomGraph: React.FC<Props> = ({
  data,
  height = 200,
  width = 300,
  isDarkMode,
  labels = [],
  propsForDots = {
    r: '3',
    strokeWidth: '1',
    stroke: Colors.primaryColor,
    fill: Colors.black,
  },
}) => {
  const padding = 20;
  const graphHeight = height - padding * 2;
  const graphWidth = width - padding * 2;
  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  const range = maxValue - minValue || 1;

  const textColor = isDarkMode ? Colors.gray : Colors.black;
  const gridColor = isDarkMode ? '#424242' : '#E0E0E0';

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * graphWidth + padding;
    const y = ((maxValue - value) / range) * graphHeight + padding;
    return {x, y};
  });

  return (
    <View
      style={{
        width,
        height,
        backgroundColor: isDarkMode ? Colors.darkInputBg : Colors.lightInputBg,
        borderRadius: 10,
        //    right: 0,
        alignSelf: 'center',
      }}>
      <Svg height={height} width={width}>
        <Line
          x1={padding}
          y1={padding}
          x2={width - padding}
          y2={padding}
          stroke={gridColor}
          strokeWidth="1"
        />
        <Line
          x1={padding}
          y1={height - padding}
          x2={width - padding}
          y2={height - padding}
          stroke={gridColor}
          strokeWidth="1"
        />
        <Line
          x1={padding}
          y1={padding}
          x2={padding}
          y2={height - padding}
          stroke={gridColor}
          strokeWidth="1"
        />
        <Line
          x1={width - padding}
          y1={padding}
          x2={width - padding}
          y2={height - padding}
          stroke={gridColor}
          strokeWidth="1"
        />

        {Array.from({length: 6}).map((_, i) => {
          const y = padding + (i / 5) * graphHeight;
          return (
            <Line
              key={`h-${i}`}
              x1={padding}
              y1={y}
              x2={width - padding}
              y2={y}
              stroke={gridColor}
              strokeDasharray="4"
              strokeWidth="0.5"
            />
          );
        })}

        {data.map((_, i) => {
          const x = padding + (i / (data.length - 7)) * graphWidth;
          return (
            <Line
              key={`v-${i}`}
              x1={x}
              y1={padding}
              x2={x}
              y2={height - padding}
              stroke={gridColor}
              strokeDasharray="4"
              strokeWidth="0.5"
            />
          );
        })}

        <Polyline
          points={points.map(p => `${p.x},${p.y}`).join(' ')}
          fill="none"
          stroke={Colors.primaryColor}
          strokeWidth="2"
        />

        {points.map((point, index) => (
          <Circle
            key={`dot-${index}`}
            cx={point.x}
            cy={point.y}
            r={propsForDots.r}
            stroke={propsForDots.stroke}
            strokeWidth={propsForDots.strokeWidth}
            fill={propsForDots.fill}
          />
        ))}

        {Array.from({length: 6}).map((_, i) => {
          const y = padding + (i / 5) * graphHeight;
          const label = (maxValue - (i / 5) * range).toFixed(0);
          return (
            <SvgText
              key={`y-label-${i}`}
              x={width - padding + 8}
              y={y + 4}
              fontSize="10"
              fill={textColor}>
              {label}
            </SvgText>
          );
        })}
        {labels.map((label, i) => {
          if (i % 1 !== 0) return null;

          const x = (i / (labels.length - 1)) * graphWidth + padding;

          return (
            <SvgText
              key={`x-label-${i}`}
              x={x}
              y={height - 4}
              fontSize="10"
              fill={textColor}
              textAnchor="middle">
              {label}
            </SvgText>
          );
        })}
      </Svg>
    </View>
  );
};

export default CustomGraph;

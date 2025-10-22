import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import Svg, {
  Path,
  Line,
  Defs,
  LinearGradient,
  Stop,
  Circle,
} from 'react-native-svg';
import * as d3Shape from 'd3-shape';
import {hp} from '../../utils/responsivesness';

const screenWidth = Dimensions.get('window').width;
const graphHeight = 148;
const graphWidth = screenWidth - 40;
const paddingRightYAxis = 30;
const chartWidth = graphWidth - paddingRightYAxis;

const CustomLineChart = ({
  datasets,
  labels,
  yAxisLabels,
  textColor,
  lineColors,
  isDarkMode,
}: {
  datasets: number[][];
  labels: string[];
  yAxisLabels: string[];
  textColor: string;
  lineColors: string[];
  isDarkMode: boolean;
}) => {
  const maxYValue = Math.max(...datasets.flat());

  const paddingY = 6;
  const adjustedStepY = (graphHeight - paddingY * 2) / yAxisLabels.length;
  const stepX = chartWidth / (labels.length - 1);

  const generatePath = (data: number[]) => {
    const line = d3Shape
      .line<number>()
      .x((_, i) => i * stepX)
      .y(d => graphHeight - (d / maxYValue) * graphHeight)
      .curve(d3Shape.curveCatmullRom.alpha(0.5));

    return line(data) ?? '';
  };

  const generateAreaPath = (data: number[]) => {
    const area = d3Shape
      .area<number>()
      .x((_, i) => i * stepX)
      .y0(graphHeight)
      .y1(d => graphHeight - (d / maxYValue) * graphHeight)
      .curve(d3Shape.curveCatmullRom.alpha(0.5));

    return area(data) ?? '';
  };

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 20,
          marginTop: hp(4.5),
        }}>
        <Svg width={graphWidth} height={graphHeight} style={{marginLeft: 12}}>
          <Defs>
            <LinearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor="#4ADE80" stopOpacity="0.1" />
              <Stop offset="100%" stopColor="#4ADE80" stopOpacity="0" />
            </LinearGradient>
          </Defs>

          {yAxisLabels.map((_, index) => {
            const y = paddingY + adjustedStepY * index;
            return (
              <Line
                key={index}
                x1={0}
                y1={y}
                x2={chartWidth}
                y2={y}
                stroke={isDarkMode ? '#424242' : '#E0E0E0'}
                strokeWidth={1}
                strokeDasharray="4"
              />
            );
          })}

          <Path
            d={generateAreaPath(datasets[0])}
            fill="url(#gradient)"
            stroke="none"
          />

          {datasets.map((dataset, index) => (
            <Path
              key={index}
              d={generatePath(dataset)}
              fill="none"
              stroke={lineColors[index]}
              strokeWidth={2.3}
            />
          ))}

          {datasets.map((dataset, dataSetIndex) =>
            dataset.map((value, i) => {
              const x = i * stepX;
              const y = graphHeight - (value / maxYValue) * graphHeight;
              return (
                <Circle
                  key={`${dataSetIndex}-${i}`}
                  cx={x}
                  cy={y}
                  r={0}
                  fill={lineColors[dataSetIndex]}
                />
              );
            }),
          )}
        </Svg>

        <View
          style={{
            position: 'absolute',
            right: hp(3),
            height: graphHeight,
            justifyContent: 'flex-end',
            paddingRight: hp(6),
            top: 0,
          }}>
          {yAxisLabels.map((label, i) => {
            const y = paddingY + adjustedStepY * i;
            return (
              <Text
                key={i}
                style={{
                  color: textColor,
                  fontSize: 12,
                  position: 'absolute',
                  top: y - 6,
                  right: 0,
                  textAlign: 'right',
                }}>
                {label}
              </Text>
            );
          })}
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: -16,
          paddingHorizontal: 14,
          width: screenWidth - 30,
          marginLeft: 18,
          marginBottom: 12,
        }}>
        {labels.map((day, i) => (
          <View key={i} style={{alignItems: 'center'}}>
            <Text style={{fontSize: 12, lineHeight: 14, color: textColor}}>
              Mar
            </Text>
            <Text style={{fontSize: 12, lineHeight: 14, color: textColor}}>
              {day}
            </Text>
          </View>
        ))}
      </View>
    </>
  );
};

export default CustomLineChart;

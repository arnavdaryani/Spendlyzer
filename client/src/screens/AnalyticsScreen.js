// src/screens/AnalyticsScreen.js

import React, { useEffect, useState } from 'react';
import { View, Dimensions, Text } from 'react-native';
import { BarChart, PieChart } from 'react-native-chart-kit';

export default function AnalyticsScreen() {
  const [data, setData] = useState({ monthly: [], byCategory: [] });

  useEffect(() => {
    // Mocked analytics data
    setData({
      monthly: [
        { month: 'Jan', total: 200 },
        { month: 'Feb', total: 300 },
        { month: 'Mar', total: 150 },
      ],
      byCategory: [
        { category: 'Food', total: 350 },
        { category: 'Books', total: 100 },
      ],
    });
  }, []);

  const screenWidth = Dimensions.get('window').width - 32;

  if (data.monthly.length === 0) {
    return <Text style={{ padding: 16 }}>Loading charts...</Text>;
  }

  // Shared chart configuration
  const chartConfig = {
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    // Bar/Pie fill color function
    color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
    // Label color function
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ marginBottom: 8, fontWeight: '600' }}>Monthly Spending</Text>
      <BarChart
        data={{
          labels: data.monthly.map(m => m.month),
          datasets: [{ data: data.monthly.map(m => m.total) }],
        }}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
      />

      <Text style={{ marginVertical: 12, fontWeight: '600' }}>Spending by Category</Text>
      <PieChart
        data={data.byCategory.map(c => ({
          name: c.category,
          population: c.total,
          legendFontColor: '#7F7F7F',
          legendFontSize: 12,
        }))}
        width={screenWidth}
        height={220}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        chartConfig={chartConfig}
      />
    </View>
  );
}
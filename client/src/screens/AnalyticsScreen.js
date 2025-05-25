import React, { useEffect, useState } from 'react';
import { View, Dimensions } from 'react-native';
import { BarChart, PieChart } from 'react-native-chart-kit';

export default function AnalyticsScreen() {
  const [data, setData] = useState({ monthly: [], byCategory: [] });

  useEffect(() => {
    fetch('https://your-api-url/api/analytics')
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={{ flex:1, padding:16 }}>
      <BarChart
        data={{
          labels: data.monthly.map(m => m.month),
          datasets: [{ data: data.monthly.map(m => m.total) }]
        }}
        width={screenWidth - 32}
        height={220}
        chartConfig={{ backgroundGradientFromOpacity:0, backgroundGradientToOpacity:0 }}
      />
      <PieChart
        data={data.byCategory.map(c => ({
          name: c.category,
          population: c.total,
          legendFontColor: '#7F7F7F',
          legendFontSize: 12
        }))}
        width={screenWidth - 32}
        height={220}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
      />
    </View>
  );
}

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PieChartCustomLegend } from '../../common/charts/PieChartCustomLegend';
import { healthChartData } from 'constants/healthChartData';
import { BaseCard } from '@app/components/common/BaseCard/BaseCard';
import axios from 'axios';

export const HealthCard: React.FC = () => {
  const { t } = useTranslation();
  const [data, setData] = useState<{ value: number; name: string | undefined }[]>([]);

  const toData = (obj: any) => {
    const dataArray = [];
    let name;
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = parseInt(obj[key]); // 将值转换为整数
        if (key === 'act1_count') {
          name = '未带头盔';
        } else if (key === 'act2_count') {
          name = '未穿安全服';
        } else if (key === 'act3_count') {
          name = '违规抽烟';
        } else if (key === 'act4_count') {
          name = '未走斑马线';
        }
        dataArray.push({ value, name }); // 创建新的对象并放入数组中
      }
    }
    // console.log(dataArray);

    return dataArray;
  };
  const chartData = data.map((item) => ({
    ...item,
  }));

  const fetch = async () => {
    const response = await axios.get('http://192.168.1.112:5000/get_allviolation_counts');

    const result = toData(response.data);
    console.log(result);

    setData(result);
  };
  useEffect(() => {
    fetch();
  }, []);
  const legendData = chartData.map((item) => ({ ...item, value: `${item.value}` }));

  return (
    <BaseCard title="类别" padding={'0 1.25rem 1.875rem'}>
      <PieChartCustomLegend
        name={t('medical-dashboard.health.title')}
        chartData={data}
        legendData={legendData}
        height="300px"
      />
    </BaseCard>
  );
};

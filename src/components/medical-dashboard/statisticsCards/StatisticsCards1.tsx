import React, { useEffect, useMemo, useState } from 'react';
import { Card } from 'antd';
import axios from 'axios';

export const StatisticsCards: React.FC = () => {
  const [statistics, setStatistics] = useState({ all: 0, model: 0 });

  useEffect(() => {
    // 调用函数获取数据
    const model_id = '2';

    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.1.112:5000/get_violation_count', {
          params: {
            model_id: model_id,
          },
        });
        setStatistics(response.data); // 设置数据到状态
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div style={{ display: 'flex', gap: '100px' }}>
        <Card style={{ color: 'blue', fontWeight: '700', width: '300px' }} bordered={false} title="检测异常总数">
          {statistics.all}
        </Card>
        <Card style={{ color: 'red', fontWeight: '700', width: '300px' }} bordered={false} title="当前异常数">
          {statistics.model}
        </Card>
      </div>
    </>
  );
};

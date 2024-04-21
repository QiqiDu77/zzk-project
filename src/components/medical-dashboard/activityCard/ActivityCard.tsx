import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BaseCard } from '../../common/BaseCard/BaseCard';
import { ActivityChart } from './ActivityChart';
import { ChartData } from 'interfaces/interfaces';
import styled from 'styled-components';
import axios from 'axios';
import { ConsoleSqlOutlined } from '@ant-design/icons';

export const ActivityCard: React.FC = () => {
  const [data, setData] = useState<ChartData>([]);
  const { t } = useTranslation();

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get('http://192.168.1.112:5000/get_week_violation_counts');
      const result: ChartData = response.data;
      setData(result);
    };
    fetch();
  }, []);
  return (
    <ActivityCardStyled id="activity" title="一周内检测统计数" padding={0}>
      <ActivityChart data={data} />
    </ActivityCardStyled>
  );
};

const ActivityCardStyled = styled(BaseCard)`
  height: 100%;
`;

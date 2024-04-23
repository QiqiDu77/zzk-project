import React from 'react';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { References } from '@app/components/common/References/References';
import { useResponsive } from '@app/hooks/useResponsive';
import { TrendingCreators } from '@app/components/nft-dashboard/trending-creators/TrendingCreators';
import { RecentlyAddedNft } from '@app/components/nft-dashboard/recently-added/RecentlyAddedNft';
import { TrendingCollections } from '@app/components/nft-dashboard/trending-collections/TrendingCollections';
import { TotalEarning } from '@app/components/nft-dashboard/totalEarning/TotalEarning';
import { RecentActivity } from '@app/components/nft-dashboard/recentActivity/RecentActivity';
import { ActivityCard } from '@app/components/medical-dashboard/activityCard/ActivityCard';
import { HealthCard } from '@app/components/medical-dashboard/HealthCard/HealthCard';
import * as S from './DashboardPage.styles';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BloodScreeningCard } from '@app/components/medical-dashboard/bloodScreeningCard/BloodScreeningCard/BloodScreeningCard';
import { LineRaceChart } from '@app/components/charts/LineRaceChart/LineRaceChart';
import { PatientResultsCard } from '@app/components/medical-dashboard/PatientResultsCard/PatientResultsCard';
import { Button, notification } from 'antd';
import axios from 'axios';
import { useAppSelector } from '@app/hooks/reduxHooks';

const MedicalDashboardPage: React.FC = () => {
  const { isDesktop } = useResponsive();
  const theme = useAppSelector((state) => state.theme.theme);
  const fetchData = async (status: string) => {
    console.log(`${status}检测`);
    await axios.post('http://192.168.1.112:5000/timer', {}, { params: { action: status } }).then((res: any) => {
      console.log(res);
      if (res.status === 200) {
        notification.success({ message: res.data.message });
      } else if (res.status === 500) {
        notification.error({ message: '存在错误！' });
      }
    });
  };

  const desktopLayout = (
    <BaseRow>
      <S.LeftSideCol xl={16} xxl={17} id="desktop-content">
        <BaseRow gutter={[60, 60]}>
          {/* <BaseCol span={24}>
            <TrendingCreators />
          </BaseCol> */}

          <BaseCol id="line-race" span={24}>
            <LineRaceChart />
          </BaseCol>

          <BaseCol id="activity" xl={24} xxl={12}>
            <ActivityCard />
          </BaseCol>

          <BaseCol id="health" xl={24} xxl={12}>
            <HealthCard />
          </BaseCol>

          {/* <BaseCol span={24}>
            <RecentlyAddedNft />
          </BaseCol>

          <BaseCol span={24}>
            <TrendingCollections />
          </BaseCol>

          <BaseCol span={24}>
            <RecentActivity />
          </BaseCol> */}
        </BaseRow>
        <References />
      </S.LeftSideCol>

      <S.RightSideCol xl={8} xxl={7}>
        <div id="blood-screening">
          <BloodScreeningCard />
        </div>

        <S.ScrollWrapper id="patient-timeline">
          <PatientResultsCard />
        </S.ScrollWrapper>
        <S.Space />
        <div style={{ display: 'flex', gap: '30px' }}>
          <Button type="default" style={{ backgroundColor: 'lightblue' }} onClick={() => fetchData('start')}>
            启动系统检测
          </Button>
          <Button type="default" style={{ backgroundColor: 'lightblue' }} onClick={() => fetchData('stop')}>
            暂停系统检测
          </Button>
        </div>
      </S.RightSideCol>
    </BaseRow>
  );

  return (
    <>
      <PageTitle>NFT Dashboard</PageTitle>
      {isDesktop ? desktopLayout : desktopLayout}
    </>
  );
};

export default MedicalDashboardPage;

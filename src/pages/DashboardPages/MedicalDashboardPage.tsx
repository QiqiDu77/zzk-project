import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { MapCard } from '@app/components/medical-dashboard/mapCard/MapCard';
import { ScreeningsCard } from '@app/components/medical-dashboard/screeningsCard/ScreeningsCard/ScreeningsCard';
import { ActivityCard } from '@app/components/medical-dashboard/activityCard/ActivityCard';
import { TreatmentCard } from '@app/components/medical-dashboard/treatmentCard/TreatmentCard';
import { CovidCard } from '@app/components/medical-dashboard/covidCard/CovidCard';
import { HealthCard } from '@app/components/medical-dashboard/HealthCard/HealthCard';
import { FavoritesDoctorsCard } from '@app/components/medical-dashboard/favoriteDoctors/FavoriteDoctorsCard/FavoritesDoctorsCard';
import { PatientResultsCard } from '@app/components/medical-dashboard/PatientResultsCard/PatientResultsCard';
import { StatisticsCards } from '@app/components/medical-dashboard/statisticsCards/StatisticsCards';
import { BloodScreeningCard } from '@app/components/medical-dashboard/bloodScreeningCard/BloodScreeningCard/BloodScreeningCard';
import { NewsCard } from '@app/components/medical-dashboard/NewsCard/NewsCard';
import { References } from '@app/components/common/References/References';
import { useResponsive } from '@app/hooks/useResponsive';
import * as S from './DashboardPage.styles';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { useNavigate } from 'react-router-dom';
import { BaseCard } from '@app/components/common/BaseCard/BaseCard';
import { LineRaceChart } from '@app/components/charts/LineRaceChart/LineRaceChart';
import { EditableTable } from '@app/components/tables/editableTable/EditableTable';

const MedicalDashboardPage: React.FC = () => {
  const { isTablet, isDesktop } = useResponsive();
  const navigate = useNavigate();

  const { t } = useTranslation();

  const navigateTo = () => {
    navigate('/apps/feed');
  };

  const desktopLayout = (
    <BaseRow>
      <S.LeftSideCol xl={16} xxl={17}>
        <BaseRow gutter={[30, 30]}>
          <BaseCol span={24}>
            {/* <BaseRow gutter={[30, 30]}> */}
            <StatisticsCards />
            {/* </BaseRow> */}
          </BaseCol>

          <BaseCol id="basic-table" span={24}>
            {/* 
              <Table columns={columns} dataSource={data} scroll={{ x: 800 }} bordered />
            </BaseCard> */}
            <BaseCard>
              <EditableTable></EditableTable>
            </BaseCard>
          </BaseCol>

          {/* <BaseCol id="treatment-plan" xl={24}>
            <TreatmentCard />
          </BaseCol> */}
          {/* 
          <BaseCol id="covid" xl={24}>
            <CovidCard />
          </BaseCol> */}

          {/* <BaseCol id="activity" xl={24} xxl={12}>
            <ActivityCard />
          </BaseCol>

          <BaseCol id="health" xl={24} xxl={12}>
            <HealthCard />
          </BaseCol>

          <BaseCol id="favorite-doctors" xl={24}>
            <FavoritesDoctorsCard />
          </BaseCol> */}

          <BaseCol id="news" span={24}>
            <NewsCard />
          </BaseCol>
        </BaseRow>
      </S.LeftSideCol>

      <S.RightSideCol xl={8} xxl={7}>
        <BaseButton style={{ background: 'rgb(29,98,186)', color: 'white' }} onClick={navigateTo}>
          安全头盔检测
        </BaseButton>
        <S.Space />
        <div id="blood-screening">
          {/* <BloodScreeningCard /> */}
          <TreatmentCard />
        </div>
      </S.RightSideCol>
    </BaseRow>
  );

  const mobileAndTabletLayout = (
    <BaseRow gutter={[20, 20]}>
      <StatisticsCards />

      {isTablet && (
        <BaseCol id="map" md={24} order={4}>
          <MapCard />
        </BaseCol>
      )}

      <BaseCol id="latest-screenings" xs={24} md={12} order={(isTablet && 5) || 0}>
        <ScreeningsCard />
      </BaseCol>

      <BaseCol id="activity" xs={24} md={12} order={(isTablet && 8) || 0}>
        <ActivityCard />
      </BaseCol>

      <BaseCol id="treatment-plan" xs={24} md={24} order={(isTablet && 10) || 0}>
        <TreatmentCard />
      </BaseCol>

      <BaseCol id="health" xs={24} md={12} order={(isTablet && 9) || 0}>
        <HealthCard />
      </BaseCol>

      <BaseCol id="patient-timeline" xs={24} md={12} order={(isTablet && 11) || 0}>
        <PatientResultsCard />
      </BaseCol>

      <BaseCol id="blood-screening" xs={24} md={12} order={(isTablet && 6) || 0}>
        <BloodScreeningCard />
      </BaseCol>

      <BaseCol id="favorite-doctors" xs={24} md={24} order={(isTablet && 13) || 0}>
        <FavoritesDoctorsCard />
      </BaseCol>

      <BaseCol id="covid" xs={24} md={12} order={(isTablet && 12) || 0}>
        <CovidCard />
      </BaseCol>

      <BaseCol id="news" xs={24} md={24} order={(isTablet && 14) || 0}>
        <NewsCard />
      </BaseCol>
    </BaseRow>
  );

  return (
    <>
      <PageTitle>{t('common.medical-dashboard')}</PageTitle>
      {isDesktop ? desktopLayout : desktopLayout}
    </>
  );
};

export default MedicalDashboardPage;

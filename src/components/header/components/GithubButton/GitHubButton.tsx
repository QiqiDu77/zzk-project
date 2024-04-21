import React from 'react';
import { GithubOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { BASE_COLORS } from '@app/styles/themes/constants';
import { BaseButton as BaseButton } from '@app/components/common/BaseButton/BaseButton';
import axios from 'axios';

export const GitHubButton: React.FC = (props) => {
  const theme = useAppSelector((state) => state.theme.theme);
  const fetchData = async (status: string) => {
    console.log(`${status}检测`);
    await axios
      .post('http://192.168.1.112:5000/timer', {}, { params: { action: 'start' } })
      .then((res: any) => console.log(res));
  };
  return (
    <div style={{ display: 'flex' }}>
      <Button type="default" $isDark={theme === 'dark'} onClick={() => fetchData('start')} {...props}>
        启动系统检测
      </Button>
      <Button type="default" $isDark={theme === 'dark'} onClick={() => fetchData('stop')} {...props}>
        暂停系统检测
      </Button>
    </div>
  );
};

const Button = styled(BaseButton)<{ $isDark: boolean }>`
  color: ${(props) => BASE_COLORS[props.$isDark ? 'white' : 'black']};
  background: ${(props) => BASE_COLORS[props.$isDark ? 'black' : 'white']};
  border-radius: 50px;
  padding-top: 0;
  padding-bottom: 0;
  display: flex;
  align-items: center;

  &:hover,
  &:active,
  &:focus {
    color: ${(props) => BASE_COLORS[props.$isDark ? 'black' : 'white']};
    background: ${(props) => BASE_COLORS[props.$isDark ? 'white' : 'black']};
  }
`;

const GithubIcon = styled(GithubOutlined)`
  font-size: 1.5rem;
  vertical-align: middle;
`;

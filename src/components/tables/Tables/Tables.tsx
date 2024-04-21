import React, { useEffect, useState } from 'react';
import { BasicTable } from '../BasicTable/BasicTable';
import { TreeTable } from '../TreeTable/TreeTable';
import { EditableTable } from '../editableTable/EditableTable';
import { useTranslation } from 'react-i18next';
import * as S from './Tables.styles';
import { Table, TableProps } from 'antd';
import axios from 'axios';

// interface DataType {
//   key: string;
//   name: string;
//   age: number;
//   address: string;
//   tags: string[];
// }

const columns = [
  {
    title: '违规编号',
    dataIndex: 'record_id',
    // width: '15%',
    editable: false,
  },
  {
    title: '检测违规行为',
    dataIndex: 'act_name',
    // width: '25%',
    editable: true,
  },
  {
    title: '检测人',
    dataIndex: 'inspectors_name',
    // width: '25%',
    editable: true,
  },
  {
    title: '备注',
    dataIndex: 'notes',
    // width: '25%',
    editable: true,
  },

  {
    title: '地点',
    dataIndex: 'record_place',
    // width: '25%',
    editable: true,
  },
  {
    title: '部门',
    dataIndex: 'user_department',
    // width: '25%',
    editable: true,
  },
  {
    title: '违规人id',
    dataIndex: 'user_id',
    // width: '25%',
    editable: true,
  },
  {
    title: '违规人姓名',
    dataIndex: 'user_name',
    // width: '25%',
    editable: true,
  },
  {
    title: '违规人电话',
    dataIndex: 'user_phone',
    // width: '25%',
    editable: true,
  },
  {
    title: '日期',
    dataIndex: 'act_time',
    // width: '25%',
    editable: false,
  },
];

const columns1 = [
  {
    title: '姓名',
    dataIndex: 'user_name',
    // width: '25%',
    editable: false,
  },
  {
    title: '年龄',
    dataIndex: 'user_age',
    // width: '25%',
    editable: false,
  },
  {
    title: '性别',
    dataIndex: 'user_gender',
    // width: '25%',
    editable: false,
  },

  {
    title: '电话',
    dataIndex: 'user_phone',
    // width: '25%',
    editable: false,
  },
  {
    title: '违规次数',
    dataIndex: 'violation_count',
    // width: '25%',
    editable: false,
  },
];

export const Tables: React.FC = () => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [count, setCount] = useState([]);
  const fetchData = async () => {
    const response = await axios.get('http://192.168.1.112:5000/get_violations_all');
    console.log(response);
    setData(response.data);
  };
  const fetchCount = async () => {
    const response = await axios.get('http://192.168.1.112:5000/users_with_violation');
    console.log(response);
    setCount(response.data);
  };

  useEffect(() => {
    fetchData();
    fetchCount();
  }, []);
  return (
    <>
      <S.TablesWrapper>
        <S.Card id="editable-table" title={'历史检测记录'} padding="1.25rem 1.25rem 0">
          <Table columns={columns} dataSource={data} />
        </S.Card>
        <S.Card id="editable-table" title={'不同员工违规次数统计'} padding="1.25rem 1.25rem 0">
          <Table columns={columns1} dataSource={count} />
        </S.Card>
      </S.TablesWrapper>
    </>
  );
};

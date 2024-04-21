import React, { useState, useEffect, useCallback } from 'react';
import { BaseTable } from '@app/components/common/BaseTable/BaseTable';
import { getEditableTableData, BasicTableRow, Pagination } from 'api/table.api';
import { EditableCell } from './EditableCell';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { useTranslation } from 'react-i18next';
import { useMounted } from '@app/hooks/useMounted';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { BaseSpace } from '@app/components/common/BaseSpace/BaseSpace';
import { BasePopconfirm } from '@app/components/common/BasePopconfirm/BasePopconfirm';
import axios from 'axios';

export const EditableTable: React.FC = () => {
  const [form] = BaseForm.useForm();
  const [tableData, setTableData] = useState<{ data: BasicTableRow[]; loading: boolean }>({
    data: [],
    loading: false,
  });

  const [editingKey, setEditingKey] = useState(0);
  const { t } = useTranslation();
  const { isMounted } = useMounted();

  const fetch = useCallback(async () => {
    setTableData((tableData) => ({ ...tableData, loading: true }));
    axios
      .get('http://192.168.1.112:5000/get_violations', {
        params: {
          model_id: '2',
        },
      })
      .then((res) => {
        if (isMounted.current) {
          setTableData({ data: res.data, loading: false });
        }
      });
  }, [isMounted]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const handleTableChange = () => {
    fetch();
    cancel();
  };

  const isEditing = (record: any) => record.record_id === editingKey;

  const edit = (record: any) => {
    form.setFieldsValue({ name: '', age: '', address: '', ...record });
    setEditingKey(record.record_id);
  };

  const cancel = () => {
    setEditingKey(0);
  };

  const save = async (record: any) => {
    try {
      const row = await form.validateFields();
      console.log(row);
      await axios
        .post('http://192.168.1.112:5000/update_violation_data', {
          ...row,
          record_id: record.record_id,
          act_time: record.act_time,
        })
        .then((res) => {
          fetch();
          console.log(res);
        });
      // const newData = [...tableData.data];
      // setTableData({ ...tableData, data: newData });
      setEditingKey(0);
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const handleDeleteRow = (rowId: number) => {
    setTableData({ ...tableData, data: tableData.data.filter((item) => item.key !== rowId) });
  };

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
    {
      title: '操作',
      dataIndex: 'actions',
      // width: '15%',
      render: (text: string, record: BasicTableRow) => {
        const editable = isEditing(record);
        return (
          <BaseSpace>
            {editable ? (
              <>
                <BaseButton type="primary" onClick={() => save(record)}>
                  保存
                </BaseButton>
                <BasePopconfirm title={t('tables.cancelInfo')} onConfirm={cancel}>
                  <BaseButton type="ghost">取消</BaseButton>
                </BasePopconfirm>
              </>
            ) : (
              <>
                <BaseButton type="ghost" disabled={editingKey !== 0} onClick={() => edit(record)}>
                  编辑
                </BaseButton>
                <BaseButton type="default" danger onClick={() => handleDeleteRow(record.key)}>
                  删除
                </BaseButton>
              </>
            )}
          </BaseSpace>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: BasicTableRow) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <BaseForm form={form} component={false}>
      <BaseTable
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={tableData.data}
        columns={mergedColumns}
        rowClassName="editable-row"
        // pagination={{
        //   ...tableData.pagination,
        //   onChange: cancel,
        // }}
        onChange={handleTableChange}
        loading={tableData.loading}
        scroll={{ x: 800 }}
      />
    </BaseForm>
  );
};

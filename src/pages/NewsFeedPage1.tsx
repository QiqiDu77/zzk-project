import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Cascader,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  notification,
  Radio,
  Select,
  Slider,
  Space,
  Switch,
  TreeSelect,
  Upload,
} from 'antd';
import { useTranslation } from 'react-i18next';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import axios from 'axios';
import { notificationController } from '@app/controllers/notificationController';

const NewsFeedPage: React.FC = () => {
  const { t } = useTranslation();
  const { RangePicker } = DatePicker;
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const onFinish = async (values: any) => {
    const { inspectors_id, inspectors_name, notes } = values;
    // 从表单数据中提取文件信息
    console.log(values);
    const fileList = values.upload[0];
    console.log(fileList);
    // console.log(fileList);

    // // 创建FormData对象用于发送文件
    const formData = new FormData();
    // fileList.forEach((file: any) => {
    //   formData.append('file', file.originFileObj);
    // });

    const dataToSend = {
      inspectors_id: inspectors_id,
      inspectors_name: inspectors_name,
      notes: notes,
      model_id: 2,
    };
    formData.append('file', fileList.originFileObj);
    formData.append('inspectors_id', inspectors_id);
    formData.append('inspectors_name', inspectors_name);
    formData.append('notes', notes);
    formData.append('model_id', '2');
    console.log(formData);
    try {
      const response = await axios.post('http://192.168.1.112:5000//classify', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        // body: fileList.originFileObj,
      });
      if (response.status === 200) {
        notification.success({ message: response.data.class });
      }
      // 处理响应数据，例如保存token，导航到其他页面等
    } catch (error) {
      console.error('Failed:', error);
      // 处理错误，例如显示错误消息
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    // 可以在这里处理表单验证失败的情况
  };
  return (
    <>
      <PageTitle>{t('common.feed')}</PageTitle>

      <Form
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item label="检测人员编号" name="inspectors_id">
          <Input />
        </Form.Item>
        <Form.Item label="检测人员姓名" name="inspectors_name">
          <Input />
        </Form.Item>
        <Form.Item label="检测日期">
          <DatePicker />
        </Form.Item>
        <Form.Item label="备注" name="notes">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item label="上传" valuePropName="fileList" getValueFromEvent={normFile} name="upload">
          <Upload action="/classify" listType="picture-card" name="file">
            <button style={{ border: 0, background: 'none' }} type="button">
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>点击上传</div>
            </button>
          </Upload>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Space>
            <Button type="primary" htmlType="submit">
              开始检测
            </Button>
            <Button htmlType="reset">重置</Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};

export default NewsFeedPage;

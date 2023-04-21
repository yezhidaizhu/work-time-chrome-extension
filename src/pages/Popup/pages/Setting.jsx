import React from 'react';
import { useNavigate } from 'react-router-dom';
import BreadHome from '../components/BreadHome';
import { Button, Form, Input, TimePicker } from 'antd';

export default function Setting() {
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log(values);
  }

  return (
    <div>
      <BreadHome title="设置" />
      <Form
        onFinish={onFinish}
        className='mt-4'
      >
        {/* <Form.Item
          label="开始时间"
          name="workTime"
          rules={[{ required: true, message: 'Please select workStart!' }]}
        >
          <TimePicker.RangePicker />
        </Form.Item>

        <Form.Item
          label="休息"
          name="restTime"
        >
          <TimePicker.RangePicker />
        </Form.Item>
        <Form.Item
          name="restTime"
        >
          <TimePicker.RangePicker />
        </Form.Item> */}
      </Form>
    </div>
  )
}

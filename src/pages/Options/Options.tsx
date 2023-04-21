/* eslint-disable  */
import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input, TimePicker, message } from 'antd';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import dayjs from "dayjs";
import useSeting from "../Popup/hooks/useSetting";

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 24, offset: 8 },
  },
};

const Options: React.FC = () => {
  const [form] = Form.useForm();
  const restTimesValues = Form.useWatch("restTimes", form);

  const { setting, setUserSetting } = useSeting()

  const onFinish = (values: any) => {
    const workTime = values?.workTime;
    const _setting = {
      workStart: workTime?.[0]?.format?.('HH:mm:ss') || dayjs('00:00:00', 'HH:mm:ss').format('HH:mm:ss'),
      workEnd: workTime?.[1]?.format?.('HH:mm:ss') || dayjs('11:59:59', 'HH:mm:ss').format('HH:mm:ss'),
      workRestArr: values?.restTimes?.map((timeArr: any) => {
        const [timeStart, timeEnd] = timeArr;
        return [dayjs(timeStart).format('HH:mm:ss'), dayjs(timeEnd).format('HH:mm:ss')]
      }) ?? []
    }
    console.log("save: ", _setting);
    setUserSetting(_setting)
    message.success("保存成功")
  };

  useEffect(() => {
    const fomatTime = (times = ["", ""]) => {
      return [dayjs(times[0], 'HH:mm:ss'), dayjs(times[1], 'HH:mm:ss')]
    }
    form.setFieldsValue({
      workTime: fomatTime([setting?.workStart || '00:00:00', setting?.workEnd || '23:59:59']),
      restTimes: setting?.workRestArr?.map(fomatTime)
    })
  }, [setting])

  useEffect(() => {
    setting && console.log("user", setting);
  }, [setting])

  return (
    <div className="p-4">
      <div className=" text-lg font-bold ml-6 my-4">设置</div>
      <Form
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 500 }}
        onFinish={onFinish}
      >
        <Form.Item
          label="工作时间"
          name="workTime"
          required
          rules={[{ required: true, message: '请选择时间' }]}
        >
          <TimePicker.RangePicker />
        </Form.Item>

        <Form.List name="restTimes">
          {(fields, { add, remove }) => (
            <>
              {
                fields?.map((field, index) => (
                  <Form.Item
                    {...(index === 0 ? {} : formItemLayoutWithOutLabel)}
                    label={index === 0 ? '休息时间' : ''}
                    labelCol={{ span: 8 }}
                    key={field.key}

                  >
                    <div className='flex space-x-2'>
                      <Form.Item {...field} noStyle rules={[{ required: true, message: '请选择时间' }]}>
                        <TimePicker.RangePicker />
                      </Form.Item>

                      <Minus
                        className="mt-1"
                        onClick={() => remove(field.name)}
                      />
                    </div>
                  </Form.Item>
                ))
              }

              <Form.Item {...(!restTimesValues?.length ? {} : formItemLayoutWithOutLabel)} label={restTimesValues?.length ? "" : "休息时间"} >
                <Button
                  type="dashed"
                  onClick={() => add()}
                  style={{ width: '274px' }}
                  icon={<PlusCircleOutlined />}
                >
                  添加休息时间
                </Button>
              </Form.Item>
            </>
          )}

        </Form.List>


        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Options;


function Add(props: any) {
  return <Button
    size="small"
    type="text"
    icon={<PlusCircleOutlined />}
    {...props}
  />
}

function Minus(props: any) {
  return <Button
    size="small"
    type="text"
    icon={<MinusCircleOutlined />}
    {...props}
  />
}
import React, { useMemo } from 'react';
import { Badge, Button, Descriptions, Statistic, Tooltip } from 'antd';
import useTodayRecord from '../hooks/useTodayRecord';
import { SettingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Countdown } = Statistic;

const Index = () => {
  const { startTime, leaveTime } = useTodayRecord();
  const navigate = useNavigate();

  const desc = useMemo(() => {
    return [
      {
        label: "开始时间",
        value: startTime?.format?.("HH:mm:ss")
      },
      {
        label: "状态",
        value: <Badge status="processing" text="作业" />
      },
      // {
      //   label: "持续时间",
      //   value: startTime?.format?.("HH:mm:ss")
      // },
      {
        label: "预计时间",
        value: leaveTime?.format?.("HH:mm:ss")
      },
      {
        label: "剩余时间",
        value: <Countdown valueStyle={{ fontSize: 14 }} value={leaveTime} format="H 时 m 分 s 秒" />
      },
    ]
  }, [startTime, leaveTime]);

  return (
    <div>
      <Descriptions size="small" bordered>
        {
          desc?.map((item, index) => {
            return <Descriptions.Item labelStyle={{ width: 100 }} key={index} label={item.label}>{item.value}</Descriptions.Item>
          })
        }
      </Descriptions>

      <div className=' absolute bottom-2 right-2'>
        <Tooltip placement="topRight" title="search">
          <Button size="small" type="text" icon={<SettingOutlined />} onClick={() => {
            // navigate("/setting")
            chrome.runtime.openOptionsPage()
          }} />
        </Tooltip>
      </div>
    </div>
  );
};

export default Index;
/**
 * 去除的时间段 [a,b]
 * 开始时间
 * 结束时间
 */
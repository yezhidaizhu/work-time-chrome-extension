import React, { useEffect, useMemo, useState } from 'react';
import {
  Badge,
  Button,
  Descriptions,
  Statistic,
  Switch,
  TimePicker,
  Tooltip,
} from 'antd';
import useTodayRecord from '../hooks/useTodayRecord';
import {
  SettingOutlined,
  EditOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import * as echarts from 'echarts/core';
import 'echarts-liquidfill';
import { useAppState } from '../store';
import useTheme from '../hooks/useTheme';

const { Countdown } = Statistic;

const liquidFillId = 'liquidFillI_water';

const Index = () => {
  const { startTime, leaveTime, setStartTime, isWorkingTime, workTimePercent } =
    useTodayRecord();

  const { toogleDarkTheme, isDark } = useTheme();
  // const navigate = useNavigate();

  const desc = useMemo(() => {
    return [
      {
        label: '开始时间',
        value: (
          <StartTime startTime={startTime} onChangeStartTime={setStartTime} />
        ),
      },
      {
        label: '预计时间',
        value: leaveTime?.format?.('HH:mm:ss'),
      },
      {
        label: '状态',
        value: <Status isWorkingTime={isWorkingTime} />,
      },
      {
        label: '剩余时间',
        value: (
          <Countdown
            valueStyle={{ fontSize: 14 }}
            value={leaveTime}
            format="H 时 m 分 s 秒"
          />
        ),
      },
    ];
  }, [startTime, leaveTime]);

  useEffect(() => {
    const chart = echarts.init(document.getElementById(liquidFillId));
    chart.setOption({
      series: [
        {
          type: 'liquidFill',
          data: [
            workTimePercent,
            workTimePercent - 0.1,
            workTimePercent - 0.2,
            workTimePercent - 0.3,
          ],
          radius: '80%',
          outline: {
            show: false,
          },
          label: {
            fontSize: 28,
          },
        },
      ],
    });
  }, [workTimePercent]);

  return (
    <div>
      <Descriptions size="small" bordered>
        {desc?.map((item, index) => {
          return (
            <Descriptions.Item
              labelStyle={{ width: 100 }}
              key={index}
              label={item.label}
            >
              {item.value}
            </Descriptions.Item>
          );
        })}
      </Descriptions>

      {/* 右下角设置等图标 */}
      <div className=" absolute bottom-2 right-2">
        <div className="flex items-center space-x-2">
          <Switch size="small" value={isDark} onChange={toogleDarkTheme} />
          <Tooltip placement="topRight" title="设置">
            <Button
              size="small"
              type="text"
              icon={<SettingOutlined />}
              onClick={() => {
                // navigate("/setting")
                chrome.runtime.openOptionsPage();
              }}
            />
          </Tooltip>
        </div>
      </div>

      {/* 水位图 */}
      <div id={liquidFillId} className=" mx-auto w-[200px] h-[200px]"></div>
    </div>
  );
};

export default Index;
/**
 * 去除的时间段 [a,b]
 * 开始时间
 * 结束时间
 */

// 开始时间
function StartTime({ startTime, onChangeStartTime }) {
  const [time, setTime] = useState(startTime);
  const [edit, setedit] = useState(false);

  useEffect(() => {
    if (edit) {
      setTime(startTime);
    }
  }, [edit, startTime]);

  return (
    <div className="flex items-center space-x-2">
      <div>
        {edit ? (
          <TimePicker
            value={time}
            onChange={(v) => {
              setTime(v);
            }}
            style={{ width: 110 }}
            size="small"
            defaultValue={startTime}
            bordered={false}
          />
        ) : (
          startTime?.format?.('HH:mm:ss')
        )}
      </div>

      <Button
        size="small"
        type="text"
        icon={edit ? <CheckCircleOutlined /> : <EditOutlined />}
        onClick={() => {
          if (!edit) {
            setedit(true);
          } else {
            setedit(false);
            time && onChangeStartTime?.(time);
          }
        }}
      />
    </div>
  );
}

function Status({ isWorkingTime }) {
  return (
    <Badge
      status={isWorkingTime ? 'processing' : 'warning'}
      text={isWorkingTime ? '作业' : '休息'}
    />
  );
}

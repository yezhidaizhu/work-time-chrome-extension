import React from 'react';
import { TimePicker } from 'antd';
import useTodayRecord from './hooks/useTodayRecord';

const Popup = () => {
  const {startTime,leaveTime} = useTodayRecord();
  
  return (
    <div className="App p-4 w-[300px] h-[400px]">
      开始时间： <TimePicker value={startTime} disabled/>
      <br/>
      持续时间：min
      <br/>
      预计时间：<TimePicker value={leaveTime} disabled/>
    </div>
  );
};

export default Popup;

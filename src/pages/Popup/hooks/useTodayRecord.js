import { useEffect, useMemo, useState } from 'react';
import { getRecord, record as recordData } from '../utils/store';
import dayjs from 'dayjs';
import useSetting from './useSetting';
import { calcLeaveTime, timeIsInRest } from '../utils/func';
import { getCurDateTime } from '../utils/helper';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

// import { getRecord } from '../utils/store';

export default function useTodayRecord() {
  const [record, setrecord] = useState();
  const { setting } = useSetting();

  // 开始上班时间
  const startTime = useMemo(() => {
    return dayjs(record?.start, 'HH:mm:ss');
  }, [record]);

  console.log(record, setting);

  // 预计下班时间
  const leaveTime = useMemo(() => {
    return calcLeaveTime({
      workLong: setting?.workLong * 60,
      startTime: startTime,
      restTimeArr: setting?.workRestArr,
    });
  }, [startTime, setting]);

  // 当前是否为工作时间
  const isWorkingTime = useMemo(() => {
    return !timeIsInRest({
      curTime: dayjs(),
      restTimeArr: setting?.workRestArr,
    });
  }, [setting]);

  // 更改开始上班时间
  const setStartTime = async (newStartTime = '') => {
    await recordData({
      start: getCurDateTime(newStartTime),
    });
    refrshRecordFormStore();
  };

  // 工作时长完成百分比
  const workTimePercent = useMemo(() => {
    // 如果没有设置工作时长，就设为零
    const workLong = setting?.workLong;
    const duration = record?.duration || 0;
    if (!workLong || !duration) return 0;

    return duration / (workLong*60);
  }, [record, setting]);

  const refrshRecordFormStore = async () => {
    const data = await getRecord();
    setrecord(data);
  };

  useEffect(() => {
    refrshRecordFormStore();
  }, []);
  return {
    record,
    startTime,
    leaveTime,
    setStartTime,
    isWorkingTime,
    workTimePercent,
  };
}

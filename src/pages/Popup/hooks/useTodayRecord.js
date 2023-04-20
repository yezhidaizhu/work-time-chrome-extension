import { useEffect, useMemo, useState } from 'react';
import { getRecord } from '../utils/store';
import dayjs from 'dayjs';

// import { getRecord } from '../utils/store';

export default function useTodayRecord() {
  const [record, setrecord] = useState();

  const startTime = useMemo(()=>{
    return dayjs(record?.start)
  },[record])

  const leaveTime = useMemo(()=>{
    return dayjs(startTime).add(60*8,"minutes")
  },[startTime]) 

  const refrshRecordFormStore = async () => {
    const data =  await getRecord()
    setrecord(data);
  };

  useEffect(() => {
    refrshRecordFormStore();
  }, []);
  return { record,startTime,leaveTime };
}

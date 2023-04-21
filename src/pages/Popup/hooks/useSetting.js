import { useEffect, useState } from 'react';
import { getSetting, getUserSetting, setUserSetting } from '../utils/store';

export default function useSetting() {
  const [setting, setSetting] = useState();

  const refrshRecordFormStore = async () => {
    const data = await getUserSetting()
    setSetting(data);
  };

  useEffect(() => {
    refrshRecordFormStore();
  }, []);

  return { setting,setUserSetting };
}

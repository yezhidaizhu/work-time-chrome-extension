import React from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import zhCN from 'antd/locale/zh_CN';
import { ConfigProvider, theme } from 'antd';

import Index from './pages';
import { useAppState } from './store';
import { useMemo } from 'react';
import useTheme from './hooks/useTheme';

const router = createHashRouter([
  {
    path: '/',
    element: <Index />,
  },
]);

const Popup = () => {
  const {algorithm,isDark} = useTheme()

  return (
      <ConfigProvider
        locale={zhCN}
        theme={{
          algorithm: algorithm,
        }}
      >
        <div className={`${isDark ? "bg-gray-900":""}`}>
          <div className="App p-2 w-[300px] h-[400px] overflow-hidden">
            <RouterProvider router={router} />
          </div>
        </div>
      </ConfigProvider>
  );
};

export default Popup;
/**
 * 去除的时间段 [a,b]
 * 开始时间
 * 结束时间
 */

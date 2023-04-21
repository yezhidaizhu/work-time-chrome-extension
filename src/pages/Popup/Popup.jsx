import React from 'react';
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";

import Index from './pages';
import Setting from './pages/Setting';

const router = createHashRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/setting",
    element: <Setting />,
  },
]);

const Popup = () => {
  return (
    <div className="App p-2 w-[300px] h-[400px]">
      <RouterProvider router={router} />
    </div>
  );
};

export default Popup;
/**
 * 去除的时间段 [a,b]
 * 开始时间
 * 结束时间
 */
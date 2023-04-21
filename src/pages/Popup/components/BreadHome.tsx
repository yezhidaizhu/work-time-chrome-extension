import { Breadcrumb } from 'antd';
import React from 'react';
import { HomeOutlined } from '@ant-design/icons';
// import { useNavigate } from 'react-router-dom';

export default function BreadHome({title=""}) {
  // const navigate = useNavigate();

  return (
    <Breadcrumb
      items={[
        {
          href: "#/",
          title: <HomeOutlined />,
        },
        {
          title: title,
        },
      ]}
    />
  )
}

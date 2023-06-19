import React from 'react';
import { Alert, Spin } from 'antd';

const SuspenseLoader: React.ReactFragment = (
  <Spin tip="Wczytywanie...">
    <Alert
      message="Wczytywanie danych strony"
      description="Prosimy czekać"
      type="info"
    />
  </Spin>
);

export default SuspenseLoader;

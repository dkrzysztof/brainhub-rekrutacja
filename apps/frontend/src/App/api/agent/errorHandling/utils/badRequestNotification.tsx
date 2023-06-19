import React from 'react';
import { notification } from 'antd';

import { BadRequestResponse } from '../interfaces/BadRequestResponse';

const constructDefaultBadRequestNotification = (data: BadRequestResponse) => {
  if (data && data.message) {
    notification.warn({
      message:
        'Your request did not pass validation. The following data needs correction:',
      description: (
        <ul>
          {data.message.map((message, i) => (
            <li key={i}>{message}</li>
          ))}
        </ul>
      ),
    });
  } else {
    notification.warn({
      message: "Server couldn't resolve your request",
      description: `Your request was missing some data required to fullfil request`,
    });
  }
};

export default constructDefaultBadRequestNotification;

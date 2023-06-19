import { message } from 'antd';

export const sendSuccessNotification = function (messageForUser: string) {
  message.success({
    content: messageForUser,
  });
};

export const sendErrorNotification = function (messageForUser: string) {
  message.error({
    content: messageForUser,
  });
};

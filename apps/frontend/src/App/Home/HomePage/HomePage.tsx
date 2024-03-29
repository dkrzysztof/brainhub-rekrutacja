import React from 'react';
import { Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import CreateEventForm, {
  CreateEventFormFields,
} from '../CreateEventForm/CreateEventForm';

import { createEvent } from 'App/state/events/events.thunk';
import { RootState } from 'App/state/root.reducer';
import { isStatusLoading } from 'App/utils/checkStatusType';

const createEventLoadingStatusSelector = (state: RootState) =>
  isStatusLoading(state.events.status.createEvent);

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const handleFormFinish = (values: CreateEventFormFields) =>
    dispatch(createEvent(values));
  const isLoading = useSelector(createEventLoadingStatusSelector);

  return (
    <>
      <div className="app-header d-flex-center-center">
        <span className="brainhub-font">Brainhub</span> recruitment app
      </div>
      <div className="app-container d-flex-center-center">
        <CreateEventForm
          form={form}
          onFinish={handleFormFinish}
          isLoading={isLoading}
        />
      </div>
    </>
  );
};

export default HomePage;

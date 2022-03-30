import React from 'react';
import { Form } from 'antd';
import { useDispatch } from 'react-redux';
import { createEvent } from 'App/state/events/events.thunk';
import CreateEventForm, { CreateEventFormFields } from '../CreateEventForm/CreateEventForm';

export interface HomePageProps {}
const HomePage: React.FC<HomePageProps> = ({}) => {
	const dispatch = useDispatch();
	const [form] = Form.useForm();

	const handleFormFinish = (values: CreateEventFormFields) => dispatch(createEvent(values));

	return (
		<>
			<div className='app-header d-flex-center-center'>
				<span className='brainhub-font'>Brainhub</span> recrutation app
			</div>
			<div className='app-container d-flex-center-center'>
				<CreateEventForm form={form} onFinish={handleFormFinish} />
			</div>
		</>
	);
};

export default HomePage;

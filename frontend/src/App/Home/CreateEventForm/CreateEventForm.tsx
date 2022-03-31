import React from 'react';
import { Button, DatePicker, Form, FormInstance, Input } from 'antd';
import { rulesForEditProfileForm, rulesMessages } from './CreateEventForm.rules';
import moment from 'moment';

const { firstnameFieldRules, lastnameFieldRules, emailFieldRules, dateFieldRules } = rulesForEditProfileForm;

export interface CreateEventFormFields {
	firstname: string;
	lastname: string;
	email: string;
	date: string;
}

export interface CreateEventFormProps {
	form: FormInstance;
	isLoading?: boolean;
	onFinish: (values: CreateEventFormFields) => void;
}

const CreateEventForm: React.FC<CreateEventFormProps> = ({ form, onFinish, isLoading }) => {
	return (
		<Form form={form} onFinish={onFinish} validateMessages={rulesMessages}>
			<Form.Item label='Firstname' name='firstname' rules={firstnameFieldRules}>
				<Input />
			</Form.Item>
			<Form.Item label='Lastname' name='lastname' rules={lastnameFieldRules}>
				<Input />
			</Form.Item>
			<Form.Item label='Email' name='email' rules={emailFieldRules}>
				<Input />
			</Form.Item>
			<Form.Item label='Event date' name='date' rules={dateFieldRules}>
				<DatePicker
					format='YYYY-MM-DD HH:mm:ss'
					placeholder='Event date'
					showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
				/>
			</Form.Item>
			<Button type='primary' htmlType='submit' disabled={isLoading} loading={isLoading}>
				Create
			</Button>
		</Form>
	);
};

export default CreateEventForm;

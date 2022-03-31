import React from 'react';
import { render, cleanup, act, fireEvent } from '@testing-library/react';
import CreateEventForm, { CreateEventFormProps } from './CreateEventForm';
import * as ReactRedux from 'react-redux';
import { Form, FormInstance } from 'antd';
import moment from 'moment';
import { StatusType } from 'App/utils/interfaces/StatusTypes';

beforeAll(() => cleanup());

jest.mock('react-redux', () => ({
	...jest.requireActual('react-redux'),
	useDispatch: jest.fn(),
	useSelector: jest.fn()
}));

const changeTextInputValue = (el: HTMLElement, value: string) => {
	fireEvent.change(el, { target: { value } });
};

const setup = (wrapperProps: Omit<CreateEventFormProps, 'form'>) => {
	let form: FormInstance;
	const Wrapper = (props: Omit<CreateEventFormProps, 'form'>) => {
		[form] = Form.useForm();
		return (
			<>
				<CreateEventForm {...props} form={form} />
			</>
		);
	};

	const utils = render(<Wrapper {...wrapperProps} />);
	const inputFirstname = utils.getByLabelText('Firstname') as HTMLInputElement;
	const inputLastname = utils.getByLabelText('Lastname') as HTMLInputElement;
	const inputEmail = utils.getByLabelText('Email') as HTMLInputElement;
	const inputDate = utils.getByLabelText('Event date') as HTMLInputElement;
	const buttonSubmit = utils.getByText('Create');

	return {
		//@ts-expect-error
		form,
		Wrapper,
		inputFirstname,
		inputLastname,
		inputEmail,
		inputDate,
		buttonSubmit,
		...utils
	};
};

describe('CreateEventForm', () => {
	const handleFinish = jest.fn().mockImplementation((param) => param);
	const createEventMock = {
		date: moment(),
		email: 'jkowalski@email.com',
		firstname: 'Jan',
		lastname: 'Kowalski'
	};

	beforeEach(() => {
		// z hooka w aplikacji korzysta tylko jeden komponent
		// do wyciagniecia wartosci enum StatusType
		(ReactRedux.useSelector as jest.Mock).mockImplementation(() => StatusType.SUCCESS);
	});

	it('renders correctly', () => {
		const { inputDate, inputEmail, inputFirstname, inputLastname, buttonSubmit } = setup({
			onFinish: handleFinish
		});

		expect(inputFirstname).toBeInTheDocument();
		expect(inputLastname).toBeInTheDocument();
		expect(inputEmail).toBeInTheDocument();
		expect(inputDate).toBeInTheDocument();
		expect(buttonSubmit).toBeInTheDocument();
	});

	it('passes correct object on onFinish', async () => {
		const { form, inputDate, inputEmail, inputFirstname, inputLastname, buttonSubmit } = setup({
			onFinish: handleFinish
		});

		expect(inputFirstname.value).toBe('');
		expect(inputLastname.value).toBe('');
		expect(inputEmail.value).toBe('');
		expect(inputDate.value).toBe('');

		await act(async () => {
			changeTextInputValue(inputFirstname, createEventMock.firstname);
			changeTextInputValue(inputLastname, createEventMock.lastname);
			changeTextInputValue(inputEmail, createEventMock.email);
			form.setFieldsValue({ date: createEventMock.date });
		});

		expect(inputFirstname.value).toBe(createEventMock.firstname);
		expect(inputLastname.value).toBe(createEventMock.lastname);
		expect(inputEmail.value).toBe(createEventMock.email);
		expect(inputDate.value).toBe(createEventMock.date.format('YYYY-MM-DD HH:mm:ss'));
		await act(async () => {
			await buttonSubmit.click();
		});

		expect(handleFinish).toHaveBeenCalled();
		expect(handleFinish).toHaveBeenCalledWith(createEventMock);
	});

	it('disables button on isLoading true', () => {
		const { container, Wrapper, rerender, buttonSubmit } = setup({ onFinish: handleFinish, isLoading: false });

		expect(container.querySelector('.ant-btn-loading-icon')).not.toBeInTheDocument();
		expect(buttonSubmit.closest('button')).not.toHaveAttribute('disabled');

		rerender(<Wrapper onFinish={handleFinish} isLoading={true} />);
		expect(container.querySelector('.ant-btn-loading-icon')).toBeInTheDocument();
		expect(buttonSubmit.closest('button')).toHaveAttribute('disabled');

		rerender(<Wrapper onFinish={handleFinish} isLoading={false} />);
		expect(container.querySelector('.ant-btn-loading-icon')).not.toBeInTheDocument();
		expect(buttonSubmit.closest('button')).not.toHaveAttribute('disabled');
	});

	it('should not fire onFinish handler with invalid data', async () => {
		// wyciszenie ostrzezeń z konsoli
		// bo komponent Form będzie ostrzegał o nie poprawnym formacie danych
		console.warn = jest.fn();

		const { inputDate, inputEmail, inputFirstname, inputLastname, buttonSubmit } = setup({
			onFinish: handleFinish
		});

		expect(inputEmail.value).toBe('');
		expect(inputDate.value).toBe('');

		await act(async () => {
			changeTextInputValue(inputFirstname, createEventMock.firstname);
			changeTextInputValue(inputLastname, createEventMock.lastname);
			changeTextInputValue(inputEmail, 'definetly.not.an.email');
			fireEvent.click(buttonSubmit);
		});

		expect(handleFinish).not.toHaveBeenCalled();
	});
});

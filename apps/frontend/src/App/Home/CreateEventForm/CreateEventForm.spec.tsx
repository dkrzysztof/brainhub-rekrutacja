import React from 'react';
import { render, cleanup, act, fireEvent } from '@testing-library/react';
import * as ReactRedux from 'react-redux';
import { Form, FormInstance } from 'antd';
import moment from 'moment';

import CreateEventForm, { CreateEventFormProps } from './CreateEventForm';

import { StatusType } from 'App/utils/interfaces/StatusTypes';

beforeAll(() => cleanup());

//mockowanie hooków z reduxa
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

// format daty obsługiwany przez datepicker
const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

// funkcja zmieniająca wartość pola tekstowego
const changeTextInputValue = (el: HTMLElement, value: string) => {
  fireEvent.change(el, { target: { value } });
};

// funkcja zmieniająca datę w datepickerze
const changeDateValue = async (
  datePickerElement: HTMLElement,
  datestring: string,
) => {
  fireEvent.mouseDown(datePickerElement);
  fireEvent.change(datePickerElement, { target: { value: datestring } });
  const okButton = document.querySelector('.ant-picker-ok button');
  if (okButton) {
    fireEvent.click(okButton);
  } else {
    throw new Error('ant picker ok button is null');
  }
};
// wspólny obiekt do wypełniania formularza tymi samymi danymi
const createEventMock = {
  date: moment().milliseconds(0).format(DATE_FORMAT),
  email: 'jkowalski@email.com',
  firstname: 'Jan',
  lastname: 'Kowalski',
};

// inicjalizacja komponentu CreateEventForm do
const setup = (wrapperProps: Omit<CreateEventFormProps, 'form'>) => {
  // useForm jest hookiem, stąd potrzebny komponent Wrapper
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
    //@ts-expect-error used before initialization
    form,
    Wrapper,
    inputFirstname,
    inputLastname,
    inputEmail,
    inputDate,
    buttonSubmit,
    ...utils,
  };
};

describe('CreateEventForm', () => {
  // mockowanie handlera odbierającego wypełniony formularz
  const handleFinish = jest.fn().mockImplementation((param) => param);

  beforeEach(() => {
    // z hooka w aplikacji korzysta tylko jeden komponent
    // do wyciagniecia wartosci enum StatusType
    (ReactRedux.useSelector as jest.Mock).mockImplementation(
      () => StatusType.SUCCESS,
    );
  });

  it('renders correctly', () => {
    const {
      inputDate,
      inputEmail,
      inputFirstname,
      inputLastname,
      buttonSubmit,
    } = setup({
      onFinish: handleFinish,
    });

    expect(inputFirstname).toBeInTheDocument();
    expect(inputLastname).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(inputDate).toBeInTheDocument();
    expect(buttonSubmit).toBeInTheDocument();
  });

  it('passes correct object on onFinish', async () => {
    const {
      form,
      inputDate,
      inputEmail,
      inputFirstname,
      inputLastname,
      buttonSubmit,
    } = setup({
      onFinish: handleFinish,
    });

    expect(inputFirstname.value).toBe('');
    expect(inputLastname.value).toBe('');
    expect(inputEmail.value).toBe('');
    expect(inputDate.value).toBe('');

    // w act nie można ustawić daty w datePickerze
    changeDateValue(inputDate, createEventMock.date);
    // ustawienie pozostałych pól z formularza
    await act(async () => {
      changeTextInputValue(inputFirstname, createEventMock.firstname);
      changeTextInputValue(inputLastname, createEventMock.lastname);
      changeTextInputValue(inputEmail, createEventMock.email);
      await buttonSubmit.click();
    });

    expect(inputFirstname.value).toBe(createEventMock.firstname);
    expect(inputLastname.value).toBe(createEventMock.lastname);
    expect(inputEmail.value).toBe(createEventMock.email);
    expect(inputDate.value).toBe(createEventMock.date);

    // serializacja dat, w celu prostszego sprawdzenia ich równości
    const createEventMockWithISODate = {
      ...createEventMock,
      date: moment(createEventMock.date, DATE_FORMAT).toISOString(),
    };

    const formValuesWithISODate = {
      ...form.getFieldsValue(),
      date: form.getFieldValue('date').toISOString(),
    };

    expect(handleFinish).toHaveBeenCalled();
    expect(formValuesWithISODate).toEqual(createEventMockWithISODate);
  });

  it('disables button on isLoading true', () => {
    const { container, Wrapper, rerender, buttonSubmit } = setup({
      onFinish: handleFinish,
      isLoading: false,
    });

    expect(
      container.querySelector('.ant-btn-loading-icon'),
    ).not.toBeInTheDocument();
    expect(buttonSubmit.closest('button')).not.toHaveAttribute('disabled');

    rerender(<Wrapper onFinish={handleFinish} isLoading={true} />);
    expect(
      container.querySelector('.ant-btn-loading-icon'),
    ).toBeInTheDocument();
    expect(buttonSubmit.closest('button')).toHaveAttribute('disabled');

    rerender(<Wrapper onFinish={handleFinish} isLoading={false} />);
    expect(
      container.querySelector('.ant-btn-loading-icon'),
    ).not.toBeInTheDocument();
    expect(buttonSubmit.closest('button')).not.toHaveAttribute('disabled');
  });

  describe('should not fire onFinish handler', () => {
    beforeEach(() => {
      // wyciszenie ostrzezeń z konsoli
      // bo komponent Form będzie ostrzegał o nie poprawnym formacie danych
      console.warn = jest.fn();
    });

    it('with invalid data', async () => {
      const {
        inputDate,
        inputEmail,
        inputFirstname,
        inputLastname,
        buttonSubmit,
      } = setup({
        onFinish: handleFinish,
      });

      // w act nie można ustawić daty w datePickerze
      changeDateValue(inputDate, createEventMock.date);

      // ustawienie pozostałych pól z formularza
      await act(async () => {
        changeTextInputValue(inputFirstname, createEventMock.firstname);
        changeTextInputValue(inputLastname, createEventMock.lastname);
        changeTextInputValue(inputEmail, 'definetly.not.an.email');
        fireEvent.click(buttonSubmit);
      });

      expect(handleFinish).not.toHaveBeenCalled();
    });

    it('on empty firstname', async () => {
      const {
        inputDate,
        inputEmail,
        inputFirstname,
        inputLastname,
        buttonSubmit,
      } = setup({
        onFinish: handleFinish,
      });

      // w act nie można ustawić daty w datePickerze
      changeDateValue(inputDate, createEventMock.date);

      // ustawienie pozostałych pól z formularza
      await act(async () => {
        changeTextInputValue(inputLastname, createEventMock.lastname);
        changeTextInputValue(inputEmail, createEventMock.email);
        fireEvent.click(buttonSubmit);
      });

      expect(inputLastname.value).not.toBe('');
      expect(inputEmail.value).not.toBe('');
      expect(inputDate.value).not.toBe('');
      expect(inputFirstname.value).toBe('');

      expect(handleFinish).not.toHaveBeenCalled();
    });

    it('on empty lastname', async () => {
      const {
        inputDate,
        inputEmail,
        inputFirstname,
        inputLastname,
        buttonSubmit,
      } = setup({
        onFinish: handleFinish,
      });

      // w act nie można ustawić daty w datePickerze
      changeDateValue(inputDate, createEventMock.date);

      // ustawienie pozostałych pól z formularza
      await act(async () => {
        changeTextInputValue(inputFirstname, createEventMock.firstname);
        changeTextInputValue(inputEmail, createEventMock.email);
        fireEvent.click(buttonSubmit);
      });

      expect(inputEmail.value).not.toBe('');
      expect(inputDate.value).not.toBe('');
      expect(inputFirstname.value).not.toBe('');
      expect(inputLastname.value).toBe('');

      expect(handleFinish).not.toHaveBeenCalled();
    });

    it('on empty email', async () => {
      const {
        inputDate,
        inputEmail,
        inputFirstname,
        inputLastname,
        buttonSubmit,
      } = setup({
        onFinish: handleFinish,
      });

      // w act nie można ustawić daty w datePickerze
      changeDateValue(inputDate, createEventMock.date);

      // ustawienie pozostałych pól z formularza
      await act(async () => {
        changeTextInputValue(inputFirstname, createEventMock.firstname);
        changeTextInputValue(inputLastname, createEventMock.lastname);
        fireEvent.click(buttonSubmit);
      });

      expect(inputFirstname.value).not.toBe('');
      expect(inputLastname.value).not.toBe('');
      expect(inputDate.value).not.toBe('');
      expect(inputEmail.value).toBe('');

      expect(handleFinish).not.toHaveBeenCalled();
    });

    it('on empty date', async () => {
      const {
        inputDate,
        inputEmail,
        inputFirstname,
        inputLastname,
        buttonSubmit,
      } = setup({
        onFinish: handleFinish,
      });

      // ustawienie wszystkich pól z formularza poza datą
      await act(async () => {
        changeTextInputValue(inputFirstname, createEventMock.firstname);
        changeTextInputValue(inputLastname, createEventMock.lastname);
        changeTextInputValue(inputEmail, createEventMock.email);
        fireEvent.click(buttonSubmit);
      });

      expect(inputFirstname.value).not.toBe('');
      expect(inputLastname.value).not.toBe('');
      expect(inputEmail.value).not.toBe('');
      expect(inputDate.value).toBe('');

      expect(handleFinish).not.toHaveBeenCalled();
    });
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});

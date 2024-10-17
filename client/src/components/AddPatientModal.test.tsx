import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AddPatientModal from '../components/AddPatientModal';

describe('AddPatientModal', () => {
  test('renders without crashing', () => {
    render(<AddPatientModal />);
  });

  test('displays correct title', () => {
    const { getByText } = render(<AddPatientModal />);
    const titleElement = getByText('Add Patient');
    expect(titleElement).toBeInTheDocument();
  });

  test('updates input value on change', () => {
    const { getByLabelText } = render(<AddPatientModal />);
    const nameInput = getByLabelText('Name');
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    expect(nameInput.value).toBe('John Doe');
  });

  test('submits form on button click', () => {
    const handleSubmit = jest.fn();
    const { getByText } = render(<AddPatientModal onSubmit={handleSubmit} />);
    const submitButton = getByText('Submit');
    fireEvent.click(submitButton);
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});

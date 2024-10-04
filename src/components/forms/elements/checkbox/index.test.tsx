import { useForm } from 'react-hook-form';
import { act, fireEvent, render, screen } from '@testing-library/react';
import Checkbox from './index';
import React from 'react';

describe('Checkbox', () => {
    it('should submit successfully', async () => {
        const mockSubmit = jest.fn(() => {});

        const TestForm: React.FC = () => {
            const {
                handleSubmit,
                control,
                formState: { errors },
            } = useForm<{ testCheckbox: boolean }>();

            return (
                <form onSubmit={handleSubmit(mockSubmit)}>
                    <Checkbox
                        name="testCheckbox"
                        errors={errors}
                        control={control}
                    />
                    <button type="submit" data-testid="test-button">
                        Submit
                    </button>
                </form>
            );
        };

        render(<TestForm />);

        // Check that container is there
        const checkboxContainerElement =
            screen.getByTestId('checkbox-container');
        expect(checkboxContainerElement).not.toBeNull();

        // Get checkbox and check it
        const checkboxElement = screen.getByTestId('checkbox');
        await act(async () => {
            fireEvent.click(checkboxElement);
        });

        // Check that checkbox is checked
        expect(checkboxElement).toBeChecked();

        // Submit form, check that checkbox value comes through
        const submitButtonElement = screen.getByTestId('test-button');
        await act(async () => {
            fireEvent.click(submitButtonElement);
        });

        expect(mockSubmit).toHaveBeenCalledWith(
            { testCheckbox: true },
            expect.anything()
        );
    });

    it('should show error when required and unchecked', async () => {
        const mockSubmit = jest.fn(() => {});

        const TestForm: React.FC = () => {
            const {
                handleSubmit,
                control,
                formState: { errors },
            } = useForm<{ testCheckbox: boolean }>();

            return (
                <form onSubmit={handleSubmit(mockSubmit)}>
                    <Checkbox
                        name="testCheckbox"
                        errors={errors}
                        control={control}
                        required={true}
                    />
                    <button type="submit" data-testid="test-button">
                        Submit
                    </button>
                </form>
            );
        };

        render(<TestForm />);

        // Get checkbox and check it
        const checkboxElement = screen.getByTestId('checkbox');
        // Check that checkbox is not checked
        expect(checkboxElement).not.toBeChecked();

        // Submit form
        const submitButtonElement = screen.getByTestId('test-button');

        await act(async () => {
            fireEvent.submit(submitButtonElement);
        });

        expect(mockSubmit).not.toHaveBeenCalled();
        const errorElement = await screen.findByTestId('checkbox-error');
        expect(errorElement).not.toBeNull();
        expect(errorElement).toHaveTextContent('This field is required.');
    });
});

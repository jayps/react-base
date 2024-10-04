import React from 'react';
import { useForm } from 'react-hook-form';
import { act, fireEvent, render, screen } from '@testing-library/react';
import Input from './Input';
import userEvent from '@testing-library/user-event';

describe('Input', () => {
    it('should submit successfully', async () => {
        const mockSubmit = jest.fn(() => {});

        const TestForm: React.FC = () => {
            const {
                handleSubmit,
                control,
                formState: { errors },
            } = useForm<{ testInput: string }>();

            return (
                <form onSubmit={handleSubmit(mockSubmit)}>
                    <Input
                        type="text"
                        name="testInput"
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
        const inputContainerElement = screen.getByTestId('input-container');
        expect(inputContainerElement).not.toBeNull();

        // Update input value
        const inputElement = screen.getByTestId('input');
        await act(async () => {
            userEvent.click(inputElement);
            // TODO: Figure out console errors
            userEvent.keyboard('Testing Input');
            fireEvent.blur(inputElement);
        });

        // Submit form, check that checkbox value comes through
        const submitButtonElement = screen.getByTestId('test-button');
        await act(async () => {
            fireEvent.click(submitButtonElement);
        });

        expect(mockSubmit).toHaveBeenCalledWith(
            { testInput: 'Testing Input' },
            expect.anything()
        );
    });

    it('should show an error when required', async () => {
        const mockSubmit = jest.fn(() => {});

        const TestForm: React.FC = () => {
            const {
                handleSubmit,
                control,
                formState: { errors },
            } = useForm<{ testInput: string }>();

            return (
                <form onSubmit={handleSubmit(mockSubmit)}>
                    <Input
                        type="text"
                        name="testInput"
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

        // Check that container is there
        const inputContainerElement = screen.getByTestId('input-container');
        expect(inputContainerElement).not.toBeNull();

        // Submit form, check that checkbox value comes through
        const submitButtonElement = screen.getByTestId('test-button');
        await act(async () => {
            fireEvent.click(submitButtonElement);
        });

        expect(mockSubmit).not.toHaveBeenCalled();
        const errorElement = await screen.findByTestId('input-error');
        expect(errorElement).not.toBeNull();
        expect(errorElement).toHaveTextContent('This field is required.');
    });

    it('should show a custom error from validation function', async () => {
        const mockSubmit = jest.fn(() => {});

        const TestForm: React.FC = () => {
            const {
                handleSubmit,
                control,
                formState: { errors },
            } = useForm<{ testInput: string }>();

            return (
                <form onSubmit={handleSubmit(mockSubmit)}>
                    <Input
                        type="text"
                        name="testInput"
                        errors={errors}
                        control={control}
                        required={true}
                        validate={(val: string) => {
                            if (val !== 'testing') {
                                return 'Validation failed.';
                            }
                        }}
                    />
                    <button type="submit" data-testid="test-button">
                        Submit
                    </button>
                </form>
            );
        };

        render(<TestForm />);

        // Update input value
        const inputElement = screen.getByTestId('input');
        await act(async () => {
            userEvent.click(inputElement);
            userEvent.keyboard('incorrect input');
            fireEvent.blur(inputElement);
        });

        // Submit form, check that checkbox value comes through
        const submitButtonElement = screen.getByTestId('test-button');
        await act(async () => {
            fireEvent.click(submitButtonElement);
        });

        expect(mockSubmit).not.toHaveBeenCalled();
        const errorElement = await screen.findByTestId('input-error');
        expect(errorElement).not.toBeNull();
        expect(errorElement).toHaveTextContent('Validation failed.');
    });
});

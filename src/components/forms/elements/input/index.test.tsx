import React from 'react';
import {useForm} from 'react-hook-form';
import Checkbox from '../checkbox';
import {act, fireEvent, render, screen} from '@testing-library/react';
import Input from './Input';
import userEvent from '@testing-library/user-event';

describe('Input', () => {
    it('should submit successfully', async () => {
        const mockSubmit = jest.fn(({testInput}) => {
            // do nothing
        });

        const TestForm: React.FC = () => {
            const {
                handleSubmit,
                control,
                formState: {errors}
            } = useForm<{ testInput: string }>();

            return (
                <form onSubmit={handleSubmit(mockSubmit)}>
                    <Input type="text" name="testInput" errors={errors} control={control}/>
                    <button type="submit" data-testid="test-button">Submit</button>
                </form>
            )
        }

        render(<TestForm/>);

        // Check that container is there
        const inputContainerElement = screen.getByTestId('input-container');
        expect(inputContainerElement).not.toBeNull();

        // Get checkbox and check it
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

        expect(mockSubmit).toHaveBeenCalledWith({'testInput': 'Testing Input'}, expect.anything());
    });
});
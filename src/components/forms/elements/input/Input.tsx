import React from 'react';
import { Control, Controller, FieldErrors, FieldValues } from 'react-hook-form';

export interface InputProps<T extends FieldValues> {
    name: string;
    label?: string;
    type?: string;
    required?: boolean;
    errors: FieldErrors;
    // eslint-disable-next-line no-unused-vars
    validate?: (val: string) => string | undefined;
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    control: Control<T, any>;
    defaultValue?: string;
    testId?: string;
}

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
const Input: React.FC<InputProps<any>> = ({
    name,
    label,
    type = 'text',
    required = false,
    errors,
    validate,
    control,
    defaultValue,
    testId,
}) => {
    const getError = (): string => {
        const defaultMessage = 'Please check your input.';
        if (errors && errors[name]) {
            const errorType = errors[name]?.type as string;
            switch (errorType.toLowerCase()) {
                case 'required':
                    return 'This field is required.';
                case 'validate':
                    return (errors[name]?.message as string) || defaultMessage;
                default:
                    return defaultMessage;
            }
        }

        return defaultMessage;
    };

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            rules={{
                required,
                validate,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
                <div className="form-group" data-testid="input-container">
                    <label htmlFor={name}>{label}</label>
                    <input
                        type={type}
                        placeholder={label}
                        onBlur={onBlur}
                        onChange={onChange}
                        value={value}
                        data-testid={testId || 'input'}
                    />
                    {errors && errors[name] && (
                        <span className="input-error" data-testid="input-error">
                            {getError()}
                        </span>
                    )}
                </div>
            )}
        />
    );
};

export default Input;

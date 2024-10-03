import React from 'react';
import {Control, Controller, FieldErrors, FieldValues} from 'react-hook-form';

export interface InputProps<T extends FieldValues> {
    name: string;
    label?: string;
    type?: string;
    required?: boolean;
    errors: FieldErrors;
    validate?: (val: string) => boolean;
    control: Control<T, any>;
}

const Input: React.FC<InputProps<any>> = ({
                                              name,
                                              label,
                                              type = 'text',
                                              required = false,
                                              errors,
                                              validate,
                                              control
                                          }) => {
    const getError = () => {
        const defaultMessage = 'Please check your input.'
        if (errors && errors[name]) {
            const errorType = errors[name]?.type as string;
            switch (errorType.toLowerCase()) {
                case 'required':
                    return 'This field is required.';
                case 'custom':
                    return errors[name]?.message as string || defaultMessage;
                case 'validate':
                    return '';
                default:
                    return defaultMessage;
            }
        }

        return defaultMessage;
    }

    return (
        <Controller
            name={name}
            control={control}
            rules={{
                required,
                validate
            }}
            render={({field: {onChange, onBlur, value}}) => (
                <div className="form-group">
                    <label htmlFor={name}>{label}</label>
                    <input
                        type={type}
                        placeholder={label}
                        onBlur={onBlur}
                        onChange={onChange}
                        value={value}
                    />
                    {
                        errors && errors[name] && <span className="input-error">{getError()}</span>
                    }
                </div>
            )}
        />
    );
}

export default Input;
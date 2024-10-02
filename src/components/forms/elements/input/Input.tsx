import React from 'react';
import {FieldErrors, FieldValues, UseFormRegister} from 'react-hook-form';

export interface InputProps<T extends FieldValues> {
    name: string;
    label?: string;
    type?: string;
    required?: boolean;
    errors: FieldErrors;
    register: UseFormRegister<T>;
    validate?: (val: string) => boolean;
}

const Input: React.FC<InputProps<any>> = ({name, label, type = 'text', required = false, errors, register, validate}) => {
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
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input type={type} {...register(name, {required, validate})} />
            {
                errors && errors[name] && <span className="input-error">{getError()}</span>
            }
        </div>
    )
}

export default Input;
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
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input type={type} {...register(name, {required, validate})} />
            {
                errors && errors[name] && <span className="input-error">This field is required</span>
            }
        </div>
    )
}

export default Input;
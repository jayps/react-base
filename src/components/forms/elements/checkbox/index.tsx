import React from 'react';
import {Control, Controller, FieldErrors, FieldValues} from 'react-hook-form';

export interface CheckboxProps<T extends FieldValues> {
    name: string;
    label?: string;
    type?: string;
    required?: boolean;
    errors: FieldErrors;
    validate?: (val: string) => boolean;
    control: Control<T, any>;
    defaultValue?: boolean;
}

const Checkbox: React.FC<CheckboxProps<any>> = ({
                                                    name,
                                                    label,
                                                    required = false,
                                                    errors,
                                                    control,
                                                    defaultValue = false
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
        <div className="form-group">
            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue}
                rules={{
                    required
                }}
                render={({field: {onChange, onBlur, value}}) => (
                    <input
                        type="checkbox"
                        placeholder={label}
                        onBlur={onBlur}
                        onChange={onChange}
                        checked={value}
                    />
                )}
            />
            <label htmlFor={name} className="ms-2">{label}</label>
            {
                errors && errors[name] && <span className="input-error">{getError()}</span>
            }
        </div>
    )
}

export default Checkbox;
import React from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';

export interface CheckboxProps {
    name: string;
    label?: string;
    type?: string;
    required?: boolean;
    errors: FieldErrors;
    control: Control;
    defaultValue?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({
    name,
    label,
    required = false,
    errors,
    control,
    defaultValue = false,
}) => {
    return (
        <div className="form-group" data-testid="checkbox-container">
            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue}
                rules={{
                    required,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <input
                        type="checkbox"
                        placeholder={label}
                        onBlur={onBlur}
                        onChange={onChange}
                        checked={value}
                        data-testid="checkbox"
                    />
                )}
            />
            <label htmlFor={name} className="ms-2">
                {label}
            </label>
            {errors && errors[name] && (
                <span
                    className="input-error block"
                    data-testid="checkbox-error"
                >
                    This field is required.
                </span>
            )}
        </div>
    );
};

export default Checkbox;

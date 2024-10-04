import React from 'react';
import { Control, Controller, FieldErrors, FieldValues } from 'react-hook-form';

export interface CheckboxProps<T extends FieldValues> {
    name: string;
    label?: string;
    type?: string;
    required?: boolean;
    errors: FieldErrors;
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    control: Control<T, any>;
    defaultValue?: boolean;
}

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
const Checkbox: React.FC<CheckboxProps<any>> = ({
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

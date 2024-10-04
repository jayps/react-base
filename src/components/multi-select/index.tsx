import React from 'react';

export interface MultiSelectOption {
    value: string | number;
    label: string;
}

export interface MultiSelectProps {
    // eslint-disable-next-line no-unused-vars
    onSelect: (value: string | number) => void;
    heading: string;
    prompt: string;
    selectedText: string;
    options: MultiSelectOption[];
    selectedOptions: MultiSelectOption[];
    // eslint-disable-next-line no-unused-vars
    onRemove: (value: string | number) => void;
    id: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
    onSelect,
    heading,
    prompt,
    options,
    id,
    selectedText,
    selectedOptions,
    onRemove,
}) => {
    return (
        <div id={id}>
            <h4>{heading}</h4>
            <div className="flex flex-col min-h-48 overflow-y-scroll border p-2 mb-1">
                <div className="form-group">
                    <select
                        onChange={(e) => onSelect(e.target.value)}
                        id="permissions-selector"
                        className="form-select"
                    >
                        <option>{prompt}</option>
                        {options.map((p: MultiSelectOption) => (
                            <option key={`${id}-${p.value}`} value={p.value}>
                                {p.label}
                            </option>
                        ))}
                    </select>
                </div>
                <h4>{selectedText}</h4>
                {selectedOptions.map((p: MultiSelectOption) => (
                    <span
                        key={`${id}-selected-${p.value}`}
                        className="border border-gray-300 w-full py-1 px-2 rounded mb-2 flex justify-between"
                    >
                        <span>{p.label}</span>
                        <span
                            onClick={() => onRemove(p.value)}
                            className="multi-select-option"
                        >
                            &times;
                        </span>
                    </span>
                ))}
            </div>
        </div>
    );
};

export default MultiSelect;

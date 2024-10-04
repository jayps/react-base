import { IconProps } from '../../interfaces';
import React from 'react';

const AddCircleIcon: React.FC<IconProps> = ({ height, width }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        height={height}
        width={width}
        viewBox={`0 0 24 24`}
        strokeWidth={1.5}
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
    </svg>
);

export default AddCircleIcon;

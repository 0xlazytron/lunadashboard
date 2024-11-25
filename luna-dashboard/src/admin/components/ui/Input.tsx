import React, { InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> { }

export const Input: React.FC<InputProps> = (props) => {
    return (
        <input
            {...props}
            className={`mt-1 block w-full px-3 py-2 bg-white/5 border border-gray-600 rounded-md text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${props.className}`}
        />
    );
};


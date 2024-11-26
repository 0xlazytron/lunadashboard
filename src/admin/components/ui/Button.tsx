import React, { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'outline' | 'ghost';
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'default', ...props }) => {
    const baseStyles = 'px-4 py-2 rounded font-medium focus:outline-none focus:ring-2 focus:ring-offset-2';
    const variantStyles = {
        default: 'bg-blue-500 text-white hover:bg-blue-600',
        outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50',
        ghost: 'text-gray-700 hover:bg-gray-100',
    };

    return (
        <button
            {...props}
            className={`${baseStyles} ${variantStyles[variant]} ${props.className}`}
        >
            {children}
        </button>
    );
};
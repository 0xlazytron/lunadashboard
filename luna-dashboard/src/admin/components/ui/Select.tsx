import React, { SelectHTMLAttributes } from 'react';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    children: React.ReactNode;
}

export const Select: React.FC<SelectProps> = ({ children, ...props }) => {
    return (
        <select
            {...props}
            className={`mt-1 block w-full px-3 py-2 bg-white/5 border border-gray-600 rounded-md text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${props.className}`}
        >
            {children}
        </select>
    );
};

export const SelectContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children }) => {
    return <>{children}</>;
};

export const SelectItem: React.FC<React.OptionHTMLAttributes<HTMLOptionElement>> = (props) => {
    return <option {...props} />;
};

export const SelectTrigger: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => {
    return <button {...props}>{children}</button>;
};

export const SelectValue: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({ children, ...props }) => {
    return <span {...props}>{children}</span>;
};
import React, { LabelHTMLAttributes } from 'react';

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> { }

export const Label: React.FC<LabelProps> = ({ children, ...props }) => {
    return (
        <label {...props} className={`block text-sm font-medium text-white ${props.className}`}>
            {children}
        </label>
    );
};
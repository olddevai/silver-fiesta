import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
}

export const Select: React.FC<SelectProps> = ({ options, className = '', ...props }) => {
  return (
    <select
      className={`px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 
                 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props}
    >
      {options.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
};
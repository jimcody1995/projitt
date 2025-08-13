import React from 'react';

interface LoadingSpinnerProps {
    content?: string;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    spinnerClassName?: string;
    contentClassName?: string;
    minHeight?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    content = "Loading...",
    size = 'md',
    className = "",
    spinnerClassName = "",
    contentClassName = "",
    minHeight = "min-h-[400px]"
}) => {
    const sizeClasses = {
        sm: 'h-6 w-6',
        md: 'h-12 w-12',
        lg: 'h-16 w-16'
    };

    const contentSizeClasses = {
        sm: 'text-sm',
        md: 'text-lg',
        lg: 'text-xl'
    };

    return (
        <div className={`flex items-center justify-center ${minHeight} ${className}`}>
            <div className={`animate-spin rounded-full border-b-2 border-blue-600 ${sizeClasses[size]} ${spinnerClassName}`}></div>
            {content && (
                <span className={`ml-3 text-gray-600 ${contentSizeClasses[size]} ${contentClassName}`}>
                    {content}
                </span>
            )}
        </div>
    );
};

export default LoadingSpinner;

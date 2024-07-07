import React from 'react';
import { OtpInputProps } from '../types';

const OtpInput = 
React.forwardRef<HTMLInputElement, OtpInputProps>(({
    value,
    handleKeyDown,
    handleOnChange,
    inputClassName,
    inputSize,
    triggerSubmit
    }, ref) => 
{
    const isSizeFromProps = inputSize?.width && inputSize?.height;
    return (
        <input
            value={value}
            ref={ref}
            onKeyDown={handleKeyDown}
            onChange={(e) => {
                handleOnChange(e);
                if (triggerSubmit && e.target.value) triggerSubmit();
                }}
            onFocus={(e) => e.target.select()}
            className={inputClassName ?? 'formInput'}
            style={isSizeFromProps ? {
                width: `${inputSize?.width ?? 64}px`,
                height: `${inputSize?.height ?? 64}px`,
            } : undefined}
            type="text"
        />
    )
});

export default OtpInput

import React from 'react';
import './otpInput.css';
import { OtpInputProps } from '../types';

const OtpInput =
    React.forwardRef<HTMLInputElement, OtpInputProps>(({
        value,
        handleKeyDown,
        handleOnChange,
        inputClassName,
        inputFilledClassName,
        inputSize,
        triggerSubmit
    }, ref) => {
        const filledClassName = value !== '' ? inputFilledClassName ?? 'formInputFilled' : '';
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
                className={`${inputClassName ?? 'formInput'} ${filledClassName}`}
                style={inputSize ? {
                    width: `${inputSize.width}px`,
                    height: `${inputSize.height}px`,
                    fontSize: Math.round(inputSize.height / 1.7),
                } : undefined}
                type="text"
            />
        )
    });

export default OtpInput

import React from 'react';
import styles from './otpInput.module.css';
import { OtpInputProps } from '../types';

const OtpInput =
    React.forwardRef<HTMLInputElement, OtpInputProps>(({
        value,
        handleKeyDown,
        handleOnChange,
        inputClassName,
        inputFilledClassName,
    }, ref) => {
        const otpInputClassName = value !== '' ? inputFilledClassName ?? styles.formInputFilled : inputClassName ?? styles.formInput;
        return (
            <input
                value={value}
                ref={ref}
                onKeyDown={handleKeyDown}
                onChange={(e) => {
                    const isValidValue = !isNaN(Number(e.target.value));
                    if (isValidValue) {
                        handleOnChange(e);
                    }
                }}
                onFocus={(e) => e.target.select()}
                className={otpInputClassName}
                type="text"
            />
        )
    });

export default OtpInput

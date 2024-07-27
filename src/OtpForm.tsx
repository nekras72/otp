import React, { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import OtpInput from './components/OtpInput';

import styles from './otpForm.module.css';
import { FormValues, OtpFormProps } from './types';
import { buildFormValues, checkPreviousValuesAndUpdate, shiftIfNeeded } from './utils';

const OtpForm: React.FC<OtpFormProps> = ({
  inputsAmount,
  formClassName,
  inputClassName,
  handleSubmit,
  errorMessage,
  isLoading,
  separator,
  loaderContainerClassName,
  CustomLoader,
  errorMessagePos = 'bottom',
  errorContainerClassName
}) => {
  const otpContainerClass = errorMessagePos === 'bottom' ? styles.otpContainer : styles.otpContainerReverse;
  const [formValues, setFormValues] = useState<FormValues>(buildFormValues(inputsAmount));

  const inputsRefs = useRef<(HTMLInputElement | null)[]>([]);
  const handleRef = (ref: HTMLInputElement | null) => {
    if (ref) {
      inputsRefs.current.push(ref);
    }
  }

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    currentIndex: number,
  ) => {
    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowDown':
      case ' ':
        event.preventDefault();
        break;
      case 'ArrowLeft':
        event.preventDefault();
        if (currentIndex > 0) {
          inputsRefs.current[`${currentIndex - 1}`]?.focus();
        }
        break;
      case 'ArrowRight':
        event.preventDefault();
        if (currentIndex < inputsAmount - 1) {
          inputsRefs.current[`${currentIndex + 1}`]?.focus();
        }
        break;
      case 'Delete':
      case 'Backspace':
        event.preventDefault();
        if (formValues[`${currentIndex}`]) {
          setFormValues((state) => (
            shiftIfNeeded({
              ...state,
              [`${currentIndex}`]: ''
            }, currentIndex, inputsAmount)));
        }
        if (currentIndex > 0) {
          inputsRefs.current[`${currentIndex - 1}`]?.focus();
        }
        break;

      default:
        break;
    }
  };


  const handleInputOnChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const handleFocus = (i: number, value: string) => {

      if (i < inputsAmount - 1) {
        inputsRefs.current[`${i + 1}`]?.focus();
      } else if (value !== '' && i === inputsAmount - 1) event.target.blur();
    }
    const inputValue = event.target.value;

    const inputValueLength = inputValue.length;
    let value: string;

    if (inputValueLength <= 1) {
      value = inputValue;
    } else value = inputValue.slice(inputValueLength - 1);

    checkPreviousValuesAndUpdate(index, value, formValues, setFormValues, handleFocus);
  };


  const triggerSubmit = useCallback((e?: React.FormEvent<HTMLFormElement>) => {

    e?.preventDefault();
    const formValuesStr = Object.values(formValues).reduce((str, char) => (str + char), '');

    if (formValuesStr.length === inputsAmount) handleSubmit(formValuesStr);
  }, [formValues, handleSubmit, inputsAmount]);

  const getInputsToRender = (inputsAmount: number) => {
    if (inputsAmount !== 0) {
      const inputsArray: JSX.Element | ReactNode[] = [];
      for (let index = 0; index < inputsAmount; index++) {
        inputsArray.push(
          <OtpInput
            handleKeyDown={(e) => handleKeyDown(e, index)}
            inputClassName={inputClassName}
            key={`input-${index}`}
            value={formValues[`${index}`]}
            handleOnChange={(e) => handleInputOnChange(index, e)}
            ref={(ref: HTMLInputElement | null) => handleRef(ref)}
          />
        );
        if (separator && index !== inputsAmount - 1) {
          inputsArray.push(separator);
        }
      }
      return inputsArray;
    }
  };

  useEffect(() => {
    triggerSubmit();
  }, [triggerSubmit]);

  useEffect(() => {
    inputsRefs.current[0]?.focus();
  }, []);

  return (
    <div className={otpContainerClass}>
      {!isLoading ? (
        <>
          <form onSubmit={triggerSubmit} className={formClassName ?? styles.formContainer}>
            {getInputsToRender(inputsAmount)}
          </form>
          <div className={errorContainerClassName ?? styles.errorContainer}>
            {errorMessage && <p>{errorMessage}</p>}
          </div>
        </>
      ) :
        (
          <div className={loaderContainerClassName ?? styles.loaderContainer}>
            {CustomLoader ?? <div className={styles.loader}/>}
          </div>
        )}
    </div>
  );
}

export default OtpForm;

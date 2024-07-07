import React, { useCallback, useEffect, useRef, useState } from 'react';
import OtpInput from './components/OtpInput';

import './OtpForm.css';
import { FormValues, OtpFormProps } from './types';

const OtpForm: React.FC<OtpFormProps> = ({ inputsAmount, inputSize, onlyNumberValues = true, formClassName, inputClassName, handleSubmit }) => {
  const [formValues, setFormValues] = useState<FormValues>({});
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLastFilled, setIsLastFilled] = useState<boolean>(false);

  const inputsRefs = useRef<(HTMLInputElement | null)[]>([]);
  const handleRef = (ref: HTMLInputElement | null) => {
    if (ref) {
      inputsRefs.current.push(ref);
    }
  }

  const handleOnSubmitForm = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();

    const formValuesStr = Object.values(formValues).reduce((str, char) => (str + char), '');
    if (formValuesStr.length === inputsAmount) {
      handleSubmit('formValuesStr');
    } else setErrorMessage('Please checkout entered code');
  };

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

      default:
        break;
    }
  };

  const handleInputOnChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const inputValueLength = inputValue.length;
    let value: string;

    if (inputValueLength <= 1) {
      value = inputValue;
    } else value = inputValue.slice(inputValueLength - 1);

    let isValidValue = false;
    if (onlyNumberValues) {
      isValidValue = !isNaN(Number(value));
    }
    if ((onlyNumberValues && isValidValue) || !onlyNumberValues) {
      setFormValues((state) => ({
        ...state,
        [`${index}`]: value
      }));
      if (value && index < inputsAmount - 1) {
        inputsRefs.current[`${index + 1}`]?.focus();
      } else if (value === '' && index !== 0) {
        inputsRefs.current[`${index - 1}`]?.focus();
      } else if (index !== 0) event.target.blur();
    }
  };

  const buildFormValues = (inputsAmount: number) => {
    const newFormState: FormValues = {};
    for (let index = 0; index < inputsAmount; index++) {
      newFormState[`${index}`] = '';
    }; // end for loop
    setFormValues(newFormState);
  };

  const getInputsToRender = (inputsAmount: number) => {
    if (Object.values(formValues).length !== 0) {

      const inputsArray = [];
      for (let index = 0; index < inputsAmount; index++) {
        const isLast = index === inputsAmount - 1;
        inputsArray.push(
          <OtpInput
            handleKeyDown={(e) => handleKeyDown(e, index)}
            triggerSubmit={isLast ? () => setIsLastFilled(true) : undefined}
            inputClassName={inputClassName}
            inputSize={inputSize}
            key={`input-${index}`}
            value={formValues[`${index}`]}
            handleOnChange={(e) => handleInputOnChange(index, e)}
            ref={(ref: HTMLInputElement | null) => handleRef(ref)}
          />
        );

      }
      return inputsArray;
    }
  };

  const triggerSubmit = (isLastFilled: boolean) => {

    if (isLastFilled) {
      const formValuesStr = Object.values(formValues).reduce((str, char) => (str + char), '');
      console.log({ formValuesStr });
      if (formValuesStr.length === inputsAmount) handleOnSubmitForm();
    };
  };

  useEffect(() => {
    buildFormValues(inputsAmount);
  }, [inputsAmount]);

  useEffect(() => {
    console.log({ isLastFilled, formValues });
    triggerSubmit(isLastFilled);
  }, [isLastFilled]);

  return (
    <div className='otpContainer'>
      <form onSubmit={handleOnSubmitForm} className={formClassName ?? 'formContainer'}>
        {getInputsToRender(inputsAmount)}
      </form>
    </div>
  );
}

export default OtpForm;

import { InputHTMLAttributes, ReactNode } from "react";

export type OtpFormProps = {
    inputsAmount: number;
    formClassName?: string;
    inputClassName?: string;
    loaderContainerClassName?: string;
    errorContainerClassName?: string;
    handleSubmit: (values: string) => void;
    errorMessage?: string;
    errorMessagePos?: 'top' | 'bottom';
    isLoading: boolean;
    separator?: JSX.Element;
    CustomLoader?: JSX.Element;
}

export type FormValues = {
    [key: string]: string;
}

export interface OtpInputProps
extends InputHTMLAttributes<HTMLInputElement> {
    inputClassName?: string;
    inputFilledClassName?: string;
    value: string;
    handleOnChange: (e:React.ChangeEvent<HTMLInputElement>) => void;
    handleKeyDown: (e:React.KeyboardEvent<HTMLInputElement>) => void;
}
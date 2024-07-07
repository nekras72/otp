import { InputHTMLAttributes } from "react";

export type OtpFormProps = {
    inputsAmount: number;
    inputSize?: {width: number, height: number};
    formClassName?: string;
    inputClassName?: string;
    handleSubmit: (values: string) => void;
    onlyNumberValues?: boolean;
}

export type FormValues = {
    [key: string]: string;
}

export interface OtpInputProps
extends InputHTMLAttributes<HTMLInputElement> {
    triggerSubmit?: () => void;
    inputSize?: {width: number, height: number};
    inputClassName?: string;
    value: string;
    handleOnChange: (e:React.ChangeEvent<HTMLInputElement>) => void;
}
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import OtpForm from './OtpForm';
import { OtpFormProps } from './types';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// temporary props
const props: OtpFormProps = {
  inputsAmount: 6,
  handleSubmit: (values: string) => console.log(`your code ${values} is looking good`),
  onlyNumberValues: true,
  inputSize: { width: 64, height: 64 },
}
root.render(
  // when strict mode is enabled shiftValues delete 1 extra number
  // try enter 1 2 3 4 5 and remove 2, result will be 1 4 5
  // <React.StrictMode>
  <OtpForm {...props} />
  // </React.StrictMode>
);

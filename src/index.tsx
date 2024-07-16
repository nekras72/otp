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
  <OtpForm {...props} />
);

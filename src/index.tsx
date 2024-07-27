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
  isLoading: false,
}
root.render(
  <OtpForm {...props} />
);

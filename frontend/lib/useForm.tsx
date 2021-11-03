import { ChangeEvent, useState } from 'react';

interface FormInputType {
  name?: string;
  price?: number;
}

export default function useForm(initialState: FormInputType) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [inputs, setInputs] = useState(initialState);
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, type, value } = e.target;
    let modifitedValue = -1;
    if (type === 'number') {
      modifitedValue = parseInt(value);
    }
    setInputs({
      ...inputs,
      [name]: modifitedValue === -1 ? value : modifitedValue,
    });
  };
  const resetForm = () => {
    setInputs(initialState);
  };
  const clearForm = () => {
    const blinkState: FormInputType = Object.fromEntries(Object.entries(inputs).map(([key]) => [key, '']));
    setInputs(blinkState);
  };
  return {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    inputs,
    onChangeHandler,
    resetForm,
    clearForm,
  };
}

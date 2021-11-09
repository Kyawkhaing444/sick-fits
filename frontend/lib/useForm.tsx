import { ChangeEvent, useEffect, useState } from 'react';

interface FormInputType {
  name?: string;
  price?: number;
  image?: File;
  description?: string;
}

export default function useForm(initialState: FormInputType) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [inputs, setInputs] = useState(initialState);

  const computedValues = Object.values(initialState).join('');

  useEffect(() => {
    setInputs(initialState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [computedValues]);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, type, value } = e.target;
    let modifitedValue = -1;
    let fileValue: File | null = null;
    if (type === 'number') {
      modifitedValue = parseInt(value);
    }
    if (type === 'file') {
      const { files } = e.target as HTMLInputElement;
      if (files) {
        // eslint-disable-next-line prefer-destructuring
        fileValue = files[0];
      }
    }
    let finalValue: string | number | File = value;
    if (modifitedValue !== -1) {
      finalValue = modifitedValue;
    }
    if (fileValue) {
      finalValue = fileValue;
    }
    setInputs({
      ...inputs,
      [name]: finalValue,
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

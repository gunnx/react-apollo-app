import { useEffect, useState } from 'react';

function useForm(initial = {}) {
  const [inputs, setInputs] = useState(initial);

  const initialHash = Object.values(initial).join('');
  useEffect(() => {
    setInputs({ ...initial });
  }, [initialHash]);

  const handleChange = (event) => {
    let { name, files, type, value } = event.target;

    if (type === 'number') {
      value = parseInt(value);
    }

    if (type === 'file') {
      [value] = files;
    }

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  function resetForm() {
    setInputs(initial);
  }

  function clearForm() {
    const blank = Object.fromEntries(
      Object.entries(inputs).map(([key]) => [key, ''])
    );
    setInputs(blank);
  }

  return {
    inputs,
    handleChange,
    clearForm,
    resetForm,
  };
}

export default useForm;

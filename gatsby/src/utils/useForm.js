import { useState } from 'react';

export default function useForm(defaults) {
  const [values, setValues] = useState(defaults);
  const updater = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  return { values, updater };
}

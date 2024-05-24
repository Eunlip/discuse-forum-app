import { useState } from 'react';

function useInput(defaultValue = '') {
  const [value, setValue] = useState(defaultValue);

  const onChangeValue = ({ target }) => setValue(target.value);

  return [value, onChangeValue, setValue];
}

export default useInput;

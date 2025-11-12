import { useState } from 'react';

function useActiveBtnV2<T>(initialValue: T) {
  const [selected, setSelected] = useState(initialValue);
  const onSelect = (value: T) => {
    setSelected(value);
  };

  return {
    selected,
    onSelect,
  };
}

export default useActiveBtnV2;

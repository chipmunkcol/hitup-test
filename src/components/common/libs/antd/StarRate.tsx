import { Rate } from 'antd';
import { useState } from 'react';

const StarRate = () => {
  const [rateValue, setRateValue] = useState(0);
  console.log('rateValue: ', rateValue);

  return <Rate value={rateValue} onChange={setRateValue} />;
};

export default StarRate;

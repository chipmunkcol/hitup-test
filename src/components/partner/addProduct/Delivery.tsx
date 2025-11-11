import { Button, Form } from 'antd';
import { useState } from 'react';

const Delivery = () => {
  // 배송, 배송없음, 템픞릿
  const [selectedOption] = useState('배송');

  return (
    <div>
      {/* 설정여부 */}
      <div className="flex gap-2">
        <Button>배송</Button>
        <Button>배송없음</Button>
        <Button>템플릿</Button>
      </div>
    </div>
  );
};

export default Delivery;

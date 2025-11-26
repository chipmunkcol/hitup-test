import MyButton from '@/components/atoms/MyButton';
import { Form, Radio, Select } from 'antd';
import { useEffect, useRef, useState } from 'react';

const TestPage = () => {
  return (
    <div>
      <OriginalComponent />
      {/* <AntdComponent /> */}
    </div>
  );
};

const AntdComponent = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Form values: ', values);
  };

  const cate = Form.useWatch('category', form);
  console.log('cate: ', cate);
  const radio = Form.useWatch('radioOption', form);
  console.log('radio: ', radio);

  return (
    <div>
      <Form form={form} onFinish={onFinish}>
        <button type="submit">제출</button>
        {/* select */}
        <Form.Item name="category">
          <Select style={{ width: 200 }}>
            <Select.Option value="cat1">Category 1</Select.Option>
            <Select.Option value="cat2">Category 2</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item></Form.Item>

        {/*radio  */}
        <Form.Item name="radioOption">
          <Form.Item name="radioOption" noStyle>
            <Radio.Group>
              <Radio value="option1">Option 1</Radio>
              <Radio value="option2">Option 2</Radio>
            </Radio.Group>
          </Form.Item>
        </Form.Item>
      </Form>
    </div>
  );
};

const OriginalComponent = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 폼 제출 처리 로직 작성
    const values = Object.fromEntries(new FormData(formRef.current!).entries());
    console.log('values: ', values);
  };

  // select 변경에 따라 다른 동작을 수행하는 예시
  // const [category, setCategory] = useState('cat1');
  // const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const selectedValue = e.target.value;
  //   console.log('Selected value: ', selectedValue);
  //   // 선택된 값에 따라 다른 동작 수행 가능
  //   setCategory(selectedValue);
  // };

  // const category = useWatch('category', formRef);
  // console.log('category: ', category);
  // const radio = useWatch('이렇게관리하는거구나', formRef);
  // console.log('radio: ', radio);
  const formState = useFormState(formRef);
  console.log('formState: ', formState);
  const { category, 이렇게관리하는거구나 } = formState;

  return (
    <div>
      <form onSubmit={onSubmit} ref={formRef}>
        <button type="submit">제출</button>
        {/* input */}
        <input name="title" />
        <TestComponent />
        {/* select */}
        {/* select */}
        <select name="category">
          <option value="cat1">Category 1</option>
          <option value="cat2">Category 2</option>
        </select>
        {/* cat1 일때 */}
        {category === 'cat1' && <div>category 111111 selected</div>}
        {/* cat2 일때 */}
        {category === 'cat2' && <div>ctaegory 222222 selected</div>}
        {/* radio */}
        {/* radio */}
        <input
          type="radio"
          name="이렇게관리하는거구나"
          value="option1"
          defaultChecked
          id="option1"
        />{' '}
        <label htmlFor="option1">Option 1</label>
        <input
          id="option2"
          type="radio"
          name="이렇게관리하는거구나"
          value="option2"
        />{' '}
        <label htmlFor="option2">Option 2</label>
        {이렇게관리하는거구나 === 'option1' && <div>Option 1 selected</div>}
        {이렇게관리하는거구나 === 'option2' && <div>Option 2 selected</div>}
        {/* checkbox */}
        {/* checkbox */}
        <div>
          <input
            type="checkbox"
            name="check1"
            value="check1"
            defaultChecked
            id="check1"
          />{' '}
          <label htmlFor="check1">Check 1</label>
          <input
            id="check2"
            type="checkbox"
            name="check2"
            value="check2"
          />{' '}
          <label htmlFor="check2">Check 2</label>
        </div>
        {/* 커스텀 버튼 */}
        <MyButton
          type="button"
          // disabled
          onClick={() => alert('마이버튼 클릭!')}
          className=""
        >
          마이버튼!
        </MyButton>
      </form>
    </div>
  );
};

export default TestPage;

function TestComponent() {
  return (
    <div>
      <input name="content" />
    </div>
  );
}

function useWatch(name: string, ref: React.RefObject<HTMLFormElement | null>) {
  const [value, setValue] = useState<string>('');
  // console.log('value: ', value);

  useEffect(() => {
    const form = ref.current;
    if (!form) return;

    // 🚀 1) 최초 mount 시 현재 select/input 값 읽어서 초기값 설정
    const fd = new FormData(form);
    const initial = fd.get(name);
    if (initial !== null) {
      setValue(initial as string);
    }

    // 🚀 2) 이후 변화 감지
    const handler = () => {
      const fd = new FormData(form);
      setValue(fd.get(name) as string);
    };

    form.addEventListener('change', handler);
    return () => form.removeEventListener('change', handler);
  }, [name, ref]);

  return value;
}

function useFormState(ref: React.RefObject<HTMLFormElement | null>) {
  const [formState, setFormState] = useState({});

  useEffect(() => {
    const form = ref.current;
    if (!form) return;

    // 초기값
    const fd = new FormData(form);
    const initial = Object.fromEntries(fd.entries());
    setFormState(initial);

    const handle = () => {
      const fd = new FormData(form);
      const obj = Object.fromEntries(fd.entries());
      setFormState(obj);
    };

    form.addEventListener('change', handle);
    return () => form.removeEventListener('change', handle);
  }, [ref]);

  return formState;
}

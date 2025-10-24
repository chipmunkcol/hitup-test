import { useState } from 'react';

interface UseFormProps {
  initialState: {
    username: string | null;
    password: string | null;
    email: string | null;
  };
  // validateField: (name: string, value: string) => string | null
}

type Error = UseFormProps['initialState'];

const useForm = ({ initialState }: UseFormProps) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState<Error>({
    username: null,
    password: null,
    email: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // 실시간 유효성 검사
    validateForm(name, value);
  };

  const validateForm = (name: string, value: string) => {
    if (name === 'username') {
      if (value.length < 3) {
        setErrors((prev) => ({
          ...prev,
          username: 'username must be at least 3 characters long',
        }));
      } else {
        setErrors((prev) => ({ ...prev, username: null }));
      }
    } else if (name === 'email') {
      const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
      if (!emailRegex.test(value)) {
        setErrors((prev) => ({ ...prev, email: 'Invalid email format' }));
      } else {
        setErrors((prev) => ({ ...prev, email: null }));
      }
    } else if (name === 'password') {
      if (value.length < 8) {
        setErrors((prev) => ({
          ...prev,
          password: 'Password must be at least 8 characters long',
        }));
      } else {
        setErrors((prev) => ({ ...prev, password: null }));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validation logic can be added here
  };

  return {
    formData,
    handleChange,
    errors,
    handleSubmit,
  };
};

export default useForm;

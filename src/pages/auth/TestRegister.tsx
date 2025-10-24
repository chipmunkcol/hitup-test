import useForm from '@/hooks/useForm';

const TestRegister = () => {
  const { formData, handleChange, errors, handleSubmit } = useForm({
    initialState: {
      username: '',
      email: '',
      password: '',
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          name="username"
          value={formData.username || ''}
          onChange={handleChange}
          placeholder="Username"
          className="border"
        />
        {errors.username && <span>{errors.username}</span>}
      </div>
      <div>
        <input
          type="email"
          name="email"
          value={formData.email || ''}
          onChange={handleChange}
          placeholder="Email"
          className="border"
        />
        {errors.email && <span>{errors.email}</span>}
      </div>
      <div>
        <input
          type="password"
          name="password"
          value={formData.password || ''}
          onChange={handleChange}
          placeholder="Password"
          className="border"
        />
        {errors.password && <span>{errors.password}</span>}
      </div>
      <button className="border" type="submit">
        Register
      </button>
    </form>
  );
};

export default TestRegister;

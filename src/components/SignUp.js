import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import './Login.css';

const SignUp = () => {
  let Email;
  const [name, setName] = useState([]);
  const navigate = useNavigate();
  const {
    register,
    resetField,
    handleSubmit,
    formState: { errors }
  } = useForm();

  fetch('http://localhost:5000/users')
    .then((res) => res.json())
    .then((data) => setName(data));

  const onSubmit = (data, e) => {
    let username = data.username;
    username = username.split(' ').join('');

    const email = data.email;
    Email = email;
    const password = data.password;
    const user = { username, email, password };
    const newname = name.filter(
      (one) => one.username === username || one.email === email
    );
    const exist = newname.length;
    if (exist > 0) {
      toast.error('Already exist, change username or email');
    } else {
      const url = 'http://localhost:5000/users';
      fetch(url, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(user)
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
        });
      navigate('/');

      toast.success('Register successful');
    }
    resetField('username');
    resetField('email');
    resetField('password');
  };
  return (
    <div className="background">
      <div
        style={{ height: '100vh', width: '100vw' }}
        className=" d-flex align-items-center"
      >
        <div className="mx-auto background2 design-log">
          <div className='my-5 text-center'>
            <h5 className='item-h5'>Please</h5>
            <h1 className='item-h1'>Register</h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input
                className="custom-input-container login-input"
                placeholder="username"
                {...register('username', {
                  required: {
                    value: true,
                    message: 'Username is Required'
                  }
                })}
              />
              {errors.username?.type === 'required' && (
                <span className="text-danger">{errors.username.message}</span>
              )}
            </div>

            <div className="my-3">
              <input
                type="email"
                placeholder="Enter email"
                className="custom-input-container login-input"
                id="EmailValue"
                name="email"
                {...register('email', {
                  required: {
                    value: true,
                    message: 'Email is Required'
                  },
                  pattern: {
                    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                    message: 'Provide a valid Email'
                  }
                })}
              />
              {errors.email?.type === 'required' && (
                <span className="text-danger text-start">
                  {errors.email.message}
                </span>
              )}
              {errors.email?.type === 'pattern' && (
                <span className="text-danger text-start">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="mb-3">
              <input
                className="custom-input-container login-input"
                {...register('password', {
                  required: {
                    value: true,
                    message: 'Password is Required'
                  },
                  minLength: {
                    value: 6,
                    message: 'Must be 6 characters or longer'
                  }
                })}
                type="password"
                placeholder="Password"
              />
              {errors.password?.type === 'required' && (
                <span className=" text-start text-danger">
                  {errors.password.message}
                </span>
              )}
            </div>

            <div className="text-center mt-1 mb-3">
              <input type="submit" value="Sign Up" className="register-button mb-4" />
            </div>
          </form>
          <p>
            Already have an account?{' '}
            <Link className="text-decoration-none" to="/">
              Please login
            </Link>{' '}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

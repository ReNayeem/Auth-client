import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import './Login.css';
const Login = () => {
  const [found, setFound] = useState([]);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  fetch('http://localhost:5000/users')
    .then((res) => res.json())
    .then((data) => setUsers(data));

  const {
    register,
    resetField,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    let check = 1;
    let newUserName = data.username;
    newUserName = newUserName.split(' ').join('');

    users.map((one) => {
      if (one?.username === newUserName && one?.password === data.password) {
        toast.success('Successfully logged in');
        navigate(`/home/${newUserName}`);
      } else {
        check++;
        console.log(check);
      }
    });
    const allLength = parseInt(users.length + 1);
    if (check === allLength) {
      console.log(check);
      toast.error('Username OR Password not matched!');
    }

    resetField('username');
    resetField('password');
  };
  return (
    <div className="background">
      <div
        style={{ height: '100vh', width: '100vw' }}
        className=" mx-auto  d-flex align-items-center"
      >
        <div className="mx-auto text-center">
          <div className='my-5 text-center'>
            <h5 className='item-h5'>Please</h5>
            <h1 className='item-h1'>Login</h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="my-3">
              <input
                className='login-input custom-input-container'
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

            <div className="mb-3">
              <input
                className='login-input custom-input-container'
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
                <span className=" text-danger">{errors.password.message}</span>
              )}
            </div>

            <div className="text-center my-2">
              <input type="submit" value="Login" className="login-button" />
            </div>
          </form>
          <p className="mt-5">
            New to here?{' '}
            Please register
          </p>
          <p
          >
            Forget Password?
          </p>
        </div>
      </div>


    </div>
  );
};

export default Login;

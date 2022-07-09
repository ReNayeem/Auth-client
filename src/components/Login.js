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
  const ForgetPass = (e) => {
    e.preventDefault();

    const forgetUser = e.target.email.value;
    const password = e.target.password.value;
    fetch(`http://localhost:5000/userByEmail?email=${forgetUser}`)
      .then((res) => res.json())
      .then((data) => {
        setFound(data);
      });
    console.log(found);
    const UpdateUser = { password, forgetUser };

    fetch(`http://localhost:5000/userByEmail2?email=${forgetUser}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(UpdateUser)
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount >= 1) {
          toast.success('Password changed');
        } else {
          toast.error('Account not found');
        }
      });

    e.target.reset();
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
            <Link className="text-decoration-none" to="/signup">
              Please register
            </Link>{' '}
          </p>
          <p className="btn forgot-pass"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          >
            Forget Password?
          </p>
        </div>
      </div>
      <div
        class="modal fade "
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog ">
          <div class="modal-content background border border-warning">
            <div class="modal-header">
              <h5 class="modal-title text-center" id="staticBackdropLabel">
                Reset your password
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form onSubmit={ForgetPass}>
                <input
                  name="email"
                  placeholder="enter email"
                  type="email"
                  className="log-input m-2"
                  required
                />
                <input
                  name="password"
                  placeholder="enter new password"
                  type="password"
                  className="log-input m-2"
                  required
                />
                <div class="d-flex justify-content-center  py-2">
                  <button type="submit" class="login-button">
                    Reset
                  </button>
                  <br />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Login;

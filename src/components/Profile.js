import React, { useEffect, useState } from 'react';
import './Profile.css'

const Profile = ({ username }) => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    fetch(
      ` http://localhost:5000/addUser?username=${username}`
    )
      .then((res) => res.json())
      .then((data) => {
        setUser(data?.[0]);
      });
  }, [username]);

  return (
    <div className="d-flex custom-height align-items-center justify-content-center flex-column text-center">
      <div>
        <h3 className='item-h13'>Welcome</h3>
        <hr />
        <div className='text-center'>
          <h1 className='item-h12'>{user?.username}</h1>
          <h5 className='item-h5'>{user?.email}</h5>
        </div>
      </div>
    </div>
  );
};

export default Profile;

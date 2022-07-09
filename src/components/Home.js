import React from 'react';
import { useParams } from 'react-router-dom';
import Profile from './Profile';
import './Login.css'

const Home = () => {
  const { username } = useParams()
  return (
    <div>
      <div><Profile username={username} /></div>
    </div>
  );
};

export default Home;
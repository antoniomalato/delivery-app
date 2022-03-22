import React from 'react';
import { useHistory } from 'react-router-dom';

function Home() {
  const history = useHistory();
  return (
    <>
      { history.push('/login') }
    </>
  );
}

export default Home;

import React from 'react';
import { Navbar, Main, Product } from '../components';
function Home() {
  return (
    <>
      <Navbar />
      <div>
        <Main />
        <Product />
      </div>
    </>
  );
}
export default Home;

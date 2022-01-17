import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="mx-auto">
      <section
        style={{
          backgroundImage: `url(${require('images/home.png')})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
        className="p-12 text-center bg-gradient-to-r from-indigo-200 to-gray-500 lg:p-56"
      >
        <h1 className="mb-2 text-2xl font-bold text-indigo-800 lg:text-5xl">
          Find Your Dream Home
        </h1>

        <p className="mb-8 text-lg text-center text-weht">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus
          officiis odit eum veniam iusto quibusdam? Qui tempora placeat fugit.
          Ut optio, commodi libero sit consequatur qui aliquid vel maiores
          consequuntur.
        </p>

        <div className="flex items-center justify-center space-x-2">
          <Link
            to="/properties"
            className="px-2 py-2 btn btn-primary text-white  border  rounded-lg lg:px-8 lg:py-3 hover:bg-gray-200 hover:shadow hover:text-black"
          >
            View Properties
          </Link>

          <Link
            to="/properties"
            className="px-2 py-2 btn btn-secondary text-white  border  rounded-lg lg:px-8 lg:py-3 hover:bg-gray-200 hover:shadow hover:text-black"
          >
            Buy Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;

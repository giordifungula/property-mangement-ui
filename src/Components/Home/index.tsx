import { TPropertyTypes } from 'logic/store/stores/properties.store';
import React from 'react';
import { Link } from 'react-router-dom';
// @forms
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface IFormData {
  type: TPropertyTypes;
  city: string;
  min: number;
  max: number;
}

const schema = yup
  .object()
  .shape({
    type: yup.string().required().oneOf(['house', 'apartment']),
    min: yup.number().required().positive(),
    max: yup.number().required().positive()
  })
  .required();

const Home = () => {
  const searchforProperty = (data: IFormData) => {
    alert('click');
    console.log('searching', data);
  };

  const {
    handleSubmit,
    control,
    watch,
    register,
    formState: { errors }
  } = useForm<IFormData>({
    resolver: yupResolver(schema)
  });
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
      <div className="m-4 lg:m-0">
        <div className="p-8 bg-white lg:flex lg:items-center lg:justify-center">
          <form
            onSubmit={handleSubmit(searchforProperty)}
            className="space-y-4 lg:space-y-0 lg:flex lg:space-x-4 lg:flex-nowrap"
          >
            <Controller
              name="type"
              control={control}
              defaultValue="apartment"
              render={(props) => (
                <select
                  {...props.field}
                  className="select select-bordered select-primary w-full max-w-xs"
                >
                  <option disabled={true}>Type</option>
                  <option value="apartment">Apartment</option>
                  <option value="house">House</option>
                  <option value="villa">Villa</option>
                  <option value="hotel">Hotel</option>
                </select>
              )}
            />
            <div>
              <Controller
                name="city"
                control={control}
                defaultValue="Cape Town"
                render={(props) => (
                  <input
                    {...props.field}
                    type="text"
                    className="w-full p-2 input input-primary "
                    placeholder="City"
                  />
                )}
              />
            </div>
            <div>
              <Controller
                name="min"
                control={control}
                render={(props) => (
                  <input
                    {...props.field}
                    type="number"
                    className="w-full p-2 input input-primary "
                    placeholder="Min"
                  />
                )}
              />
            </div>
            <div>
              <Controller
                name="max"
                control={control}
                render={(props) => (
                  <input
                    {...props.field}
                    type="number"
                    className="w-full p-2 input input-primary "
                    placeholder="Max"
                  />
                )}
              />
            </div>
            <div>
              <button
                className="px-8 py-2 btn btn-primary"
                // onClick={() => searchforProperty}
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;

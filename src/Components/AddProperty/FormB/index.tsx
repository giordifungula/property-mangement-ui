import React from 'react';
// @forms
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { IFormB } from '..';

interface IFormAProp {
  formB: IFormB;
  updateFormB: (formA: IFormB) => void;
}

interface IFormData {
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  lotSize: number;
}

const schema = yup
  .object()
  .shape({
    bedrooms: yup.number().required(),
    bathrooms: yup.number().required(),
    sqft: yup.number().required(),
    lotSize: yup.number().required()
  })
  .required();

const FormB = ({ formB, updateFormB }: IFormAProp) => {
  const handleNext = () => {
    console.log('handle next');
    // todo cross check this
  };

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<IFormData>({
    resolver: yupResolver(schema)
  });
  console.log('errors', errors);

  const bedroomError = errors.bedrooms ? errors.bedrooms.message : '';
  const bathroomError = errors.bathrooms ? errors.bathrooms.message : '';
  const sqftError = errors.sqft ? errors.sqft.message : '';
  const lotSizeError = errors.lotSize ? errors.lotSize.message : '';

  return (
    <form onSubmit={handleSubmit(updateFormB)}>
      {/* TODO add Controller here to update details */}
      <div className="relative w-full mb-3">
        <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
          Bedrooms
        </label>
        <Controller
          name="bedrooms"
          control={control}
          rules={{ required: true }}
          render={(props) => (
            <input
              {...props.field}
              type="number"
              className={`border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ${
                bedroomError && bedroomError !== ''
                  ? 'border-red-500 input-error '
                  : ''
              }`}
              placeholder="Property Name"
              style={{ transition: 'all .15s ease' }}
            />
          )}
        />
        {bedroomError ? (
          <span className="label-text-alt">Bedrooms is required</span>
        ) : null}
      </div>
      <div className="relative w-full mb-3">
        <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
          Bathrooms
        </label>
        <Controller
          name="bathrooms"
          control={control}
          rules={{ required: true }}
          render={(props) => (
            <input
              {...props.field}
              type="number"
              className={`border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ${
                bathroomError && bathroomError !== ''
                  ? 'border-red-500 input-error '
                  : ''
              }`}
              placeholder="Address"
              style={{ transition: 'all .15s ease' }}
            />
          )}
        />
        {bathroomError ? (
          <span className="label-text-alt">Bathroom is required</span>
        ) : null}
      </div>
      <div className="relative w-full mb-3">
        <label
          className="block uppercase text-gray-700 text-xs font-bold mb-2"
          htmlFor="grid-password"
        >
          Sqft
        </label>
        <Controller
          name="sqft"
          control={control}
          rules={{ required: true }}
          render={(props) => (
            <input
              {...props.field}
              type="number"
              className={`border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ${
                sqftError && sqftError !== ''
                  ? 'border-red-500 input-error '
                  : ''
              }`}
              placeholder="City"
              style={{ transition: 'all .15s ease' }}
            />
          )}
        />
        {sqftError ? (
          <span className="label-text-alt">Sqft is required</span>
        ) : null}
      </div>

      <div className="relative w-full mb-3">
        <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
          ZIP
        </label>
        <Controller
          name="lotSize"
          control={control}
          rules={{ required: true }}
          render={(props) => (
            <input
              {...props.field}
              type="number"
              className={`border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ${
                lotSizeError && lotSizeError !== ''
                  ? 'border-red-500 input-error '
                  : ''
              }`}
              placeholder="7925"
              style={{ transition: 'all .15s ease' }}
            />
          )}
        />
        {lotSizeError ? (
          <span className="label-text-alt">Lot size is required</span>
        ) : null}
      </div>

      <div className="text-center mt-6">
        <button
          className="bg-gray-900 w-1/6 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
          style={{ transition: 'all .15s ease' }}
          type="submit"
          // onClick={handleNext}
        >
          Proceed
        </button>
      </div>
    </form>
  );
};

export default FormB;
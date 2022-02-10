import React from 'react';
import { Link } from 'react-router-dom';

type THeadingTypes = 'Add Property' | 'Properties';

interface IPropertyHeaderProps {
  heading: THeadingTypes;
}

const PropertyHeader = ({ heading }: IPropertyHeaderProps) => {
  // TODO: add form validations here
  return (
    <div>
      <section className="p-8 text-center bg-gradient-to-r from-blue-200 to-purple-500 lg:p-20">
        <h1 className="mb-2 text-2xl font-bold text-gray-700 lg:text-5xl">
          Properties
        </h1>
        <div className="text-white">
          <span className="text-blue-800">
            <Link to="/">Home</Link>-
          </span>{' '}
          {heading}
        </div>
      </section>
    </div>
  );
};

export default PropertyHeader;

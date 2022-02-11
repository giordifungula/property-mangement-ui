import React from 'react';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import PropertyHeader from 'Components/utils/PropertyHeader';
// @logic
import {
	IPropertyWrite,
	TPropertyOccupancyType,
	TPropertyStatuses,
	TPropertyTypes,
} from 'logic/store/stores/properties.store';
import { useStore } from 'logic/store';
// @local
import AddProperty from './Details';
import FormA from './FormA';
import FormB from './FormB';
import FormC from './FormC';

enum IFormSteps {
	BasicInfo,
	Additional,
	StatusAndType,
	Photos,
}

export interface IEntireFormFilledInState {
	name: string;
	address: string;
	city: string;
	state: string;
	zip: number;
	price: number;
	bedrooms: number;
	bathrooms: number;
	sqft: number;
	lotSize: number;
	yearBuilt: number;
	type: TPropertyTypes;
	occupancyType: TPropertyOccupancyType;
	// relationships
	userId: number;
}

export interface IFormA {
	name?: string;
	address?: string;
	city?: string;
	state?: string;
	zip?: number;
	price?: number;
}

export interface IFormB {
	bedrooms?: number;
	bathrooms?: number;
	sqft?: number;
	lotSize?: number;
}

export interface IFormC {
	yearBuilt?: number;
	type?: TPropertyTypes;
	occupancyType?: TPropertyOccupancyType;
}

const AddPropertyForm = () => {
	const store = useStore();
	const { userId } = store.auth as { userId: number };

	const fetchUsers = async () => {
		store.users.fetchAll({});
	};

	const [activeStep, setActiveStep] = React.useState(0);

	const [formA, setFormA] = React.useState<IFormA>({
		name: undefined,
		address: undefined,
		city: undefined,
		state: undefined,
		zip: undefined,
		price: undefined,
	});

	const updateFormA = (data: IFormA) => {
		setFormA((state) => ({ ...state, ...data }));
		handleNext();
	};

	const [formB, setFormB] = React.useState<IFormB>({
		bedrooms: undefined,
		bathrooms: undefined,
		sqft: undefined,
		lotSize: undefined,
	});

	const updateFormB = (data: IFormB) => {
		setFormB((state) => ({ ...state, ...data }));
		handleNext();
	};

	const [formC, setFormC] = React.useState<IFormC>({
		yearBuilt: undefined,
		type: undefined,
		occupancyType: undefined,
	});

	const updateFormC = (data: IFormC) => {
		setFormC((state) => ({ ...state, ...data }));
		handleNext();
	};

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	// const handlePrevious = () => {
	//   setActiveStep((prevActiveStep) => prevActiveStep - 1);
	// };

	const getStepContent = (step: IFormSteps) => {
		switch (step) {
			case IFormSteps.BasicInfo:
				return <FormA formA={formA} updateFormA={updateFormA} />;
			case IFormSteps.Additional:
				return <FormB updateFormB={updateFormB} />;
			case IFormSteps.StatusAndType:
				return (
					<FormC
						formA={formA}
						formB={formB}
						updateFormC={updateFormC}
					/>
				);
			default:
		}
	};

	return (
		<div className="mx-auto">
			<PropertyHeader heading="Add Property" />
			<main className="w-full">
				<section className="relative block" style={{ height: '500px' }}>
					<div
						className="absolute top-0 w-full h-full bg-center bg-cover"
						style={{
							backgroundImage: `url(${require('images/bigHouseBG.png')}`,
						}}
					>
						<span
							id="blackOverlay"
							className="w-full h-full absolute opacity-50 bg-black"
						></span>
					</div>
					<div
						className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
						style={{ height: '70px' }}
					>
						<svg
							className="absolute bottom-0 overflow-hidden"
							xmlns="http://www.w3.org/2000/svg"
							preserveAspectRatio="none"
							version="1.1"
							viewBox="0 0 2560 100"
							x="0"
							y="0"
						>
							<polygon
								className="text-gray-300 fill-current"
								points="2560 0 2560 100 0 100"
							></polygon>
						</svg>
					</div>
				</section>
				<section className="relative py-16 bg-gray-300">
					<div className="container mx-auto px-4">
						<div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
							<div className="px-6">
								<div className="flex flex-wrap justify-center">
									<div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
										<div className="relative">
											{/* TODO get image from source */}
											<img
												alt="..."
												src={require('images/houseHut.png')}
												className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16"
												style={{ maxWidth: '150px' }}
											/>
										</div>
									</div>
									<div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
										<div className="py-6 px-3 mt-32 sm:mt-0">
											<button
												className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
												type="button"
												style={{
													transition: 'all .15s ease',
												}}
											>
												Connect
											</button>
										</div>
									</div>
									<div className="w-full lg:w-4/12 px-4 lg:order-1">
										<div className="flex justify-center py-4 lg:pt-4 pt-8">
											<div className="mr-4 p-3 text-center">
												<span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
													22
												</span>
												<span className="text-sm text-gray-500">
													Documents
												</span>
											</div>
											<div className="mr-4 p-3 text-center">
												<span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
													10
												</span>
												<span className="text-sm text-gray-500">
													Properties
												</span>
											</div>
											<div className="lg:mr-4 p-3 text-center">
												<span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
													89
												</span>
												<span className="text-sm text-gray-500">
													Other
												</span>
											</div>
										</div>
									</div>
								</div>
								<div className="text-center mt-12">
									<h3 className="text-4xl font-semibold leading-normal text-gray-800 mb-2">
										Add Property
									</h3>
									<div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase">
										Cape Town South Africa
									</div>
									<div className="mb-2 text-gray-700 mt-10"></div>
									<div className="mb-2 text-gray-700"></div>
								</div>
								<div className="mt-10 py-10 border-t border-gray-300 text-center">
									<div className="flex flex-wrap justify-center">
										<div className="w-full lg:w-9/12 px-4">
											<p className="mb-4 text-lg leading-relaxed text-gray-800">
												You can update your information
												below.
											</p>
										</div>
									</div>
								</div>
								{getStepContent(activeStep)}
							</div>
						</div>
					</div>
				</section>
			</main>

			<ul className="w-full steps m-10">
				<li className={`step step-primary`}>Property Info</li>
				<li
					className={`step ${activeStep > 0 ? 'step-primary' : ' '} `}
				>
					Base Info
				</li>
				<li
					className={`step ${activeStep > 1 ? 'step-primary' : ' '} `}
				>
					Create Property
				</li>
				<li
					className={`step ${activeStep > 2 ? 'step-primary' : ' '} `}
				>
					Uploads
				</li>
			</ul>
		</div>
	);
};

export default AddPropertyForm;

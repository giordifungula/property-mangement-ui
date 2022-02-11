import React from 'react';
// @forms
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
// @local
import { IFormA } from '..';

interface IFormAProp {
	formA: IFormA;
	updateFormA: (formA: IFormA) => void;
}

interface IFormData {
	name: string;
	city: string;
	address: string;
	state: string;
	zip: number;
	price: number;
}

const schema = yup
	.object()
	.shape({
		name: yup.string().required(),
		address: yup.string().required(),
		city: yup.string().required(),
		state: yup.string().required(),
		zip: yup.number().required(),
		price: yup.number().required(),
	})
	.required();

const FormA = ({ formA, updateFormA }: IFormAProp) => {
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<IFormData>({
		resolver: yupResolver(schema),
	});

	const nameError = errors.name ? errors.name.message : '';
	const addressError = errors.address ? errors.address.message : '';
	const cityError = errors.city ? errors.city.message : '';
	const stateError = errors.state ? errors.state.message : '';
	const zipError = errors.zip ? errors.zip.message : '';
	const priceError = errors.price ? errors.price.message : '';

	const saveFormDetails = (data: IFormData) => {
		updateFormA(data);
	};

	return (
		<form onSubmit={handleSubmit(saveFormDetails)}>
			<div className="relative w-full mb-3">
				<label className="block uppercase text-gray-700 text-xs font-bold mb-2">
					Property Name
				</label>
				<Controller
					name="name"
					control={control}
					defaultValue=""
					rules={{ required: true }}
					render={(props) => (
						<input
							{...props.field}
							type="text"
							className={`border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ${
								nameError && nameError !== ''
									? 'border-red-500 input-error '
									: ''
							}`}
							placeholder="Property Name"
							style={{ transition: 'all .15s ease' }}
						/>
					)}
				/>
				{nameError ? (
					<span className="label-text-alt border-red-500">
						Name is required
					</span>
				) : null}
			</div>
			<div className="relative w-full mb-3">
				<label className="block uppercase text-gray-700 text-xs font-bold mb-2">
					Property Address
				</label>
				<Controller
					name="address"
					control={control}
					defaultValue=""
					rules={{ required: true }}
					render={(props) => (
						<input
							{...props.field}
							type="text"
							className={`border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ${
								addressError && addressError !== ''
									? 'border-red-500 input-error '
									: ''
							}`}
							placeholder="Address"
							style={{ transition: 'all .15s ease' }}
						/>
					)}
				/>
				{addressError ? (
					<span className="label-text-alt">Address is required</span>
				) : null}
			</div>
			<div className="relative w-full mb-3">
				<label
					className="block uppercase text-gray-700 text-xs font-bold mb-2"
					htmlFor="grid-password"
				>
					City
				</label>
				<Controller
					name="city"
					control={control}
					defaultValue=""
					rules={{ required: true }}
					render={(props) => (
						<input
							{...props.field}
							type="text"
							className={`border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ${
								cityError && cityError !== ''
									? 'border-red-500 input-error '
									: ''
							}`}
							placeholder="City"
							style={{ transition: 'all .15s ease' }}
						/>
					)}
				/>
				{cityError ? (
					<span className="label-text-alt">City is required</span>
				) : null}
			</div>

			<div className="relative w-full mb-3">
				<label className="block uppercase text-gray-700 text-xs font-bold mb-2">
					ZIP
				</label>
				<Controller
					name="zip"
					control={control}
					rules={{ required: true }}
					render={(props) => (
						<input
							{...props.field}
							type="number"
							className={`border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ${
								zipError && zipError !== ''
									? 'border-red-500 input-error '
									: ''
							}`}
							placeholder="7925"
							style={{ transition: 'all .15s ease' }}
						/>
					)}
				/>
				{zipError ? (
					<span className="label-text-alt">Zip is required</span>
				) : null}
			</div>

			<div className="relative w-full mb-3">
				<label className="block uppercase text-gray-700 text-xs font-bold mb-2">
					State
				</label>
				<Controller
					name="state"
					control={control}
					rules={{ required: true }}
					render={(props) => (
						<input
							{...props.field}
							type="text"
							className={`border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ${
								stateError && stateError !== ''
									? 'border-red-500 input-error '
									: ''
							}`}
							placeholder="7925"
							style={{ transition: 'all .15s ease' }}
						/>
					)}
				/>
				{stateError ? (
					<span className="label-text-alt input-error border-red-500">
						State is required
					</span>
				) : null}
			</div>

			<div className="relative w-full mb-3">
				<label className="block uppercase text-gray-700 text-xs font-bold mb-2">
					Price
				</label>
				<Controller
					name="price"
					control={control}
					rules={{ required: true }}
					render={(props) => (
						<input
							{...props.field}
							type="number"
							className={`border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ${
								zipError && zipError !== ''
									? 'border-red-500 input-error '
									: ''
							}`}
							placeholder="price"
							min={0}
							style={{ transition: 'all .15s ease' }}
						/>
					)}
				/>
				{priceError ? (
					<span className="label-text-alt">Price is required</span>
				) : null}
			</div>
			<div className="text-center mt-6">
				<button
					className="bg-gray-900 w-1/6 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
					style={{ transition: 'all .15s ease' }}
					type="submit"
				>
					Next
				</button>
			</div>
		</form>
	);
};

export default FormA;

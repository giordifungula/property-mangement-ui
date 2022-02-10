import React from 'react';
import { observer } from 'mobx-react-lite';
// @forms
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { IFormC, IFormA, IFormB } from '..';
// @logic
import {
	TPropertyStatuses,
	TPropertyTypes,
	TPropertyOccupancyType,
} from 'logic/store/stores/properties.store';
import { useStore } from 'logic/store';

interface IFormProp {
	formC: IFormC;
	formA: IFormA;
	formB: IFormB;
	updateFormC: (formC: IFormC) => void;
}

interface IFormData {
	yearBuilt: number;
	type: TPropertyTypes;
	occupancyType: TPropertyOccupancyType;
}

const schema = yup
	.object()
	.shape({
		yearBuilt: yup.number().required(),
		occupancyType: yup
			.string()
			.required()
			.oneOf(['rent', 'sale', 'rent_sale']),
		type: yup
			.string()
			.required()
			.oneOf(['apartment', 'house', 'flat', 'estate', 'villa']),
	})
	.required();

const FormC = observer(({ formC, formA, formB, updateFormC }: IFormProp) => {
	const handleNext = () => {
		console.log('handle next');
		// todo cross check this
	};

	const store = useStore();
	const { userId } = store.auth as { userId: number };

	const {
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm<IFormData>({
		resolver: yupResolver(schema),
	});

	const yearBuiltError = errors.yearBuilt ? errors.yearBuilt.message : '';
	const occupancyTypeError = errors.occupancyType
		? errors.occupancyType.message
		: '';
	const typeError = errors.type ? errors.type.message : '';

	const createProperty = async (data: IFormData) => {
		// TODO status should be set by default

		const payload = { ...data, ...formA, ...formB };
		console.log('payload', payload);
		updateFormC(data);
		// const res = await store.properties.create(payload);
		// TODO ensure payload values are defined
	};

	return (
		<form onSubmit={handleSubmit(createProperty)}>
			{/* TODO add Controller here to update details */}
			<div className="relative w-full mb-3">
				<label className="block uppercase text-gray-700 text-xs font-bold mb-2">
					Year built
				</label>
				<Controller
					name="yearBuilt"
					control={control}
					rules={{ required: true }}
					render={(props) => (
						<input
							{...props.field}
							type="number"
							className={`border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ${
								yearBuiltError && yearBuiltError !== ''
									? 'border-red-500 input-error '
									: ''
							}`}
							placeholder="Year built"
							style={{ transition: 'all .15s ease' }}
						/>
					)}
				/>
				{yearBuiltError ? (
					<span className="label-text-alt">
						Year built is required
					</span>
				) : null}
			</div>

			<div className="relative w-full mb-3">
				<label className="block uppercase text-gray-700 text-xs font-bold mb-2">
					Type
				</label>
				<Controller
					name="type"
					defaultValue="apartment"
					control={control}
					render={(props) => (
						<select
							className="select block select-bordered w-full"
							{...props.field}
						>
							<option disabled={true}>
								Choose your property type
							</option>
							<option value="apartment">apartment</option>
							<option value="house">house</option>
							<option value="villa">villa</option>
							<option value="estate">estate</option>
							<option value="flat">flat</option>
						</select>
					)}
				/>
			</div>

			<div className="relative w-full mb-3">
				<label className="block uppercase text-gray-700 text-xs font-bold mb-2">
					Occupancy Type
				</label>
				<Controller
					name="occupancyType"
					defaultValue="rent"
					control={control}
					render={(props) => (
						<select
							className="select block select-bordered w-full"
							{...props.field}
						>
							<option disabled={true}>
								Choose your occupancy type
							</option>
							<option value="rent">rent</option>
							<option value="sale">sale</option>
							<option value="rent_sale">rent/sale</option>
						</select>
					)}
				/>
			</div>

			<div className="text-center mt-6">
				<button
					className="bg-gray-900 w-1/6 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
					style={{ transition: 'all .15s ease' }}
					type="submit"
				>
					Proceed
				</button>
			</div>
		</form>
	);
});

export default FormC;

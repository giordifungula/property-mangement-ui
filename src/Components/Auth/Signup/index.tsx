import React from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
// @form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
// @logic
import { useStore } from 'logic/store';
import { TRole } from 'logic/store/stores/users.store';

interface IFormData {
	password: string;
	email: string;
	firstName: string;
	lastName: string;
	role: TRole;
}

const schema = yup
	.object()
	.shape({
		password: yup.string().required(),
		email: yup.string().required(),
		firstName: yup.string().required(),
		lastName: yup.string().required(),
		role: yup.string().required().oneOf(['admin', 'user']),
	})
	.required();

const Signup = () => {
	const history = useHistory();
	const store = useStore();

	const signUp = async ({
		email,
		password,
		firstName,
		lastName,
		role,
	}: IFormData) => {
		const result = await store.users.register({
			email,
			password,
			firstName,
			lastName,
			role,
		});

		if (result.success === true) {
			toast.success('Signed up!');
			history.push('/profile');
		} else {
			toast.error('Unable to register');
		}
	};

	const { handleSubmit, control, watch, register } = useForm<IFormData>({
		resolver: yupResolver(schema),
	});

	return (
		<div className="mx-auto mt-0">
			<section className="h-full pt-10  pb-10 bg-gray-900">
				<h2 className="text-white text-xl text-center font-bold mb-5">
					{' '}
					Create an account below
				</h2>
				<div className="container mx-auto px-4 h-full ">
					<div className="flex content-center items-center justify-center h-full">
						<div className="w-full lg:w-4/12 px-4">
							<div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
								<div className="rounded-t mb-0 px-6 py-6">
									<div className="text-center mb-3">
										<h6 className="text-gray-600 text-sm font-bold">
											Sign up
										</h6>
									</div>
									<div className="btn-wrapper text-center">
										<button
											className="bg-white active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs"
											type="button"
											style={{
												transition: 'all .15s ease',
											}}
										>
											<img
												alt="..."
												className="w-5 mr-1"
												src={
													require('images/github.svg')
														.default
												}
											/>
											Github
										</button>
										<button
											className="bg-white active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs"
											type="button"
											style={{
												transition: 'all .15s ease',
											}}
										>
											<img
												alt="..."
												className="w-5 mr-1"
												src={
													require('images/google.svg')
														.default
												}
											/>
											Google
										</button>
									</div>
									<hr className="mt-6 border-b-1 border-gray-400" />
								</div>
								<div className="flex-auto px-4 lg:px-10 py-10 pt-0">
									<div className="text-gray-500 text-center mb-3 font-bold">
										<small>
											Or sign in with credentials
										</small>
									</div>
									<form onSubmit={handleSubmit(signUp)}>
										<div className="relative w-full mb-3">
											<label
												className="block uppercase text-gray-700 text-xs font-bold mb-2"
												htmlFor="grid-password"
											>
												First Name
											</label>
											<Controller
												name="firstName"
												control={control}
												defaultValue=""
												rules={{ required: true }}
												render={(props) => (
													<input
														{...props.field}
														type="text"
														className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
														placeholder="first name"
														style={{
															transition:
																'all .15s ease',
														}}
													/>
												)}
											/>
										</div>
										<div className="relative w-full mb-3">
											<label
												className="block uppercase text-gray-700 text-xs font-bold mb-2"
												htmlFor="grid-password"
											>
												Last Name
											</label>
											<Controller
												name="lastName"
												control={control}
												defaultValue=""
												rules={{ required: true }}
												render={(props) => (
													<input
														{...props.field}
														type="text"
														className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
														placeholder="first name"
														style={{
															transition:
																'all .15s ease',
														}}
													/>
												)}
											/>
										</div>
										<div className="relative w-full mb-3">
											<label
												className="block uppercase text-gray-700 text-xs font-bold mb-2"
												htmlFor="grid-password"
											>
												Email
											</label>
											<Controller
												name="email"
												control={control}
												defaultValue=""
												rules={{ required: true }}
												render={(props) => (
													<input
														{...props.field}
														type="email"
														className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
														placeholder="Email"
														style={{
															transition:
																'all .15s ease',
														}}
													/>
												)}
											/>
										</div>

										<div className="relative w-full mb-3">
											<label
												className="block uppercase text-gray-700 text-xs font-bold mb-2"
												htmlFor="grid-password"
											>
												Password
											</label>
											<Controller
												name="password"
												control={control}
												defaultValue=""
												rules={{ required: true }}
												render={(props) => (
													<input
														{...props.field}
														type="password"
														className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
														placeholder="Password"
														style={{
															transition:
																'all .15s ease',
														}}
													/>
												)}
											/>
										</div>
										<div className="relative w-full mb-3">
											<label
												className="block uppercase text-gray-700 text-xs font-bold mb-2"
												htmlFor="grid-password"
											>
												Role
											</label>
											<Controller
												name="role"
												control={control}
												defaultValue="regular"
												render={(props) => (
													<select
														className="select block select-bordered w-full"
														{...props.field}
													>
														<option disabled={true}>
															Choose your
															superpower
														</option>
														<option value="regular">
															regular
														</option>
														<option value="admin">
															admin
														</option>
														<option value="owner">
															owner
														</option>
													</select>
												)}
											/>
										</div>
										<div>
											<label className="inline-flex items-center cursor-pointer">
												<input
													id="customCheckLogin"
													type="checkbox"
													className="form-checkbox border-0 rounded text-gray-800 ml-1 w-5 h-5"
													style={{
														transition:
															'all .15s ease',
													}}
												/>
												<span className="ml-2 text-sm font-semibold text-gray-700">
													Remember me
												</span>
											</label>
										</div>

										<div className="text-center mt-6">
											<button
												className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
												type="submit"
												style={{
													transition: 'all .15s ease',
												}}
											>
												Sign Up
											</button>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};
export default Signup;

import React from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
// @form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
// @logic
import { useStore } from 'logic/store';

interface IFormData {
	password: string;
	email: string;
}

const schema = yup
	.object()
	.shape({
		password: yup.string().required(),
		email: yup.string().required(),
	})
	.required();

const Login = () => {
	const history = useHistory();
	const store = useStore();

	const login = async ({ email, password }: IFormData) => {
		const result = await store.auth.login(email, password);
		if (result.success === true && result.user) {
			toast.success('Logged in!');
			history.push('/profile');
		}
	};

	const signUpPage = async () => {
		history.push('/signup');
	};

	const { handleSubmit, control } = useForm<IFormData>({
		resolver: yupResolver(schema),
	});

	return (
		<div className="mx-auto">
			<section className="h-full py-32  bg-gray-900">
				<h2 className="text-white text-xl text-center font-bold mb-5">
					{' '}
					Login into your account below
				</h2>
				<div className="container mx-auto px-4 h-full">
					<div className="flex content-center items-center justify-center h-full">
						<div className="w-full lg:w-4/12 px-4">
							<div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
								<div className="rounded-t mb-0 px-6 py-6">
									<div className="text-center mb-3">
										<h6 className="text-gray-600 text-sm font-bold">
											Sign in
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
								{/* TODO add Google Auth and Github Auth */}
								<div className="flex-auto px-4 lg:px-10 py-10 pt-0">
									<div className="text-gray-500 text-center mb-3 font-bold">
										<small>
											Or sign in with credentials
										</small>
									</div>
									<form onSubmit={handleSubmit(login)}>
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
												Sign In
											</button>
										</div>
									</form>
								</div>
							</div>
							<div className="flex flex-wrap mt-6">
								<div className="w-7/12 text-right">
									<button
										className="text-gray-300"
										onClick={signUpPage}
									>
										<small>Create new account</small>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};
export default Login;

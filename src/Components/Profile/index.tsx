import React from 'react';
import { toast } from 'react-toastify';
// @form
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
// @logic
import { TRole } from 'logic/store/stores/users.store';
import { useStore } from 'logic/store';

interface IFormData {
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  role: TRole;
}

const schema = z.object({
  password: z.string().nonempty({ message: 'Required' }),
  email: z.string().nonempty({ message: 'Email is required' }),
  firstName: z.string().nonempty({ message: 'First name is required' }),
  lastName: z.string().nonempty({ message: 'Last name is required' }),
  role: z.string().nonempty({ message: 'Role is required' })
});

const Profile = () => {
  const store = useStore();

  const { userId } = store.auth as { userId: number };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchUsers = async () => {
    store.users.fetchAll({});
  };

  const user = userId ? store.users.getById(userId) : null;
  console.log('user', user);

  const updateProfile = async ({
    email,
    firstName,
    lastName,
    password
  }: IFormData) => {
    if (userId) {
      const result = await store.users.update(userId, {
        email,
        firstName,
        lastName,
        password
      });

      if (result.success === true) {
        toast.success('Information Updated!');
      } else {
        toast.error('Unable to update user information');
      }
    } else {
      toast.error('User is not logged in');
    }
  };

  React.useEffect(() => {
    if (user) {
      reset(user);
    }
  }, [JSON.stringify(user)]);

  React.useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const { handleSubmit, control, reset } = useForm<IFormData>({
    resolver: zodResolver(schema)
  });

  return (
    <div>
      <main className="profile-page">
        <section className="relative block" style={{ height: '500px' }}>
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')"
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
                        src={require('images/team-2-800x800.jpg').default}
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
                        style={{ transition: 'all .15s ease' }}
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
                        <span className="text-sm text-gray-500">Documents</span>
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
                        <span className="text-sm text-gray-500">Other</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-12">
                  <h3 className="text-4xl font-semibold leading-normal text-gray-800 mb-2">
                    {user ? ` (${user.firstName} ${user.lastName})` : 'Name'}
                  </h3>
                  <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase">
                    Cape Town South Africa
                  </div>
                  <div className="mb-2 text-gray-700 mt-10">
                    Role - {user ? user.role.toUpperCase() + ' user ' : 'Role'}
                  </div>
                  <div className="mb-2 text-gray-700">
                    Email - {user ? user.email : 'Email'}
                  </div>
                </div>
                <div className="mt-10 py-10 border-t border-gray-300 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <p className="mb-4 text-lg leading-relaxed text-gray-800">
                        You can update your information below.
                      </p>
                    </div>
                  </div>
                </div>
                <form onSubmit={handleSubmit(updateProfile)}>
                  {/* TODO add Controller here to update details */}
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
                          style={{ transition: 'all .15s ease' }}
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
                          style={{ transition: 'all .15s ease' }}
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
                          style={{ transition: 'all .15s ease' }}
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
                          style={{ transition: 'all .15s ease' }}
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
                            Choose your superpower
                          </option>
                          <option value="regular">regular</option>
                          <option value="admin">admin</option>
                          <option value="owner">owner</option>
                        </select>
                      )}
                    />
                  </div>
                  <div className="text-center mt-6">
                    <button
                      className="bg-gray-900 w-1/6 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                      type="submit"
                      style={{ transition: 'all .15s ease' }}
                    >
                      Update Profile
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
export default Profile;

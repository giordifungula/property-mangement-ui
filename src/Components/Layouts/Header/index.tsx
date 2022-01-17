import { Link, useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';
// @logic
import { useStore } from 'logic/store';

const AppHeader = () => {
  const store = useStore();
  const { userId } = store.auth;

  const history = useHistory();

  const logout = () => {
    store.auth.logout();
    history.push('/');
  };

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      id="nav"
      className="mx-auto"
    >
      <div className="navbar w-full mb-0 shadow-lg bg-neutral text-neutral-content ">
        <div className="flex-none px-2 mx-2 navbar-start">
          <Link to="/" className="btn btn-ghost btn-sm rounded-btn">
            Home
          </Link>
        </div>
        <div className="flex-1 px-2 mx-2 navbar-end">
          <div className="items-stretch hidden lg:flex">
            <Link to="/about" className="btn btn-ghost btn-sm rounded-btn">
              About
            </Link>
            <Link to="/projects" className="btn btn-ghost btn-sm rounded-btn">
              Projects
            </Link>
            <Link to="/contact" className="btn btn-ghost btn-sm rounded-btn">
              Contact
            </Link>
            {userId == null ? (
              <>
                <Link to="/signin" className="btn btn-ghost btn-sm rounded-btn">
                  Login
                </Link>
                <Link to="/signup" className="btn btn-ghost btn-sm rounded-btn">
                  Sign up
                </Link>
              </>
            ) : (
              <Link to="/profile" className="btn btn-ghost btn-sm rounded-btn">
                Profile
              </Link>
            )}
          </div>
        </div>
        <div className="flex-none">
          <button className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-6 h-6 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg>
          </button>
        </div>
        <div className="flex-none">
          {userId ? (
            <button className="btn btn-primary" onClick={logout}>
              Logout
            </button>
          ) : null}
        </div>
      </div>
    </motion.nav>
  );
};

export default AppHeader;

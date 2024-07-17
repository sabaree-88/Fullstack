import React, { useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../AssetCopm/Spinner";
import { useAuth } from "../../context/AuthContext";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await signup(name, email, password);
      setLoading(false);
    } catch (error) {
      console.error("Error signing up:", error);
      setError(error.response?.data?.error || error.message || "Signup failed");
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="font-[sans-serif] bg-white max-w-4xl flex items-center mx-auto md:h-screen p-4">
          <div className="grid md:grid-cols-3 items-center shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-xl overflow-hidden">
            <div className="max-md:order-1 flex flex-col justify-center space-y-16 max-md:mt-16 min-h-full bg-gradient-to-r from-gray-900 to-gray-700 lg:px-8 px-4 py-4">
              <div>
                <h4 className="text-white text-lg font-semibold">
                  Create Your Account
                </h4>
                <p className="text-[13px] text-gray-300 mt-3 leading-relaxed">
                  Welcome to our registration page! Get started by creating your
                  account.
                </p>
              </div>
              <div>
                <h4 className="text-white text-lg font-semibold">
                  Simple &amp; Secure Registration
                </h4>
                <p className="text-[13px] text-gray-300 mt-3 leading-relaxed">
                  Our registration process is designed to be straightforward and
                  secure. We prioritize your privacy and data security.
                </p>
              </div>
            </div>
            <form
              className="md:col-span-2 w-full py-6 px-6 sm:px-16"
              onSubmit={handleSubmit}
            >
              <div className="mb-6">
                {error && (
                  <div className="text-red-600 px-3 py-1.5 bg-red-200 rounded-sm w-full">
                    {error}
                  </div>
                )}
                <h3 className="text-gray-800 text-2xl font-bold">
                  Create an account
                </h3>
              </div>
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="text-gray-800 text-sm mb-2 block">
                    Name
                  </label>
                  <div className="relative flex items-center">
                    <input
                      name="name"
                      type="text"
                      id="name"
                      className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                      placeholder="Enter name"
                      onChange={(e) => setName(e.target.value)}
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#bbb"
                      stroke="#bbb"
                      className="w-4 h-4 absolute right-4"
                      viewBox="0 0 24 24"
                    >
                      <circle cx={10} cy={7} r={6} data-original="#000000" />
                      <path
                        d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                        data-original="#000000"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">
                    Email Id
                  </label>
                  <div className="relative flex items-center">
                    <input
                      name="email"
                      type="email"
                      id="email"
                      className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                      placeholder="Enter email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#bbb"
                      stroke="#bbb"
                      className="w-4 h-4 absolute right-4"
                      viewBox="0 0 682.667 682.667"
                    >
                      <defs>
                        <clipPath id="a" clipPathUnits="userSpaceOnUse">
                          <path d="M0 512h512V0H0Z" data-original="#000000" />
                        </clipPath>
                      </defs>
                      <g
                        clipPath="url(#a)"
                        transform="matrix(1.33 0 0 -1.33 0 682.667)"
                      >
                        <path
                          fill="none"
                          strokeMiterlimit={10}
                          strokeWidth={40}
                          d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                          data-original="#000000"
                        />
                        <path
                          d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                          data-original="#000000"
                        />
                      </g>
                    </svg>
                  </div>
                </div>
                <div>
                  <label htmlFor="password" className="text-gray-800 text-sm mb-2 block">
                    Password
                  </label>
                  <div className="relative flex items-center">
                    <input
                      name="password"
                      type="password"
                      id="password"
                      className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                      placeholder="Enter password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#bbb"
                      stroke="#bbb"
                      className="w-4 h-4 absolute right-4 cursor-pointer"
                      viewBox="0 0 128 128"
                    >
                      <path
                        d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                        data-original="#000000"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-3 block text-sm text-gray-800"
                  >
                    I accept the{" "}
                    <a
                      href=""
                      className="text-blue-600 font-semibold hover:underline ml-1"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              <div className="!mt-12">
                <button
                  type="submit"
                  className="w-full py-3 px-4 tracking-wider text-sm rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none"
                >
                  Create an account
                </button>
              </div>
              <p className="text-gray-800 text-sm mt-6 text-center">
                Already have an account?{" "}
                <Link
                  to='/'
                  className="text-blue-600 font-semibold hover:underline ml-1"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      )}
    </>

    // <section className="bg-slate-800 dark:bg-gray-900 min-h-[100vh] flex items-center">
    //   {loading ? (
    //     <Spinner />
    //   ) : (
    //     <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    //       <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
    //         <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
    //           {error && (
    //             <div className="text-red-600 px-3 py-1.5 bg-red-200 rounded-sm w-full">
    //               {error}
    //             </div>
    //           )}
    //           <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
    //             Sign Up
    //           </h1>
    //           <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
    //             <div>
    //               <label
    //                 htmlFor="email"
    //                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    //               >
    //                 Your email
    //               </label>
    //               <input
    //                 type="email"
    //                 name="email"
    //                 id="email"
    //                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //                 placeholder="name@company.com"
    //                 onChange={(e) => setEmail(e.target.value)}
    //               />
    //             </div>
    //             <div>
    //               <label
    //                 htmlFor="password"
    //                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    //               >
    //                 Password
    //               </label>
    //               <input
    //                 type="password"
    //                 name="password"
    //                 id="password"
    //                 placeholder="••••••••"
    //                 onChange={(e) => setPassword(e.target.value)}
    //                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //               />
    //             </div>
    //             <button
    //               type="submit"
    //               className="w-full text-white bg-blue-500 hover:bg-blue-700 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    //             >
    //               Sign Up
    //             </button>
    //             <p className="text-sm font-light text-gray-500 dark:text-gray-400">
    //               Already have an account?{" "}
    //               <Link
    //                 to={"/"}
    //                 className="font-medium text-primary-600 hover:underline dark:text-primary-500"
    //               >
    //                 Login here
    //               </Link>
    //             </p>
    //           </form>
    //         </div>
    //       </div>
    //     </div>
    //   )}
    // </section>
  );
};

export default SignUp;

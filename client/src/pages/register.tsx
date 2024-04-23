import { useState } from "react";
import InputPassword from "../components/Input";
import { NavLink, useNavigate } from "react-router-dom";
import { validateEmail } from "../utils/helper";
import Navbar from "../components/Navbar";
import axiosInstance from "../utils/axiosInstance";

const Register = () => {

  const navigate = useNavigate();

  const [passwordError, setPasswordError] = useState<string>("");
  const [error, setError] = useState<string>("");

  const [user, setUser] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const handleInput = (e: any) => {
    const name = e.target.name;
    setUser({
      ...user,
      [name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setPasswordError("");
    setError("");

    if (!user.password) {
      setPasswordError("Please enter password.");
      return;
    }

    if (user.password !== user.confirmPassword) {
      setError("Password do not match.");
      return;
    }

    try {
      const response = await axiosInstance.post("/register", {
        fullname: user.fullname,
        email: user.email,
        password: user.password,
        gender: user.gender
      })
  
      if(response.data && response.data.token){
        console.log(response)
        localStorage.setItem("token", response.data.token)
        navigate('/')
      }
    } catch (error:any) {
        if(error.response && error.response.data && error.response.data.message){
          setError(error.response.data.message)
        }else{
          setError("An unexpected error occured")
        }
    }

  };

  return (
    <div>
      <Navbar/>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create an account
              </h1>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullname"
                    value={user.fullname}
                    onChange={handleInput}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-sky-400 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleInput}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-sky-400 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@example.com"
                    required
                  />
                </div>

                <div>
                  <InputPassword
                    label="Password"
                    name="password"
                    value={user.password}
                    onChange={handleInput}
                  />
                  {passwordError && (
                    <p className="text-sm text-red-600">{passwordError}</p>
                  )}
                </div>

                <div>
                  <InputPassword
                    label="Confirm Password"
                    name="confirmPassword"
                    value={user.confirmPassword}
                    onChange={handleInput}
                  />
                  {error && <p className="text-sm text-red-600">{error}</p>}
                </div>

                <div className="flex items-center mb-4 gap-2">
                    <input
                      type="radio"
                      value="Male"
                      onChange={handleInput}
                      name="gender"
                      required
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      className="text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Male
                    </label>

                    <input
                      type="radio"
                      value="Female"
                      onChange={handleInput}
                      name="gender"
                      required
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      className="text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Female
                    </label>
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  Register
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <NavLink
                    to="/login"
                    className="font-medium text-indigo-600 hover:underline dark:text-indigo-500"
                  >
                    Login
                  </NavLink>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;

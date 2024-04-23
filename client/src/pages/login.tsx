import { useState } from 'react'
import InputPassword from '../components/Input';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import axiosInstance from '../utils/axiosInstance';
import Navbar from '../components/Navbar';

const Login = () => {

  const navigate = useNavigate();

  const [error, setError] = useState<string>('');

  const [user, setUser] = useState({
    email:'',
    password:''
  })

  const handleInput = (e: any) =>{
    const name = e.target.name;
    setUser({
      ...user,
      [name]: e.target.value
    })
  }

  const handleSubmit = async (e: any) =>{
    e.preventDefault();

    setError("")

    if(!user.password){
      setError("Please enter a valid password.")
      return
    }

    try {
      const response = await axiosInstance.post("/login", {
        email: user.email,
        password: user.password
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
  }

  return (
    <div>
      <Navbar/>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
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
                <InputPassword label='Password' name="password" value={user.password} onChange={handleInput} />
                {error && <p className='text-sm text-red-600'>{error}</p>}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-green-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-green-600 dark:ring-offset-gray-800"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  Sign in
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <NavLink
                    to="/register"
                    className="font-medium text-indigo-600 hover:underline dark:text-indigo-500"
                  >
                    Register
                  </NavLink>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Login

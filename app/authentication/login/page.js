'use client'
import Link from "next/link";
import { FaFacebookF, FaLock } from 'react-icons/fa'; // Import the desired icons from react-icons library
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Login() {


    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setpassword] = useState('')

    const handelLogin = (e) =>{
e.preventDefault()
        console.log(email, password)
        if(email=="muhammadahmedite@gmail.com" && password == '123123'){
          router.push('/dashboard')
        }else{

            alert('invalid email')
        }
    }


  return (
    <>

      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-300">
        <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
          <div className="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800">Login Account For Go to Dashboard</div>
          <button className="relative mt-6 border rounded-md py-2 text-sm text-gray-800 bg-gray-100 hover:bg-gray-200">
            <span className="absolute left-0 top-0 flex items-center justify-center h-full w-10 text-orange-500">
              <FaFacebookF /> 
            </span>
            <span>Login with Facebook</span>
          </button>
          <div className="relative mt-10 h-px bg-gray-300">
            <div className="absolute left-0 top-0 flex justify-center w-full -mt-2">
              <span className="bg-white px-4 text-xs text-gray-500 uppercase">Or Login With Email</span>
            </div>
          </div>
          <div className="mt-10">
            <form onSubmit={handelLogin}>
              <div className="flex flex-col mb-6">
                <label htmlFor="email" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">E-Mail Address:</label>
                <div className="relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                    <FaLock /> 
                  </div>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                    placeholder="E-Mail Address"
                    onChange={(e)=>setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col mb-6">
                <label htmlFor="password" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Password:</label>
                <div className="relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                    <FaLock /> 
                  </div>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                    placeholder="Password"
                    onChange={(e)=>setpassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center mb-6 -mt-4">
                <div className="flex ml-auto">
                  <Link href="#" className="inline-flex text-xs sm:text-sm text-orange-500 hover:text-orange-300">Forgot Your Password?</Link>
                </div>
              </div>

              <div className="flex w-full">
                <button type="submit" className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-orange-600 hover:bg-orange-700 rounded py-2 w-full transition duration-150 ease-in">
                  <span className="mr-2 uppercase">Login</span>
                  <span>
                    <FaLock /> 
                  </span>
                </button>
              </div>
            </form>
          </div>
          <div className="flex justify-center items-center mt-6">
          </div>
        </div>
      </div>
    </>
  );
}

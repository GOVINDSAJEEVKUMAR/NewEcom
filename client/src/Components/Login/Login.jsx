import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [visible, setVisible] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  console.log(formData);
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm-w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          login to your account
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded">
          <form action="" className="space-y-6">
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              className="appearance-none block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm"
              type="email"
              name="email"
              placeholder="Email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
            />
            <div className="mt-1 relative">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                className="appearance-none block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm"
                type={visible ?"text":"password"}
                name="password"
                placeholder="Password"
                autoComplete="password"
                value={formData.password}
                onChange={handleChange}
              />
              {visible ? (
                <AiOutlineEye
                  size={20}
                  className="absolute right-2 top-7 cursor-pointer"
                  onClick={() => setVisible(!visible)}
                />
              ) : (
                <AiOutlineEyeInvisible
                  size={20}
                  className="absolute right-2 top-7 cursor-pointer"
                  onClick={() => setVisible(!visible)}
                />
              )}
            </div>
            <div className={`${styles.normalFlex} justify-between`}>
              <div className={`${styles.normalFlex} `}>
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  name="remember-me"
                  id="remember-me"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">Forgot Password</a>
              </div>
            </div>
            <button className="group text-white relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-shite bg-blue-600 hover:bg-blue-700">submit</button>
            <div className={`${styles.normalFlex} w-full`}>
              <h4>Dont have an acount?</h4>
              <Link to="/signup" className="text-blue-600 pl-2">SignUp</Link>
              </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

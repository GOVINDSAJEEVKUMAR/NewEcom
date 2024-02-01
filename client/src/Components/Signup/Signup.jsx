import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import styles from "../../styles/styles";
import { Link,useNavigate } from "react-router-dom";
import { server } from "../../server";
import axios from "axios"
import { toast } from "react-toastify";
const Signup = () => {
  
  const [formData, setFormData] = useState({
    name:"",
    email: "",
    password: "",
  });
const [visible, setVisible] = useState(false);
const [avatar,setAvatar]=useState(null)


const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};
const handleSubmit=(e)=>{
  e.preventDefault();
     const  config ={
      headers:{ "Content-Type" : "multipart/form-data"}
     };
     const newForm = new FormData();
     newForm.append("file",avatar);
     newForm.append("name",formData.name);
     newForm.append("email",formData.email);
     newForm.append("password",formData.password);

     axios.post(`${server}/create-user`, newForm,config)
     .then((res)=>{
      toast.success(res.data.message);
      setName("");
      setEmail("");
      setPassword("")
     })
     .catch((err)=>{
      console.log(err.response.data.message);
      toast.error(err.response.data.message);
     });
};
    const handleFileInputChange=(e)=>{
    const files=e.target.files[0]
    setAvatar(files)
}
console.log(formData);
  return (
    <div className="min-h-screen bg-green-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm-w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
         Register 
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-blue-50 py-8 px-4 shadow sm:rounded">
          <form action="" className="space-y-6" onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              className="appearance-none block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm"
              type="name"
              name="name"
              placeholder="Name"
              autoComplete="name"
             value={formData.name}
              onChange={handleChange}
            />
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
                type="password"
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


            <div>
              <label htmlFor="avatar" className=" block text-sm font-medium text-gray-700"></label>
              <div className=" mt-2 flex items-center">
                <span className=" inline-block h-8 w-8 rounded-full overflow-hidden">
                  { avatar ? (

                 

                  <img alt="avatar" src={URL.createObjectURL(avatar)} className=" h-full w-full object-cover rounded-full"/>
                  ):(
                    <RxAvatar className="h-8 w-8"/>
                  ) 
                }
                </span>

                <label htmlFor="file-input" className="ml-5 flex items-center justify-center px-4 py-2 border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 "> <span>Upload File</span>
                <input type="file" name="avatar" id="file-input" accept=".jpg, .jpeg, .png" onChange={handleFileInputChange} className="sr-only" />
                </label>
              </div>
            </div>



            <button className="group text-white relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-shite bg-blue-600 hover:bg-blue-700">Register Your Account</button>
            <div className={`${styles.normalFlex} w-full`}>
              <h4>Already Have An Account</h4>
              <Link to="/" className="text-blue-600 pl-2">SignUp</Link>
              </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
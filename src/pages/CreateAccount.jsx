import { React, useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { CREATE_ACCOUNT, LOG_IN } from "../apis/apiRoutes";
import axios from '../apis/axios'

const CreateAccount = () => {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(formData);
    if (
      Object.keys(formData).some((key) => formData[key] === "") ||
      Object.keys(formData).length < 3
    ) {
      alert("all fields are required");
    }
    if(formData.password !== formData.confirmpassword){
        alert("Password mismatched!");
    } 
    else {
      try {
        setLoading(true)
        const response = await axios.post(CREATE_ACCOUNT, formData);
        if (response.data.success) {
          setLoading(false)
          alert("Account created successfully!")
          navigate("/login");
        //   localStorage.setItem('isAuthenticated', response?.data?.payload?.token)
          localStorage.setItem('id', response?.data?.payload?.user?._id)
        } else {
          setLoading(false)

          alert(response.data.message);
        }

      }

      catch (error) {
        setLoading(false)

        console.error(error);
      }
    }

  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <div className="bg-gray-50 min-h-screen flex flex-col">
        <div className="container md:w-5/12 w-full mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-2xl text-black w-full">
            <h1 className="mb-8 text-3xl text-center">Create Account</h1>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="email"
                placeholder="Email"
                onChange={handleChange}
              />

              <input
                type="password"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="password"
                placeholder="Password"
                onChange={handleChange}

              />
              <input
                type="password"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="confirmpassword"
                placeholder="Confirm Password"
                onChange={handleChange}

              />

              <button
                type="submit"
                className="mt-2 w-full text-center py-3 rounded bg-blue-400 text-white hover:bg-blue-500 focus:outline-none my-1"
                onClick={handleSubmit}
              >
                {!loading ? ' Create Account' : 'Please wait...'}
              </button>
              <a href="/login" className="mt-2 text-blue-600">Already have an account? Login</a>
            </form>



          </div>
        </div>
      </div>
    </>
  );
};

export default CreateAccount;

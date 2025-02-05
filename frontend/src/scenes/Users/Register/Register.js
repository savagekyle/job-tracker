import React, { useState } from 'react';
import "../Master.css";
import ImageLG from '../../../components/UserAuth/ImageLG/ImageLG';
import Img2 from "../../../assets/jh-xl.webp";
import Nav from '../../../components/global/Navigation/Nav';
import AuthHeading from '../../../components/UserAuth/Heading/AuthHeading';
import Input from '../../../components/UserAuth/Input/Input';
import Button from '../../../components/UserAuth/SubmitBtn/Button';
import { registerUser } from '../../../authService';

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError(null);
      setSuccess(null);
  
      const { firstName, lastName, email, password } = formData;
  
      if (!firstName || !lastName || !email || !password) {
          setError("All fields are required.");
          return;
      }
  
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
          setError("Invalid email format.");
          return;
      }
  
      const response = await registerUser(firstName, lastName, email, password);
  
      if (response.error) {
          setError(response.error);
      } else {
          setSuccess("Account created successfully!");
      }
  };
  

    return (
        <>
            <Nav />
            <div className='auth'>
                <div className='container'>
                    <div className='userAuth register'>
                        <ImageLG src={Img2} alt="People searching for a job on a laptop." />
                        <form className='form' onSubmit={handleSubmit}>
                            <AuthHeading h1="Create an account" subText="Already have an account?" urlName="Login" url="/login" />
                            <div className='inputWrapper'>
                                <div className='inputSplit'>
                                    <Input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
                                    <Input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
                                </div>
                                <Input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                                <Input type="password" name="password" placeholder="Enter your Password" value={formData.password} onChange={handleChange} />
                            </div>
                            <Button text="Create Account" />
                            {error && <p className="error">{error}</p>}
                            {success && <p className="success">{success}</p>}
                        </form>
                    </div>     
                </div>
                <div className='background-design'></div>    
            </div>
        </>
    );
};

export default Register;

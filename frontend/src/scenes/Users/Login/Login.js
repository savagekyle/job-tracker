import React, { useState } from 'react';
import "../Master.css";
import ImageLG from '../../../components/UserAuth/ImageLG/ImageLG';
import Img1 from "../../../assets/jh-lg.jpg";
import Nav from '../../../components/global/Navigation/Nav';
import AuthHeading from '../../../components/UserAuth/Heading/AuthHeading';
import Input from '../../../components/UserAuth/Input/Input';
import Button from '../../../components/UserAuth/SubmitBtn/Button';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../../authService';

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

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

        const { email, password } = formData;

        if (!email || !password) {
            setError("Both fields are required.");
            return;
        }

        const response = await loginUser(email, password);

        if (response.error) {
            setError(response.error);
        } else {
            setSuccess("Logged in successfully!");
            navigate('/');
        }
    };

    return (
        <>
            <Nav />
            <div className='auth'>
                <div className='container'>
                    <div className='userAuth login'>
                        <ImageLG src={Img1} alt="People searching for a job on a laptop." />
                        <form className='form' onSubmit={handleSubmit}>
                            <AuthHeading h1="Login" subText="Don't have an account?" urlName="Create one here" url="/register" />
                            <div className='inputWrapper'>
                                <Input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                <Input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <Button text="Sign in" />
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

export default Login;
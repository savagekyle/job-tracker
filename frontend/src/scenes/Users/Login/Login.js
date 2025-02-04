import React from 'react'
import "../Master.css"
import ImageLG from '../../../components/UserAuth/ImageLG/ImageLG'
import Img1 from "../../../assets/jh-lg.jpg";
import Nav from '../../../components/global/Navigation/Nav';
import AuthHeading from '../../../components/UserAuth/Heading/AuthHeading';
import Input from '../../../components/UserAuth/Input/Input';
import Button from '../../../components/UserAuth/SubmitBtn/Button';

const Login = () => {
  return (
    <>
        <Nav />
        <div className='auth'>
            <div className='container'>
                <div className='userAuth login'>
                    <ImageLG src={Img1} alt="People with blue tops and black pants holding up a magnifying glass over a job board on a laptop. This is representing a job search." />
                    <form className='form'>
                        <AuthHeading h1="Login" subText="Don't have an account?" urlName="Create one here" url="/register" />
                        <div className='inputWrapper'>
                            <Input type="email" placeholder="Email" />
                            <Input type="password" placeholder="Password" />
                        </div>
                        <Button text="Sign in" />            
                    </form>
                </div>     
            </div>
            <div className='background-design'></div>    
        </div>
    </>
  )
}

export default Login
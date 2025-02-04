import React from 'react'
import "../Master.css"
import ImageLG from '../../../components/UserAuth/ImageLG/ImageLG'
import Img2 from "../../../assets/jh-xl.webp";
import Nav from '../../../components/global/Navigation/Nav';
import AuthHeading from '../../../components/UserAuth/Heading/AuthHeading';
import Input from '../../../components/UserAuth/Input/Input';
import Button from '../../../components/UserAuth/SubmitBtn/Button';

const Register = () => {
  return (
    <>
        <Nav />
        <div className='auth'>
            <div className='container'>
                <div className='userAuth register'>
                    <ImageLG src={Img2} alt="People with blue tops and black pants holding up a magnifying glass over a job board on a laptop. This is representing a job search." />
                    <form className='form'>
                        <AuthHeading h1="Create an account" subText="Already have an account?" urlName="Login" url="/login" />
                        <div className='inputWrapper'>
                            <div className='inputSplit'>
                              <Input type="text" placeholder="First Name" />
                              <Input type="text" placeholder="Last Name" />
                            </div>
                            <Input type="email" placeholder="Email" />
                            <Input type="password" placeholder="Enter your Password" />
                        </div>
                        <Button text="Create Account" />            
                    </form>
                </div>     
            </div>
            <div className='background-design'></div>    
        </div>
    </>
  )
}

export default Register
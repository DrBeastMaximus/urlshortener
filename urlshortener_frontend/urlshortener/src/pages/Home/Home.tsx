import React, {useEffect, useState} from 'react';
import './Home.scss'
import LoginForm from "../../components/LoginForm/LoginForm";
import RegisterForm from "../../components/RegisterForm/RegisterForm";

const Home = () => {
    const [registerVisible, setRegisterVisible] = useState(false);

    const switchRegister = () => {
        setRegisterVisible(!registerVisible);
        console.log(registerVisible);
    };

    return (
      <div className={"wrapper"}>
          {
            !registerVisible? <LoginForm isRegister={switchRegister}/> : <RegisterForm isRegister={switchRegister}/>
          }
      </div>
    );
}

export default Home;
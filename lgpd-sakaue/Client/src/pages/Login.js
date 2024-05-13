
import './index.css';
import { Formik, Form, Field } from "formik";
import { FaUser, FaLock } from 'react-icons/fa';


function Login() {
  return (
    <div className='tela' >

      <div className='loginBox' >
        <h1>login</h1>
        <Formik>
          <Form action="submit" className="formLogin">

            <div className='InputLogin'>
              <i><FaUser /></i>
              <Field name="email"
                type="email"
                placeholder='Email'
                className="form-field" />
            </div>

            <div className='InputLogin'>
              <i><FaLock /></i>
              <Field name="senha"
                type="password"
                placeholder='Senha'
                className="form-field" />
            </div>


            <button type="submit" className='BTNLogar'>Conectar</button>
            <h5>Não tem conta?    <a href="/cadastro">   Cadastre-se</a></h5>
          </Form> 
        </Formik>
      </div>

    </div >
  );
}

export default Login;

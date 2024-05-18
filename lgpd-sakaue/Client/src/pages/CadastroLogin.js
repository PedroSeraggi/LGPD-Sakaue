import './index.css';
import { Formik, Form, Field } from "formik";
import { FaUser, FaLock } from 'react-icons/fa';
import * as yup from 'yup';
import axios from 'axios';

const validationCadastro = yup.object().shape({
  email: yup.string().email('Insira um e-mail válido').required('E-mail é obrigatório'),
  name: yup.string().required('Nome é obrigatório'), 
  password: yup.string().required('Senha é obrigatória').min(8, 'Senha deve ter 8 caracteres no mínimo'),
  cpf: yup.string().required('CPF é obrigatório'), 
  confirmPassword: yup.string().required('Confirme sua senha').oneOf([yup.ref('password'), null], 'As senhas não são iguais'),
});

function CadastroLogin() {
  return (
    <div className='tela'>
      <div className='cadastroBox'>
        <h1>Cadastre-se</h1>
        <Formik
          initialValues={{ name: '', email: '', password: '', cpf: '', confirmPassword: '' }}
          validationSchema={validationCadastro}
          onSubmit={async (values, actions) => {
            try {
              const response = await axios.post('http://localhost:3001/lgpd/users/register', {
                email: values.email,
                password: values.password,
                name: values.name,
                cpf: values.cpf,
              });

              if (response.status === 201) {
                alert('Usuário registrado com sucesso!');
                actions.resetForm();
              } else {
                alert('Erro ao registrar usuário');
              }
            } catch (error) {
              console.error('Erro ao registrar usuário:', error);
              alert('Erro ao registrar usuário');
            }

            actions.setSubmitting(false);
          }}
        >
          {({ errors, touched }) => (
            <Form className="formLogin">
              <div className='InputLogin'>
                <i><FaUser /></i>
                <Field name="name" type="text" placeholder='Nome' className="form-field" />
                {errors.name && touched.name && <div className="error-message">{errors.name}</div>} 
              </div>
              <div className='InputLogin'>
                <i><FaUser /></i>
                <Field name="email" type="email" placeholder='Email' className="form-field" />
                {errors.email && touched.email && <div className="error-message">{errors.email}</div>}
              </div>
              <div className='InputLogin'>
                <i><FaLock /></i>
                <Field name="cpf" type="text" placeholder='CPF' className="form-field" />
                {errors.cpf && touched.cpf && <div className="error-message">{errors.cpf}</div>}
              </div>
              <div className='InputLogin'>
                <i><FaLock /></i>
                <Field name="password" type="password" placeholder='Senha' className="form-field" />
                {errors.password && touched.password && <div className="error-message">{errors.password}</div>}
              </div>
              <div className='InputLogin'>
                <i><FaLock /></i>
                <Field name="confirmPassword" type="password" placeholder='Confirme a Senha' className="form-field" />
                {errors.confirmPassword && touched.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
              </div>
              <button type="submit" className='BTNLogar'>Criar</button>
              <h5>Já tem conta? <a href="/">Conecte-se</a></h5>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default CadastroLogin;

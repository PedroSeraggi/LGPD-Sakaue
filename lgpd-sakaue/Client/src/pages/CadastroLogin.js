import './index.css';
import { Formik, Form, Field } from "formik";
import { FaUser, FaLock } from 'react-icons/fa';
import * as yup from 'yup';

const validationCadastro = yup.object().shape({
  email: yup.string().email('Insira um e-mail válido').required('E-mail é obrigatório'),
  nome: yup.string().required('Nome é obrigatório'),
  senha: yup.string().required('Senha é obrigatório').min(8, 'Senha deve ter 8 caracteres no mínimo'),
  cpf: yup.string().required('CPF é obrigatório'), // Adicione a validação para o CPF
  confirmSenha: yup.string().required('Confirme sua senha').oneOf([yup.ref('senha'), null], 'As senhas não são iguais'),
});

function CadastroLogin() {
  return (
    <div className='tela'>
      <div className='cadastroBox'>
        <h1>Cadastre-se</h1>
        <Formik initialValues={{}} validationSchema={validationCadastro} onSubmit={(values, actions) => {
          console.log(values);
          actions.setSubmitting(false);
        }}>
          {({ errors, touched }) => (
            <Form className="formLogin">
              <div className='InputLogin'>
                <i><FaUser /></i>
                <Field name="nome" type="text" placeholder='Nome' className="form-field" />
                {errors.nome && touched.nome && <div className="error-message">{errors.nome}</div>}
              </div>
              <div className='InputLogin'>
                <i><FaUser /></i>
                <Field name="email" type="email" placeholder='Email' className="form-field" />
                {errors.email && touched.email && <div className="error-message">{errors.email}</div>}
              </div>
              <div className='InputLogin'>
                <i><FaLock /></i>
                <Field name="cpf" type="text" placeholder='CPF' className="form-field" />
                {errors.cpf && touched.cpf && <div className="error-message">{errors.cpf}</div>} {/* Renderiza a mensagem de erro para CPF */}
              </div>
              <div className='InputLogin'>
                <i><FaLock /></i>
                <Field name="senha" type="password" placeholder='Senha' className="form-field" />
                {errors.senha && touched.senha && <div className="error-message">{errors.senha}</div>}
              </div>
            
              <div className='InputLogin'>
                <i><FaLock /></i>
                <Field name="confirmSenha" type="password" placeholder='Confirme a Senha' className="form-field" />
                {errors.confirmSenha && touched.confirmSenha && <div className="error-message">{errors.confirmSenha}</div>}
              </div>
              <button type="submit" className='BTNLogar'>Criar</button>
              <h5>Já tem conta?    <a href="/">   Conecte-se</a></h5>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default CadastroLogin;

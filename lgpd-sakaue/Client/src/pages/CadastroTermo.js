import React from 'react';
import { Formik, Form, Field } from "formik";
import * as yup from 'yup';
import axios from 'axios';


const validationSchema = yup.object().shape({
  title: yup.string().required('Titulo é obrigatório"'),
  
});

function CadastroTermo() {
  return (
    <div className='tela'>
    <div className='cadastroBox'>
        <h1>Registrar novo termo</h1>
        <Formik
          initialValues={{ title: '', description: '' }}
          validationSchema={validationSchema}
          onSubmit={async (values, actions) => {
            try {
              const response = await axios.post('http://localhost:3001/lgpd/terms/register', {
                title: values.title,
                desc: values.desc,
              });

              if (response.status === 201) {
                alert('Term registered successfully!');
                actions.resetForm();
              } else {
                alert('Error registering term');
              }
            } catch (error) {
              console.error('Error registering term:', error);
              alert('Error registering term');
            }

            actions.setSubmitting(false);
          }}
        >
          {({ errors, touched }) => (
            <Form className="formLogin">
              <div className='InputLogin'>
                
                <Field name="title" type="text" className="form-field" placeholder="Titulo"/>
                {errors.title && touched.title && <div className="error-message">{errors.title}</div>}
              </div>
              <div className='InputLogin'>
               
                <Field name="desc" as="textarea" className="form-field-textarea"  placeholder="Descrição" />
                {errors.description && touched.description && <div className="error-message">{errors.description}</div>}
              </div>
              <button type="submit" className='BTNLogar'>Criar</button>
            </Form>
          )}
        </Formik>
      </div>    
    </div>
  );
}

export default CadastroTermo;

import React, { useState } from 'react'
import { 
    Formik, 
    Form, 
    Field,
    ErrorMessage,
    FieldArray, 
    FastField
} from 'formik'
import * as Yup from 'yup'
import TextError from './TextError'

const initialValues={
    name:'',
    email: '',
    channel: '',
    comments: '',
    adresse: '',
    social: {
        facebook: '',
        twitter: ''
    },
    phoneNumbers: ['',''],
    phNumbers: ['']
}

const savedValues={
    name:'Bou',
    email: 'Bou@gmail.com',
    channel: 'BouBou',
    comments: 'POI',
    adresse: '15 baker street 1245 Houplines',
    social: {
        facebook: 'fb',
        twitter: 'tw'
    },
    phoneNumbers: ['0654879865','0320807050'],
    phNumbers: ['']
}

const validationSchema = Yup.object({
    name: Yup.string()
    .required('Veuillez saisir votre nom'),
    email: Yup.string()
    .email('E-mail invalide')
    .required('Veuillez saisir votre E-mail'),
    channel: Yup.string()
    .required('Veuillez saisir un nom de channel'),
    comments: Yup.string()
    .required('Veuillez saisir votre commentaire'),
    adresse: Yup.string()
    .required('Veuillez saisir votre adresse'),
})

const validateComments = value => {
    let error
    if(!value){
        error= 'Veuillez saisir un commentaire'
    }
    return error
}

const onSubmit=(values, onSubmitProps)=>{
    console.log('Form data', values)
    console.log('submit props', onSubmitProps)
    onSubmitProps.setSubmitting(false)
    onSubmitProps.resetForm()
}

function YoutubeForm() {
    const [formValues, setFormValues] =useState(null)
    return (
        <Formik
            initialValues={formValues || initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize
            // validateOnChange={false}
            // validateOnBlur={false}
            // validateOnMount
            >
            {
                formik =>{
                    console.log('formic props', formik)
                    return (
                        <Form>
                    <div className='form-control'>
                        <label htmlFor='name'>Nom</label>
                        <Field type='text' id='name' name='name'/>
                        <ErrorMessage name='name' component={TextError}/>
                    </div>
                    <div className='form-control'>
                        <label htmlFor='email'>E-mail</label>
                        <Field type='email' id='email' name='email'/>
                        <ErrorMessage name='email' component={TextError} />
                    </div>
                    <div className='form-control'>
                        <label htmlFor='channel'>Channel</label>
                        <Field type='text' id='channel' name='channel' placeholder='Nom du channel YouTube' />
                        <ErrorMessage name='channel'>
                            {errorMsg => <div className='errors'>{errorMsg}</div>}
                        </ErrorMessage>
                    </div>
                    <div className='form-control'>
                        <label htmlFor='comments'>Commentaires</label>
                        <Field as='textarea' id='comments' name='comments' validate={validateComments}/>
                        <ErrorMessage name='comments' component={TextError}/>
                    </div>
                    <div className='form-control'>
                        <label htmlFor='adresse'>Adresse</label>
                        <FastField name='adresse'>
                        {props=>{
                            console.log('Field render')
                            const { field, form, meta} = props
                            return(
                                <div>
                                    <input type='text' id='adresse' {...field} />
                                    {meta.touched && meta.error ? <div className='errors'>{meta.error}</div> : null}
                                </div>
                                )
                            }
                        }
                        
                        </FastField>
                    </div>
                    <div className='form-control'>
                        <label htmlFor='facebook'>Profil facebook</label>
                        <Field type='text' id='facebook' name='social.facebook'/>
                    </div>
                    <div className='form-control'>
                        <label htmlFor='twitter'>Profil twitter</label>
                        <Field type='text' id='twitter' name='social.twitter'/>
                    </div>
                    <div className='form-control'>
                        <label htmlFor='primaryPh'>Téléphone (portable)</label>
                        <Field type='text' id='primaryPh' name='phoneNumbers[0]' />
                    </div>
                    <div className='form-control'>
                        <label htmlFor='secondaryPh'>Téléphone (fixe)</label>
                        <Field type='text' id='secondaryPh' name='phoneNumbers[1]' />
                    </div>

                    <div className='form-control'>
                        <label>liste des numéro de téléphone</label>
                        <FieldArray name='phNumbers'>
                            {fieldArrayProps=>{
                                const {push, remove, form} = fieldArrayProps
                                const { values} =form
                                const { phNumbers} =values
                                return( 
                                    <div>
                                        {phNumbers.map((phNumbers, index) => (
                                                <div key={index}>
                                                    <Field name={`phNumbers[${index}]`}/>
                                                    {index > 0 &&(
                                                    <button type='button' onClick={() => remove(index)}> - </button>
                                                    )}
                                                    <button type='button' onClick={() => push('')}> + </button>
                                                </div>
                                            ))}
                                    </div>
                                    )}
                            }

                        </FieldArray>
                    </div>
                    {/* <button type='button' onClick={()=> formik.validateField('comments')}>valider le commentaire</button>
                    <button type='button' onClick={()=> formik.validateForm()}>tous valider</button>
                    <button type='button' onClick={()=> formik.setFieldTouched('comments')}>commentaire visiter</button>
                    <button type='button' onClick={()=> formik.setTouched({
                        name: true,
                        email: true,
                        channel: true,
                        comments: true,
                        adresse: true
                    })}>champs visiter</button> */}
                    {/* <button type='submit' disabled={!(formik.dirty && formik.isValid)}> */}
                    <button type='submit' disabled={(!formik.isValid || formik.isSubmitting)}>
                    Envoyer
                    </button>
                    <button type='button'onClick={()=> setFormValues(savedValues)} >
                        recharger mes infos
                    </button>
                    <button type ='reset'>Réinitialiser</button>
                </Form>
                    )
                }
            }
                
        </Formik>
    )
}

export default YoutubeForm


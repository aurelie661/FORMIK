import React from 'react'
import { useFormik} from 'formik'
import * as Yup from 'yup'

const initialValues={
    name:'',
    email: '',
    channel: ''
}

const onSubmit= values =>{
    console.log('Form data', values)
}

// const validate= values => {
//     let errors = {}

//     if(!values.name){
//         errors.name='Veuillez saisir votre nom'
//     }

//     if(!values.email){
//         errors.email='Veuillez saisir votre E-mail'
//     }
//     else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
//         errors.email='E-mail invalide'
//     }

//     if(!values.channel){
//         errors.channel='Veuillez saisir un nom de channel'
//     }
//     return errors
// }

const validationSchema = Yup.object({
    name: Yup.string()
    .required('Veuillez saisir votre nom'),
    email: Yup.string()
    .email('E-mail invalide')
    .required('Veuillez saisir votre E-mail'),
    channel: Yup.string()
    .required('Veuillez saisir un nom de channel')
})

function OldYoutubeForm() {

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
        // validate
        })
    
    // console.log('Form value', formik.values)
    // console.log('Form errors', formik.errors)
    // console.log('visited fields', formik.touched)

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div className='form-control'>
                    <label htmlFor='name'>Nom</label>
                    <input type='text' id='name' name='name' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name}/>
                    {formik.touched.name && formik.errors.name ? <div className='errors'>{formik.errors.name}</div> : null}
                </div>
                <div className='form-control'>
                    <label htmlFor='email'>E-mail</label>
                    <input type='email' id='email' name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email}/>
                    {formik.touched.email && formik.errors.email ? <div className='errors'>{formik.errors.email}</div> : null}
                </div>
                <div className='form-control'>
                    <label htmlFor='channel'>Channel</label>
                    <input type='text' id='channel' name='channel' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.channel}/>
                    {formik.touched.channel && formik.errors.channel ? <div className='errors'>{formik.errors.channel}</div> : null}
                </div>

                <button type='submit'>Envoyer</button>
            </form>
        </div>
    )
}

export default OldYoutubeForm


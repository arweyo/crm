import Layout from '@/components/Layout';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';

const Login = () => {
    const router = useRouter();
    const formik = useFormik({
        initialValues:{
            username:'',
            password:''
        },
        validationSchema:Yup.object({
            username:Yup.string().required('El nombre de usuario no puede ir vacío'),
            password:Yup.string().required('El password es obligatorio')
        }),
        onSubmit: async valores =>{
            console.log(valores)
            const request = await fetch('https://fakestoreapi.com/auth/login',{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                  },
                body:JSON.stringify({
                    username: valores.username, //"mor_2314",
                    password: valores.password //"83r5^_"
                })
            }).then(res=>res.json())
            .then(json=>{                          
                                                      
                            localStorage.setItem('token',json.token)
                            router.push('/')
                        },
                            ()=>console.log('errorsote'))
                

        }
    })


    return (
        <Layout> 
            <h1 className='text-center text-2xl text-white font-light'>Login</h1>
            <div className="flex justify-center mt-5">
                <div className='w-full max-w-sm'>
                    <form
                        className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4'
                        onSubmit={formik.handleSubmit}
                    >
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='username'>
                                Nombre de usuario
                            </label>
                            <input
                                className='shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
                                id='username'
                                type='text'
                                placeholder="Nombre Usuario"
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                />
                       
                        <div className='mb-4'>
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>
                                Password
                            </label>
                            <input
                                className='shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
                                id='password'
                                type='password'
                                placeholder="Password Usuario"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                                />
                        </div>
                        {formik.touched.password && formik.errors.password ? (
                            <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                <p className='font-bold'>Error</p>
                                <p>{formik.errors.password}</p>
                            </div>
                            
                        ) : null}
                        <input
                            type='submit'
                            className='bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-900'
                            value="Iniciar Sesión"
                            />
                    </form>

                </div>
            </div>
        </Layout>
     );
}
 
export default Login;
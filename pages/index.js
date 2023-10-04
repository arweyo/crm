import Layout from '@/components/Layout'
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';

const Index = () => {
  const [users, setUsers] = useState([])
  const [isNewUser, setIsNewUser] = useState(false)
  const [isShowMore, setIsShowMore] = useState(false)
  const [showMoreUser, setShowMoreUser] = useState(null)

  const deleteUser = id => {
    console.log('eliminando ', id)
    setUsers(users.filter(user => user.id !== id))

  }
  const showMore = id => {
    console.log('ver más ', id)
    setShowMoreUser(users.filter(user => user.id === id)[0])
    console.log(users.filter(user => user.id === id)[0])
    setIsShowMore(true)

  }

  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      lastname: '',
      firstname: ''


    },
    validationSchema: Yup.object({
      email: Yup.string().required('El email no puede ir vacío'),
      firstname: Yup.string().required('El password es obligatorio'),
      lastname: Yup.string().required('El password es obligatorio'),
      username: Yup.string().required('El password es obligatorio')
    }),
    onSubmit: async valores => {
      const ids = users.map(object => {
        return object.id;
      });
      console.log(ids); // 👉️ [

      const max = Math.max(...ids);

      console.log(max)
      setIsNewUser(false)
      const { firstname, lastname, ...rest } = valores
      const name = { firstname: firstname, lastname: lastname }
      const id = { id: Math.max + 1 }
      const obj = { ...rest, name, id: max + 1 }
      console.log(obj)

      setUsers([...users, obj])

    }
  })


  const fetchUsers = async () => {
    const req = fetch('https://fakestoreapi.com/users')
      .then(res => res.json())
      .then(json => {
        setUsers(json)
        console.log(json.map((obj) => {
          const { password, ...rest } = obj
          return rest
        }))
      })
  }
  useEffect(() => {
    fetchUsers()
  }, [])

  return (<div>
    <Layout>
      {isNewUser === false && isShowMore === false ? (
        <>
          <h1 className='text-2xl text-gray-800 font-light'>Usuarios</h1>
          <button className='bg-blue-800 py-2 px-5 mt-5 inline-block text-white rounded text-sm hover:bg-gray-800 uppercase font-bold'
            onClick={() => setIsNewUser(true)}
            type="button">Nuevo Usuario</button>

          <button className='bg-blue-800 py-2 px-5 mt-5 ml-2 inline-block text-white rounded text-sm hover:bg-gray-800 uppercase font-bold'
            onClick={() => window.location.reload(false)}
            type="button">Refrescar</button>

          <table className='table-auto shadow-md mt-10 w-full w-lg'>
            <thead className='bg-gray-800'>
              <tr className='text-white'>
                <th className='w-1/5 py-2'>Usuario</th>
                <th className='w-1/5 py-2'>Correo</th>
                <th className='w-1/5 py-2'>
                  Id
                </th>
                <th className='w-1/5 py-2'>Nombre</th>
                <th className='w-1/5 py-2'>Apellido</th>
                <th className='w-1/5 py-2'>Eliminar</th>
                <th className='w-1/5 py-2'>Ver más</th>

              </tr>
            </thead>
            <tbody className='bg-white'>
              {
                users.map(user => (
                  <tr key={user.id}>
                    <td className='border px-4 py-2'>{user.username}</td>
                    <td className='border px-4 py-2'>{user.email}</td>
                    <td className='border px-4 py-2'>{user.id}</td>
                    <td className='border px-4 py-2'>{user.name.firstname}</td>
                    <td className='border px-4 py-2'>{user.name.lastname}</td>
                    <td className='border px-4 py-2'>
                      <button type="button"
                        className='flex justify-center items-center bg-red-800 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold'
                        onClick={() => deleteUser(user.id)}
                      >
                        Eliminar
                      </button>

                    </td>
                    <td className='border px-4 py-2'>
                      <button type="button"
                        className='flex justify-center items-center bg-green-800 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold'
                        onClick={() => showMore(user.id)}
                      >
                        Ver más
                      </button>
                    </td>
                  </tr>
                ))
              }

            </tbody>
          </table>
        </>


      ) :

        (

          <>
            {isShowMore === false ? (<>
              <h1 className='text-center text-2xl text-black font-light'>Nuevo usuario</h1>
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
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='firstname'>
                      Nombre
                    </label>
                    <input
                      className='shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                      id='firstname'
                      type='text'
                      placeholder="Nombre"
                      value={formik.values.firstname}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='lastname' inline>
                      Apellido
                    </label>
                    <input
                      className='shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                      id='lastname'
                      type='text'
                      placeholder="Apellido"
                      value={formik.values.lastname}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />

                    <div className='mb-4'>
                      <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
                        Email
                      </label>
                      <input
                        className='shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='email'
                        type='email'
                        placeholder="Email Usuario"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                      />
                    </div>
                    {formik.touched.email && formik.errors.email ? (
                      <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                        <p className='font-bold'>Error</p>
                        <p>{formik.errors.email}</p>
                      </div>

                    ) : null}

                    <input
                      type='submit'
                      className='bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-900'
                      value="Registrar usuario"
                    />
                  </form>

                </div>
              </div> </>) :
              <>
                <h1 className='text-center text-2xl text-black font-light'>Información de usuario</h1>
                <div className="flex justify-center mt-5">
                  <div className='w-full max-w-sm'>
                    <form
                      className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4'
                      onSubmit={() => setIsShowMore(false)}
                    >
                      <p> <b>Id:</b> {showMoreUser.id}</p>
                      <p> <b>Nombre de usuario:</b> {showMoreUser.username}</p>
                      <p> <b>Nombre:</b> {showMoreUser.name.firstname}</p>
                      <p> <b>Apellido:</b> {showMoreUser.name.lastname}</p>
                      <p> <b>Email:</b> {showMoreUser.email}</p>
                      <p> <b>Teléfono:</b> {showMoreUser.phone}</p>
                      <p> <b>Ciudad:</b> {showMoreUser.address.city}</p>
                      <p> <b>Calle:</b> {showMoreUser.address.street}</p>
                      <p> <b>Número:</b> {showMoreUser.address.number}</p>
                      <p> <b>Código postal:</b> {showMoreUser.address.zipcode}</p>
                      <p> <b>Geolocalización:</b> {showMoreUser.address.geolocation.lat}, {showMoreUser.address.geolocation.long}</p>




                      


                      
                      <input
                        type='submit'
                        className='bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-900'
                        value="Aceptar"
                      />
                    </form>
                  </div>
                </div>
              </>
            }
          </>
        )


      }
    </Layout>
  </div>);
}

export default Index;

import Layout from '@/components/Layout'
import { useState, useEffect } from 'react';

const Productos = () => {
  const [products, setProducts] = useState([])
  const [isShowMore, setIsShowMore] = useState(false)
  const [showMoreProduct, setShowMoreProduct] = useState(null)

  
  const showMore = id => {
    console.log('ver más ', id)
    setShowMoreProduct(products.filter(product => product.id === id)[0])
    
    setIsShowMore(true)

  }

 


  const fetchProducts = async () => {
    const req = fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(json => {
        setProducts(json)
        console.log(products)
        
      })
  }
  useEffect(() => {
    fetchProducts()
  }, [])

  return (<div>
    <Layout>
      {isShowMore === false ? (
        <>
          <h1 className='text-2xl text-gray-800 font-light'>Usuarios</h1>
 
          <table className='table-auto shadow-md mt-10 w-full w-lg'>
            <thead className='bg-gray-800'>
              <tr className='text-white'>
              
                <th className='w-1/5 py-2'>
                  Id
                </th>
                <th className='w-1/5 py-2'>Precio</th>
                <th className='w-1/5 py-2'>Título</th>                
                <th className='w-1/5 py-2'>Ver más</th>

              </tr>
            </thead>
            <tbody className='bg-white'>
              {
                products.map(product => (
                  <tr key={product.id}>
                    <td className='border px-4 py-2'>{product.id}</td>
                    <td className='border px-4 py-2'>{product.price}</td>
                    <td className='border px-4 py-2'>{product.title}</td>
                    
                    <td className='border px-4 py-2'>
                      <button type="button"
                        className='flex justify-center items-center bg-green-800 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold'
                        onClick={() => showMore(product.id)}
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
                <h1 className='text-center text-2xl text-black font-light'>Información de producto</h1>
                <div className="flex justify-center mt-5 w-full w-lg">
                  <div className='w-full max-w-sm'>
                    <form
                      className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4'
                      onSubmit={() => setIsShowMore(false)}
                    >
                        <p> <b>Título:</b> {showMoreProduct.title}</p>
                        <p> <b>Categoría:</b> {showMoreProduct.category}</p>
                        <p> <b>Descripción:</b> {showMoreProduct.description}</p>
                        <p> <b>Precio:</b> {showMoreProduct.price}</p>
                        <p> <b>Calificación:</b> {showMoreProduct.rating.rate}</p>
                        <p> <b>Cantidad:</b> {showMoreProduct.rating.count}</p>

                        <p><img src={showMoreProduct.image}></img></p>
                      

                         
                      
                      <input
                        type='submit'
                        className='bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-900'
                        value="Aceptar"
                      />
                    </form>
                  </div>
                </div>
              </>
            
          
        )


      }
    </Layout>
  </div>);
}

export default Productos;

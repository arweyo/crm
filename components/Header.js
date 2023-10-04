import { useRouter } from 'next/router';

import React,{useEffect} from 'react';


const Header = () => {
    const router = useRouter();
   

    const cerrarSesion = () =>{
        localStorage.removeItem('token')
        router.push('/login')
    }

    useEffect(()=>{
        const token = localStorage.getItem('token')
        if(!token){
            router.push('/login')
        }           
      },[])

    

    return (
        <div className='flex justify-end'>
            {/* <h1 className='mr-2' >Hola Carlos</h1> */}
            <button className='bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md'
                    onClick={()=>cerrarSesion()}
                      type="button">Cerrar sesión</button>
        </div>
    );
}

export default Header;
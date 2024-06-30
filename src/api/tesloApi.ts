


import axios  from 'axios';
import { useAuthStore } from '../stores';

const tesloApi=axios.create({
      baseURL: 'http://localhost:3000/api'
     //baseURL: 'localhost:3000/api'

});

//Todo interceptors

tesloApi.interceptors.request.use(

    (config) => {

        //Nota
        //Como estamos fuera de React no lo usamos como un hook
        //sino como javascript, por eso utilizamos
        // (useAuthStore.getState.token)
        const token=useAuthStore.getState().token
        
        console.log("Dentro del tesloApi.ts")
        console.log(token)

        if (token) {
            config.headers['Authorization']=`Bearer ${token}`
        }
        return config
    }
)

//Leer el storage de Zustand


export {
    tesloApi
}
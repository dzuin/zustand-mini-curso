import { AxiosError } from "axios";
import { tesloApi } from "../api/tesloApi";

export interface LoginResponse {
    id:       string;
    email:    string;
    fullName: string;
    isActive: boolean;
    roles:    string[];
    token:    string;
}



export class Authservice{


    static login=async(email:string, password:string):Promise<LoginResponse>=>{
       

        try {

            //const resp= await tesloApi.post<LoginResponse>('/auth/login',{email,password})
            //console.log (resp.data)

            const {data}= await tesloApi.post<LoginResponse>('/auth/login',{
                email:email,
                password:password
            })

            
            return data

        } catch (error) {

           

            if (error instanceof AxiosError){

              

                console.log(error.response?.data)

                throw new Error(error.response?.data)
            }

            
            throw new Error ('Unable to login, no puede logerase')

        }
        
    }

}

/* export const Authservice={

    login:async(email:string, password:string):Promise<LoginResponse>=>{

        try {

            //const resp= await tesloApi.post<LoginResponse>('/auth/login',{email,password})
            //console.log (resp.data)
            const {data}= await tesloApi.post<LoginResponse>('/auth/login',{email,password})
            console.log (data)
            return data

        } catch (error) {
            if (error instanceof AxiosError){
                console.log(error.response?.data)
                throw new Error(error.response?.data)
            }
            
            console.log(error)
            throw new Error ('Unable to login, no puede logerase')

        }
        
    }

} */
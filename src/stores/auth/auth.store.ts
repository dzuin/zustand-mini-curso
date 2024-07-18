import { StateCreator, create } from "zustand";
import type { AuthStatus, User } from "../../interfaces";
import { Authservice} from "../../services/auth.service";
import { devtools, persist } from "zustand/middleware";
//import { tesloApi } from "../../api/tesloApi";



export interface AuthState {
    status: AuthStatus,
    token?: string,
    user?: User
    loginUser: (email: string, password: string) => Promise<void>
    checkAuthStatus: () => Promise<void>
    logoutUser: () => void

}
   
const storeApi: StateCreator<AuthState, [["zustand/devtools", never]]> = (set) => ({

    status: 'pending',
    token: undefined,
    user: undefined,

    loginUser: async (email: string, password: string) => {
        console.log('1-Trabajando en authStore')
        console.log(email, password)

        try {
            const { token, ...user } = await Authservice.login(email, password);

            set({ status: 'authorized', token: token, user: user })


        } catch (error) {

            set({ status: 'unauthorized', token: undefined, user: undefined })

            //Nota
            //aca el throw es capturado por el catch del que hace 
            //la consulta
            throw 'Unauthorized'

        }

    },


    checkAuthStatus: async () => {

        try {
            
           /* const {data}= await Authservice.checkStatus()
           return data */

           const { token, ...user } =await Authservice.checkStatus()
           set({ status: 'authorized', token: token, user: user })

        } catch (error) {

            set({ status: 'unauthorized', token: undefined, user: undefined })

            console.log('Dentro del auth.store.ts checkAuthStatus error--->  ')
            console.log(error)

           throw new Error('UnAuthorized')
        }
    },
    logoutUser: async ()=>{
        
        //Nota:
        //Cuando se define un campo:undefined,
        // el zustand borra el contenido del local Storage.
        set({ status: 'unauthorized', token: undefined, user: undefined })

        //set({ status: undefined, token: undefined, user: undefined })
        localStorage.removeItem('auth-storage');
    }
})


export const useAuthStore = create<AuthState>()(
    devtools(
        persist(
            storeApi,
            { name: 'auth-storage' }
        )

    )
) 
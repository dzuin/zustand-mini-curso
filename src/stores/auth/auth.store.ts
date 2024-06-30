import { StateCreator, create } from "zustand";
import type { AuthStatus, User } from "../../interfaces";
import { Authservice } from "../../services/auth.service";
import { devtools, persist } from "zustand/middleware";



export interface AuthState {
    status: AuthStatus,
    token?: string,
    user?: User
    loginUser: (email: string, password: string) => Promise<void>
    checkAuthStatus: () => Promise<void>

   }
   
    const storeApi: StateCreator<AuthState, [["zustand/devtools", never]]> = (set ) => ({

    status: 'pending',
    token: undefined,
    user: undefined,

    loginUser: async(email: string, password: string) => {
    console.log ('1-Trabajando en authStore')
    console.log (email, password)

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


    checkAuthStatus: async ()=> {

        try {
            const { token, ...user } = await Authservice.checkStatus()
            set({ status: 'authorized', token: token, user: user })

        } catch (error) {
            set({ status: 'unauthorized', token: undefined, user: undefined })
        }
     }

    })


    export const useAuthStore = create<AuthState>()(
    devtools(
        persist(
            storeApi,
            {name:'auth-storage'}
        )

    )
) 
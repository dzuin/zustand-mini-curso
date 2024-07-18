import { StateCreator, create } from "zustand";
//import { StateStorage,createJSONStorage,persist } from "zustand/middleware";
import {  persist } from "zustand/middleware";
//import { devtools} from "zustand/middleware";
import { customSessionStorage } from "../storages/session.storage";
//import { fireBaseStorage } from "../storages/firebase.storage";
//import { logger } from "../middleware/logger.middleware";


interface PersonState{
    firstName: string;
    lastName: string;
}
interface Actions{
    setFirstName:(value:string) => void;
    setLastName:(value:string) => void;
}


/* export const usePersonStore = create<PersonState & Actions>()(
    persist(
            (set) => ({

                firstName: "",
                lastName: "",
                setFirstName: (value: string) => set(state => ({ firstName: value })),
                setLastName: (value: string) => set(state => ({ lastName: value })),

            }),
            {name:'person-store'})

) */


  // Forma de unir dos interfaces
  //       
  // type PersonStore=PersonState & Actions;

  /* export const usePersonStore = create<PersonStore>()(
    persist(
            (set) => ({

                firstName: "",
                lastName: "",
                setFirstName: (value: string) => set(state => ({ firstName: value })),
                setLastName: (value: string) => set(state => ({ lastName: value })),

            }),
            {name:'person-store'})

) */ 


//Sin Usar redux devtools
// -------------        

/* const storeAPI:StateCreator<PersonState & Actions>=(set) => ({

    firstName: "",
    lastName: "",
    setFirstName: (value: string) => set(state => ({ firstName: value })),
    setLastName: (value: string) => set(state => ({ lastName: value })),

}) */


//Para Usar redux devtools
// -------------   
/* const storeAPI:StateCreator<PersonState & Actions, [["zustand/devtools", never]]>=(set) => ({

    firstName: "",
    lastName: "",
    setFirstName: (value: string) => set(state => ({ firstName: value }),false,'setFirstName'),
    setLastName: (value: string) => set(state => ({ lastName: value }),false,'setLasttName'),

}) */

//Si no se usa el state, se puede simplificar
//
/* const storeAPI:StateCreator<PersonState & Actions, [["zustand/devtools", never]]>=(set) => ({

    firstName: "",
    lastName: "",
    setFirstName: (value: string) => set(({ firstName: value }),false,'setFirstName'),
    setLastName: (value: string) => set(({ lastName: value }),false,'setLasttName'),

}) */


const storeAPI:StateCreator<PersonState & Actions, [["zustand/devtools", never]]>=(set) => ({

    firstName: "",
    lastName: "",
    setFirstName: (value: string) => set(({ firstName: value }),false,'setFirstName'),
    setLastName: (value: string) => set(({ lastName: value }),false,'setLasttName'),

})




//Middleware guarda el estado en localstorage
//----------------------------------------------------------------
/* export const usePersonStore = create<PersonState & Actions>()(
    persist(
            storeAPI,
            {name:'person-store'})

) */

//Middleware guarda el estado en session storage
//----------------------------------------------------------------
export const usePersonStore = create<PersonState & Actions>()(
        persist(
            storeAPI,
            {name:'person-store',
             //storage:createJSONStorage(()=>customSessionStorage)
             storage:customSessionStorage
             //storage:fireBaseStorage
            })
)

usePersonStore.subscribe((nextState,prevState) => {

    console.log({nextState,prevState})

    
})

//Middleware guarda el estado en FireBase
//----------------------------------------------------------------
/* export const usePersonStore = create<PersonState & Actions>()(

    devtools(//Para usar reduxDevTools
        persist(
            storeAPI,
            {name:'person-store',
             //storage:createJSONStorage(()=>customSessionStorage)
             //storage:customSessionStorage
             storage:fireBaseStorage
            })
    )

) */


//Middleware guarda el estado en FireBase
//----------------------------------------------------------------
/* export const usePersonStore = create<PersonState & Actions>()(

    logger(//Para usar middleware personalizado ver video y documentacion
        devtools(//Para usar reduxDevTools
            (persist(
                storeAPI,
                {
                    name: 'person-store',
                    //storage:createJSONStorage(()=>customSessionStorage)
                    //storage:customSessionStorage
                    storage: fireBaseStorage
                })
            )
        )
    )

) */
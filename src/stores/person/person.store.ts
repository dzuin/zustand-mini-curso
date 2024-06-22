import { StateCreator, create } from "zustand";
//import { StateStorage,createJSONStorage,persist } from "zustand/middleware";
import { persist } from "zustand/middleware";
//import { customSessionStorage } from "../storages/session.storage";
import { fireBaseStorage } from "../storages/firebase.storage";


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

const storeAPI:StateCreator<PersonState & Actions>=(set) => ({

    firstName: "",
    lastName: "",
    setFirstName: (value: string) => set(state => ({ firstName: value })),
    setLastName: (value: string) => set(state => ({ lastName: value })),

})


//Middleware guarda el estado en localstorage
//----------------------------------------------------------------
/* export const usePersonStore = create<PersonState & Actions>()(
    persist(
            storeAPI,
            {name:'person-store'})

) */


//Middleware guarda el estado en FireBase
//----------------------------------------------------------------
export const usePersonStore = create<PersonState & Actions>()(
    persist(
            storeAPI,
            {name:'person-store',
             //storage:createJSONStorage(()=>customSessionStorage)
             //storage:customSessionStorage
             storage:fireBaseStorage
            })

)
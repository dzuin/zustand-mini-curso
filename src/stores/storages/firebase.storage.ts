
import { StateStorage, createJSONStorage } from "zustand/middleware";


const firebaseUrl='https://dzuzustandv00-default-rtdb.firebaseio.com/zustand'
//Middleware guarda en el sessionStorage
//----------------------------------------------------------------            
const storageApi: StateStorage={

    getItem: async function (name: string): Promise<string | null> {
        //throw new Error("Function not implemented.");
        //console.log('getItem', name);
        /* const data=sessionStorage.getItem(name);
        return data */
        // eslint-disable-next-line no-useless-catch
        try {
            const data=await fetch(`${firebaseUrl}/${name}.json`)
            .then(res=>res.json())
            console.log("firebase.storage.getItem")
            console.log(data);
            return JSON.stringify(data)
        } catch (error) {
            throw error;
        }
    },

    setItem: async function (name: string, value: string): Promise<void> {
        //throw new Error("Function not implemented.");
        //console.log('setItem',{name,value})
        const data=await fetch(`${firebaseUrl}/${name}.json`,{
            method:'PUT',
            body:value
        })
        .then(res=>res.json())
        console.log("firebase.storage.setItem")
         console.log(data)
        //sessionStorage.setItem(name,value)
    },

    removeItem: function (name: string): void |  Promise<void> {
        //throw new Error("Function not implemented.");
        console.log('removeItem',{name})
    }
}
export const fireBaseStorage=createJSONStorage(()=>storageApi)
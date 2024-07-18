


//Creamos el store

import { create } from "zustand";
import { createPersonSlice, PersonSlice } from "./person.slice";
import { devtools, persist } from "zustand/middleware";
import { createDateSlice, DateSlice } from "./date.slice1";
import { createGuestSlice, GuestSlice } from "./guest.slice";
import { ConfirmationSlice, createConfirmationSlice } from "./confirmation.slice";

type ShareState=PersonSlice & DateSlice & GuestSlice & ConfirmationSlice

export const useWeddingBoundStore=create<ShareState>()(

    //(set,get,storeApi) =>({...createPersonSlice(...a)})
    persist( 
      devtools(
         (...a) =>({
                    ...createPersonSlice(...a),
                    ...createDateSlice(...a),
                    ...createGuestSlice(...a),
                    ...createConfirmationSlice(...a),
                  })
       ),
       { name: 'wedding-storage' }
    )
)
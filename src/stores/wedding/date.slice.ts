
import { StateCreator } from 'zustand';



export interface DateSlice {

  eventDate: Date; // number, string, primitivo

  dzuPrueba:string;

  eventYYYYMMDD: () => string;
  //eventDDMMYYYY: () => string;
  eventHHMM: () => string;
  
  setEventDate: (parcialDate: string) => void;
  setEventTime: (eventTime: string) => void;

}


export const createDateSlice: StateCreator<DateSlice> = (set, get) => ({

  eventDate: new Date(),
  dzuPrueba: 'Daniel Zuin',

  eventYYYYMMDD:() =>{
    const data:string=get().eventDate.toISOString().split('T')[0]
    //console.log(data)
    return data;

  },
  eventHHMM: () => {
    const hours = get().eventDate.getHours().toString().padStart(2, '0');  
    const minutes = get().eventDate.getMinutes().toString().padStart(2, '0');

    return `${ hours }:${ minutes }`;
  },


  setEventDate: (parcialDate: string) => set( (state) => {
    const date = new Date(parcialDate);

    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate() + 1;

    //console.log(`dia:${day} mes:${month} ano:${year}`)

    const newDate = new Date( state.eventDate );

    //const newDate = new Date( get().eventDate ); //si no se usa el set((state)=>....) al pricipio
    //set((state)=>({eventDate:newdate}))

    newDate.setFullYear(year, month, day);

    return { eventDate: newDate };

  }),

  setEventTime: (eventTime: string) => set( state => { //HH:MM

    const hours = parseInt(eventTime.split(':')[0]);
    const minutes = parseInt(eventTime.split(':')[1]);

    const newDate = new Date(state.eventDate);
    newDate.setHours( hours, minutes );

    return { eventDate: newDate }
  })

})
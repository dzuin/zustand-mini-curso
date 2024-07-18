
import { StateCreator } from 'zustand';



export interface DateSlice {

  //eventDate: Date;
  eventDay: string; // number, string, primitivo
  eventMonth:string;
  eventYear:string;
  eventHour:string;
  eventMinutes:string;

  //eventTime: string; //
  dzuPrueba:string;

  eventYYYYMMDD: () => string;
  //eventDDMMYYYY: () => string;
  eventHHMM: () => string;
  
  setEventDate: (parcialDate: string) => void;
  setEventTime: (eventTime: string) => void;

}


export const createDateSlice: StateCreator<DateSlice> = (set, get) => ({

  //eventDate: new Date(),
  
  eventDay: ((new Date()).toISOString().split('T')[0]).split('-')[2],
  eventMonth:((new Date()).toISOString().split('T')[0]).split('-')[1],
  eventYear:((new Date()).toISOString().split('T')[0]).split('-')[0],
  eventHour:(new Date()).getHours().toString(),
  eventMinutes:(new Date()).getMinutes().toString(),

  //eventTime: (new Date()).toISOString(),

  dzuPrueba: 'Daniel Zuin',

  eventYYYYMMDD:() =>{
    const data:string=`${get().eventYear}-${get().eventMonth}-${get().eventDay}`
    console.log(data)
    return data;

  },
  eventHHMM: () => {
    const data:string=`${get().eventHour}:${get().eventMinutes}`
    console.log(data)
    return data;
  },


  setEventDate: (parcialDate: string) => set( (state) => {
 
    console.log(`pacialDate:${parcialDate}`)

    //const date = new Date(parcialDate);

    const year = parcialDate.split('-')[0]
    const month = parcialDate.split('-')[1]
    const day = parcialDate.split('-')[2]

    //console.log(`dia:${day} mes:${month} ano:${year}`)

    //const newDate = new Date( state.eventDate );

    //const newDate = new Date( get().eventDate ); //si no se usa el set((state)=>....) al pricipio
    //set((state)=>({eventDate:newdate}))

    //newDate.setFullYear(year, month, day);

    return { eventYear:year, eventMonth:month, eventDay:day};

  }),

  setEventTime: (eventTime: string) => set( state => { //HH:MM

    console.log(`eventTime:${eventTime}`)

    const hours = eventTime.split(':')[0];
    const minutes = eventTime.split(':')[1];

    //const newDate = new Date(state.eventDate);
    //newDate.setHours( hours, minutes );

    return { eventHour: hours, eventMinutes:minutes}
  })

})
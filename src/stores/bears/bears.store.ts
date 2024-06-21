import { create } from 'zustand'

interface Bear {
  id:number;
  name:string;
}

interface BearState{
    blackBears:number;
    polarBears:number;  
    pandaBears:number;

    bears:Bear[];

    computed:{
      totalBears:number;
    }

    increaseBlackBears:(cant:number)=>void;
    increasePolarBears:(cant:number)=>void;
    increasePandaBears:(cant:number)=>void;

    doNothing:()=>void;
    addBears:()=>void;
    clearBears:()=>void;

}

export const useBearStore = create<BearState>()((set,get) => ({
  blackBears: 10,
  polarBears: 5,
  pandaBears:1,

  bears: [{
    id:1,
    name:'Oso #1'
  }],

 /*  computed:{
    totalBears: 10,
  }, */

  computed:{
    get totalBears():number{
      const total:number=get().blackBears+get().polarBears+get().pandaBears+get().bears.length
       return total;
    }
   
  },


  increaseBlackBears: (cant:number) => set((state) => ({blackBears: state.blackBears + cant })),
  increasePolarBears: (cant:number) => set((state) => ({polarBears: state.polarBears + cant })),
  increasePandaBears: (cant:number) => set((state) => ({pandaBears: state.pandaBears + cant })),

  doNothing:()=>set(state=>({bears:[...state.bears]})),

  addBears:()=>set(state=>({
    bears:[...state.bears,{id:state.bears.length+1,name:`Oso #${state.bears.length+1}`}]
  })),
  clearBears:()=>set({bears:[]})

 
}))
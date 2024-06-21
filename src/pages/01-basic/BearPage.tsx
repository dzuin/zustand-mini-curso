
import { useShallow } from 'zustand/react/shallow';
import { WhiteCard } from '../../components';

import { useBearStore } from '../../stores';

export const BearPage = () => {

  
  return (
    <>
      <h1>Contador de Osos</h1>
      <p>Manejo de estado simple de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">

         <BlackBears/>

         <PolarBears/>

         <PandaBears/>

         <BearsDisplay/>

      </div>

    </>
  );
};


export const BlackBears = () => {

  const blackBears=useBearStore(state=>state.blackBears)
  const increaseBlackBears=useBearStore(state=>state.increaseBlackBears)

  return (
    
      <WhiteCard centered>
        <h2>Osos Negros</h2>

        <div className="flex flex-col md:flex-row">
          <button onClick={() => increaseBlackBears(+1)}> +1</button>
          <span className="text-3xl mx-2 lg:mx-10"> {blackBears}</span>
          <button onClick={() => increaseBlackBears(-1)}>-1</button>
        </div>

      </WhiteCard>
    
  )
}

export const PolarBears = () => {

  const polarBears=useBearStore(state=>state.polarBears)
  const increasePolarBears=useBearStore(state=>state.increasePolarBears)

  return (
    
      <WhiteCard centered>
        <h2>Osos Polares</h2>

        <div className="flex flex-col md:flex-row">
          <button onClick={() => increasePolarBears(+1)}> +1</button>
          <span className="text-3xl mx-2 lg:mx-10"> {polarBears}</span>
          <button onClick={() => increasePolarBears(-1)}>-1</button>
        </div>

      </WhiteCard>
    
  )
}

export const PandaBears = () => {

  const pandaBears=useBearStore(state=>state.pandaBears)
  const increasePandaBears=useBearStore(state=>state.increasePandaBears)

  return (
    
      <WhiteCard centered>
        <h2>Osos Pandas</h2>

        <div className="flex flex-col md:flex-row">
          <button onClick={() => increasePandaBears(+1)}> +1</button>
          <span className="text-3xl mx-2 lg:mx-10"> {pandaBears}</span>
          <button onClick={() => increasePandaBears(-1)}>-1</button>
        </div>

      </WhiteCard>
    
  )
}

export const BearsDisplay = () => {

  const bears=useBearStore(useShallow(state=>state.bears));
  //const bears=useBearStore(state=>state.bears);
  const doNotthing=useBearStore(state=>state.doNothing)
  const addBears=useBearStore(state=>state.addBears)
  const clearBears=useBearStore(state=>state.clearBears)
  return (
    <WhiteCard>

     <h1>Osos</h1>
     <button onClick={doNotthing}> No Hace Nada</button>
     <button className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={addBears}> Agregar un Oso</button>
     <button className="mt-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={clearBears}> Borrar un Oso</button>

     <pre>
      {JSON.stringify(bears,null,2)}
     </pre>
    </WhiteCard>
  
  )
}

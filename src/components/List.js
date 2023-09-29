import React from 'react'
import { useState  } from 'react'
import ShowItems from './ShowItems'
export default function List({list,getTracks,addToCart}){
      const [vis,setVis]=useState(false);
      const set = ()=>{
        setVis(!vis);
      }
      return  (
          <div className='rounded-lg bg-white p-3 m-2 flex-row justify-between border-black border-2 text-black'>
          <div>{list.name}</div>
          <button><img className='w-3 ' src={'/images/down.png'} alt='hello' onClick={()=>{set();getTracks(list.id);}}/></button>
          <div className='text-center '>{vis && <ShowItems id={list.id} addToCart={addToCart}/>}</div>
          </div>
      )
}

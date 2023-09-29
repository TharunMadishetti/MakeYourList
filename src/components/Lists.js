import React from 'react'
import List from './List'
export default function Lists({lists,getTracks,tracks,addToCart}){
// export default function Lists({lists}){
    return (
        <div >
           {lists.map((list,index)=>{
           return  <List key={index} list={list} getTracks={getTracks} tracks={tracks.id===list.id?tracks.songs:{}} addToCart={addToCart}/>
        // return <p key={index}>{song.track.name}</p>
        })}
        </div>
    )
}
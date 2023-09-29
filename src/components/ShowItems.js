import React, { useContext } from 'react'
import {TracksContext} from '../App'
export default function ShowItems({id,addToCart}){
    const tracks = useContext(TracksContext);
    return ( 
               <div className=''>
              <div id="container" className='flex flex-wrap text-center justify-around'>
                 {tracks.id===id && tracks.songs.map((item,index)=>{
                     if(!item.track.name)
                     return <></>
                    return <div key={index} className='w-56 p-3 m-1  border-black border-2 rounded-md hover:text-white hover:bg-black flex-col justify-between hover:border-sky-300 hover:border-3 '  href={item.track.external_urls.spotify}>
                     {/* <div className='flex-auto'> */}
                       {item.track.album.images.length>0 && <center><img alt='track poster'  src={item.track.album.images[2].url}/></center>}
                     {/* </div> */}
                     <a href={item.track.external_urls.spotify} className='hover:underline' target='_blank' rel="noreferrer">{item.track.name.slice(0,50)}</a>
                     <div>
                        <span className='font-bold' >Artists : </span>   
                        {item.track.artists.length>1 &&  item.track.artists.slice(0,6).map((artist,index)=>{
                           return <span><a className='hover:underline' href={artist.external_urls.spotify} target='_blank' rel="noreferrer" key={index}>{artist.name}</a> ,</span>
                        })}
                        <a className='hover:underline' href={item.track.artists[0].external_urls.spotify} target='_blank' rel="noreferrer">{item.track.artists[0].name}</a>
                        <p><button className='rounded-lg bg-blue-700 font-bold px-2 m-1' onClick={()=>{addToCart(item.track);}}>+</button></p>
                     </div>
                     </div>
                })}
              </div>
              </div>
           )
}

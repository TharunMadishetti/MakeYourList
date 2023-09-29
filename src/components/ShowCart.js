import React from 'react'

export default function ShowCart({list,removeFromCart}){
    
    return ( 
               <div className=''>
              <div className='flex flex-wrap text-center justify-around'>
                 {list.map((item,index)=>{
                     if(!item.name)
                     return <></>
                    return <div key={index} className='w-56 p-3 m-1  border-black border-2 rounded-md hover:text-white hover:bg-black flex-col justify-between hover:border-sky-300 hover:border-3 '  href={item.external_urls.spotify}>
                     {/* <div className='flex-auto'> */}
                       {item.album.images.length>0 && <center><img alt='track poster'  src={item.album.images[2].url}/></center>}
                     {/* </div> */}
                     <a href={item.external_urls.spotify} className='hover:underline' target='_blank' rel="noreferrer">{item.name.slice(0,50)}</a>
                     <div>
                        <span className='font-bold' >Artists : </span>   
                        {item.artists.length>1 &&  item.artists.slice(0,6).map((artist,index)=>{
                           return <span><a className='hover:underline' href={artist.external_urls.spotify} target='_blank' rel="noreferrer" key={index}>{artist.name}</a> ,</span>
                        })}
                        <a className='hover:underline' href={item.artists[0].external_urls.spotify} target='_blank' rel="noreferrer">{item.artists[0].name}</a>
                        <p><button className='rounded-lg bg-blue-700 font-bold px-2 m-1' onClick={()=>{removeFromCart(item.id)}}>X</button></p>
                     </div>
                     </div>
                })}
              </div>
              </div>
           )
}

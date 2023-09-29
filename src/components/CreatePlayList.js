import axios from 'axios'
import React, {  useState } from 'react'
import { toast , ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ShowCart from './ShowCart';
export default function CreatePlayList({cart,token,removeFromCart,userId,setCart}){
    const [name,setName] = useState("")
    const [description,setDescription] = useState("");
    const [vis,setVis] = useState(false);
    const [link,setLink] = useState(null);
    // const [link,setLink] = useState("https://open.spotify.com/playlist/0p1PHn4NPTxDBEVQ9YzBzl");
    const toastOptions = {
        position: "bottom-right",
        autoClose: 2000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      };
    const addToMyLists = async () => {
        try
        {

            const { data } = await axios.post(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                    name,
                    description,
                    "public": vis
                }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if(!data.id)
            {
                toast.error(data.message,toastOptions);
                return;
            }
        const uris = cart.map((item)=>{
            return item.uri;
        })
        const playlist_id = data.id;
        let response = await axios.post(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,{
            "uris": uris,
            "position": 0
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        // if(response.snapshot_id)
       toast.success('playlist added successfully..',toastOptions);
       setLink(`https://open.spotify.com/playlist/${playlist_id}?si=${response.data.snapshot_id}`)
       setCart([]);
    // setTracks({"songs":data.items,"id":id})
        }
        catch(err)
        {
            toast.error(err.message,toastOptions);
        }
      }
    
      return (
        <div className='flex flex-col items-center justify-center'>
          <div className='flex items-center text-center justify-around'>
            <ShowCart list={cart} removeFromCart={removeFromCart} />
          </div>
          <br />
          <br />
          <div className='text-center text-3xl font-bold'>New Playlist Details</div>
          <br />
          <form className='flex flex-col items-center space-y-3'>
            <div>
              <input
                type="text"
                name="name"
                placeholder='Playlist Name'
                className='text-black w-72 rounded-md' // Adjusted width here
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                name="description"
                placeholder='Description'
                className='text-black w-72 rounded-md' // Adjusted width here
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className='flex flex-row justify-center text-center space-x-4'>
              <div className='font-semibold'>Visibility :</div>
              <div>
                <input
                  type="radio"
                  value="private"
                  name="visibility"
                  onChange={(e) => setVis(false)}
                />{' '}
                private
              </div>
              <div>
                <input
                  type="radio"
                  value="public"
                  name="visibility"
                  onChange={(e) => setVis(true)}
                />{' '}
                public
              </div>
            </div>
          </form>
          <button className='text-black bg-white p-2 m-2 font-semibold rounded-md'>
            {link ? (
              <button href={link} target="_blank" rel="noreferrer">
                View Playlist
              </button>
            ) : (
              <button className='' onClick={addToMyLists}>
                Add to PlayLists
              </button>
            )}
          </button>
          <ToastContainer />
        </div>
      );
}      
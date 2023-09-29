import './App.css'
import axios from 'axios';
import { useState ,useEffect , createContext } from 'react'
import Lists from './components/Lists'
import CreatePlayList from './components/CreatePlayList';
import  { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const TracksContext = createContext(null);
export default function App() {
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  const REDIRECT_URI =process.env.REACT_APP_REDIRECT_URI;
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"
  const toastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  // const SCOPE = "user-top-read"
  const SCOPE = "playlist-modify-private"
  const [lists,setLists] = useState([]);
  const [cart,setCart] = useState([]);
  const [token,setToken]=useState(null)
  const [user, setUser] = useState({})
  const [tracks,setTracks] = useState({});
  const [create,setCreate] = useState(false)
  const [view,setView] = useState(false)
  useEffect(()=>{
    
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")

        //Check if token is in local storage
        if (token) {
            setToken(token)
        }

        //Check if token is in hash
        if (hash) {
            token = hash.split("&")[0].split("=")[1]
            setToken(token)
            window.localStorage.setItem("token", token)
        }

        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
            window.location.hash = ""
            window.localStorage.setItem("token", token)   
        }

        setToken(token)
        
  },[])
  /* Remove login token */
  const logout = () => {
    window.localStorage.removeItem("token")
    setToken("")
  }
  //Get username from the spotify api
  const getUser = async () => {
    const { data } = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    setUser(data)
}
 //Make sure token is valid and set 
 const checkToken = async () => {
  const { data } = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
          Authorization: `Bearer ${token}`
      }
  })
  if (data.error) {
      logout()
  }
}

//Update user info every time the token changes
useEffect( () => {
  if(token)
      getUser()
})
const getLists= async () => {
  const { data } = await axios.get("https://api.spotify.com/v1/me/playlists?offset=0&limit=20", {
      headers: {
          Authorization: `Bearer ${token}`
      }
  })
  setLists(data.items)
}
const addToCart = (track)=>{
  setCart(p=>[...p,track]);
  toast.success('added to cart successfully',toastOptions);
}
const removeFromCart = (id)=>{
  const new_cart = cart.filter((track)=>track.id!==id);
  setCart(new_cart);
  toast.success('deleted successfully',toastOptions);
}
const getTracks = async (id) => {
  const { data } = await axios.get(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
      headers: {
          Authorization: `Bearer ${token}`
      }
  })
  setTracks({"songs":data.items,"id":id})
}

const renderLists = () => {
  if (lists.length > 0) {
      return <Lists lists={lists} getTracks={getTracks} tracks={tracks} addToCart={addToCart}/>
  }
}
  if(!token)
  return (
<div className='h-screen bg-black '>
  <header className=" w-screen rounded-3xl">
        <div className="flex justify-between">
          <h1 className="p-3 text-3xl hover:font-bold text-white bg-black">MakeYourList</h1>
        </div>
      </header>
    <div className=' bg-black text-white flex flex-col justify-center items-center'>
        <button className='text-black bg-white font-bold p-2 m-2'>
          <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}&show_dialog=true&redirect_uri=${REDIRECT_URI}`}>
            Login via Spotify
          </a>
        </button>
    </div>
    </div>
  );
  
  return (
    <div className={`bg-black text-white w-full min-h-screen`} >
      <header className={"w-screen  rounded-3xl"}>
          <div className="flex justify-between ">
            <h1 className="p-3  text-3xl hover:font-bold">MakeYourList</h1>
            <div className="flex flex-row-reverse">
            {!token &&  <button className='text-black bg-white font-bold p-2 m-2 '><a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}&show_dialog=true&redirect_uri=${REDIRECT_URI}`}>Login via Spotify</a></button>}
            {token && <div className='text-sm flex flex-col'>
          <>{user.display_name}</>
          <button className='text-black bg-white p-2 m-2 font-bold ' onClick={logout}>Logout</button></div>}  
            </div>
          </div>
      </header>
      <div className="flex justify-center items-center text-center text-black">
      {token && <button className='font-bold w-1/2 bg-white p-3 m-3  rounded-lg'onClick={(e)=>{setCreate(true);setView(false);checkToken();getLists();}}>Show playlists</button>}
      {token && <button className='font-bold w-1/2 bg-white p-3 m-3  rounded-lg' onClick={(e)=>{setCreate(false);setView(true);}}>Mytracks cart </button>}
      </div>
      {token ?
      <>
      {create===true &&  <TracksContext.Provider value={tracks} >
      <div className='text-center '>{renderLists()}</div>
      </TracksContext.Provider>}
      </>
      : <>
        </>
      }
     {token && view && <CreatePlayList cart={cart} token={token} userId={user.id} removeFromCart={removeFromCart} setCart={setCart}/>}
     <ToastContainer/>
    </div>
  )
}


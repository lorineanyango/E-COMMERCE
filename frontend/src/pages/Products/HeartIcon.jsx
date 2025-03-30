import { useEffect } from "react"
import {FaHeart, FaRegHeart} from "react-icons/fa"
import { useSelector, useDispatch } from "react-redux"
import { addToFavorites, removeFromFavorites, setFavorites } from "../../redux/features/favorites/favoriteSlice"
import { addFavoriteToLocalStorage, getFavoritesFromLocalStorage, removeFavotitesFromLocalStorage } from "../../Utils/localStorage"
const HeartIcon = ({product}) => {

  const dispatch = useDispatch();
  const favorites = useSelector((state)=> state.favorites)||[];
  const isfavorite =favorites.some((p)=>p._id === product._id);

  useEffect(()=>{
    const favoritesFromLocalStorage = getFavoritesFromLocalStorage();
    dispatch(setFavorites(favoritesFromLocalStorage));
  }, []);

  const toggleFavorites =()=>{
    if(isfavorite){
      dispatch(removeFromFavorites(product));
      removeFavotitesFromLocalStorage(product._id)
    } else{
      dispatch(addToFavorites(product));
      addFavoriteToLocalStorage(product);
    }
  }
  return (
    <div onClick={toggleFavorites} className="absolute top-2 right-5 cursor-pointer">
      {isfavorite ? (
        <FaHeart className="text-pink-500" />
      ) : (
        <FaRegHeart className="text-white" />
      )}
      
    </div>
  )
}

export default HeartIcon

//Add product from local storage
export const addFavoriteToLocalStorage =(product)=>{
  const favorites = getFavoritesFromLocalStorage()
  if(!favorites.some((p)=>p._id === product._id)){
    favorites.push(product);
    localStorage.setItem("favorites", JSON.stringify(favorites))
  }
}
//Remove products from the local storage
export const removeFavotitesFromLocalStorage =(productId)=>{
  const favorites = getFavoritesFromLocalStorage();
  const updateFavorites = favorites.filter(
    (product)=> product._id !== productId
  );
  localStorage.setItem("favorites", JSON.stringify(updateFavorites));
}
//Retrive fevorites from local store
export const getFavoritesFromLocalStorage =()=>{
  const favoritesJSON = localStorage.getItem("favorites");
  return favoritesJSON ? JSON.parse(favoritesJSON) : [];
}
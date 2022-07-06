export const fetchCoffeStores= async ()=>{
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: process.env.FOURSQUARE_API_KEY
    }
  };
  
  const response = await fetch('https://api.foursquare.com/v3/places/search?query=coffee&ll=-0.18189152123552024%2C-78.47887494296393&limit=6', options)
  const data = await response.json();
  return data;
}
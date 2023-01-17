import { createApi } from 'unsplash-js';

const getUnsplashPhoto = async () => {
    const unsplash = createApi({
        accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
      });

    const data = await unsplash.search.getPhotos({
        query: 'coffee shop',
        page: 1,
        perPage: 30,
        });
    
        const results = data.response.results;
    
        return results.map((result) =>  result.urls['small'] );
}



const geturlcoffestores = (latlong, query, limit) => {
    const url = `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latlong}&limit=${limit}`;
    return url;
}

export const fetchcoffeestores = async (latlong="-1.8741771937061749,30.136161117329607", limit=8) => {
    const photoUrls = await getUnsplashPhoto();
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_CLIENT_ID,
        }
      };
      
    //   const response  = await fetch('https://api.foursquare.com/v3/places/search?query=coffee&ll=-1.8741771937061749%2C30.136161117329607&limit=8', options)

    const response  = await fetch(geturlcoffestores(latlong, 'coffee', limit), options)
      const data = await response.json();
        // .catch(err => console.error(err));
        return data.results.map((result, index) => {
            return {
                id:result.fsq_id,
                ...result,
                imgUrl: photoUrls.length > index ? photoUrls[index] : null,
            }
        })
                ;
    }
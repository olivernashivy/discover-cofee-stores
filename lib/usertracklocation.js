import { useState, useContext } from "react";
import { ACTION_TYPES ,StoreContext} from "@/pages/_app";
const useTrackLocation = () => {
    const [locationErrorMsg, setLocationErrorMsg] = useState("");
    //const [latLong, setLatLong] = useState("");
    const [isFindingLocation, setIsFindingLocation ] = useState(false);
    const { dispatch } = useContext(StoreContext);
    const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    //setLatLong(`${latitude},${longitude}`);
    dispatch({
        type: ACTION_TYPES.SET_LAT_LONG,
        payload: {
            latLong: `${latitude},${longitude}`,
        },
    });
    setIsFindingLocation(false);
    setLocationErrorMsg("");
    
  };

  const error = () => {
    setIsFindingLocation(false);
    setLocationErrorMsg("Unable to retrieve your location");
  };

  const handleTrackLocation = () => {
   setIsFindingLocation(true);

    if (!navigator.geolocation) {
      setLocationErrorMsg("Geolocation is not supported by your browser");
      setIsFindingLocation(false);
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  return {
    //latLong,
    handleTrackLocation,
    locationErrorMsg,
    isFindingLocation
  };
};

export default useTrackLocation;
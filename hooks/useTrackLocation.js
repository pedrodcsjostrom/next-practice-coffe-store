import { useState } from "react";

export default function useTrackLocation() {
  const [locationErrorMsg, setLocationErrorMsg] = useState("");
  const [latLong, setLatLong] = useState("");
  const [status, setStatus] = useState(false);

  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    setLatLong(`${latitude},${longitude}`);
    setLocationErrorMsg("");
    setStatus(false);
  };
  const error = () => {
    setLocationErrorMsg("Unable to retrieve your location");
    setLatLong("");
    setStatus(false);
  };

  const handleTrackLocation = () => {
    if (!navigator.geolocation) {
      setLocationErrorMsg("Geolocation is not supported by your browser");
      setLatLong("");
      setStatus(false);
    } else {
      setStatus(true);
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  return { handleTrackLocation, latLong, locationErrorMsg, status };
}

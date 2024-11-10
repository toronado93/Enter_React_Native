import { useState, useEffect } from "react";
import * as Location from "expo-location";

const useCurrentLocation = (): [
  string | undefined,
  Location.LocationObject | undefined
] => {
  const [location, setLocation] = useState<
    Location.LocationObject | undefined
  >();
  const [errorMsg, setErrorMsg] = useState<string | undefined>();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  return [errorMsg, location];
};

export default useCurrentLocation;

import GoogleMap from "google-maps-react-markers";
import { useEffect, useRef, useState } from "react";
import Info from "./info";
import mapOptions from "./map-options.json";
import Marker from "./marker";

const coordinates = [
  [
    {
      lat: 45.4046987,
      lng: 12.2472504,
      name: "Venice",
    },
    {
      lat: 41.9102415,
      lng: 12.3959151,
      name: "Rome",
    },
    {
      lat: 45.4628328,
      lng: 9.1076927,
      name: "Milan",
    },
  ],
  [
    {
      lat: 40.8518,
      lng: 14.2681,
      name: "Naples",
    },
    {
      lat: 43.7696,
      lng: 11.2558,
      name: "Florence",
    },
    {
      lat: 37.5023,
      lng: 15.0873,
      name: "Catania",
    },
  ],
];

const ShopMap = () => {
  const mapRef = useRef(null);
  const [mapReady, setMapReady] = useState(false);
  const [mapBounds, setMapBounds] = useState({});
  const [usedCoordinates, setUsedCoordinates] = useState(0);
  const [currCoordinates, setCurrCoordinates] = useState(
    coordinates[usedCoordinates]
  );
  const [highlighted, setHighlighted] = useState(null);

  /**
   * @description This function is called when the map is ready
   * @param {Object} map - reference to the map instance
   * @param {Object} maps - reference to the maps library
   */
  // eslint-disable-next-line no-unused-vars
  const onGoogleApiLoaded = ({ map, maps }) => {
    mapRef.current = map;
    setMapReady(true);
  };

  // eslint-disable-next-line no-unused-vars
  const onMarkerClick = (e, { markerId, lat, lng }) => {
    console.log(lat);
    console.log(lng);
    setHighlighted(markerId);
  };

  const onMapChange = ({ bounds, zoom }) => {
    const ne = bounds.getNorthEast();
    const sw = bounds.getSouthWest();
    /**
     * useSupercluster accepts bounds in the form of [westLng, southLat, eastLng, northLat]
     * const { clusters, supercluster } = useSupercluster({
     *	points: points,
     *	bounds: mapBounds.bounds,
     *	zoom: mapBounds.zoom,
     * })
     */
    setMapBounds({
      ...mapBounds,
      bounds: [sw.lng(), sw.lat(), ne.lng(), ne.lat()],
      zoom,
    });
    setHighlighted(null);
  };

  const updateCoordinates = () => setUsedCoordinates(!usedCoordinates ? 1 : 0);

  useEffect(() => {
    setCurrCoordinates(coordinates[usedCoordinates]);
  }, [usedCoordinates]);

  return (
    <main>
      {mapReady && (
        <Info
          buttonAction={updateCoordinates}
          coordinates={currCoordinates}
          mapBounds={mapBounds}
        />
      )}
      <div className="map-container">
        <GoogleMap
          apiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}
          defaultCenter={{ lat: 13.758925, lng: 100.566297 }}
          defaultZoom={13}
          options={mapOptions}
          mapMinHeight="600px"
          onGoogleApiLoaded={onGoogleApiLoaded}
          onChange={onMapChange}
        >
          {currCoordinates.map(({ lat, lng, name }, index) => (
            <Marker
              key={index}
              lat={lat}
              lng={lng}
              markerId={name}
              onClick={onMarkerClick}
              className="marker"
              // draggable={true}
              // onDragStart={(e, { latLng }) => {}}
              // onDrag={(e, { latLng }) => {}}
              // onDragEnd={(e, { latLng }) => {}}
            />
          ))}
        </GoogleMap>
        {highlighted && (
          <div className="highlighted">
            {highlighted}{" "}
            <button type="button" onClick={() => setHighlighted(null)}>
              X
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default ShopMap;

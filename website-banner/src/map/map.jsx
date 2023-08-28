import GoogleMap from "google-maps-react-markers";
import { useRef, useState } from "react";
import Marker from "./marker";
import "./style.css";

const SimpleMap = ({ apiKey, positionMaker }) => {
  const position = positionMaker;
  const mapRef = useRef(null);

  const [mapBounds, setMapBounds] = useState({});

  const [highlighted, setHighlighted] = useState(null);

  /**
   * @description This function is called when the map is ready
   * @param {Object} map - reference to the map instance
   * @param {Object} maps - reference to the maps library
   */
  // eslint-disable-next-line no-unused-vars
  const onGoogleApiLoaded = ({ map, maps }) => {
    mapRef.current = map;
  };

  // eslint-disable-next-line no-unused-vars
  const onMarkerClick = (e, { markerId, lat, lng }) => {
    setHighlighted(markerId);
  };

  const onMapChange = ({ bounds, zoom }) => {
    const ne = bounds.getNorthEast();
    const sw = bounds.getSouthWest();

    setMapBounds({
      ...mapBounds,
      bounds: [sw.lng(), sw.lat(), ne.lng(), ne.lat()],
      zoom,
    });
    setHighlighted(null);
  };

  return (
    <main>
      <div className="map-container">
        <GoogleMap
          apiKey={apiKey}
          defaultCenter={{ lat: 13.769373, lng: 100.570752 }}
          defaultZoom={12}
          mapMinHeight="600px"
          onGoogleApiLoaded={onGoogleApiLoaded}
          onChange={onMapChange}
        >
          {position.map(({ lat, lng, name }, index) => (
            <Marker
              key={index}
              lat={Number(lat)}
              lng={Number(lng)}
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

SimpleMap.propTypes = {
  apiKey: "",
  positionMaker: [],
};

export default SimpleMap;

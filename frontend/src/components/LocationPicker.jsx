import React, { useState, useRef, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft, faLocationDot, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const defaultCenter = {
  lat: 28.6139,
  lng: 77.209,
};

const LocationPicker = () => {
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [selectedPosition, setSelectedPosition] = useState(defaultCenter);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const searchInputRef = useRef(null);
  const autocompleteRef = useRef(null);

  const navigate = useNavigate(); // Hook to navigate to another page

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places", "geometry"],
  });

  const geocodeLatLng = async (lat, lng) => {
    const geocoder = new window.google.maps.Geocoder();
    const response = await geocoder.geocode({ location: { lat, lng } });
    if (response.results[0]) {
      setAddress(response.results[0].formatted_address);
    }
  };

  const handleMapClick = (event) => {
    const { latLng } = event;
    const lat = latLng.lat();
    const lng = latLng.lng();
    setSelectedPosition({ lat, lng });
    geocodeLatLng(lat, lng);
  };

  const locateMe = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setMapCenter({ lat: latitude, lng: longitude });
          setSelectedPosition({ lat: latitude, lng: longitude });
          geocodeLatLng(latitude, longitude);
          setLoading(false);
        },
        () => {
          alert("Location access denied.");
          setLoading(false);
        }
      );
    } else {
      alert("Geolocation not supported by your browser.");
    }
  };

  useEffect(() => {
    if (isLoaded && searchInputRef.current) {
      autocompleteRef.current = new window.google.maps.places.Autocomplete(searchInputRef.current);
      autocompleteRef.current.addListener("place_changed", () => {
        const place = autocompleteRef.current.getPlace();
        if (place.geometry) {
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();
          setMapCenter({ lat, lng });
          setSelectedPosition({ lat, lng });
          setAddress(place.formatted_address || "");
        }
      });
    }
  }, [isLoaded]);

  const handleConfirmLocation = () => {
    // Navigate to AddressForm page and pass the selected location
    navigate("/address-form", { state: { location: address } });
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl border border-slate-200 overflow-hidden h-auto flex flex-col space-y-6">
        <div className="p-3 border-b border-slate-200 bg-slate-100">
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-slate-200 bg-slate-100 rounded-lg transition-all">
              <FontAwesomeIcon icon={faArrowAltCircleLeft} />
            </button>
            <h2 className="text-xl font-bold text-slate-800">Select Delivery Location</h2>
          </div>
        </div>

        <div className="px-6">
          <div className="bg-white rounded-xl shadow-lg border border-slate-200">
            <div className="p-4 border-b border-slate-200">
              <div className="relative flex items-center gap-2">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                <input
                  type="text"
                  ref={searchInputRef}
                  className="w-full bg-slate-100 pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  placeholder="Search for area, street name..."
                />
              </div>
            </div>
            <div className="p-2">
              <button
                className="w-full flex items-center px-4 py-3 hover:bg-slate-50 rounded-lg transition-all group bg-slate-100"
                onClick={locateMe}
                disabled={loading}
              >
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <FontAwesomeIcon icon={faLocationDot} />
                </div>
                <div className="flex-1">
                  <p className="text-slate-800 font-medium group-hover:text-blue-500 transition-colors">
                    {loading ? "Locating..." : "Use Current Location"}
                  </p>
                  <p className="text-sm text-slate-500">Using GPS</p>
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="px-6">
          <div className="h-[400px] bg-slate-100 rounded-lg overflow-hidden">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={mapCenter}
              zoom={14}
              onClick={handleMapClick}
            >
              <Marker
                position={selectedPosition}
                draggable={true}
                onDragEnd={(event) => handleMapClick({ latLng: event.latLng })}
              />
            </GoogleMap>
          </div>
        </div>

        <div className="px-6 pb-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Selected Location</h3>
            <p className="text-slate-600">{address}</p>
          </div>
          <button
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 px-6 rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
            onClick={handleConfirmLocation} // On click, navigate to AddressForm
          >
            Confirm Location
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationPicker;

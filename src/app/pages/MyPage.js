import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export const MyPage = () => {
  const initialData = [
    { id: "1", content: "Item 1", lat: -6.2088, lng: 106.8456, status: "Y" }, // Jakarta Pusat (Titik 1)
    { id: "2", content: "Item 2", lat: -6.2348, lng: 106.8886, status: "Y" }, // Jakarta Timur (Titik 2)
    { id: "3", content: "Item 3", lat: -6.2469, lng: 107.0065, status: "N" }, // Bekasi Timur (Titik 3)
    { id: "4", content: "Item 4", lat: -6.3084, lng: 107.235, status: "N" }, // Karawang (Titik 4)
  ];

  const [points, setPoints] = useState(initialData);
  const [map, setMap] = useState(null);
  const [maps, setMaps] = useState(null);

  useEffect(() => {
    if (map && maps) {
      drawRoute(map, maps);
    }
  }, [points, map, maps]);

  const drawRoute = (map, maps) => {
    // Hapus rute dan penanda lama
    map && map.setZoom(map.getZoom()); // Workaround untuk memicu re-rendering peta
    map && map.setCenter(map.getCenter()); // Workaround untuk memicu re-rendering peta

    

    const directionsService = new maps.DirectionsService();
    const directionsRenderer = new maps.DirectionsRenderer();

    directionsRenderer.setMap(map);

    const waypoints = points.map((point) => ({
      location: new maps.LatLng(point.lat, point.lng),
      stopover: true,
    }));

    const request = {
      origin: waypoints[0].location,
      destination: waypoints[waypoints.length - 1].location,
      waypoints: waypoints.slice(1, waypoints.length - 1),
      travelMode: "DRIVING",
    };

    directionsService.route(request, (result, status) => {
      if (status === "OK") {
        directionsRenderer.setDirections(result);
        points.forEach((point) => {
          let markerColor = "blue";
          if (point.status === "Y") {
            markerColor = "green";
          }
          new maps.Marker({
            position: new maps.LatLng(point.lat, point.lng),
            map: map,
            icon: {
              path: maps.SymbolPath.CIRCLE,
              fillColor: markerColor,
              fillOpacity: 1,
              strokeColor: "white",
              strokeWeight: 2,
              scale: 10,
            },
          });
        });
      } else {
        console.error("Error rendering directions:", status);
        alert(
          "Could not render directions due to an error. Please try again later."
        );
      }
    });
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(points);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setPoints(items);
  };

  var googleApiKey = "AIzaSyAY_-fsxsueCXvdae02WvTWc-FSILH_M2A"; // Ganti dengan kunci API Google Maps Anda

  return (
    <div>
      <div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {points.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          userSelect: "none",
                          padding: 16,
                          margin: "0 0 8px 0",
                          backgroundColor: "white",
                          ...provided.draggableProps.style,
                        }}
                      >
                        {item.content}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      <div style={{ height: "50vh", width: "50%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: googleApiKey }}
          defaultCenter={{ lat: -6.2088, lng: 106.8456 }}
          defaultZoom={12}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => {
            setMap(map);
            setMaps(maps);
          }}
        ></GoogleMapReact>
      </div>
    </div>
  );
};

import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import { useParams } from 'react-router-dom';

import Sidebar from '../components/Sidebar';
import mapIcon from '../utils/mapIcon';
import api from "../services/api";

import '../styles/pages/nursingHome.css';

interface NursingHomeOne {
  latitude: number;
  longitude: number;
  name: string;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: Array<{
    id: number;
    url: string;
  }>;
}

interface NursingHomeParams {
  id: string;
}

export default function NursingHome() {

  const params = useParams<NursingHomeParams>();
  const [nursingHomeOne, setNursingHomeOne] = useState<NursingHomeOne>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

    useEffect(() => {
        api.get(`nursingHome/${params.id}`).then(res => {
            setNursingHomeOne(res.data);
        })
    }, [params.id]);

    if(!nursingHomeOne) {
      return <p>Carregando...</p>;
    }

  return (
    <div id="page-nursingHome">

      <Sidebar/>

      <main>
        <div className="nursingHome-details">
          <img src={nursingHomeOne.images[activeImageIndex].url} alt={nursingHomeOne.name} />

          <div className="images">
            { nursingHomeOne.images.map((image, index) => {
              return (
                  <button 
                  key={image.id} 
                  className={activeImageIndex === index ? 'active' : ''} 
                  type="button"
                  onClick={() => {
                    setActiveImageIndex(index)
                  }}>
                  <img src={image.url} alt={nursingHomeOne.name} />
                </button>
              );
            })}
          </div>
          
          <div className="nursingHome-details-content">
            <h1>{nursingHomeOne.name}</h1>
            <p>{nursingHomeOne.about}</p>

            <div className="map-container">
              <Map 
                center={[nursingHomeOne.latitude, nursingHomeOne.longitude]} 
                zoom={16} 
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer 
                  url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker interactive={false} icon={mapIcon} position={[nursingHomeOne.latitude, nursingHomeOne.longitude]} />
              </Map>

              <footer>
              <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${nursingHomeOne.latitude},${nursingHomeOne.longitude}`}>Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{nursingHomeOne.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {nursingHomeOne.opening_hours}
              </div>
              { nursingHomeOne.open_on_weekends ? (
                <div className="open-on-weekends">
                <FiInfo size={32} color="#39CC83" />
                Atendemos <br />
                fim de semana
              </div>
              ) : (
                <div className="closed-on-weekends">
                <FiInfo size={32} color="#e43333" />
                Não atendemos <br />
                fim de semana
              </div>
              )}
            </div>

            <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

import React, { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup  } from 'react-leaflet';

import api from '../services/api';
import mapMarkerImg from '../images/logo.svg';
import mapIcon from '../utils/mapIcon';

import '../styles/pages/nursingHome-map.css';

interface NursingHome {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}

function NursingHomeMap() {

    const [nursingHome, setNursingHome] = useState<NursingHome[]>([]);

    useEffect(() => {
        api.get('nursingHome').then(res => {
            setNursingHome(res.data);
        })
    }, []);

    return(
       <div id="page-map">
           <aside>
               <header>
                   <img src={mapMarkerImg} alt="Happy"/>

                   <h2>Escolha um asilo no mapa</h2>
                   <p>Muitos idosos estão esperando a sua visita :)</p>
               </header>

               <footer>
                    <strong>Brasília</strong>
                    <span>Distrito Federal</span>
               </footer>
           </aside>

           <Map
            center={[-15.7972513,-47.9218246]} //latitude e longitude
            zoom={14} //zoom do mapa
            style={{ width:'100%', height:'100%' }} //duas chaves quer dizer objeto javascript
           >
               <TileLayer 
               url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />
               
               {/*<TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/>*/}

               {nursingHome.map(nursingHome => {
                   return(

                    <Marker
                    key={nursingHome.id}
                    icon={mapIcon}
                    position={[nursingHome.latitude,nursingHome.longitude]} 
                    >
                      <Popup 
                       closeButton={false}
                       minWidth={240}
                       maxWidth={240}
                       className="map-popup">
                        {nursingHome.name}
                        <Link to={`/nursingHome/${nursingHome.id}`}>
                            <FiArrowRight size="20" color="#fff" />
                        </Link>
                          
                      </Popup> 
    
                   </Marker>

                   )
               })}
               
           </Map>     

           <Link to="/nursingHome/create" className="create-nursingHome">
                <FiPlus size={32} color="#fff" />
           </Link>
            
       </div>
    )
}

export default NursingHomeMap;
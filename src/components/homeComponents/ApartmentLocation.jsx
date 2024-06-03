import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import { FaArrowCircleRight } from 'react-icons/fa';
const ApartmentLocation = () => {
    const position = [23.8187465, 90.4492048]
    return (

        <div className='my-10  px-4'>
            <div className='text-center space-y-2 my-6'>
                <h2 className="text-4xl font-bold text-center  text-green-500 "> Our apartment location</h2>
                <p>Our apartment location information</p>
            </div>
            <div className='shadow-lg rounded-lg' >
                <div className='flex flex-col lg:flex-row gap-6 justify-center items-center  '>
                    <div className='lg:w-1/3 space-y-4 flex flex-col justify-between gap-4 p-8 '>
                        <h2 className='text-center text-2xl font-bold  '>Location</h2>
                        <ul className='list-disc'>
                            <li className='flex items-center text-base gap-2'> <FaArrowCircleRight className='text-green-600' /> <span className='font-bold text-gray-500'>From Airport:</span>Only 5 min distance.</li>
                            <li className='flex items-center text-base gap-2'> <FaArrowCircleRight className='text-green-600' /> <span className='font-bold text-gray-500'>From Farmgate:</span> Only 15 min distance.</li>
                            <li className='flex items-center text-base gap-2'> <FaArrowCircleRight className='text-green-600' /> <span className='font-bold text-gray-500'>From Motijhil:</span> Only 20 min distance.</li>

                        </ul>
                    </div>
                    <div className='w-2/3 mx-auto'>
                        <div>
                            <h2 className='text-2xl text-center font-bold my-5 '>Location in map</h2>
                        </div>
                        <MapContainer center={position ? position : [23.8187465, 90.4492048]}
                            zoom={13}
                            scrollWheelZoom={true}
                            style={{ height: 500, width: "100%", zIndex: 94 }}
                            minZoom={4}
                            maxZoom={18}
                            preferCanvas>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={[23.8187465, 90.4492048]}>
                                <Popup>
                                    Maplewood Residences
                                </Popup>
                            </Marker>
                        </MapContainer>
                    </div>

                </div>
            </div>
        </div >



    );
};

export default ApartmentLocation;
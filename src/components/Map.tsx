import { useEffect, useRef } from 'react';
import { Box, useMediaQuery } from '@chakra-ui/react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { Map as LeafletMap } from 'leaflet';
import { useAppState } from '../app/StateContext';

const Map = () => {
    const ref = useRef<LeafletMap | null>(null);
    const [isMobile] = useMediaQuery('(max-width: 500px)');
    const { ipInfo } = useAppState();

    useEffect(() => {
        // Move the map view to the target coordinates
        if (ipInfo?.location && ref.current) {
            ref.current.flyTo({ lat: ipInfo.location.lat, lng: ipInfo.location.lng });
        }
    }, [ipInfo])

    useEffect(() => {
        if (!ref.current) {
            return
        }

        // Hide the map's zoom control in mobile view and display it in the normal view
        if (isMobile) {
            ref.current.removeControl(ref.current.zoomControl)
        } else {
            ref.current.addControl(ref.current.zoomControl)
        }
    }, [isMobile]);

    return (
        <Box>
            <MapContainer ref={ref} center={[51.505, -0.09]} zoom={13} attributionControl={false}
                          style={{ height: isMobile ? 'calc(100dvh - 320px)' : 'calc(100vh - 220px)' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {ipInfo?.location &&
                    <Marker position={[ipInfo.location.lat, ipInfo.location.lng]}>
                        <Popup keepInView>
                            <table className='location_popup_tb'>
                                <tbody>
                                <tr>
                                    <th>Country</th>
                                    <td>{ipInfo.location.country}, {ipInfo.location.region}</td>
                                </tr>
                                <tr>
                                    <th>City</th>
                                    <td>
                                        {ipInfo.location.city}{ipInfo.location.postalCode ?
                                        `, ${ipInfo.location.postalCode}` : ''}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Lat, Lon</th>
                                    <td>{ipInfo.location.lat}, {ipInfo.location.lng}</td>
                                </tr>
                                </tbody>
                            </table>
                        </Popup>
                    </Marker>}
            </MapContainer>
        </Box>
    )
}

export default Map

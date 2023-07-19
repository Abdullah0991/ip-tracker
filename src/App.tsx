import { useEffect } from 'react';
import Header from "./components/Header"
import Map from "./components/Map"
import { getIPInfo } from './app/api';
import { useAppState } from './app/StateContext';
import { useToast } from "@chakra-ui/react";

function App() {
    const { setIPInfo } = useAppState();
    const toast = useToast()

    // Request client's ip info at the start
    useEffect(() => {
        getIPInfo()
            .then((res) => {
                console.log(res);
                setIPInfo(res);
            })
            .catch((err) => {
                console.error(err)
                toast({
                    title: 'Error',
                    description: err.message || err.status,
                    status: 'error'
                })
            })
    }, [])

    return (
        <div style={{ position: 'relative' }}>
            <Header />
            <Map />
            <div className='attribution'>
                Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>.
                Coded by <a href="https://github.com/Abdullah0991" target="_blank">Abdullah AlEzzo</a>.
            </div>
        </div>
    )
}

export default App

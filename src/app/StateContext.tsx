import React, { createContext, useContext, useState, ReactNode } from "react";
import { IPLocationResponse } from "./api";

type AppStateContextProps = {
    ipInfo: IPLocationResponse | undefined
    setIPInfo: React.Dispatch<React.SetStateAction<IPLocationResponse | undefined>>
}

const StateContext = createContext<AppStateContextProps>({} as AppStateContextProps)

export const useAppState = () => {
    return useContext(StateContext);
}

const AppStateProvider = ({ children }: { children: ReactNode }) => {
    const [ipInfo, setIPInfo] = useState<IPLocationResponse>()
    return (
        <StateContext.Provider value={{ ipInfo, setIPInfo }}>
            {children}
        </StateContext.Provider>
    )
}

export default AppStateProvider;
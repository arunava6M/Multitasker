import { createContext, useState, useEffect } from 'react'

export const ViewportContext = createContext({})

export const ViewportProvider = ({ children }) => {
    const [width, setWidth] = useState(window.innerWidth)

    useEffect(()=>{
        const handleWindowResize = () => setWidth(window.innerWidth)
        window.addEventListener("resize", handleWindowResize)

        return ()=> window.removeEventListener("resize", handleWindowResize)
    },[])

    return (
        <ViewportContext.Provider value={{isSmallScreen: width < 640, isLargeScreen: width > 640}} >
            {children}
        </ViewportContext.Provider>
    )
}
import { createContext, ReactNode, useState } from "react";

interface backgroundImgContextProviderProps{
    children: ReactNode
}

export const BackgroundImgContext = createContext<null | any>(null)

// Create a context provider for a background image for the account content header
function BackgroundImgContextProvider({children} : backgroundImgContextProviderProps){
    const [profileBackgroundImg, setProfileBackgroundImg] = useState('');
    
    return (
        <BackgroundImgContext.Provider value ={{profileBackgroundImg,setProfileBackgroundImg}}>
            {children}
        </BackgroundImgContext.Provider>
    )

}

export default BackgroundImgContextProvider;
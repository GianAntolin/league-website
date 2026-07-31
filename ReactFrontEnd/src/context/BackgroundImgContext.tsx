import { createContext, ReactNode, useContext, useState } from "react";

interface backgroundImgContextProviderProps{
    children: ReactNode
}

type BackgroundImgContextType = {
    profileBackgroundImg: string, 
    setProfileBackgroundImg: React.Dispatch<React.SetStateAction<string>>
}



const BackgroundImgContext = createContext<BackgroundImgContextType | null>(null)

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

export function useBackGroundImg(){
    const context = useContext(BackgroundImgContext)
    if (!context) {
        throw new Error('Missing Provider')
    }

    return context

}
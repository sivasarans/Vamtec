import {useState ,createContext} from 'react';

export const Change = createContext();
const Page = ({ children }) => {
    
    const [show,setshow] = useState('Register');
    
    return (
        <Change.Provider value={{show,setshow}}>
            {children}
        </Change.Provider>
    );
}

export default Page;
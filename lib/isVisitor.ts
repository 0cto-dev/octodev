import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

export default function useIsVisitor() {
    const [isVisitor, setIsVisitor] = useState(false);
    let stateUpated = false;
    useEffect(() => {
        const isVisitor = Cookies.get('visitor') ? true : false;
        setIsVisitor(isVisitor);
    }, []);
    
    return isVisitor;
}
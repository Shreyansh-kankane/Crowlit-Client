
import {useState, useEffect} from 'react';

function getSavedValue(key: string, initialValue: any) {
    const savedValue = JSON.parse(localStorage.getItem(key) || 'null');
    if (savedValue) {
        return savedValue;
    }
    if (initialValue instanceof Function) {
        return initialValue();
    }
    return initialValue;
}

export default function useLocalStorage(key: string, initialValue: any) {
    const [value, setValue] = useState(() => {
        return getSavedValue(key, initialValue);
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    const removeValue = () => {
        localStorage.removeItem(key);
        setValue(null);
    };

    return [value, setValue, removeValue] as const;
}
import { useCallback, useState } from 'react';
import { editorDefaultText } from '../constants';

export default function useValueOnChange() {
    const [value, setValue] = useState<string>(editorDefaultText);

    const setOnChangeValue = useCallback((value: string | undefined) => {
        setValue(value || '');
    }, []);

    return { value, setOnChangeValue };
}

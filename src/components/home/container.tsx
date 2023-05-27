import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import Component from './component';
import PickWorkbookComponent from './pickWorkbookComponent';
import { IHomeContainerProps } from './types';

export default function HomeContainer(props: IHomeContainerProps) {
    const [workbookId, setWorkbookId] = useState('');
    let location = useLocation();

    useEffect(() => {
        const pathname = location.pathname;
        if (pathname !== '/design') {
            const _workbookId = pathname.split('/')[2];
            setWorkbookId(_workbookId);
        }
    }, [location]);

    return workbookId.length ? <Component /> : <PickWorkbookComponent />;
}

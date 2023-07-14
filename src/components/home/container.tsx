import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { HashLoader } from 'react-spinners';
import ButtonContainer from '../common/button/container';
import ErrorComponent from '../common/error/component';
import LoaderComponent from '../common/loader/component';
import Component from './component';
import { useGetWorkbookById } from './hooks/useGetWorkbookById';
import PickWorkbookComponent from './pickWorkbookComponent';
import { IHomeContainerProps } from './types';

export default function HomeContainer(props: IHomeContainerProps) {
    const { isError, isFetching, pathnameWorkbookId, setPathnameWorkbookId } =
        useGetWorkbookById();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const pathname = location.pathname;
        if (pathname !== '/design') {
            const _workbookId = pathname.split('/')[2];
            setPathnameWorkbookId(_workbookId);
        } else {
            setPathnameWorkbookId('');
        }
    }, [location]);

    return pathnameWorkbookId.length ? (
        isFetching ? (
            <LoaderComponent Component={HashLoader} speedMultiplier={0.4} />
        ) : isError ? (
            <div className="screen flex h-full w-full flex-col items-center justify-center space-y-8 bg-grey-darker text-grey-lighter">
                <ErrorComponent
                    message={
                        'The workbook does not exist or you may not be the author'
                    }
                />
                <ButtonContainer
                    label="Home"
                    onClick={() => navigate('/design')}
                    primary
                />
            </div>
        ) : (
            <Component />
        )
    ) : (
        <PickWorkbookComponent />
    );
}

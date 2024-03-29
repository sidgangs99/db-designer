import { useState } from 'react';
import useWorkbookStore from '../../../store/workbook/state';
import ButtonContainer from '../../common/button/container';
import ModalContainer from '../../common/modal/container';

interface IResetViewModal {
    open: boolean;
    setOpen: any;
}

export default function ResetViewModal(props: IResetViewModal) {
    const { open, setOpen } = props;
    const [deleteEnabled, setDeleteEnabled] = useState(false);

    const { onReset } = useWorkbookStore();

    return (
        <ModalContainer
            open={open}
            setOpen={setOpen}
            Header={
                <div className="flex whitespace-nowrap">
                    Are you sure you want to reset the view ?
                </div>
            }
            Body={
                <div className="flex space-x-2">
                    <input
                        type={'checkbox'}
                        checked={deleteEnabled}
                        onChange={() => setDeleteEnabled(!deleteEnabled)}
                    />
                    <p>I agree to reset the view</p>
                </div>
            }
            Footer={
                <div className="flex items-center justify-between space-x-4">
                    <ButtonContainer
                        label={'Cancel'}
                        onClick={() => setOpen(false)}
                    />
                    <ButtonContainer
                        label={'Reset'}
                        onClick={() => {
                            onReset();
                            setOpen(false);
                        }}
                        disabled={!deleteEnabled}
                    />
                </div>
            }
        />
    );
}

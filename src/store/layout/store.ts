import { create, StoreApi, UseBoundStore } from 'zustand';

interface IUseLayoutStore {
    openRightSideBar: boolean;
    nodeId: string;
    setOpenRightSideBar: Function;
}

export const useLayoutStore: UseBoundStore<StoreApi<IUseLayoutStore>> = create(
    (set) => ({
        openRightSideBar: false,
        nodeId: '',

        setOpenRightSideBar: (nodeId: string) =>
            set((_state) => {
                if (_state.nodeId === nodeId) {
                    return { ..._state, openRightSideBar: false, nodeId: '' };
                } else
                    return {
                        ..._state,
                        openRightSideBar: true,
                        nodeId
                    };
            })
    })
);

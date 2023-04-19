import { create, StoreApi, UseBoundStore } from 'zustand';

interface IUseLayoutStore {
    openRightSideBar: boolean;
    nodeId: string;
    previousNodeId: string;
    setOpenRightSideBar: Function;
}

export const useLayoutStore: UseBoundStore<StoreApi<IUseLayoutStore>> = create(
    (set) => ({
        openRightSideBar: false,
        nodeId: '',
        previousNodeId: '',

        setOpenRightSideBar: (nodeId: string, wasTableNode = false) =>
            set((_state) => {
                if (_state.nodeId === nodeId) {
                    if (_state.previousNodeId.length) {
                        return {
                            ..._state,
                            openRightSideBar: true,
                            nodeId: _state.previousNodeId,
                            previousNodeId: ''
                        };
                    } else
                        return {
                            ..._state,
                            openRightSideBar: false,
                            nodeId: '',
                            previousNodeId: ''
                        };
                } else {
                    return {
                        ..._state,
                        openRightSideBar: true,
                        nodeId,
                        previousNodeId: wasTableNode ? _state.nodeId : ''
                    };
                }
            })
    })
);

import {
    Connection,
    Edge,
    EdgeChange,
    NodeChange,
    OnConnect,
    OnEdgesChange,
    OnNodesChange,
    addEdge,
    applyEdgeChanges,
    applyNodeChanges
} from 'reactflow';
import { create } from 'zustand';

import { newColumnNode } from './constants';
import { INode, INodeData } from './types';

export type RFState = {
    nodes: INode[];
    edges: Edge[];
    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;
    updateNodeData: (data: INodeData, nodeId: string) => void;
    deleteNode: (nodeId: string, tableId: string) => void;
    deleteTable: (tableId: string) => void;
};

const useWorkbookStore = create<RFState>((set, get) => ({
    nodes: [],
    edges: [],
    onNodesChange: (changes: NodeChange[]) => {
        set({
            nodes: applyNodeChanges(changes, get().nodes)
        });
    },
    onEdgesChange: (changes: EdgeChange[]) => {
        set({
            edges: applyEdgeChanges(changes, get().edges)
        });
    },
    onConnect: (connection: Connection) => {
        set({
            edges: addEdge(connection, get().edges)
        });
    },

    updateNodeData: (data: INodeData, nodeId: string) => {
        set({
            nodes: get().nodes.map((node) => {
                if (node.id === nodeId) {
                    node.data = { ...node.data, ...data };
                } else if (
                    node.data.tableId === data.tableId &&
                    node.data.tableName !== data.tableName
                ) {
                    node.data = { ...node.data, tableName: data.tableName };
                }

                return node;
            })
        });
    },

    deleteNode: (nodeId: string, tableId: string) => {
        set({
            nodes: get()
                .nodes.filter((node: INode) => node.id !== nodeId)
                .map((node: INode, index: number) => {
                    if (tableId !== node.id && tableId === node.data.tableId) {
                        node.position.y = index * 50;
                    }
                    return node;
                })
        });
    },

    // const deleteEdgeFromNodes = (deletedNode: Set<string>) => {
    //     setEdges((_edges) => {
    //         return _edges.filter(
    //             (_edge) =>
    //                 !deletedNode.has(_edge.source) &&
    //                 !deletedNode.has(_edge.target)
    //         );
    //     });
    // };

    // const deleteEdgeFromEdgeId = (id: any) => {
    //     setEdges((_edges) => {
    //         return _edges.filter((_edge) => {
    //             return _edge.id !== id;
    //         });
    //     });
    // };

    deleteTable: (tableId: string) => {
        set({
            nodes: get().nodes.filter((node) => node.data.tableId !== tableId)
        });
    },

    updateNodeColor: (tableId: string) => {
        set({
            nodes: newColumnNode(get().nodes, tableId)
        });
    },

    addNewColumnNode: (tableId: string) => {
        set({
            nodes: newColumnNode(get().nodes, tableId)
        });
    },

    onReset: () => {
        set({
            nodes: [],
            edges: []
        });
    }
}));

export default useWorkbookStore;

import {
    Connection,
    Edge,
    EdgeChange,
    NodeChange,
    OnConnect,
    OnEdgesChange,
    OnNodesChange,
    XYPosition,
    addEdge,
    applyEdgeChanges,
    applyNodeChanges
} from 'reactflow';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { ECustomEdgeTypes } from '../../components/react-flow/types';
import {
    addNewTable,
    deleteEdgesForTable,
    deleteNodesAndUpdatePosition,
    isValidEdge,
    newColumnNode
} from './helper';
import { INode, INodeData } from './types';

export type IWorkbookStore = {
    nodes: INode[];
    setNodes: (nodes: INode[]) => void;
    edges: Edge[];
    setEdges: (edges: Edge[]) => void;
    workbookId: string;
    v: string;
    setVersion: (v: string) => void;
    openSaveWorkbook: boolean;
    setOpenSaveWorkbook: (openSaveWorkbook: boolean) => void;
    workbookSynced: boolean;
    setWorkbookSynced: (workbookSynced: boolean) => void;
    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;
    updateNodeData: (data: INodeData, nodeId: string) => void;
    deleteNode: (nodeId: string) => void;
    deleteTable: (tableId: string) => void;
    addNewColumnNode: (tableId: string) => void;
    dropNewTable: (position: XYPosition) => void;
    onReset: () => void;
};

const useWorkbookStore = create<IWorkbookStore>()(
    persist<IWorkbookStore>(
        (set, get) => ({
            nodes: [],
            edges: [],
            workbookId: '',
            v: '',
            openSaveWorkbook: false,
            workbookSynced: true,

            setWorkbookSynced: (workbookSynced: boolean) => {
                set({
                    workbookSynced
                });
            },

            setOpenSaveWorkbook: (openSaveWorkbook: boolean) => {
                set({
                    openSaveWorkbook
                });
            },

            setNodes: (nodes: INode[]) => {
                set({
                    nodes
                });
            },
            setEdges: (edges: Edge[]) => {
                set({
                    edges
                });
            },

            setVersion: (v: string) => {
                set({
                    v
                });
            },

            onNodesChange: (changes: NodeChange[]) => {
                set({
                    nodes: applyNodeChanges(changes, get().nodes)
                });
            },

            onEdgesChange: (changes: EdgeChange[]) => {
                set({
                    workbookSynced: false,
                    edges: applyEdgeChanges(changes, get().edges)
                });
            },

            onConnect: (connection: Connection) => {
                set({
                    workbookSynced: false,
                    edges: isValidEdge(connection, get().nodes)
                        ? addEdge(
                              {
                                  ...connection,
                                  type: ECustomEdgeTypes.ReferenceKey
                              },
                              get().edges
                          )
                        : get().edges
                });
            },

            updateNodeData: (data: INodeData, nodeId: string) => {
                set({
                    workbookSynced: false,
                    nodes: get().nodes.map((node) => {
                        if (node.id === nodeId) {
                            node.data = data;
                        } else if (
                            node.parentNode === data.tableId &&
                            node.data.tableName !== data.tableName
                        ) {
                            node.data.tableName = data.tableName;
                        }

                        return node;
                    })
                });
            },

            deleteNode: (nodeId: string) => {
                set({
                    workbookSynced: false,
                    nodes: deleteNodesAndUpdatePosition(nodeId, get().nodes),
                    edges: get().edges.filter(
                        (edge) =>
                            !(edge.source === nodeId || edge.target === nodeId)
                    )
                });
            },

            deleteTable: (tableId: string) => {
                set({
                    workbookSynced: false,
                    nodes: get().nodes.filter(
                        (node) => node.data.tableId !== tableId
                    ),
                    edges: deleteEdgesForTable(
                        get().edges,
                        get().nodes,
                        tableId
                    )
                });
            },

            addNewColumnNode: (tableId: string) => {
                set({
                    workbookSynced: false,
                    nodes: newColumnNode(get().nodes, tableId)
                });
            },

            dropNewTable: (position: XYPosition) => {
                set({
                    workbookSynced: false,
                    nodes: [...get().nodes, ...addNewTable(position)]
                });
            },

            onReset: () => {
                set({
                    workbookSynced: false,
                    nodes: [],
                    edges: []
                });
            }
        }),
        {
            name: 'workbook'
        }
    )
);

export default useWorkbookStore;

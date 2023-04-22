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

export type INodeStore = {
    nodes: INode[];
    edges: Edge[];
    workbookId: string;
    setNodes: (nodes: INode[]) => void;
    setEdges: (edges: Edge[]) => void;
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

const useWorkbookStore = create<INodeStore>()(
    persist(
        (set, get) => ({
            nodes: [],
            edges: [],
            workbookId: '',

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
                    nodes: deleteNodesAndUpdatePosition(nodeId, get().nodes),
                    edges: get().edges.filter(
                        (edge) =>
                            !(edge.source === nodeId || edge.target === nodeId)
                    )
                });
            },

            deleteTable: (tableId: string) => {
                set({
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
                    nodes: newColumnNode(get().nodes, tableId)
                });
            },

            dropNewTable: (position: XYPosition) => {
                set({
                    nodes: [...get().nodes, ...addNewTable(position)]
                });
            },

            onReset: () => {
                set({
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

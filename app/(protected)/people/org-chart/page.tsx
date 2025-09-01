// import OrgChart from "@dabeng/react-orgchart";
'use client';
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type NodeType = {
    id: string;
    parent: string | null;
    x: number;
    y: number;
    type?: "plus";
    mindmapname?: string;
    firstname?: string;
    lastname?: string;
};

type Connection = { from: string; to: string };

const tree = {
    name: "Henry Ford",
    title: "CEO & Founder",
    office: "Chicago Office",
    children: [
        {
            name: "Henry Ford",
            title: "Regional Sales Manager",
            office: "Chicago Office",
            children: [
                { name: "Henry Ford", title: "CEO & Founder", office: "Chicago Office" }
            ]
        },
        {
            name: "Henry Ford",
            title: "CEO & Founder",
            office: "Chicago Office",
            children: [
                { name: "Henry Ford", title: "CEO & Founder", office: "Chicago Office" },
                { name: "Henry Ford", title: "CEO & Founder", office: "Chicago Office" }
            ]
        },
        {
            name: "Henry Ford",
            title: "CEO & Founder",
            office: "Chicago Office"
        }
    ]


};
export default function OrgChartComponent() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const svgRef = useRef<SVGSVGElement | null>(null);

    const [nodes, setNodes] = useState<NodeType[]>([]);
    const [connections, setConnections] = useState<Connection[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [mindmapName, setMindmapName] = useState("");
    useEffect(() => {
        // Initial fetch - replace with API call
        async function fetchInit() {
            const data: NodeType[] = []; // await fetch("/api/getMindmap").then(r => r.json());
            if (data.length === 0) {
                addPlusButton();
            } else {
                buildMindmap(data);
            }
        }
        fetchInit();
    }, []);
    const addPlusButton = () => {
        const rootNode: NodeType = {
            id: "root",
            parent: null,
            x: 50,
            y: 300,
            type: "plus",
        };
        setNodes([rootNode]);
    };

    const buildMindmap = (data: NodeType[]) => {
        setNodes(data);
        const conns: Connection[] = data
            .filter((n) => n.parent)
            .map((n) => ({ from: n.parent as string, to: n.id }));
        setConnections(conns);
    };

    const createMindmap = () => {
        if (!mindmapName) return;
        const newNode: NodeType = {
            id: Date.now().toString(),
            parent: "root",
            x: 50,
            y: 300,
            mindmapname: mindmapName,
        };
        setNodes((prev) => [...prev.filter((n) => n.id !== "root"), newNode]);
        setModalOpen(false);
        setMindmapName("");
    };

    const addChild = (parentId: string) => {
        const parent = nodes.find((n) => n.id === parentId);
        if (!parent) return;

        const newNode: NodeType = {
            id: Date.now().toString(),
            parent: parentId,
            x: parent.x + 300,
            y: parent.y + 60,
            firstname: "Name",
            lastname: "Surname",
        };

        setNodes((prev) => [...prev, newNode]);
        setConnections((prev) => [...prev, { from: parentId, to: newNode.id }]);
    };

    const deleteNode = (id: string) => {
        const children = connections.filter((c) => c.from === id).map((c) => c.to);
        children.forEach(deleteNode);
        setNodes((prev) => prev.filter((n) => n.id !== id));
        setConnections((prev) => prev.filter((c) => c.from !== id && c.to !== id));
    };

    const onDrag = (e: React.DragEvent<HTMLDivElement>, node: NodeType) => {
        const newX = e.clientX - (containerRef.current?.offsetLeft ?? 0) - 50;
        const newY = e.clientY - (containerRef.current?.offsetTop ?? 0) - 20;
        setNodes((prev) =>
            prev.map((n) => (n.id === node.id ? { ...n, x: newX, y: newY } : n))
        );
    };
    return <div className="w-full h-full flex flex-col">

        <p className="text-[12px]/[20px] text-[#A5A5A5]">People <span className="text-[#0d978b]">/ Organization Chart</span></p>
        <p className="text-[24px]/[30px] font-semibold text-[#353535]">Org Chart</p>
        <div className="w-full flex-1 bg-[#f2f2f2] border border-[#e9e9e9] rounded-[8px] mt-[20px]">
            <div
                className="w-full h-full overflow-auto relative"
                ref={containerRef}
            >
                <svg ref={svgRef} className="absolute w-full h-full pointer-events-none">
                    {connections.map((conn, i) => {
                        const from = nodes.find((n) => n.id === conn.from);
                        const to = nodes.find((n) => n.id === conn.to);
                        if (!from || !to) return null;
                        const d = `M ${from.x + 50} ${from.y + 20} C ${from.x + 100} ${from.y}, ${to.x - 100
                            } ${to.y}, ${to.x} ${to.y + 20}`;
                        return <path key={i} d={d} stroke="#888" fill="none" strokeWidth="2" />;
                    })}
                </svg>

                {nodes.map((node) => (
                    <div
                        key={node.id}
                        className="absolute bg-white p-2 rounded-lg shadow flex items-center gap-2 cursor-grab"
                        style={{ left: node.x, top: node.y }}
                        draggable
                        onDragEnd={(e) => onDrag(e, node)}
                    >
                        {node.type === "plus" ? (
                            <button
                                className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                                onClick={() => setModalOpen(true)}
                            >
                                +
                            </button>
                        ) : (
                            <>
                                <img
                                    src={`https://i.pravatar.cc/40?img=${parseInt(node.id) % 50}`}
                                    alt="avatar"
                                    className="w-8 h-8 rounded-full"
                                />
                                <div className="name">
                                    {node.mindmapname || `${node.firstname} ${node.lastname}`}
                                </div>
                                {node.mindmapname ? (
                                    <button
                                        className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                                        onClick={() => addChild(node.id)}
                                    >
                                        +
                                    </button>
                                ) : (
                                    <button
                                        className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                                        onClick={() => deleteNode(node.id)}
                                    >
                                        ×
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                ))}

                {modalOpen &&
                    createPortal(
                        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                            <div className="bg-white p-6 rounded shadow relative">
                                <button
                                    className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
                                    onClick={() => setModalOpen(false)}
                                >
                                    ×
                                </button>
                                <h1 className="text-lg font-semibold">Give your map a name</h1>
                                <input
                                    type="text"
                                    value={mindmapName}
                                    onChange={(e) => setMindmapName(e.target.value)}
                                    placeholder="New Map"
                                    className="border w-60 p-2 mt-4 rounded"
                                />
                                <button
                                    disabled={!mindmapName}
                                    onClick={createMindmap}
                                    className={`mt-4 w-full h-10 rounded-full ${mindmapName ? "bg-green-600 text-white" : "bg-gray-200"
                                        }`}
                                >
                                    Save
                                </button>
                            </div>
                        </div>,
                        document.body
                    )}
            </div>
        </div>
    </div>;
}
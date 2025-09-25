// import OrgChart from "@dabeng/react-orgchart";
'use client';
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

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
    const router = useRouter();
    const [nodes, setNodes] = useState<NodeType[]>([]);
    const [connections, setConnections] = useState<Connection[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [mindmapName, setMindmapName] = useState("");
    const [selectedId, setSelectedId] = useState<string | null>(null);
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
            x: 600,
            y: 50,
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
            x: 600,
            y: 50,
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
            x: parent.x + 60,
            y: parent.y + 200,
            mindmapname: mindmapName,
        };

        setNodes((prev) => [...prev, newNode]);
        setConnections((prev) => [...prev, { from: parentId, to: newNode.id }]);
        setModalOpen(false);
        setMindmapName("");
        setSelectedId(null);
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

        <p className="text-[12px]/[20px] text-[#A5A5A5]"><span className="cursor-pointer " onClick={() => router.push('/people')}>People</span> <span className="text-[#0d978b]">/ Organization Chart</span></p>
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
                        const d = `M ${from.x + 124} ${from.y + 60} C ${from.x + 124} ${from.y + 150}, ${to.x + 150
                            } ${to.y - 100}, ${to.x + 150} ${to.y + 50}`;
                        return <path key={i} d={d} stroke="#888" fill="none" strokeWidth="2" />;
                    })}
                </svg>

                {nodes.map((node) => (
                    <div
                        key={node.id}
                        className="absolute bg-white p-2 rounded-lg shadow flex items-center gap-2 cursor-grab w-[248px] justify-center"
                        style={{ left: node.x, top: node.y }}
                        draggable
                        onDragEnd={(e) => onDrag(e, node)}
                    >
                        {node.type === "plus" ? (
                            <button
                                className="bg-green-500 text-white rounded-full  px-[10px]"
                                onClick={() => setModalOpen(true)}
                            >
                                +
                            </button>
                        ) : (
                            <>
                                <div className="flex items-center gap-2 justify-between w-full">
                                    <div className="flex items-center gap-2">
                                        <img
                                            src={`https://i.pravatar.cc/40?img=${parseInt(node.id) % 50}`}
                                            alt="avatar"
                                            className="w-[40px] h-[40px] rounded-full"
                                        />
                                        <div className="flex flex-col gap-1">
                                            <p className="text-[14px]/[22px] font-medium">{node.mindmapname || `${node.firstname} ${node.lastname}`}</p>
                                            <p className="text-[12px]/[18px] font-medium text-[#787878]">CEO & Founder</p>
                                            <p className="text-[12px]/[18px] font-medium text-[#787878]">Chicago Office</p>
                                        </div>
                                    </div>
                                    <button><MoreVertical className="size-[20px]" /></button>
                                </div>
                                <button
                                    className="cursor-pointer bg-green-500 text-white rounded-full flex w-[15px] h-[15px] items-center justify-center absolute right-[calc(50%-10px)] bottom-[-10px] "
                                    onClick={() => { setModalOpen(true); setSelectedId(node.id) }}
                                >
                                    +
                                </button>
                            </>
                        )}
                    </div>
                ))}

                {modalOpen &&
                    createPortal(
                        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                            <div className="bg-white p-6 rounded shadow relative flex flex-col gap-4">
                                <button
                                    className="absolute top-3 right-4 text-gray-500 hover:text-red-500"
                                    onClick={() => setModalOpen(false)}
                                >
                                    ×
                                </button>
                                <h1 className="text-lg font-semibold">Give a name</h1>
                                <input
                                    type="text"
                                    value={mindmapName}
                                    onChange={(e) => setMindmapName(e.target.value)}
                                    placeholder="New Map"
                                    className="border w-60 p-2 mt-4 rounded"
                                />
                                <Button
                                    disabled={!mindmapName}
                                    onClick={() => !selectedId ? createMindmap() : addChild(selectedId as string)}
                                >
                                    Save
                                </Button>
                            </div>
                        </div>,
                        document.body
                    )}
            </div>
        </div>
    </div >;
}
'use client'

import { useState } from "react";

export default function Interviews() {
    const colors = {
        'Screening': 'bg-[#e1e4e8]',
        'Portfolio Review': 'bg-[#F0E7F6]',
        'Cultural Fit': 'bg-[#FFDCE0]',
        'Coding Test': 'bg-[#D1E3F0]'
    }
    const [data, setData] = useState([
        {
            status: 'Screening',
            lists: [
                {
                    name: "John David",
                    type: "Stong Match",
                    amount: "86%"
                },
                {
                    name: "John David",
                    type: "Stong Match",
                    amount: "86%"
                }
            ]
        },
        {
            status: 'Portfolio Review',
            lists: [
                {
                    name: "John David",
                    type: "Stong Match",
                    amount: "86%"
                },
                {
                    name: "John David",
                    type: "Stong Match",
                    amount: "86%"
                },
                {
                    name: "John David",
                    type: "Stong Match",
                    amount: "86%"
                },
                {
                    name: "John David",
                    type: "Stong Match",
                    amount: "86%"
                },
                {
                    name: "John David",
                    type: "Stong Match",
                    amount: "86%"
                }
            ]
        },
        {
            status: 'Cultural Fit',
            lists: [
                {
                    name: "John David",
                    type: "Stong Match",
                    amount: "86%"
                },
                {
                    name: "John David",
                    type: "Stong Match",
                    amount: "86%"
                },
                {
                    name: "John David",
                    type: "Stong Match",
                    amount: "86%"
                }
            ]
        },
        {
            status: 'Coding Test',
            lists: [
                {
                    name: "John David",
                    type: "Stong Match",
                    amount: "86%"
                },
                {
                    name: "John David",
                    type: "Stong Match",
                    amount: "86%"
                }
            ]
        }
    ])
    return (
        <div className="flex gap-[8px] mt-[28px] ">
            {data.map((item, index) => (
                <>
                    <div>
                        <div className="w-[308px] p-[12px] flex flex-col gap-[12px] items-start bg-white rounded-[12px]" key={index}>
                            <span className={`text-[14px]/[100%] font-medium text-[#4d4d4d] py-[4px] px-[12px] rounded-[20px] ${colors[item.status]}`}>{item.status}</span>
                            {item.lists.map((list, i) => (
                                <>
                                    <div className="w-full border border-[#e9e9e9] rounded-[8px] p-[16px] gap-[8px] flex flex-col items-start" key={i}>
                                        <p className="text-[16px]/[100%] font-bold text-[#212121]">{list.name}</p>
                                        <div className="flex gap-[8px] py-[3.5px] px-[6.75px] text-[12px]/[16.5px] text-white bg-[#0d978b] rounded-[3px]">
                                            <span className="pr-[3.75px] border-r border-[#ffffff88]">{list.amount}</span>
                                            <span className="pr-[3.75px]">{list.type}</span>
                                        </div>
                                    </div>
                                </>
                            ))}
                        </div></div>
                </>
            ))}
        </div>
    );
}
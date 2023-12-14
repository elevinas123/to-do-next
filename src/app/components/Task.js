"use client"
import React, { useMemo, useState } from 'react';
import { CiCircleCheck } from "react-icons/ci";


export default function Task(){

    const [finished, setFinished] = useState(false)

    return(
        <div className="ml-5 mt-5">
            <div className="font-bold"> Task Title</div>
            <div className='flex flex-row mt-2'>
                <div className="flex flex-row border h-12 bg-orange-100 p-1 rounded-full pl-2 pr-2 ">Go walk the dog</div>
                <button className='ml-2 justify-center '><CiCircleCheck onClick={() => setFinished(i => !i)} size={"2em"} color={finished?"green":"red"} /></button>

            </div>
            <div className='flex flex-row mt-2'>
                <div className="flex flex-row border h-12 bg-orange-100 p-1 rounded-full pl-2 pr-2 ">Go walk the dog</div>
                <button className='ml-2 justify-center '><CiCircleCheck onClick={() => setFinished(i => !i)} size={"2em"} color={finished?"green":"red"} /></button>

            </div>
            <div className='flex flex-row mt-2'>
                <div className="flex flex-row border h-12 bg-orange-100 p-1 rounded-full pl-2 pr-2 ">Go walk the dog</div>
                <button className='ml-2 justify-center '><CiCircleCheck onClick={() => setFinished(i => !i)} size={"2em"} color={finished?"green":"red"} /></button>

            </div>
            <div className='flex flex-row mt-2'>
                <div className="flex flex-row border h-12 bg-orange-100 p-1 rounded-full pl-2 pr-2 ">Go walk the dog</div>
                <button className='ml-2 justify-center '><CiCircleCheck onClick={() => setFinished(i => !i)} size={"2em"} color={finished?"green":"red"} /></button>

            </div>
            
        </div>
    )
}

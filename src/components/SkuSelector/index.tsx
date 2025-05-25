"use client"
import React, { useState } from 'react'
import { SlBasket } from "react-icons/sl";
import type { Product, Dimension } from "@/types/product";


type SkuSelectorProps = Pick<Product, "dimensions" | "dimensionsMap">;

type DimensionsMap = Record<string, string[]>;

function groupDimensions(
  dimensions: Dimension[],
  dimensionsMap: DimensionsMap
) {
  return dimensions.map((dim) => ({
    ...dim,
    options: dimensionsMap[dim.slug] || []
  }));
}

function SkuSelector({ dimensions, dimensionsMap } : SkuSelectorProps) {

    const [qty, setQty] = useState<number>(1);

    const increase = () => {
        setQty(qty + 1);
    }

    const decrease = () => {
        if (qty == 1) return;
        setQty(qty + 1);
    }

    const skuSelectorData = groupDimensions(dimensions, dimensionsMap);

    return (
        <div className="flex-row mt-8 w-full">
                <div className="grid grid-cols-2 w-full my-8 gap-8">
                    {skuSelectorData.map((dimension) => (
                        <div key={dimension.slug} className="flex flex-col">
                            <span className="text-sm font-bold text-white mb-4">{dimension.title}</span>
                            <ul id={dimension.slug} className="flex flex-row gap-2">  
                                {dimension.options.map((option) => (
                                    <li key={option}>
                                        <input id={option} type="radio" value={option} name={dimension.slug} className="hidden peer"/>
                                        <label htmlFor={option} className="w-full rounded-lg py-2 px-4 text-base border border-neutral-800 cursor-pointer peer-checked:bg-neutral-400">{option}</label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="flex">
                    <div className="quantity-container w-full bg-neutral-800 rounded-lg h-14 mb-4 flex items-center justify-between px-6 lg:px-3 font-bold sm:mr-3 lg:mr-5 lg:w-1/3">
                        <button  onClick={decrease} className="transition-all text-white text-2xl leading-none font-bold mb-1 lg:text-3xl hover:opacity-60 cursor-pointer">-</button>
                        <input min={0} max={100} className="quantity focus:outline-none text-dark-blue bg-neutral-800 font-bold flex text-center w-full" type="number" name="quantity" value={qty} aria-label="quantidade" disabled/>
                        <button onClick={increase} className="transition-all text-white text-2xl leading-none font-bold mb-1 lg:text-3xl hover:opacity-60 cursor-pointer">+</button>
                    </div>

                    <button  className="transition-all w-full h-14 bg-primary rounded-lg lg:rounded-xl mb-2 shadow-primary/50 shadow-2xl text-white flex items-center justify-center lg:w-3/5 hover:shadow-primary/80 hover:opacity-90 cursor-pointer">
                        <i className='cursor-pointer text-white text-xl leading-0 pr-3'>
                            <SlBasket/>
                        </i>
                        adicionar ao carrinho
                    </button>
                </div>
        </div>
    )
}

export default SkuSelector

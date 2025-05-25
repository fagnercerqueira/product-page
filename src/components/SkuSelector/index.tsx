"use client";
import React, { useEffect, useState } from 'react';
import { SlBasket } from "react-icons/sl";
import type { ProductType, DimensionType } from "@/types/product";
import Cookies from 'js-cookie';

type SkuSelectorProps = Pick<ProductType, "dimensions" | "dimensionsMap">;

type DimensionsMapType = Record<string, string[]>;

interface ChangeVariationsData {
  dimension: string;
  option: string;
}

interface VariationType {
  dimension: string;
  option: string;
}

function groupDimensions(dimensions: DimensionType[], dimensionsMap: DimensionsMapType) {
  return dimensions.map((dim) => ({
    ...dim,
    options: dimensionsMap[dim.slug] || []
  }));
}

function SkuSelector({ dimensions, dimensionsMap }: SkuSelectorProps) {
  const [selectedVariations, setSelectedVariations] = useState<VariationType[]>([]);
  const [qty, setQty] = useState<number>(1);

  useEffect(() => {
    const cookieData = Cookies.get('variations');
    if (cookieData) {
      try {
        const parsed = JSON.parse(cookieData);
        setSelectedVariations(parsed);
      } catch (e) {
        console.warn("Erro ao ler variações do cookie:", e);
      }
    }
  }, []);

  const isSelected = ({ dimension, option }: VariationType) => {
    return selectedVariations.some(v => v.dimension === dimension && v.option === option);
  };

  const increase = () => setQty((prev) => prev + 1);
  
  const decrease = () => setQty((prev) => (prev > 1 ? prev - 1 : 1));

  const changeVariations = (data: ChangeVariationsData) => {
    setSelectedVariations(prev => {
      const filtered = prev.filter(v => v.dimension !== data.dimension);
      const updated = [...filtered, data];
      Cookies.set('variations', JSON.stringify(updated));
      return updated;
    });
  };

  const skuSelectorData = groupDimensions(dimensions, dimensionsMap);

  return (
    <div className="flex-row mt-8 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full my-8 gap-8">
        {skuSelectorData.map((dimension) => (
          <div key={dimension.slug} className="flex flex-col">
            <span className="text-sm font-bold text-white mb-4">{dimension.title}</span>
            <ul id={dimension.slug} className="flex flex-row gap-2">
              {dimension.options.map((option) => (
                <li key={option}>
                  <input
                    id={`${dimension.slug}-${option}`}
                    type="radio"
                    value={option}
                    name={dimension.slug}
                    className="hidden peer"
                    onChange={() => changeVariations({ dimension: dimension.slug, option })}
                    checked={isSelected({ dimension: dimension.slug, option })}
                  />
                  <label
                    htmlFor={`${dimension.slug}-${option}`}
                    className="w-full rounded-lg py-2 px-4 text-base border border-neutral-800 cursor-pointer peer-checked:bg-neutral-400"
                  >
                    {option}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="quantity-container w-full bg-neutral-800 rounded-lg h-14 flex items-center justify-between px-6 lg:px-3 font-bold lg:w-1/3">
          <button onClick={decrease} className="transition-all text-white text-2xl leading-none font-bold mb-1 lg:text-3xl hover:opacity-60 cursor-pointer">-</button>
          <input
            min={1}
            max={100}
            className="quantity focus:outline-none text-dark-blue bg-neutral-800 font-bold flex text-center w-full"
            type="number"
            name="quantity"
            value={qty}
            aria-label="quantidade"
            disabled
          />
          <button onClick={increase} className="transition-all text-white text-2xl leading-none font-bold mb-1 lg:text-3xl hover:opacity-60 cursor-pointer">+</button>
        </div>

        <button className="transition-all w-full h-14 bg-primary rounded-lg lg:rounded-xl shadow-primary/50 shadow-2xl text-white flex items-center justify-center lg:w-2/3 hover:shadow-primary/80 hover:opacity-90 cursor-pointer">
          <i className="cursor-pointer text-white text-xl leading-0 pr-3">
            <SlBasket />
          </i>
          adicionar ao carrinho
        </button>
      </div>
    </div>
  );
}

export default SkuSelector;
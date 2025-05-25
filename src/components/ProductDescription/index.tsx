import type { ProductType } from "@/types/product";
import SkuSelector from "@/components/SkuSelector";
import ShippingForm from "@/components/ShippingForm";
import { moneyFormatter } from "@/utils/formatter";

export default function ProductDescription(product: ProductType) {

    const { brand, name, description, price, bestPrice, dimensions, dimensionsMap } = product;

    return (
        <>
            <h2 className="uppercase text-orange font-bold text-sm sm:text-md tracking-wider pb-3 sm:pb-5">
                {brand}
            </h2>
            <h1 className="capitalize text-very-dark-blue font-bold text-3xl sm:text-4xl sm:leading-none pb-3">
                {name}
            </h1>
            <p className="text-dark-grayish-blue pb-6 lg:py-7 lg:leading-6">
                {description}
            </p>
            <div className="font-bold flex items-center justify-between lg:flex-col lg:items-start mb-6">
                {
                    bestPrice ? (
                        <>
                            <span className="text-3xl sm:text-4xl text-very-dark-blue">
                                {moneyFormatter.format(bestPrice)}
                            </span>
                            <span className="text-sm text-dark-grayish-blue line-through">
                                {moneyFormatter.format(price)}
                            </span>
                        </>
                    ) : (
                        <span className="text-3xl sm:text-4xl text-very-dark-blue">
                            {moneyFormatter.format(price)}
                        </span>
                    )
                }
            </div>
            <SkuSelector dimensions={dimensions} dimensionsMap={dimensionsMap} />
            <ShippingForm />
        </>
    )
}

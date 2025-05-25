"use client"

type ProductGalleryThumbProps = {
    onClick: () => void;
    selected: boolean;
    children: React.ReactNode;
};

export default function ProductGalleryThumb({onClick, selected, children }: ProductGalleryThumbProps) {
  return (
    <div
      className="flex-[0_0_25%]"
    >
      <button
        onClick={onClick}
        type="button"
        className={"rounded-2xl overflow-hidden cursor-pointer".concat(
         selected ? ' border-2 border-primary' : ''
      )}
      >
        {children}
      </button>
    </div>
  )
}

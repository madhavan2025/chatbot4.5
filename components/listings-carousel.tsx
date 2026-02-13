"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../app/context/CartContext";

type Listing = {
  id: string;
  title: string;
  price: string;
  image: string;
  description: string;
};

type ListingsCarouselProps = {
  products: Listing[];
  style: "type1" | "type2";
};

export function ListingsCarousel({
  products,
  style,
}: ListingsCarouselProps) {
  const [index, setIndex] = useState(0);
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});
  const [justAdded, setJustAdded] = useState<Record<string, boolean>>({});

  const visibleCount = style === "type1" ? 1 : 2;
  const total = products.length;

  const router = useRouter();
  const { addToCart } = useCart();

  const next = () => setIndex((i) => (i + visibleCount) % total);
  const prev = () => setIndex((i) => (i - visibleCount + total) % total);

  const visibleListings = Array.from({ length: visibleCount }, (_, i) =>
    products[(index + i) % total]
  );

  const handleClick = (listing: Listing) => {
    router.push(`/product/${listing.id}`);
  };

  useEffect(() => {
    setIndex(0);
  }, [style]);

  const handleAddToCart = (listing: Listing) => {
    addToCart(listing);

    setJustAdded((prev) => ({
      ...prev,
      [listing.id]: true,
    }));

    setTimeout(() => {
      setJustAdded((prev) => ({
        ...prev,
        [listing.id]: false,
      }));

      setAddedItems((prev) => ({
        ...prev,
        [listing.id]: true,
      }));
    }, 3000);
  };

  if (!products || products.length === 0) {
    return <div>No products available</div>;
  }

  const renderType1 = () => (
    <div className="grid grid-cols-1 gap-4">
      {visibleListings.map((listing) => (
        <div key={listing.id} className="border rounded-lg p-4">
          <div className="relative group">
          <img
            src={listing.image}
            alt={listing.title}
            className="w-full h-64 object-cover rounded-md cursor-pointer"
            onClick={() => handleClick(listing)}
          />

           <button
    onClick={prev}
    className="absolute left-3 top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition"
    aria-label="Previous"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8 text-white drop-shadow-lg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={3}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  </button>

  {/* Next */}
  <button
    onClick={next}
    className="absolute right-3 top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition"
    aria-label="Next"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8 text-white drop-shadow-lg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={3}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  </button>
</div>
          <h4 className="mt-2 font-semibold">{listing.title}</h4>
          <p>{listing.price}</p>
          <p className="text-sm line-clamp-3">{listing.description}</p>

          {justAdded[listing.id] ? (
            <button
              disabled
              className="mt-2 w-full bg-green-600 text-white py-2 rounded-md"
            >
              Added ✓
            </button>
          ) : addedItems[listing.id] ? (
            <button
              onClick={() => router.push("/cart")}
              className="mt-2 w-full text-xs underline"
            >
              View cart
            </button>
          ) : (
            <button
              onClick={() => handleAddToCart(listing)}
              className="mt-2 w-full bg-black text-white py-2 rounded-md"
            >
              Add to cart
            </button>
          )}
        </div>
      ))}
    </div>
  );

  const renderType2 = () => (
     <div className="relative group">
       <button
    onClick={prev}
    className="absolute left-2 top-20 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition"
    aria-label="Previous"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8 text-white drop-shadow-lg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={3}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  </button>

  {/* Next */}
  <button
    onClick={next}
    className="absolute right-2 top-20 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition"
    aria-label="Next"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8 text-white drop-shadow-lg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={3}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  </button>
    <div className="grid grid-cols-2  gap-4">
      {visibleListings.map((listing) => (
       <div key={listing.id} className="border-2  rounded-lg hover:shadow-xl transition">
          <img
            src={listing.image}
            alt={listing.title}
            className="w-full h-48 object-cover"
            onClick={() => handleClick(listing)}
          />
            <div className="p-4 flex flex-col gap-2">
          <h4 className="text-sm font-semibold line-clamp-2 min-h-[40px]">
            {listing.title}
          </h4>

          {/* Price row aligned equal */}
          <p className="text-base font-bold text-gray-800 min-h-[24px]">
            {listing.price}
          </p>

          <p className="text-sm text-gray-600 line-clamp-3 flex-1">
            {listing.description}
          </p>
          </div>
                   {justAdded[listing.id] ? (
            <button
              disabled
              className="mt-2 w-full bg-green-600 text-white py-2 rounded-md cursor-not-allowed"
            >
              Added ✓
            </button>
          ) : addedItems[listing.id] ? (
            <button
              onClick={() => router.push("/cart")}
              className="mt-2 w-full text-xs underline text-black hover:text-gray-700"
            >
              View cart
            </button>
          ) : (
            <button
              onClick={() => handleAddToCart(listing)}
              className="mt-2 w-full bg-black text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Add to cart
            </button>
          )}

        </div>
      ))}
    </div>
    </div>
  );

  return (
    <div className="w-full max-w-4xl p-4 bg-white rounded-xl border">
      <h3 className="mb-3 text-sm font-semibold text-gray-500">
        Featured Listings
      </h3>

     
  {style === "type1" ? renderType1() : renderType2()}


 


    </div>
  );
}

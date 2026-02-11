"use client";

import {  useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from"../app/context/CartContext";


type Listing = {
  id: string;
  title: string;
  price: string;
  image: string;
  description: string;
};

const DEMO_LISTINGS: Listing[] = [
  {
    id: "1",
    title: "Modern Apartment",
    price: "$1,200 / mo",
    image: "https://picsum.photos/400/300?1",
    description: "A bright modern apartment with city views, close to public transport and cafes.",
  },
  {
    id: "2",
    title: "Cozy Studio",
    price: "$850 / mo",
    image: "https://picsum.photos/400/300?2",
    description: "Perfect for singles. Compact, comfortable, and located in a quiet neighborhood.",
  },
  {
    id: "3",
    title: "Luxury Condo",
    price: "$2,400 / mo",
    image: "https://picsum.photos/400/300?3",
    description: "Premium condo with high-end finishes, gym access, and private parking.",
  },
];


export function ListingsCarousel() {
  const [index, setIndex] = useState(0);
 const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});
const [justAdded, setJustAdded] = useState<Record<string, boolean>>({});

  const total = DEMO_LISTINGS.length;
  const router = useRouter();
  const { addToCart } = useCart();




 
const next = () => {
  setIndex((i) => (i + 2) % total);
};

const prev = () => {
  setIndex((i) => (i - 2 + total) % total);
};

const visibleListings = [
  DEMO_LISTINGS[index],
  DEMO_LISTINGS[(index + 1) % total],
];


 


  const handleClick = (listing: Listing) => {
  router.push(`/product/${listing.id}`);
};




const handleAddToCart = (listing: Listing) => {
  addToCart(listing);

  // show "Added"
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




  return (
    <div className="w-full max-w-4xl rounded-xl border bg-background p-4">
      <h3 className="mb-3 text-sm font-semibold text-muted-foreground">
        Featured Listings
      </h3>
      <div className="relative overflow-hidden rounded-lg group ">
         <button
  onClick={prev}
  className="absolute left-2 top-16 -translate-y-1/2 z-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
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

<button
  onClick={next}
  className="absolute right-2 top-16 -translate-y-1/2 z-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
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
  <div className="grid grid-cols-2 gap-2">
    {visibleListings.map((listing) => (
        <div
      key={listing.id}
      className="rounded-lg border p-3 cursor-pointer hover:shadow-sm transition"
   
    >
        <div className="relative group">

          <img
    src={listing.image}
    alt={listing.title}
    className="h-full w-full rounded-md object-cover cursor-pointer"
    onClick={() => handleClick(listing)}
  />
         

  
    </div>

        <div className="mt-2">
        <p className="font-medium">{listing.title}</p>
        <p className="text-sm text-muted-foreground">
          {listing.price}
        </p>
        <p className="mt-1 text-sm text-gray-600 line-clamp-3">
          {listing.description}
        </p>
      </div>
       {justAdded[listing.id] ? (
        <button
          disabled
          className="mt-2 w-full rounded-md bg-green-600 px-3 py-2 text-xs font-semibold text-white cursor-not-allowed"
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
          className="mt-2 w-full rounded-md bg-black px-3 py-2 text-xs font-semibold text-white hover:bg-gray-800 transition"
        >
          Add to cart
        </button>
      )}
      </div>
    ))}
  </div>

   

</div>




      
    </div>
  );
}

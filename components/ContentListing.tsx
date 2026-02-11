"use client";

import { useRouter } from "next/navigation";

type ContentItem = {
  id: string;
  title: string;
  description: string;
};

const CONTENT: ContentItem[] = [
  {
    id: "1",
    title: "Modern Apartment",
    description:
      "Bright apartment with city views. Close to transport and cafes.",
  },
  {
    id: "2",
    title: "Cozy Studio",
    description:
      "Compact studio ideal for singles in a quiet neighborhood.",
  },
  {
    id: "3",
    title: "Luxury Condo",
    description:
      "High-end finishes, gym access, and private parking included.",
  },
  {
    id: "4",
    title: "Family Home",
    description:
      "Spacious 3-bedroom home near schools and parks.",
  },
  {
    id: "5",
    title: "Beachside Villa",
    description:
      "Sea-facing villa with private balcony and premium amenities.",
  },
];

export function ContentListing() {
  const router = useRouter();

  return (
    <div className="rounded-xl border bg-background p-4 space-y-3">
      <h3 className="text-sm font-semibold text-muted-foreground">
        Recommended for you
      </h3>

      {CONTENT.slice(0, 5).map((item) => (
        <div
          key={item.id}
          className="border-b last:border-none pb-3 last:pb-0"
        >
          <p className="font-medium">{item.title}</p>
          <p className="text-sm text-gray-600 line-clamp-2">
            {item.description}
          </p>

          <button
            onClick={() => router.push(`/product/${item.id}`)}
            className="mt-1 text-xs font-semibold text-blue-600 hover:underline"
          >
            View more →
          </button>
        </div>
      ))}
    </div>
  );
}

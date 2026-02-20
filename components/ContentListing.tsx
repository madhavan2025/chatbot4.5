"use client";

import { useRouter } from "next/navigation";

type ContentItem = {
  id: string;
  title: string;
  description: string;
};

type ContentListingProps = {
  items: ContentItem[];
  count: number;
};

export function ContentListing({ items, count }: ContentListingProps) {
  const router = useRouter();

  return (
    <div className="rounded-xl border  p-4 space-y-3">
      <h3 className="text-sm font-semibold text-muted-foreground">
        Recommended for you
      </h3>

      {items.slice(0, count).map((item) => (
        <div
          key={item.id}
          className="border-b last:border-none pb-3 last:pb-0"
        >
          <p className="font-medium">{item.title}</p>
          <p className="text-sm text-gray-600 line-clamp-2">
            {item.description}
          </p>

          <button
            type="button"
            onClick={() => router.push(`/product/${item.id}`)}
            className="mt-1 text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
          >
            View more →
          </button>
        </div>
      ))}

      {items.length === 0 && (
        <p className="text-sm text-gray-500">No content available.</p>
      )}
    </div>
  );
}

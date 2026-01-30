// lib/isEmbed.ts
export const isEmbedMode = () => {
  if (typeof window === "undefined") return false;
  return new URLSearchParams(window.location.search).has("embed");
};

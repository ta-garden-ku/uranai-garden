import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Uranai Garden",
    short_name: "Uranai",
    description: "毎日楽しめる占い・診断・夢占い辞典",
    start_url: "/today",
    scope: "/",
    display: "standalone",
    background_color: "#fff8f2",
    theme_color: "#4b235f",
    icons: [
      {
        src: "/icons/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable"
      }
    ]
  };
}

import { siteConfig } from "@/lib/site-config";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

export async function createFaviconImage(size: number) {
  const sourcePath = siteConfig.favicon.source.replace(/^\//, "");
  const buffer = await readFile(path.join(process.cwd(), "public", sourcePath));
  const base64 = buffer.toString("base64");
  const padding = Math.round(size * 0.12);
  const imageSize = size - padding * 2;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: siteConfig.favicon.backgroundColor,
        }}
      >
        <img
          src={`data:image/png;base64,${base64}`}
          width={imageSize}
          height={imageSize}
          alt=""
        />
      </div>
    ),
    { width: size, height: size },
  );
}

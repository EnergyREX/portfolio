import { ImageResponse } from "next/og";
import { SITE_AUTHOR } from "@/constants/SITE";

export const alt = `${SITE_AUTHOR}, desarrollador y arquitecto de software`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Los colores son los del tema oscuro de globals.css: aquí no llegan sus variables.
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: 80,
        background: "#080807",
        color: "#ededed",
      }}
    >
      <div style={{ width: 96, height: 12, marginBottom: 40, background: "#FF3400" }} />
      <div style={{ fontSize: 88, fontWeight: 700, lineHeight: 1.05 }}>Francisco Javier</div>
      <div style={{ fontSize: 88, fontWeight: 700, lineHeight: 1.05 }}>Martín Fernández</div>
      <div style={{ marginTop: 32, fontSize: 40, color: "#a8a29a" }}>
        Desarrollador y arquitecto de software
      </div>
    </div>,
    size,
  );
}

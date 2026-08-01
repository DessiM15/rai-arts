import { ImageResponse } from "next/og";
import { DANCER_PATH } from "@/lib/brand";
import { SITE } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${SITE.name} — Career readiness for dancers`;

/**
 * Social card. Built from the vector dancer rather than a flat export, so it
 * stays crisp and always matches the mark on the site.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#f7f0e6",
          position: "relative",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* copy */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "72px",
            width: "660px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              fontSize: 20,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#9c7518",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                background: "#efb93b",
              }}
            />
            Career readiness for dancers
          </div>

          <div
            style={{
              fontSize: 68,
              lineHeight: 1.06,
              color: "#2e4425",
              marginTop: 28,
              fontWeight: 700,
            }}
          >
            Preparing dancers for the business of a dance career.
          </div>

          <div
            style={{
              fontSize: 26,
              color: "#5c6b54",
              marginTop: 28,
              fontFamily: "system-ui, sans-serif",
            }}
          >
            Rai Arts — Your Art. Your Business.
          </div>
        </div>

        {/* stage */}
        <div
          style={{
            display: "flex",
            width: "540px",
            background: "#2e4425",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -90,
              right: -90,
              width: 260,
              height: 260,
              borderRadius: 130,
              background: "#efb93b",
            }}
          />
          <svg width="360" height="360" viewBox="0 0 1000 1000" fill="none">
            <path
              d={DANCER_PATH}
              stroke="#f7f0e6"
              strokeWidth={9}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    ),
    size,
  );
}

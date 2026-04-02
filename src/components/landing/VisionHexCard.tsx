"use client";

import { useId } from "react";
import type { CSSProperties } from "react";

/** Flat-top regular hex: عرض 100، ارتفاع √3/2×100 (لا نستخدم مربعًا 100×100 لأنه يشوّه الشكل). */
const VB_W = 100;
const VB_H = 86.60254037844386;
const MID = VB_H / 2;
const Q = VB_H / 4;
const POINTS_FLAT = `25,0 75,0 100,${MID} 75,${VB_H} 25,${VB_H} 0,${MID}`;
/** Pointy-top hex in same box: vertices top & bottom (lg+ / 1024px). */
const POINTS_POINTY = `50,0 100,${Q} 100,${VB_H - Q} 50,${VB_H} 0,${VB_H - Q} 0,${Q}`;

const INNER = `translate(${VB_W / 2},${MID}) scale(0.965) translate(${-VB_W / 2},${-MID})`;

type Props = {
  title: string;
  body: string;
};

/** Vision card: flat-top below 1024px, pointy-top from 1024px (Tailwind lg). */
export function VisionHexCard({ title, body }: Props) {
  const uid = useId().replace(/:/g, "");
  const clipFlat = `vision-hex-flat-${uid}`;
  const clipPointy = `vision-hex-pointy-${uid}`;

  const wrapStyle = {
    "--vision-hex-clip-sm": `url(#${clipFlat})`,
    "--vision-hex-clip-lg": `url(#${clipPointy})`,
  } as CSSProperties;

  return (
    <article className="hive-vision-hex-card  flex w-full flex-col lg:h-full lg:min-h-0">
      <div className="hive-vision-hex-card__wrap relative w-full " style={wrapStyle}>
        <svg
          className="hive-vision-hex-svg"
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          preserveAspectRatio="xMidYMid meet"
          aria-hidden
        >
          <defs>
            <clipPath id={clipFlat} clipPathUnits="objectBoundingBox">
              <polygon points="0.25,0 0.75,0 1,0.5 0.75,1 0.25,1 0,0.5" />
            </clipPath>
            <clipPath id={clipPointy} clipPathUnits="objectBoundingBox">
              <polygon points="0.5,0 1,0.25 1,0.75 0.5,1 0,0.75 0,0.25" />
            </clipPath>
          </defs>

          <g className="lg:hidden">
            <polygon className="hive-vision-hex-svg__border" points={POINTS_FLAT} />
            <g transform={INNER}>
              <polygon className="hive-vision-hex-svg__face" points={POINTS_FLAT} />
            </g>
          </g>

          <g className="hidden lg:block">
            <polygon className="hive-vision-hex-svg__border" points={POINTS_POINTY} />
            <g transform={INNER}>
              <polygon className="hive-vision-hex-svg__face" points={POINTS_POINTY} />
            </g>
          </g>
        </svg>
        <div className="hive-vision-hex-card__content absolute inset-0 z-10">
          <h3 className="hive-vision-hex-card__title mb-2! relative">{title}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-[100%] mt-1 h-[3px] bg-gradient-to-r from-transparent via-hive-gold/35 to-transparent" />

          </h3>
          
          <p className="hive-vision-hex-card__body text-hive-off-white/88 light:text-neutral-700">{body}</p>
        </div>
      </div>
    </article>
  );
}

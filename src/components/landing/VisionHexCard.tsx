"use client";

import { useId } from "react";
import type { CSSProperties } from "react";

const SQRT3 = Math.sqrt(3);

/** مسطح الرأس: عرض 100، ارتفاع 100·√3/2، ضلع = 50 */
const FLAT_W = 100;
const FLAT_H = (FLAT_W * SQRT3) / 2;
const FLAT_MID = FLAT_H / 2;
const POINTS_FLAT = `25,0 75,0 100,${FLAT_MID} 75,${FLAT_H} 25,${FLAT_H} 0,${FLAT_MID}`;

/** حاد الرأس: نفس طول الضلع S = 50 → عرض S√3، ارتفاع 2S */
const S = FLAT_W / 2;
const POINTY_W = S * SQRT3;
const POINTY_H = 2 * S;
const MID_PY = POINTY_W / 2;
const POINTS_POINTY = `${MID_PY},0 ${POINTY_W},${S / 2} ${POINTY_W},${(3 * S) / 2} ${MID_PY},${POINTY_H} 0,${(3 * S) / 2} 0,${S / 2}`;

const INNER_FLAT = `translate(${FLAT_W / 2},${FLAT_MID}) scale(0.995) translate(${-FLAT_W / 2},${-FLAT_MID})`;
const INNER_POINTY = `translate(${MID_PY},${POINTY_H / 2}) scale(0.995) translate(${-MID_PY},${-POINTY_H / 2})`;

type Props = {
  title: string;
  body: string;
};

/** بطاقة الرؤية: سداسي منتظم مسطح الرأس تحت lg، وسداسي منتظم حاد الرأس من lg */
export function VisionHexCard({ title, body }: Props) {
  const uid = useId().replace(/:/g, "");
  const clipFlat = `vision-hex-flat-${uid}`;
  const clipPointy = `vision-hex-pointy-${uid}`;
  const shadowFilter = `vision-hex-shadow-${uid}`;

  const wrapStyle = {
    "--vision-hex-clip-sm": `url(#${clipFlat})`,
    "--vision-hex-clip-lg": `url(#${clipPointy})`,
  } as CSSProperties;

  return (
    <article className="hive-vision-hex-card  flex w-full flex-col lg:h-full lg:min-h-0">
      <div className="hive-vision-hex-card__wrap relative w-full " style={wrapStyle}>
        <svg className="hive-vision-hex-svg" aria-hidden overflow="visible">
          <defs>
            <clipPath id={clipFlat} clipPathUnits="objectBoundingBox">
              <polygon points="0.25,0 0.75,0 1,0.5 0.75,1 0.25,1 0,0.5" />
            </clipPath>
            <clipPath id={clipPointy} clipPathUnits="objectBoundingBox">
              <polygon points="0.5,0 1,0.25 1,0.75 0.5,1 0,0.75 0,0.25" />
            </clipPath>
            <filter
              id={shadowFilter}
              x="-60%"
              y="-60%"
              width="220%"
              height="220%"
              colorInterpolationFilters="sRGB"
            >
              <feDropShadow
                in="SourceAlpha"
                dx="0"
                dy="2"
                stdDeviation="1.6"
                floodColor="#bda957"
                floodOpacity="0.22"
                result="s1"
              />
              <feDropShadow
                in="SourceAlpha"
                dx="0"
                dy="5"
                stdDeviation="3.5"
                floodColor="#bda957"
                floodOpacity="0.12"
                result="s2"
              />
              <feMerge>
                <feMergeNode in="s2" />
                <feMergeNode in="s1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <g className="lg:hidden" filter={`url(#${shadowFilter})`}>
            <svg
              viewBox={`0 0 ${FLAT_W} ${FLAT_H}`}
              width="100%"
              height="100%"
              preserveAspectRatio="xMidYMid meet"
            >
              <polygon className="hive-vision-hex-svg__border" points={POINTS_FLAT} />
              <g transform={INNER_FLAT}>
                <polygon className="hive-vision-hex-svg__face" points={POINTS_FLAT} />
              </g>
            </svg>
          </g>

          <g className="hidden lg:block" filter={`url(#${shadowFilter})`}>
            <svg
              viewBox={`0 0 ${POINTY_W} ${POINTY_H}`}
              width="100%"
              height="100%"
              preserveAspectRatio="xMidYMid meet"
            >
              <polygon className="hive-vision-hex-svg__border" points={POINTS_POINTY} />
              <g transform={INNER_POINTY}>
                <polygon className="hive-vision-hex-svg__face" points={POINTS_POINTY} />
              </g>
            </svg>
          </g>
        </svg>
        <div className="hive-vision-hex-card__content absolute inset-0 z-10">
          <h3 className="hive-vision-hex-card__title mb-2! relative">
            {title}
            <div className="absolute left-1/2 mt-1 h-[3px] w-[100%] -translate-x-1/2 transform bg-gradient-to-r from-transparent via-hive-gold/35 to-transparent" />
          </h3>

          <p className="hive-vision-hex-card__body text-hive-off-white/88 light:text-neutral-700">{body}</p>
        </div>
      </div>
    </article>
  );
}

import React, { useEffect, useRef, useState } from 'react';
import {
  ChevronDown,
  MapPin,
  Building2,
  ArrowUpRight,
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from 'lenis/react';

import {
  TrainPlatformDoorIcon,
  InteriorCladdingIcon,
  PerforatedPanelIcon,
  CurvedAluminiumProfileIcon,
} from '../product/icons/FacadeIcons';

import {
  StructuralSteelIcon,
  FacadeSolutionsIcon,
  PebFabricationIcon,
} from '../services/icons/ServiceIllustrations';

gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   PROJECT DATA
============================================================ */

const categories = [
  {
    id: 'train-platform-doors',
    num: '01',
    eyebrow: 'Rail & Metro Systems',
    title: 'Train Platform Doors',
    description:
      'Precision platform screen door assemblies engineered for demanding rail and metro environments.',
    scope:
      'Design, fabrication and site installation of platform screen door and gate assemblies for metro and rail platforms, including structural sealant glazing.',
    materials:
      'Structural aluminium extrusions, tempered / laminated glass, stainless steel hardware and fixings.',
    engineering:
      'Structural sealant glazing calculations, dynamic load and pressure-wave engineering, coordination shop drawings.',
    manufacturing:
      'CNC precision fabrication, laser cutting, certified welding, factory pre-assembly and functional testing.',
    finishing:
      'Powder coating / PVDF painting, anodised finishes.',
    Icon: TrainPlatformDoorIcon,
    visual: {
      label: 'METRO SYSTEMS',
      accent: '#ff6418',
      image:
        'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=1800&q=85',
    },
  },

  {
    id: 'facade-metalwork',
    num: '02',
    eyebrow: 'Architectural Systems',
    title: 'Façade & Architectural Metalwork',
    description:
      'Architectural envelopes combining aluminium systems, fins, louvers, canopies and engineered façade geometry.',
    scope:
      'End-to-end delivery of aluminium and composite façade systems — fins, louvers, canopies and complex façade geometries.',
    materials:
      'Aluminium composite panels, extruded aluminium profiles, structural glazing components.',
    engineering:
      'Façade engineering, wind-load and structural calculations, coordination with architects and consultants.',
    manufacturing:
      'CNC routing, folding, precision fabrication and curved profile forming.',
    finishing:
      'PVDF / powder coating, anodised finishes.',
    Icon: FacadeSolutionsIcon,
    visual: {
      label: 'ARCHITECTURAL SYSTEMS',
      accent: '#ff6b20',
      image:
        'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1800&q=85',
    },
  },

  {
    id: 'interior-cladding',
    num: '03',
    eyebrow: 'Interior Architecture',
    title: 'Interior Cladding',
    description:
      'Precision metal surfaces for feature walls, ceilings, columns, beams and architectural interiors.',
    scope:
      'Feature walls, feature ceilings, column and beam cladding, and decorative interior partitions.',
    materials:
      'Aluminium cassette panels, perforated metal screens, decorative laminates.',
    engineering:
      'Design detailing, substrate coordination and fixing engineering.',
    manufacturing:
      'Precision cutting, forming and panel fabrication to tight tolerances.',
    finishing:
      'Powder coating, brushed and textured metal finishes.',
    Icon: InteriorCladdingIcon,
    visual: {
      label: 'INTERIOR METALWORK',
      accent: '#f47a2a',
      image:
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=85',
    },
  },

  {
    id: 'structural-fabrication',
    num: '04',
    eyebrow: 'Structural Engineering',
    title: 'Structural Fabrication',
    description:
      'Heavy structural steel fabrication for platforms, walkways, staircases and support systems.',
    scope:
      'Structural steel for platforms, walkways, staircases and heavy support structures.',
    materials:
      'Mild steel and structural steel sections.',
    engineering:
      'Structural calculations, shop drawings and design coordination.',
    manufacturing:
      'Cutting, drilling, certified welding and heavy fabricated assembly.',
    finishing:
      'Shot blasting, epoxy / PU and industrial painting.',
    Icon: StructuralSteelIcon,
    visual: {
      label: 'STRUCTURAL STEEL',
      accent: '#ff6418',
      image:
        'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1800&q=85',
    },
  },

  {
    id: 'industrial-fabrication',
    num: '05',
    eyebrow: 'Industrial Systems',
    title: 'Industrial Fabrication',
    description:
      'Engineered industrial structures, machine frames, conveyor systems and fabrication assemblies.',
    scope:
      'Machine frames, equipment structures, conveyor structures and industrial sheds.',
    materials:
      'Mild steel and structural sections engineered to load and duty requirements.',
    engineering:
      'Engineering detailing, production drawings and manufacturing feasibility review.',
    manufacturing:
      'CNC cutting, press brake bending, certified welding and full assembly.',
    finishing:
      'Shot blasting, industrial painting and protective coating.',
    Icon: PebFabricationIcon,
    visual: {
      label: 'INDUSTRIAL FABRICATION',
      accent: '#ff6b20',
      image:
        'https://images.unsplash.com/photo-1565610222536-ef125c59da2e?auto=format&fit=crop&w=1800&q=85',
    },
  },

  {
    id: 'aluminium-profile-bending',
    num: '06',
    eyebrow: 'Precision Forming',
    title: 'Aluminium Profile Bending',
    description:
      'Curved aluminium profiles formed with controlled geometry for distinctive architectural envelopes.',
    scope:
      'Rolled and formed aluminium profiles engineered to precise curvature for distinctive façade geometries.',
    materials:
      'Extruded aluminium profiles in project-specified alloys and sections.',
    engineering:
      'Curvature calculations and geometry detailing for each elevation.',
    manufacturing:
      'Rolling, CNC bending and precision forming.',
    finishing:
      'Anodising, powder coating.',
    Icon: CurvedAluminiumProfileIcon,
    visual: {
      label: 'PRECISION FORMING',
      accent: '#ff7928',
      image:
        'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1800&q=85',
    },
  },

  {
    id: 'decorative-perforated-panels',
    num: '07',
    eyebrow: 'Architectural Screening',
    title: 'Decorative & Perforated Panels',
    description:
      'Precision architectural screens combining pattern, solar control, ventilation and visual identity.',
    scope:
      'Custom hole-pattern and decorative screens for solar shading, acoustic control and visual character.',
    materials:
      'Aluminium and mild steel perforated sheet, custom decorative profiles.',
    engineering:
      'Pattern design and laser-cut detailing.',
    manufacturing:
      'Laser cutting and CNC turret punching.',
    finishing:
      'Powder coating, anodised finishes.',
    Icon: PerforatedPanelIcon,
    visual: {
      label: 'ARCHITECTURAL SCREENING',
      accent: '#ff6418',
      image:
        'https://images.unsplash.com/photo-1531835551805-16d864c8d311?auto=format&fit=crop&w=1800&q=85',
    },
  },
];

/* ============================================================
   DETAIL ROW
============================================================ */

const DetailRow = ({ label, value, index = 0 }) => (
  <div
    className="pc-detail relative border-b border-white/[0.07] py-4 last:border-b-0"
    style={{ '--i': index + 1 }}
  >
    <div className="mb-2 flex items-center justify-between">
      <span className="block text-[9px] font-bold uppercase tracking-[0.28em] text-orange-400">
        {label}
      </span>

      <span className="font-mono text-[8px] tracking-[0.25em] text-white/15">
        {String(index + 1).padStart(2, '0')} / 05
      </span>
    </div>

    <p className="text-sm leading-relaxed text-white/55">
      {value}
    </p>

    <span className="pc-rowline" />
  </div>
);

/* ============================================================
   CINEMATIC IMAGE
============================================================ */

const CinematicImage = ({ category, large = false, delay = 2, open = false }) => {
  const { image, label, accent } = category.visual;
  const [glFailed, setGlFailed] = useState(false);
  const glActive = open && !glFailed;

  return (
    <div
      className={[
        'cinematic-image',
        glActive ? '' : 'pc-wipe',
        'group/image',
        'relative',
        'overflow-hidden',
        'rounded-2xl',
        'border',
        'border-white/[0.08]',
        'bg-[#080808]',
        large ? 'aspect-[16/9]' : 'aspect-[4/3]',
      ].join(' ')}
      style={{
        '--accent': accent,
        '--i': delay,
      }}
    >
      {/* IMAGE — slow cinematic push-in when the card opens */}

      <div className="pc-kenburns absolute inset-0">
        <img
          src={image}
          alt={label}
          loading="lazy"
          className={[
            'absolute inset-0 h-full w-full object-cover scale-[1.03]',
            'contrast-[1.05] transition-transform duration-[1800ms] ease-out',
            'group-hover/image:scale-[1.1]',
            glActive ? 'opacity-0' : '',
          ].join(' ')}
          onError={(event) => {
            event.currentTarget.style.display = 'none';
          }}
        />
      </div>

      {/* WEBGL molten-dissolve reveal (falls back to CSS wipe) */}

      {glActive && (
        <ShaderImage
          src={image}
          accent={accent}
          delay={(delay - 2) * 260}
          onFail={() => setGlFailed(true)}
        />
      )}

      {!glActive && (
        <>
          <div className="pc-bar pc-bar-top" />
          <div className="pc-bar pc-bar-bottom" />
        </>
      )}

      {/* DARK CINEMATIC GRADE — lightened so the photo stays sharp and
          readable; only the bottom edge darkens, to keep the label legible */}

      <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/70" />

      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/10" />

      {/* ORANGE ATMOSPHERIC LIGHT */}

      <div
        className="
          absolute
          -right-[20%]
          -top-[35%]
          h-[80%]
          w-[65%]
          rounded-full
          opacity-20
          blur-[90px]
          transition-all
          duration-[1500ms]
          group-hover/image:scale-125
          group-hover/image:opacity-40
        "
        style={{
          background: accent,
        }}
      />

      {/* GRID */}

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.09]"
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(255,255,255,.35) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255,255,255,.35) 1px,
              transparent 1px
            )
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* MOVING LIGHT */}

      <div
        className="
          pointer-events-none
          absolute
          -left-[25%]
          top-[-50%]
          h-[200%]
          w-[18%]
          rotate-[22deg]
          bg-gradient-to-b
          from-transparent
          via-orange-400/30
          to-transparent
          blur-xl
          transition-all
          duration-[1800ms]
          ease-out
          group-hover/image:left-[125%]
        "
      />

      {/* SCAN LINE */}

      <div
        className="
          pointer-events-none
          absolute
          left-0
          right-0
          top-0
          h-px
          bg-orange-400/50
          shadow-[0_0_18px_rgba(255,100,0,.9)]
          opacity-0
          group-hover/image:opacity-100
        "
        style={{
          animation: 'projectScan 2.8s linear infinite',
        }}
      />

      {/* FILM GRAIN */}

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=%220 0 180 180%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%22.85%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%22.55%22/%3E%3C/svg%3E")',
        }}
      />

      {/* TOP TECHNICAL MARKER */}

      <div className="absolute right-5 top-5 flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-orange-400 shadow-[0_0_15px_5px_rgba(255,100,0,.35)]" />

        <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-white/35">
          REF / {category.num}
        </span>
      </div>

      {/* BOTTOM LABEL */}

      <div className="pc-lower absolute bottom-5 left-5 right-5">
        <div className="text-[8px] uppercase tracking-[0.35em] text-white/40">
          JOVA METCRAFT
        </div>

        <div
          className="mt-1 text-[10px] font-bold uppercase tracking-[0.22em]"
          style={{
            color: accent,
          }}
        >
          {label}
        </div>
      </div>

      {/* FRAME CORNERS */}

      <div
        className="absolute left-4 top-4 h-5 w-5 border-l border-t"
        style={{ borderColor: `${accent}80` }}
      />

      <div
        className="absolute bottom-4 right-4 h-5 w-5 border-b border-r"
        style={{ borderColor: `${accent}80` }}
      />
    </div>
  );
};

/* ============================================================
   ENGINEERING DIAGRAM
============================================================ */

const EngineeringVisual = ({ category }) => {
  const { accent } = category.visual;

  return (
    <div
      className="pc-wipe relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/[0.07] bg-[#090909]"
      style={{ '--i': 4 }}
    >
      {/* pulse rings */}

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div
          className="pc-ring h-24 w-24 rounded-full border"
          style={{ borderColor: `${accent}55` }}
        />
        <div
          className="pc-ring pc-ring-2 absolute h-24 w-24 rounded-full border"
          style={{ borderColor: `${accent}35` }}
        />
      </div>

      {/* background */}

      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at center, ${accent}30, transparent 55%)`,
        }}
      />

      {/* technical grid */}

      <div
        className="absolute inset-6 border border-white/[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px)
          `,
          backgroundSize: '22px 22px',
        }}
      />

      {/* center structure */}

      <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-500/30">
        <div
          className="absolute inset-3 rounded-full border"
          style={{
            borderColor: `${accent}50`,
          }}
        />

        <div
          className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background: accent,
            boxShadow: `0 0 25px ${accent}`,
          }}
        />
      </div>

      {/* crosshair */}

      <div className="absolute left-1/2 top-6 bottom-6 w-px bg-white/[0.08]" />

      <div className="absolute bottom-1/2 left-6 right-6 h-px bg-white/[0.08]" />

      {/* dimension lines */}

      <div
        className="absolute left-[18%] right-[18%] top-[22%] h-px"
        style={{
          background: `${accent}60`,
        }}
      />

      <div
        className="absolute left-[18%] top-[18%] h-2 w-px"
        style={{
          background: `${accent}60`,
        }}
      />

      <div
        className="absolute right-[18%] top-[18%] h-2 w-px"
        style={{
          background: `${accent}60`,
        }}
      />

      {/* label */}

      <div className="absolute bottom-5 left-5">
        <span className="block text-[8px] uppercase tracking-[0.3em] text-white/20">
          Engineering
        </span>

        <span className="mt-1 block text-xs font-bold text-white/50">
          CONTROLLED
          <br />
          WORKFLOW
        </span>
      </div>

      <div className="absolute right-5 top-5 font-mono text-[8px] text-white/20">
        CAD / 07
      </div>
    </div>
  );
};

/* ============================================================
   WEBGL SHADER IMAGE
   Molten dissolve reveal: a burning noise front sweeps across the
   photo, leaving a white-hot edge, heat-haze distortion and RGB
   split behind it. After the reveal the image reacts to the mouse
   (ripple + parallax) and carries scanlines, vignette and grain.
============================================================ */

const VERT = `
attribute vec2 p;
varying vec2 vUv;
void main(){
  vUv = p * .5 + .5;
  gl_Position = vec4(p, 0., 1.);
}`;

const FRAG = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uTex;
uniform vec2 uRes;
uniform vec2 uImg;
uniform vec2 uMouse;
uniform float uTime;
uniform float uProg;
uniform float uHover;
uniform vec3 uAccent;

float hash(vec2 p){
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3. - 2. * f);
  float a = hash(i), b = hash(i + vec2(1., 0.));
  float c = hash(i + vec2(0., 1.)), d = hash(i + vec2(1., 1.));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}
float fbm(vec2 p){
  float v = 0., a = .5;
  for(int i = 0; i < 5; i++){
    v += a * noise(p);
    p *= 2.02;
    a *= .5;
  }
  return v;
}
vec2 cover(vec2 uv){
  float rs = uRes.x / uRes.y;
  float is = uImg.x / uImg.y;
  vec2 s = rs > is ? vec2(1., is / rs) : vec2(rs / is, 1.);
  return (uv - .5) * s + .5;
}

void main(){
  vec2 asp = vec2(uRes.x / uRes.y, 1.);
  vec2 uv = vUv;

  /* burning front */
  float n = fbm(uv * asp * 3.2 + vec2(0., uTime * .04));
  float d = uv.x * .82 + (1. - uv.y) * .18 + (n - .5) * .55;
  float front = uProg * 1.9 - .35;
  float t = front - d;

  float reveal = smoothstep(0., .05, t);
  float band = smoothstep(-.02, .03, t) * (1. - smoothstep(.03, .24, t));
  float core = smoothstep(-.02, .02, t) * (1. - smoothstep(.02, .07, t));

  /* heat-haze distortion right behind the front */
  float dm = clamp(1. - t * 3.5, 0., 1.) * step(-.02, t);
  vec2 warp = vec2(fbm(uv * asp * 5. + 3.1) - .5,
                   fbm(uv * asp * 5. + 7.7) - .5) * dm * .06;

  /* mouse ripple + parallax */
  vec2 md = (uv - uMouse) * asp;
  float mr = length(md);
  vec2 rip = normalize(md + 1e-4) * sin(mr * 38. - uTime * 5.) * exp(-mr * 5.) * uHover * .006;

  float zoom = 1. - .05 * smoothstep(0., 1., uProg);
  vec2 base = (uv - .5) * zoom + .5 + (uMouse - .5) * .018 * uHover;
  vec2 cuv = cover(base + warp + rip);

  /* chromatic aberration */
  float ca = .004 + dm * .02 + uHover * .0015;
  vec3 col;
  col.r = texture2D(uTex, cuv + vec2(ca, 0.)).r;
  col.g = texture2D(uTex, cuv).g;
  col.b = texture2D(uTex, cuv - vec2(ca, 0.)).b;

  /* grade */
  col = (col - .5) * 1.08 + .5;
  col *= vec3(1.03, 1., .96);
  col *= .965 + .035 * sin(vUv.y * uRes.y * 1.6);
  float vig = smoothstep(1.05, .35, length((vUv - .5) * vec2(1., .9) * 1.25));
  col *= mix(.55, 1., vig);
  col += (hash(vUv * uRes + fract(uTime) * 91.7) - .5) * .05;

  /* unrevealed metal: dark with glimmering embers near the front */
  float ember = pow(smoothstep(.72, 1., n), 3.) * smoothstep(-.6, 0., t) * (1. - reveal);
  vec3 dark = vec3(.025, .02, .018) + uAccent * ember * .9;

  vec3 hot = mix(uAccent, vec3(1., .86, .55), core);
  vec3 outc = mix(dark, col, reveal) + hot * (band * 1.4 + core * 1.2);

  gl_FragColor = vec4(outc, 1.);
}`;

const hexToRgb = (hex) => {
  const h = hex.replace('#', '');
  const v = parseInt(h.length === 3 ? h.replace(/./g, '$&$&') : h, 16);
  return [((v >> 16) & 255) / 255, ((v >> 8) & 255) / 255, (v & 255) / 255];
};

const ShaderImage = ({ src, accent, delay = 0, onFail }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const gl = canvas.getContext('webgl', {
      antialias: false,
      alpha: false,
    });

    if (!gl) {
      onFail?.();
      return undefined;
    }

    let raf = 0;
    let alive = true;
    let loaded = false;
    let visible = true;
    let startTime = 0;

    const compile = (type, source) => {
      const sh = gl.createShader(type);
      gl.shaderSource(sh, source);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        console.warn(gl.getShaderInfoLog(sh));
        return null;
      }
      return sh;
    };

    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);

    if (!vs || !fs) {
      onFail?.();
      return undefined;
    }

    const prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);

    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      onFail?.();
      return undefined;
    }

    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );
    const loc = gl.getAttribLocation(prog, 'p');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const U = {};
    ['uTex', 'uRes', 'uImg', 'uMouse', 'uTime', 'uProg', 'uHover', 'uAccent'].forEach(
      (name) => {
        U[name] = gl.getUniformLocation(prog, name);
      }
    );

    const rgb = hexToRgb(accent);
    gl.uniform3f(U.uAccent, rgb[0], rgb[1], rgb[2]);
    gl.uniform1i(U.uTex, 0);

    const tex = gl.createTexture();
    let imgW = 1;
    let imgH = 1;

    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.onload = () => {
      if (!alive) return;
      try {
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        imgW = image.naturalWidth || 1;
        imgH = image.naturalHeight || 1;
        gl.uniform2f(U.uImg, imgW, imgH);
        loaded = true;
        startTime = performance.now();
      } catch (err) {
        onFail?.();
      }
    };
    image.onerror = () => {
      if (alive) onFail?.();
    };
    image.src = src;

    /* size */
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(2, Math.round(canvas.clientWidth * dpr));
      const h = Math.max(2, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, w, h);
      gl.uniform2f(U.uRes, w, h);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(canvas);

    /* mouse */
    const parent = canvas.parentElement;
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5, hover: 0, target: 0 };

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.tx = (e.clientX - r.left) / r.width;
      mouse.ty = 1 - (e.clientY - r.top) / r.height;
      mouse.target = 1;
    };
    const onLeave = () => {
      mouse.target = 0;
    };
    parent.addEventListener('mousemove', onMove);
    parent.addEventListener('mouseleave', onLeave);

    /* loop */
    const t0 = performance.now();
    const frame = (now) => {
      raf = requestAnimationFrame(frame);
      if (!visible || !loaded) return;

      const p = Math.min(1, Math.max(0, (now - startTime - delay) / 2100));
      const eased = p * p * (3 - 2 * p);

      mouse.x += (mouse.tx - mouse.x) * 0.08;
      mouse.y += (mouse.ty - mouse.y) * 0.08;
      mouse.hover += (mouse.target - mouse.hover) * 0.06;

      gl.uniform1f(U.uTime, (now - t0) / 1000);
      gl.uniform1f(U.uProg, eased);
      gl.uniform1f(U.uHover, mouse.hover * eased);
      gl.uniform2f(U.uMouse, mouse.x, mouse.y);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      parent.removeEventListener('mousemove', onMove);
      parent.removeEventListener('mouseleave', onLeave);
      gl.deleteTexture(tex);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, accent, delay]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
};

/* ============================================================
   LASER CUT + SPARKS
   A laser head travels along the bottom edge of the card header,
   cutting it open. It throws welding sparks (gravity, streaks,
   white-hot to red cooling) and finishes with a burst.
============================================================ */

const LaserSparks = ({ active }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    const parent = canvas.parentElement;

    if (!active) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return undefined;
    }

    let w = 0;
    let h = 0;
    const size = () => {
      const r = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    size();
    const ro = new ResizeObserver(size);
    ro.observe(parent);

    const header = parent.querySelector('[data-card-header]');
    const DURATION = 1500;
    const start = performance.now();
    const parts = [];
    let last = start;
    let raf = 0;
    let burst = false;

    const emit = (x, y, count, mode) => {
      for (let i = 0; i < count; i += 1) {
        const a =
          mode === 'burst'
            ? Math.random() * Math.PI * 2
            : -Math.PI * (0.05 + Math.random() * 0.55);
        const sp =
          mode === 'burst' ? 120 + Math.random() * 520 : 90 + Math.random() * 380;
        parts.push({
          x,
          y,
          px: x,
          py: y,
          vx: Math.cos(a) * sp * (mode === 'burst' ? 1 : 0.9),
          vy: Math.sin(a) * sp - (mode === 'burst' ? 60 : 30),
          life: 0.5 + Math.random() * 0.9,
          max: 1.4,
          w: 0.6 + Math.random() * 1.6,
        });
      }
    };

    const frame = (now) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.033, (now - last) / 1000);
      last = now;

      const t = (now - start) / DURATION;
      const y = (header ? header.offsetHeight : 120) + 1;
      const e = t < 1 ? 1 - Math.pow(1 - t, 3) : 1;
      const x = e * w;

      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';

      /* laser beam trail + head */
      if (t < 1.15) {
        const fade = t < 1 ? 1 : Math.max(0, 1 - (t - 1) / 0.15);
        const tail = Math.max(0, x - 340);
        const g = ctx.createLinearGradient(tail, 0, x, 0);
        g.addColorStop(0, 'rgba(255,90,10,0)');
        g.addColorStop(0.7, `rgba(255,120,30,${0.55 * fade})`);
        g.addColorStop(1, `rgba(255,240,210,${fade})`);
        ctx.strokeStyle = g;
        ctx.lineWidth = 2;
        ctx.shadowColor = 'rgba(255,100,20,1)';
        ctx.shadowBlur = 18;
        ctx.beginPath();
        ctx.moveTo(tail, y);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.shadowBlur = 0;

        const rg = ctx.createRadialGradient(x, y, 0, x, y, 46);
        rg.addColorStop(0, `rgba(255,255,255,${0.95 * fade})`);
        rg.addColorStop(0.15, `rgba(255,200,120,${0.75 * fade})`);
        rg.addColorStop(1, 'rgba(255,90,10,0)');
        ctx.fillStyle = rg;
        ctx.beginPath();
        ctx.arc(x, y, 46, 0, Math.PI * 2);
        ctx.fill();

        if (t < 1) emit(x, y, 7, 'stream');
      }

      if (t >= 1 && !burst) {
        burst = true;
        emit(w - 6, y, 110, 'burst');
      }

      /* sparks */
      for (let i = parts.length - 1; i >= 0; i -= 1) {
        const q = parts[i];
        q.life -= dt;
        if (q.life <= 0) {
          parts.splice(i, 1);
        } else {
          q.px = q.x;
          q.py = q.y;
          q.vy += 950 * dt;
          q.vx *= 0.992;
          q.x += q.vx * dt;
          q.y += q.vy * dt;

          if (q.y > h - 4) {
            q.y = h - 4;
            q.vy *= -0.35;
          }

          const r = Math.max(0, q.life / q.max);
          ctx.strokeStyle = `rgba(255,${Math.floor(70 + 185 * r)},${Math.floor(
            15 + 120 * r * r
          )},${Math.min(1, r * 1.6)})`;
          ctx.lineWidth = q.w;
          ctx.beginPath();
          ctx.moveTo(q.px, q.py);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }

      ctx.globalCompositeOperation = 'source-over';

      if (t > 1.15 && parts.length === 0) {
        cancelAnimationFrame(raf);
        ctx.clearRect(0, 0, w, h);
      }
    };

    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-[4] h-full w-full"
    />
  );
};

/* ============================================================
   3D TILT + GLARE
============================================================ */

const TiltBox = ({ children }) => {
  const ref = useRef(null);

  const onMove = (event) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (event.clientX - r.left) / r.width - 0.5;
    const py = (event.clientY - r.top) / r.height - 0.5;
    el.style.transition = 'transform 120ms ease-out';
    el.style.transform = `perspective(1200px) rotateY(${px * 7}deg) rotateX(${
      -py * 7
    }deg) translateZ(0)`;
    el.style.setProperty('--gx', `${(px + 0.5) * 100}%`);
    el.style.setProperty('--gy', `${(py + 0.5) * 100}%`);
    el.style.setProperty('--glare', '1');
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = 'transform 900ms cubic-bezier(.16,1,.3,1)';
    el.style.transform = 'perspective(1200px) rotateY(0deg) rotateX(0deg)';
    el.style.setProperty('--glare', '0');
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="pc-tilt relative"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
      <div className="pc-glare" />
    </div>
  );
};

/* ============================================================
   MAIN COMPONENT
============================================================ */

const ProjectCategories = () => {
  const [openId, setOpenId] = useState(null);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);
  const openRef = useRef(null); // mirrors openId for the scroll handler
  const anchorRaf = useRef(0);
  const lenis = useLenis();
  const lenisRef = useRef(null);
  lenisRef.current = lenis;
  const lockUntil = useRef(0); // pauses auto-open right after a click
  const activeIndex = categories.findIndex((c) => c.id === openId);

  const applyOpen = (id) => {
    openRef.current = id;
    setOpenId(id);
  };

  /* ==========================================================
     KEEP THE PAGE STEADY WHILE CARDS OPEN / CLOSE

     Cards that collapse ABOVE the header you are looking at would
     drag everything upward. For the length of the animation we
     watch that header's position in the DOCUMENT (a user's own
     scrolling never changes it, only layout changes do) and
     scroll by exactly the difference. Result: the header stays
     put and cards only ever grow downward from it.
  ========================================================== */

  const holdAnchor = (el) => {
    cancelAnimationFrame(anchorRaf.current);
    if (!el) return;

    const docTop = () => el.getBoundingClientRect().top + window.scrollY;
    let prev = docTop();
    const startTime = performance.now();

    const step = () => {
      const cur = docTop();
      const delta = cur - prev;

      if (Math.abs(delta) > 0.5) {
        const l = lenisRef.current;

        if (l) {
          // Lenis owns the scroll position: a plain window.scrollBy is
          // overwritten by it on the next frame, so go through Lenis
          l.scrollTo(l.scroll + delta, { immediate: true, force: true });
        } else {
          window.scrollBy({ top: delta, behavior: 'instant' });
        }
      }

      prev = cur;

      if (performance.now() - startTime < 700) {
        anchorRaf.current = requestAnimationFrame(step);
      }
    };

    anchorRaf.current = requestAnimationFrame(step);
  };

  /* ==========================================================
     CLICK
  ========================================================== */

  const toggle = (id, event) => {
    lockUntil.current = performance.now() + 1500; // let the click win
    holdAnchor(event.currentTarget);
    applyOpen(openRef.current === id ? null : id);
  };

  /* ==========================================================
     AUTO OPEN ON SCROLL

     The card whose header has passed the trigger line (40% down
     the screen) opens and shows its details. The previous card
     compresses. Change 0.4 to open earlier / later.
  ========================================================== */

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const headers = Array.from(root.querySelectorAll('[data-card-header]'));
    let raf = 0;

    const compute = () => {
      raf = 0;
      if (performance.now() < lockUntil.current) return;

      const vh = window.innerHeight;
      const line = vh * 0.4;
      const rect = root.getBoundingClientRect();

      // HUD only while the section is actually on screen
      setInView(rect.top < vh * 0.55 && rect.bottom > vh * 0.45);

      // section not on screen: leave everything as it is
      if (rect.bottom <= 0 || rect.top >= vh) return;

      let idx = -1;
      headers.forEach((h, i) => {
        if (h.getBoundingClientRect().top <= line) idx = i;
      });

      const id = idx >= 0 ? headers[idx].dataset.id : null;
      if (id === openRef.current) return;

      holdAnchor(idx >= 0 ? headers[idx] : null);
      applyOpen(id);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(compute);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    compute();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
      cancelAnimationFrame(anchorRaf.current);
    };
  }, []);

  /* ==========================================================
     GSAP SCROLL REVEAL
  ========================================================== */

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.project-card');

      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 70,
            scale: 0.97,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            delay: index * 0.05,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              once: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{ overflowAnchor: 'none' }}
      className="
        pc-section
        relative
        w-full
        overflow-hidden
        bg-[#050505]
        py-20
        text-white
        lg:py-28
      "
    >
      {/* ======================================================
          BACKGROUND ATMOSPHERE
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -left-[300px]
          -top-[300px]
          h-[700px]
          w-[700px]
          rounded-full
          bg-orange-600/[0.055]
          blur-[160px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -right-[300px]
          top-[45%]
          h-[650px]
          w-[650px]
          rounded-full
          bg-orange-500/[0.04]
          blur-[160px]
        "
      />

      {/* technical grid */}

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(255,255,255,.8) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255,255,255,.8) 1px,
              transparent 1px
            )
          `,
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 md:px-10 lg:px-16">
        {/* ====================================================
            HEADER
        ==================================================== */}

        <div className="mb-10 flex items-center gap-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-orange-500">
            Project Categories
          </span>

          <div className="h-px w-20 bg-gradient-to-r from-orange-500 to-transparent" />

          <span className="font-mono text-[9px] text-white/20">
            / 07
          </span>
        </div>

        {/* ====================================================
            INTRO
        ==================================================== */}

        <div className="mb-16 max-w-4xl lg:mb-20">
          <h2 className="text-4xl font-black leading-[0.95] tracking-[-0.045em] md:text-5xl lg:text-6xl">
            Built for
            <br />

            <span className="text-white/30">
              demanding environments.
            </span>
          </h2>

          <p className="mt-7 max-w-2xl text-sm leading-relaxed text-white/40 md:text-base">
            Explore the engineering capabilities behind our work —
            from architectural façades and precision aluminium systems
            to structural steel and industrial fabrication.
          </p>

          <div className="mt-6 inline-flex items-center gap-3 text-[9px] uppercase tracking-[0.22em] text-white/25">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(255,100,0,.8)]" />

            Reference imagery shown until project photography is available
          </div>
        </div>

        {/* ====================================================
            PROJECT LIST
        ==================================================== */}

        <div className="flex flex-col gap-5">
          {categories.map((cat) => {
            const isOpen = openId === cat.id;
            const Icon = cat.Icon;

            return (
              <article
                key={cat.id}
                data-card
                data-id={cat.id}
                data-open={isOpen}
                className={[
                  'project-card',
                  'group',
                  'relative',
                  'overflow-hidden',
                  'rounded-[28px]',
                  'border',
                  'bg-[#090909]',
                  'transition-[border-color,box-shadow]',
                  'duration-700',
                  isOpen
                    ? 'border-orange-500/40 shadow-[0_35px_100px_rgba(0,0,0,.6)]'
                    : 'border-white/[0.065] hover:border-orange-500/25',
                ].join(' ')}
              >
                {/* cinematic light sweep across the card */}

                <div className="pc-sweep" />

                {/* laser cut + welding sparks */}

                <LaserSparks active={isOpen} />

                {/* viewfinder corners */}

                <span className="pc-corner pc-corner-tl" />
                <span className="pc-corner pc-corner-tr" />
                <span className="pc-corner pc-corner-bl" />
                <span className="pc-corner pc-corner-br" />

                {/* activation line */}

                <div
                  className={[
                    'absolute left-0 top-0 bottom-0 w-[2px]',
                    'origin-top',
                    'bg-gradient-to-b',
                    'from-orange-400',
                    'via-orange-600',
                    'to-transparent',
                    'transition-transform duration-700',
                    isOpen
                      ? 'scale-y-100'
                      : 'scale-y-0 group-hover:scale-y-50',
                  ].join(' ')}
                />

                {/* =================================================
                    HEADER
                ================================================= */}

                <button
                  type="button"
                  data-card-header
                  data-id={cat.id}
                  onClick={(event) => toggle(cat.id, event)}
                  aria-expanded={isOpen}
                  className="relative flex w-full items-center gap-5 p-5 text-left sm:gap-7 sm:p-7 lg:gap-8 lg:p-8"
                >
                  {/* number */}

                  <div
                    className={[
                      'pc-num',
                      'hidden sm:block',
                      'text-6xl lg:text-7xl',
                      'font-black',
                      'leading-none',
                      'tracking-[-0.08em]',
                    ].join(' ')}
                  >
                    {cat.num}
                  </div>

                  {/* icon */}

                  <div
                    className={[
                      'relative shrink-0',
                      'flex h-14 w-14 items-center justify-center',
                      'overflow-hidden rounded-2xl',
                      'border bg-[#050505]',
                      'transition-all duration-700',
                      'sm:h-16 sm:w-16',
                      'lg:h-20 lg:w-20',
                      isOpen
                        ? 'border-orange-500/60 shadow-[0_0_45px_rgba(255,100,0,.2)]'
                        : 'border-white/[0.08] group-hover:border-orange-500/30',
                    ].join(' ')}
                  >
                    <div
                      className={[
                        'absolute inset-0 bg-orange-500/10 transition-opacity duration-500',
                        isOpen ? 'opacity-100' : 'opacity-0',
                      ].join(' ')}
                    />

                    <div
                      className={[
                        'relative z-10 h-9 w-9 transition-all duration-700',
                        isOpen
                          ? 'rotate-3 scale-110'
                          : 'group-hover:scale-105',
                      ].join(' ')}
                    >
                      <Icon className="h-full w-full" />
                    </div>
                  </div>

                  {/* title */}

                  <div className="min-w-0 flex-1">
                    <div className="mb-2 flex items-center gap-3">
                      <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-orange-500">
                        {cat.eyebrow}
                      </span>

                      <span className="hidden h-px w-8 bg-white/10 sm:block" />
                    </div>

                    <h3
                      className={[
                        'pc-title',
                        'text-lg font-bold tracking-tight transition-colors duration-500',
                        'sm:text-2xl lg:text-3xl',
                        isOpen
                          ? 'text-orange-300'
                          : 'text-white group-hover:text-orange-400',
                      ].join(' ')}
                    >
                      {cat.title}
                    </h3>

                    <p className="mt-2 hidden max-w-xl text-xs leading-relaxed text-white/25 md:block">
                      {cat.description}
                    </p>
                  </div>

                  {/* arrow */}

                  <div
                    className={[
                      'flex h-10 w-10 shrink-0 items-center justify-center rounded-full border',
                      'transition-all duration-500',
                      isOpen
                        ? 'rotate-180 border-orange-400 bg-orange-500 text-black'
                        : 'border-white/10 text-orange-500 group-hover:border-orange-500/40',
                    ].join(' ')}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                {/* =================================================
                    EXPANDED CONTENT
                ================================================= */}

                <div
                  className={[
                    'grid transition-all duration-500',
                    'ease-[cubic-bezier(.16,1,.3,1)]',
                    isOpen
                      ? 'grid-rows-[1fr] opacity-100'
                      : 'grid-rows-[0fr] opacity-0',
                  ].join(' ')}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 pb-8 sm:px-7 lg:px-8 lg:pb-10">
                      {/* separator */}

                      <div className="mb-8 h-px bg-gradient-to-r from-orange-500/60 via-white/[0.08] to-transparent" />

                      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[.85fr_1.15fr] lg:gap-16">
                        {/* =================================================
                            INFORMATION
                        ================================================= */}

                        <div>
                          <div
                            className="pc-detail mb-6 flex flex-wrap gap-5"
                            style={{ '--i': 0 }}
                          >
                            <div className="flex items-center gap-2 text-white/30">
                              <Building2 className="h-3.5 w-3.5 text-orange-500" />

                              <span className="text-[9px] font-bold uppercase tracking-[0.15em]">
                                Client — shared on request
                              </span>
                            </div>

                            <div className="flex items-center gap-2 text-white/30">
                              <MapPin className="h-3.5 w-3.5 text-orange-500" />

                              <span className="text-[9px] font-bold uppercase tracking-[0.15em]">
                                Location — confidential
                              </span>
                            </div>
                          </div>

                          <DetailRow index={0} label="Scope" value={cat.scope} />

                          <DetailRow
                            index={1}
                            label="Materials"
                            value={cat.materials}
                          />

                          <DetailRow
                            index={2}
                            label="Engineering"
                            value={cat.engineering}
                          />

                          <DetailRow
                            index={3}
                            label="Manufacturing"
                            value={cat.manufacturing}
                          />

                          <DetailRow
                            index={4}
                            label="Finishing"
                            value={cat.finishing}
                          />
                        </div>

                        {/* =================================================
                            VISUALS
                        ================================================= */}

                        <div>
                          <div
                            className="pc-detail mb-4 flex items-center justify-between"
                            style={{ '--i': 1 }}
                          >
                            <div>
                              <span className="block text-[9px] font-bold uppercase tracking-[0.28em] text-orange-400">
                                Capability Visual
                              </span>

                              <span className="mt-1 block text-[10px] text-white/20">
                                Cinematic reference imagery
                              </span>
                            </div>

                            <ArrowUpRight className="h-4 w-4 text-white/15" />
                          </div>

                          <TiltBox>
                          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <div className="sm:col-span-2">
                              <CinematicImage
                                category={cat}
                                large
                                delay={2}
                                open={isOpen}
                              />
                            </div>

                            <CinematicImage category={cat} delay={3} open={isOpen} />

                            <EngineeringVisual category={cat} />
                          </div>
                          </TiltBox>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* ====================================================
            BOTTOM STATS
        ==================================================== */}

        <div className="mt-20 grid grid-cols-1 gap-10 border-t border-white/[0.07] pt-10 sm:grid-cols-3 lg:mt-28">
          <div>
            <div className="text-5xl font-black tracking-[-0.07em] text-white">
              07
            </div>

            <div className="mt-2 text-[9px] uppercase tracking-[0.28em] text-white/25">
              Core capabilities
            </div>
          </div>

          <div>
            <div className="text-5xl font-black tracking-[-0.07em] text-orange-500">
              01
            </div>

            <div className="mt-2 text-[9px] uppercase tracking-[0.28em] text-white/25">
              Integrated workflow
            </div>
          </div>

          <p className="max-w-md text-sm leading-relaxed text-white/35">
            From engineering and fabrication to finishing and installation,
            every capability is connected through one controlled production
            workflow.
          </p>
        </div>

        {/* ====================================================
            CTA
        ==================================================== */}

        <div className="relative mt-24 overflow-hidden rounded-[32px] border border-white/[0.07] bg-[#080808] p-8 sm:p-12 lg:p-16">
          <div
            className="absolute -right-32 -top-32 h-96 w-96 rounded-full opacity-20 blur-[100px]"
            style={{
              background: '#ff6418',
            }}
          />

          <div className="relative z-10 max-w-3xl">
            <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-orange-500">
              JOVA METCRAFT
            </span>

            <h3 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
              Ready to shape
              <br />
              <span className="text-white/30">tomorrow — together.</span>
            </h3>

            <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/35">
              From concept and engineering through fabrication, finishing and
              installation, let's create something built to last.
            </p>

            <a
              href="#contact"
              className="
                mt-8
                inline-flex
                items-center
                gap-3
                rounded-full
                bg-orange-500
                px-6
                py-3
                text-[10px]
                font-black
                uppercase
                tracking-[0.2em]
                text-black
                transition-all
                duration-300
                hover:bg-orange-400
                hover:shadow-[0_0_35px_rgba(255,100,0,.25)]
              "
            >
              Start a conversation
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* ======================================================
          CINEMATIC HUD — current capability, fixed to the screen
      ====================================================== */}

      <div
        className={[
          'pointer-events-none fixed bottom-6 left-6 z-40 hidden lg:block',
          'transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)]',
          inView
            ? 'translate-y-0 opacity-100'
            : 'translate-y-6 opacity-0',
        ].join(' ')}
      >
        <div className="rounded-2xl border border-white/[0.08] bg-black/60 px-5 py-4 backdrop-blur-md">
          <div className="flex items-center gap-2 text-[8px] font-bold uppercase tracking-[0.3em] text-orange-500">
            <span className="pc-rec h-1.5 w-1.5 rounded-full bg-orange-500" />
            Capability
          </div>

          <div className="mt-2 flex items-end gap-2 overflow-hidden">
            <span
              key={openId || 'none'}
              className="pc-hud-num text-4xl font-black leading-none tracking-[-0.06em] text-white"
            >
              {String(Math.max(activeIndex, 0) + 1).padStart(2, '0')}
            </span>

            <span className="pb-1 font-mono text-[10px] text-white/30">
              / {String(categories.length).padStart(2, '0')}
            </span>
          </div>

          <div className="mt-3 flex gap-1">
            {categories.map((c, i) => (
              <span
                key={c.id}
                className={[
                  'h-[3px] w-6 rounded-full transition-all duration-700',
                  i === activeIndex
                    ? 'bg-orange-500 shadow-[0_0_10px_rgba(255,100,0,.8)]'
                    : i < activeIndex
                      ? 'bg-orange-500/40'
                      : 'bg-white/10',
                ].join(' ')}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ======================================================
          GLOBAL ANIMATION
      ====================================================== */}

      <style>{`
        @keyframes projectScan {
          0% {
            transform: translateY(-10px);
          }

          100% {
            transform: translateY(900px);
          }
        }

        .cinematic-image {
          isolation: isolate;
        }

        /* ---------- cinematic open / close ---------- */

        .project-card {
          --ease-cine: cubic-bezier(.16, 1, .3, 1);
          --ease-wipe: cubic-bezier(.76, 0, .24, 1);
        }

        /* giant outlined numeral */
        .pc-num {
          color: transparent;
          -webkit-text-stroke: 1px rgba(255, 255, 255, .09);
          transition: -webkit-text-stroke-color .7s var(--ease-cine),
            transform .8s var(--ease-cine), text-shadow .8s var(--ease-cine);
        }
        .project-card:hover .pc-num {
          -webkit-text-stroke-color: rgba(255, 110, 30, .3);
        }
        .project-card[data-open='true'] .pc-num {
          -webkit-text-stroke-color: rgba(255, 120, 40, 1);
          transform: translateX(6px);
          text-shadow: 0 0 40px rgba(255, 100, 0, .35);
        }

        .pc-title {
          transition: color .5s ease, transform .8s var(--ease-cine);
        }
        .project-card[data-open='true'] .pc-title {
          transform: translateX(6px);
        }

        /* detail rows: staggered focus-pull */
        .pc-detail {
          opacity: 0;
          transform: translateY(22px);
          filter: blur(8px);
          transition: opacity .3s ease, transform .3s ease, filter .3s ease;
        }
        .project-card[data-open='true'] .pc-detail {
          opacity: 1;
          transform: translateY(0);
          filter: blur(0);
          transition: opacity .9s var(--ease-cine),
            transform .9s var(--ease-cine), filter .9s var(--ease-cine);
          transition-delay: calc(var(--i, 0) * 90ms + 220ms);
        }

        /* row underline draws itself */
        .pc-rowline {
          position: absolute;
          left: 0;
          bottom: -1px;
          height: 1px;
          width: 100%;
          transform: scaleX(0);
          transform-origin: left;
          background: linear-gradient(90deg, rgba(255, 110, 30, .8), transparent 70%);
          transition: transform .3s ease;
        }
        .project-card[data-open='true'] .pc-rowline {
          transform: scaleX(1);
          transition: transform 1.1s var(--ease-cine);
          transition-delay: calc(var(--i, 0) * 90ms + 500ms);
        }

        /* images wipe in from the left */
        .pc-wipe {
          clip-path: inset(0 100% 0 0 round 16px);
          transition: clip-path .45s var(--ease-wipe);
        }
        .project-card[data-open='true'] .pc-wipe {
          clip-path: inset(0 0 0 0 round 16px);
          transition: clip-path 1.1s var(--ease-wipe);
          transition-delay: calc(var(--i, 0) * 120ms + 150ms);
        }

        /* slow push-in */
        .pc-kenburns {
          transform: scale(1.22);
          transition: transform .5s ease;
        }
        .project-card[data-open='true'] .pc-kenburns {
          transform: scale(1);
          transition: transform 2.8s var(--ease-cine);
          transition-delay: calc(var(--i, 0) * 120ms + 150ms);
        }

        /* letterbox bars */
        .pc-bar {
          position: absolute;
          left: 0;
          right: 0;
          height: 17%;
          background: #000;
          z-index: 5;
          pointer-events: none;
          transform: scaleY(1);
          transition: transform .4s ease;
        }
        .pc-bar-top { top: 0; transform-origin: top; }
        .pc-bar-bottom { bottom: 0; transform-origin: bottom; }
        .project-card[data-open='true'] .pc-bar {
          transform: scaleY(0);
          transition: transform 1.2s var(--ease-wipe);
          transition-delay: calc(var(--i, 0) * 120ms + 650ms);
        }

        /* lower-third label */
        .pc-lower {
          opacity: 0;
          transform: translateX(-18px);
          transition: opacity .3s ease, transform .3s ease;
          z-index: 6;
        }
        .project-card[data-open='true'] .pc-lower {
          opacity: 1;
          transform: translateX(0);
          transition: opacity .9s var(--ease-cine), transform .9s var(--ease-cine);
          transition-delay: calc(var(--i, 0) * 120ms + 1300ms);
        }

        /* light sweep across the whole card */
        .pc-sweep {
          position: absolute;
          inset: 0;
          overflow: hidden;
          border-radius: inherit;
          pointer-events: none;
          z-index: 2;
        }
        .pc-sweep::before {
          content: '';
          position: absolute;
          top: -20%;
          bottom: -20%;
          left: 0;
          width: 30%;
          opacity: 0;
          transform: translateX(-130%) skewX(-18deg);
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 110, 30, .34),
            rgba(255, 255, 255, .14),
            transparent
          );
        }
        .project-card[data-open='true'] .pc-sweep::before {
          animation: pcSweep 1.5s var(--ease-cine) .05s both;
        }
        @keyframes pcSweep {
          0% { transform: translateX(-130%) skewX(-18deg); opacity: 0; }
          15% { opacity: 1; }
          100% { transform: translateX(480%) skewX(-18deg); opacity: 0; }
        }

        /* viewfinder corners */
        .pc-corner {
          position: absolute;
          width: 26px;
          height: 26px;
          z-index: 3;
          pointer-events: none;
          opacity: 0;
          transform: scale(.4);
          border-color: rgba(255, 110, 30, .75);
          transition: opacity .3s ease, transform .3s ease;
        }
        .pc-corner-tl { top: 12px; left: 12px; border-top: 1px solid; border-left: 1px solid; transform-origin: top left; }
        .pc-corner-tr { top: 12px; right: 12px; border-top: 1px solid; border-right: 1px solid; transform-origin: top right; }
        .pc-corner-bl { bottom: 12px; left: 12px; border-bottom: 1px solid; border-left: 1px solid; transform-origin: bottom left; }
        .pc-corner-br { bottom: 12px; right: 12px; border-bottom: 1px solid; border-right: 1px solid; transform-origin: bottom right; }
        .project-card[data-open='true'] .pc-corner {
          opacity: 1;
          transform: scale(1);
          transition: opacity .8s var(--ease-cine) .3s, transform .8s var(--ease-cine) .3s;
        }

        /* engineering rings */
        .pc-ring { opacity: 0; }
        .project-card[data-open='true'] .pc-ring {
          animation: pcRing 3.2s ease-out 1.2s infinite;
        }
        .project-card[data-open='true'] .pc-ring-2 {
          animation-delay: 2.3s;
        }
        @keyframes pcRing {
          0% { transform: scale(.6); opacity: .7; }
          100% { transform: scale(3.2); opacity: 0; }
        }

        /* tilt glare */
        .pc-tilt { will-change: transform; }
        .pc-glare {
          position: absolute;
          inset: 0;
          border-radius: 16px;
          pointer-events: none;
          opacity: var(--glare, 0);
          transition: opacity .5s ease;
          mix-blend-mode: screen;
          background: radial-gradient(
            420px circle at var(--gx, 50%) var(--gy, 50%),
            rgba(255, 140, 60, .22),
            transparent 60%
          );
        }

        /* HUD */
        .pc-hud-num {
          display: inline-block;
          animation: pcNum .7s var(--ease-cine, cubic-bezier(.16,1,.3,1)) both;
        }
        @keyframes pcNum {
          from { transform: translateY(70%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .pc-rec { animation: pcRec 1.6s ease-in-out infinite; }
        @keyframes pcRec {
          0%, 100% { opacity: 1; }
          50% { opacity: .25; }
        }

        /* Reduced motion: keep the reveals (they are gentle fades) but
           stop the looping / sweeping effects. */
        @media (prefers-reduced-motion: reduce) {
          .pc-sweep::before,
          .pc-ring,
          .pc-rec,
          .cinematic-image * {
            animation: none !important;
          }
          .pc-kenburns,
          .project-card[data-open='true'] .pc-kenburns {
            transform: none !important;
          }
        }
            `}</style>
    </section>
  );
};

export default ProjectCategories;
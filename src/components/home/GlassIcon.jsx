import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// Same bordered icon-node look used by the TEHTER module icons: a
// rounded-xl card with a soft border that lights up orange on hover, a
// small number badge overlapping its top-left corner, and a subtle glow
// behind it. Class names (glass-icon-container, glass-circle,
// reflection-layer, icon-svg) are kept as-is so OurProcess's existing
// GSAP timeline — which queries these selectors — keeps working.
//
// `color` / `hoverColor` / `glow` let each step have its own icon color
// instead of the previous flat gray-for-everyone look. They're applied via
// CSS custom properties (set inline on the container) rather than
// hardcoded Tailwind classes, since the actual color is now dynamic per
// step rather than fixed.
const GlassIcon = ({
    icon,
    id,
    index,
    color = '#9ca3af',      // dormant stroke color (defaults to the old gray-400)
    hoverColor = '#fb923c', // hover stroke color (defaults to the old orange-400)
    glow = 'rgba(249,115,22,0.9)', // hover drop-shadow color
}) => {
    const containerRef = useRef(null);
    const glassRef = useRef(null);
    const reflectionRef = useRef(null);
    const blobRef = useRef(null);
    const svgRef = useRef(null);

    const xTo = useRef();
    const yTo = useRef();
    const rxTo = useRef();
    const ryTo = useRef();
    const reflXTo = useRef();
    const reflYTo = useRef();

    useGSAP(() => {
        xTo.current = gsap.quickTo(glassRef.current, "x", { duration: 0.5, ease: "power3" });
        yTo.current = gsap.quickTo(glassRef.current, "y", { duration: 0.5, ease: "power3" });
        rxTo.current = gsap.quickTo(glassRef.current, "rotationX", { duration: 0.5, ease: "power3" });
        ryTo.current = gsap.quickTo(glassRef.current, "rotationY", { duration: 0.5, ease: "power3" });

        reflXTo.current = gsap.quickTo(reflectionRef.current, "x", { duration: 0.5, ease: "power3" });
        reflYTo.current = gsap.quickTo(reflectionRef.current, "y", { duration: 0.5, ease: "power3" });

        gsap.set(containerRef.current, { perspective: 1000 });
        gsap.set(glassRef.current, { transformStyle: "preserve-3d" });

        const floatTl = gsap.timeline({ repeat: -1, yoyo: true });
        floatTl.to(glassRef.current, {
            y: "-=6",
            rotationX: "+=2",
            rotationY: "-=2",
            duration: 3 + (index * 0.2),
            ease: "sine.inOut"
        });

        gsap.to(blobRef.current, {
            scale: 1.2,
            opacity: 0.3,
            duration: 4 + (index * 0.3),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        if (svgRef.current) {
            const paths = svgRef.current.querySelectorAll('path, circle, rect, polyline');
            paths.forEach(path => {
                const length = path.getTotalLength ? path.getTotalLength() : 100;
                gsap.set(path, {
                    strokeDasharray: length,
                    strokeDashoffset: length,
                    opacity: 0
                });
            });
        }

    }, { scope: containerRef });

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;

        const normX = (x / width) * 2 - 1;
        const normY = (y / height) * 2 - 1;

        xTo.current(normX * 6);
        yTo.current(normY * 6);

        rxTo.current(normY * -8);
        ryTo.current(normX * 8);

        reflXTo.current(normX * -30);
        reflYTo.current(normY * -30);
    };

    const handleMouseLeave = () => {
        xTo.current(0);
        yTo.current(0);
        rxTo.current(0);
        ryTo.current(0);
        reflXTo.current(0);
        reflYTo.current(0);
    };

    const enhancedIcon = React.isValidElement(icon)
        ? React.cloneElement(icon, {
            ref: svgRef,
            className: "icon-svg relative z-20 stroke-[var(--icon-color)] group-hover:stroke-[var(--icon-hover-color)] transition-all duration-300 will-change-transform w-9 h-9 md:w-10 md:h-10 group-hover:drop-shadow-[0_0_10px_var(--icon-glow)]",
            strokeWidth: "1.5"
        })
        : null;

    return (
        <div
            ref={containerRef}
            className="glass-icon-container relative w-[100px] h-[100px] md:w-[120px] md:h-[120px] flex items-center justify-center cursor-pointer group"
            style={{ '--icon-color': color, '--icon-hover-color': hoverColor, '--icon-glow': glow }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Background glow */}
            <div
                ref={blobRef}
                className="absolute w-full h-full rounded-full opacity-10 blur-[36px] z-0 pointer-events-none"
                style={{ backgroundColor: color }}
            />

            {/* Bordered icon card — same node style as the TEHTER module icons */}
            <div
                ref={glassRef}
                className="glass-circle tehter-node-border absolute top-0 left-0 w-[90px] h-[90px] md:w-[110px] md:h-[110px] rounded-xl flex items-center justify-center z-10 overflow-hidden"
            >
                {/* Glossy Reflection Layer */}
                <div
                    ref={reflectionRef}
                    className="reflection-layer absolute inset-0 z-10 w-[200%] h-[200%] top-[-50%] left-[-50%] pointer-events-none opacity-0"
                    style={{
                        background: 'radial-gradient(circle at center, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 60%)',
                        transform: 'translate(-30%, -30%)'
                    }}
                />

                {/* The Icon */}
                {enhancedIcon}
            </div>

            {/* Number badge overlapping the card's top-left corner — kept
                as a sibling, not a child, of the card above so the card's
                overflow-hidden (needed to clip the reflection sweep)
                doesn't clip the badge too */}
            <span className="step-text tehter-node-number absolute -top-2.5 -left-2.5 w-7 h-7 rounded-full bg-[#111] text-[10px] font-bold flex items-center justify-center z-30">
                {id}
            </span>
        </div>
    );
};

export default GlassIcon;
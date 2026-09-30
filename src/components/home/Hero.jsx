import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useLenis } from 'lenis/react';
import logoVideoSrc from '../../assets/logo-opt.mp4';
import homeHeroVideoSrc from '../../assets/home-hero-opt.mp4';
import { BRAND_STORY } from './brandStory';
import { ArrowRight, FileUp } from 'lucide-react';
import { openEnquiry } from './enquiry';

gsap.registerPlugin(ScrollTrigger);

const contents = [
  {
    heading: "Engineered Metal Solutions.",
    paragraph: BRAND_STORY.core
  }
].map((c) => ({
  ...c,
  headingWords: c.heading.split(' '),
  paragraphWords: c.paragraph.split(' '),
}));

const capabilityStrip = [
  'Engineering',
  'Architectural Metalwork',
  'Façade Solutions',
  'Aluminium & Metal Doors',
  'Precision Fabrication',
  'Structural Steel',
  'Surface Treatment'
];

const processStages = BRAND_STORY.stages; // full 14-stage chain, CONCEPT -> DELIVER
const PROCESS_STEP_MS = 1500; // 14 stages, so a quicker step keeps one full pass ~21s

// Small self-contained animated process line — cycles through each stage
// in strict order, looping, highlighting exactly one stage at a time.
const HeroProcessLine = ({ active }) => {
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % processStages.length);
    }, PROCESS_STEP_MS);
    return () => clearInterval(id);
  }, [active]);

  return (
    <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 max-w-3xl">
      {processStages.map((stage, i) => (
        <React.Fragment key={stage}>
          <span
            className="text-[10px] sm:text-[11px] tracking-[0.12em] font-semibold uppercase whitespace-nowrap transition-colors duration-700 ease-in-out"
            style={{
              color: i === activeStage ? '#FF6B00' : 'rgba(255,255,255,0.45)',
              textShadow: i === activeStage ? '0 0 12px rgba(255,107,0,0.7)' : 'none'
            }}
          >
            {stage}
          </span>
          {i < processStages.length - 1 && (
            <span className="text-white/30 text-[10px] sm:text-xs">→</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
const Hero = ({ onReady }) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const logoVideoRef = useRef(null);
  const heroVideoRef = useRef(null);
  const [activeTextIndex, setActiveTextIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [showText, setShowText] = useState(false);
  const [logoReady, setLogoReady] = useState(false);
  const [heroReady, setHeroReady] = useState(false);
  const [revealedWordCount, setRevealedWordCount] = useState(0);
  const hasAutoPlayed = useRef(false);
  const isAutoScrolling = useRef(false);
  const introDoneRef = useRef(false); // tracks last value dispatched via 'jova-intro-status'
  const updateFrameRef = useRef(() => {});
  const scrollTriggerRef = useRef(null);
  const onReadyFiredRef = useRef(false);
  const lenis = useLenis();
  const logoBlobUrlRef = useRef(null);
  const heroBlobUrlRef = useRef(null);
  const seekersRef = useRef({ logo: null, hero: null });
  const drawActiveRef = useRef(() => {});

  useEffect(() => {
    const logoVideo = logoVideoRef.current;
    const heroVideo = heroVideoRef.current;
    if (!logoVideo || !heroVideo) return;
    let cancelled = false;

    // Seeking is asynchronous. Setting currentTime on every scroll tick and
    // drawing immediately paints the OLD frame, and each new seek aborts the
    // previous one, so frames get skipped. This seeker keeps only ONE seek in
    // flight, remembers the latest wanted time, and draws when 'seeked' fires.
    const makeSeeker = (video) => {
      let target = null;
      let busy = false;
      let busySince = 0;
      const go = () => {
        if (target === null) return;
        const t = target;
        target = null;
        if (Math.abs(video.currentTime - t) < 0.001) return;
        busy = true;
        busySince = performance.now();
        video.currentTime = t;
      };
      const onSeeked = () => {
        busy = false;
        drawActiveRef.current(video);
        go();
      };
      video.addEventListener('seeked', onSeeked);
      return {
        request(t) {
          target = t;
          if (busy && performance.now() - busySince > 300) busy = false; // safety
          if (!busy) go();
        },
        cancel() { target = null; },
        destroy() { video.removeEventListener('seeked', onSeeked); },
      };
    };
    seekersRef.current = { logo: makeSeeker(logoVideo), hero: makeSeeker(heroVideo) };

    const loadAsBlob = async (src, video, onData, blobUrlRef, fallbackSrc) => {
      try {
        let response;
        if ('caches' in window) {
          const cache = await caches.open('jova-hero-videos-v1');
          response = await cache.match(src);
          if (!response) {
            response = await fetch(src);
            if (!response.ok) {
              throw new Error(`Video request failed: ${response.status} ${response.statusText} for ${src}`);
            }
            await cache.put(src, response.clone());
          }
        } else {
          response = await fetch(src);
          if (!response.ok) {
            throw new Error(`Video request failed: ${response.status} ${response.statusText} for ${src}`);
          }
        }
        if (cancelled) return;
        const blob = await response.blob();
        if (cancelled) return;
        const url = URL.createObjectURL(blob);
        blobUrlRef.current = url;
        video.addEventListener('loadeddata', onData, { once: true });
        video.src = url;
        video.load();
      } catch (err) {
        console.error('Failed to preload video, falling back to direct src', err);
        if (cancelled) return;
        video.addEventListener('loadeddata', onData, { once: true });
        video.src = fallbackSrc;
      }
    };
    const primeAndMark = (video, setReady) => {
      video.play().then(() => video.pause()).catch(() => {}).finally(() => setReady(true));
    };

    const onLogoData = () => primeAndMark(logoVideo, setLogoReady);
    const onHeroData = () => primeAndMark(heroVideo, setHeroReady);
    loadAsBlob(logoVideoSrc, logoVideo, onLogoData, logoBlobUrlRef, logoVideoSrc);
    loadAsBlob(homeHeroVideoSrc, heroVideo, onHeroData, heroBlobUrlRef, homeHeroVideoSrc);

    return () => {
      cancelled = true;
      seekersRef.current.logo?.destroy();
      seekersRef.current.hero?.destroy();
      logoVideo.removeEventListener('loadeddata', onLogoData);
      heroVideo.removeEventListener('loadeddata', onHeroData);
      if (logoBlobUrlRef.current) { URL.revokeObjectURL(logoBlobUrlRef.current); logoBlobUrlRef.current = null; }
      if (heroBlobUrlRef.current) { URL.revokeObjectURL(heroBlobUrlRef.current); heroBlobUrlRef.current = null; }
    };
  }, []);

  useGSAP(() => {
    if (!logoReady) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const logoVideo = logoVideoRef.current;
    const heroVideo = heroVideoRef.current;

    const logoDuration = logoVideo.duration || 0;
    const heroDuration = heroReady ? (heroVideo.duration || 0) : 0;
    const LOGO_SPEED = 1.3; // was 2 — slowed down so the intro doesn't feel rushed
    const logoEffectiveDuration = logoDuration / LOGO_SPEED;
    const totalDuration = logoEffectiveDuration + heroDuration;
    if (logoEffectiveDuration === 0) return;

    let activeVideo = logoVideo;

    const drawVideoFrame = (video) => {
      if (!video.videoWidth || !video.videoHeight) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const scale = Math.max(canvas.width / video.videoWidth, canvas.height / video.videoHeight);
      const x = (canvas.width / 2) - (video.videoWidth / 2) * scale;
      const y = (canvas.height / 2) - (video.videoHeight / 2) * scale;
      ctx.drawImage(video, x, y, video.videoWidth * scale, video.videoHeight * scale);
    };

    // Render whichever video is currently active, at a given moment within
    // its own timeline (seconds).
    drawActiveRef.current = (v) => { if (v === activeVideo) drawVideoFrame(v); };

    const render = (overallTime, { seek = true } = {}) => {
      const introFinished = overallTime >= logoEffectiveDuration;
      if (introFinished && !heroReady) {
        drawVideoFrame(logoVideo);
        return introFinished;
      }

      const video = introFinished ? heroVideo : logoVideo;
      const localTime = introFinished
        ? Math.min(overallTime - logoEffectiveDuration, heroDuration)
        : Math.min(overallTime * LOGO_SPEED, logoDuration);

      activeVideo = video;
      if (seek) {
        const target = Math.max(0, Math.min(localTime, video.duration - 0.03));
        (video === heroVideo ? seekersRef.current.hero : seekersRef.current.logo)?.request(target);
      }
      drawVideoFrame(video);

      return introFinished;
    };
    render(0);
    if (!onReadyFiredRef.current) {
      onReadyFiredRef.current = true;
      window.dispatchEvent(new CustomEvent('jova-hero-ready'));
      onReady && onReady(); // also call the prop, in case a parent wires this directly instead
    }

    const sequence = { t: 0 };
    const updateFrame = (overallTime, opts) => {
      const introFinished = render(overallTime, opts);

      if (!introFinished || !heroReady) {
        setShowText(false);
        setIsFinished(false);
      } else {
        setShowText(true);
        const heroProgress = (overallTime - logoEffectiveDuration) / heroDuration;

        // The intro ENDS on the fully revealed hero (heading, tagline, capability
        // strip, CTAs, process line). It never fades out at the end of the video;
        // the sticky section simply scrolls away naturally afterwards.
        setIsFinished(false);

        const segment = 1 / contents.length;
        const progress = Math.min(1, Math.max(0, heroProgress));
        const rawIndex = Math.min(Math.floor(progress / segment), contents.length - 1);
        setActiveTextIndex(rawIndex);
        const localT = (progress - rawIndex * segment) / segment;
        const current = contents[rawIndex];
        const totalWords = current.headingWords.length + current.paragraphWords.length;
        // Finish revealing by 60% of the hero video so a skipped frame or a
        // fast scroll can never leave the last words unrevealed.
        const REVEAL_END = 0.6;
        const count = Math.min(
          totalWords,
          Math.ceil(Math.min(1, Math.max(0, localT) / REVEAL_END) * totalWords)
        );
        // Never let the count go backwards during autoplay (prevents flicker).
        setRevealedWordCount((prev) => (isAutoScrolling.current ? Math.max(prev, count) : count));
      }
      const effectiveIntroFinished = introFinished && heroReady;
      if (effectiveIntroFinished !== introDoneRef.current) {
        introDoneRef.current = effectiveIntroFinished;
        window.dispatchEvent(new CustomEvent('jova-intro-status', { detail: { done: effectiveIntroFinished } }));
      }
    };
    updateFrameRef.current = updateFrame;

    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.5, // Smooth scrubbing
      animation: gsap.to(sequence, {
        t: totalDuration,
        ease: "none",
        // While the intro autoplays, the video drives the canvas - ignore scroll updates
        onUpdate: () => { if (!isAutoScrolling.current) updateFrame(sequence.t); },
      })
    });
    scrollTriggerRef.current = st;
    ScrollTrigger.refresh();

  }, { scope: containerRef, dependencies: [logoReady, heroReady] });

  useEffect(() => {
    if (!logoReady) return;

    const triggerAutoPlay = () => {
      if (hasAutoPlayed.current || isAutoScrolling.current) return;
      if (window.scrollY > 10) return; // only from the very top
      const container = containerRef.current;
      if (!container) return;

      hasAutoPlayed.current = true;
      isAutoScrolling.current = true;

      const logoDuration = logoVideoRef.current.duration || 0;
      const heroDuration = heroReady ? (heroVideoRef.current.duration || 0) : 0;
      const LOGO_SPEED = 1.3; // must match the value in the main render effect above
      const logoEffectiveDuration = logoDuration / LOGO_SPEED;
      const totalDuration = logoEffectiveDuration + heroDuration;
      if (totalDuration === 0) return;
      const targetOverallTime = totalDuration;
      const scrollableHeight = container.offsetHeight - window.innerHeight;
      const targetY = container.offsetTop + scrollableHeight;

      const scrollDuration = 2.2; 

      // NOTE: the ScrollTrigger is intentionally NOT disabled/re-enabled here.
      // Re-enabling resets its progress to 0 and it then scrubbed 0 -> 1 in
      // ~0.5s, which rewound the video and flashed all the hero text/CTAs.
      const finishAutoScroll = () => {
        isAutoScrolling.current = false;
      };

      if (lenis) {
        lenis.scrollTo(targetY, {
          duration: scrollDuration,
          easing: (t) => 1 - Math.pow(1 - t, 3),
          lock: true,
        });
      } else {
        window.scrollTo({ top: targetY, behavior: 'smooth' });
      }

      // Play the videos for real (sequential decoding = smooth, no skipped
      // frames) at their natural speed, instead of compressing the whole
      // timeline into a few seconds and seeking to every frame.
      const logoVideo = logoVideoRef.current;
      const heroVideo = heroVideoRef.current;
      let rafId = 0;
      let phase = 'logo';
      let done = false;

      const stopPlayback = () => {
        cancelAnimationFrame(rafId);
        logoVideo.removeEventListener('ended', onLogoEnded);
        heroVideo.removeEventListener('ended', onHeroEnded);
        logoVideo.pause();
        heroVideo.pause();
        logoVideo.playbackRate = 1;
      };
      const finish = () => {
        if (done) return;
        done = true;
        stopPlayback();
        updateFrameRef.current(totalDuration); // park at the end; scroll-scrub continues from here
        finishAutoScroll();
      };
      const tick = () => {
        const overall = phase === 'logo'
          ? Math.min(logoVideo.currentTime / LOGO_SPEED, logoEffectiveDuration - 0.001)
          : logoEffectiveDuration + heroVideo.currentTime;
        updateFrameRef.current(overall, { seek: false });
        rafId = requestAnimationFrame(tick);
      };
      const onLogoEnded = () => {
        phase = 'hero';
        if (heroVideo.readyState < 2 || !heroVideo.duration) { finish(); return; }
        heroVideo.currentTime = 0;
        heroVideo.playbackRate = 1;
        heroVideo.play().catch(finish);
      };
      const onHeroEnded = () => finish();

      seekersRef.current.logo?.cancel();
      seekersRef.current.hero?.cancel();
      logoVideo.addEventListener('ended', onLogoEnded);
      heroVideo.addEventListener('ended', onHeroEnded);
      logoVideo.currentTime = 0;
      logoVideo.playbackRate = LOGO_SPEED;
      logoVideo.play()
        .then(() => { rafId = requestAnimationFrame(tick); })
        .catch(() => {
          // Playback blocked: fall back to the timed scrub at natural speed
          stopPlayback();
          const autoSequence = { t: 0 };
          gsap.to(autoSequence, {
            t: totalDuration,
            duration: totalDuration,
            ease: 'none',
            onUpdate: () => updateFrameRef.current(autoSequence.t),
            onComplete: finish,
          });
        });

      // Safety net: never leave the hero in "autoplaying" state if 'ended' doesn't fire
      setTimeout(finish, (totalDuration + 4) * 1000);
    };

    const handleWheel = (e) => {
      if (e.deltaY > 0) triggerAutoPlay();
    };
    const handleTouchMove = () => triggerAutoPlay();
    const handleKeyDown = (e) => {
      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) triggerAutoPlay();
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lenis, logoReady, heroReady]);

  const currentHeroContent = contents[activeTextIndex];
  const totalWordsCurrent = currentHeroContent
    ? currentHeroContent.headingWords.length + currentHeroContent.paragraphWords.length
    : 0;
  const extrasVisible = showText && !isFinished && revealedWordCount >= totalWordsCurrent;

  return (
    <section ref={containerRef} id="home" className="relative w-full h-[400dvh] bg-black">
      {/* Sticky Container */}
      <div className="sticky top-0 left-0 w-full h-dvh overflow-hidden flex flex-col justify-center items-center">
  
        <video
          ref={logoVideoRef}
          muted
          playsInline
          preload="auto"
          style={{ position: 'absolute', width: 1, height: 1, opacity: 0, pointerEvents: 'none', overflow: 'hidden' }}
        />
        <video
          ref={heroVideoRef}
          muted
          playsInline
          preload="auto"
          style={{ position: 'absolute', width: 1, height: 1, opacity: 0, pointerEvents: 'none', overflow: 'hidden' }}
        />

        <canvas
          ref={canvasRef}
          width={1920}
          height={1080}
          className="absolute top-0 left-0 w-full h-full object-cover opacity-80"
        ></canvas>

        {/* Dark overlay for text legibility against busy sky/building backdrop */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-black/45 z-[5]"></div>

        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-4">
          <div className="flex flex-col items-center justify-center text-center px-8 py-16 md:px-16 md:py-24 w-full max-w-4xl">
            <style>{`
              @keyframes jova-word-in {
                from { opacity: 0; transform: translateY(14px); }
                to { opacity: 1; transform: translateY(0); }
              }
              .jova-word {
                display: inline-block;
                animation: jova-word-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
              }
              /* Same fade-in, but WITHOUT display:inline-block so flex layouts keep working */
              .jova-fade {
                animation: jova-word-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
              }
            `}</style>
            <div className={`transition-opacity duration-700 ease-in-out flex flex-col items-center text-center ${showText && !isFinished ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
              <p
                className="text-metallic text-xs sm:text-sm font-semibold tracking-[0.35em] uppercase mb-4"
                style={{ textShadow: '0 2px 6px rgba(0,0,0,0.8)' }}
              >
                Jova Metcraft
              </p>
              <h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-[0.1em] uppercase mb-6 text-[#FF6B00]"
                style={{ textShadow: '0 2px 4px rgba(0,0,0,0.9), 0 4px 16px rgba(0,0,0,0.7), 0 0 40px rgba(0,0,0,0.5)' }}
              >
                {contents[activeTextIndex]?.headingWords.map((word, i) =>
                  i < revealedWordCount ? (
                    <span key={`${activeTextIndex}-h-${i}`} className="jova-word mr-[0.3em]">
                      {word}
                    </span>
                  ) : null
                )}
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-light uppercase tracking-[0.14em] text-white drop-shadow-md">
                {contents[activeTextIndex]?.paragraphWords.map((word, i) => {
                  const globalIndex = i + contents[activeTextIndex].headingWords.length;
                  return globalIndex < revealedWordCount ? (
                    <span key={`${activeTextIndex}-p-${i}`} className="jova-word mr-[0.28em]">
                      {word}
                    </span>
                  ) : null;
                })}
              </p>

              {/* Capability strip, CTAs and process line only appear once
                  the heading + tagline have fully finished revealing, so
                  they don't compete with the word-by-word reveal above. */}
              {extrasVisible && (
                <div className="jova-fade flex flex-col items-center gap-5 sm:gap-6 mt-6 pb-4 w-full">
                  <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 max-w-3xl text-[11px] sm:text-sm tracking-wide text-white/75 uppercase">
                    {capabilityStrip.map((cap, i) => (
                      <React.Fragment key={cap}>
                        <span>{cap}</span>
                        {i < capabilityStrip.length - 1 && (
                          <span style={{ color: '#FF6B00' }}>|</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                    <button
                      type="button"
                      onClick={() => openEnquiry('enquiry', lenis)}
                      className="h-12 sm:h-14 inline-flex items-center justify-center gap-2 whitespace-nowrap px-7 rounded-full text-sm font-semibold uppercase tracking-wide transition-transform duration-200 hover:scale-105 box-border"
                      style={{
                        background: 'linear-gradient(145deg, #FF7A00, #FF6B00)',
                        color: '#1a1310',
                        boxShadow: '0 8px 24px rgba(255,107,0,0.4)'
                      }}
                    >
                      Start a Project Enquiry
                      <ArrowRight size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => openEnquiry('upload', lenis)}
                      className="h-12 sm:h-14 inline-flex items-center justify-center gap-2 whitespace-nowrap px-7 rounded-full text-sm font-semibold uppercase tracking-wide border border-white/40 text-white transition-colors duration-200 hover:border-[#FF6B00] hover:text-[#FF6B00] box-border"
                    >
                      <FileUp size={16} />
                      Upload Drawings
                    </button>
                  </div>

                  <HeroProcessLine active={extrasVisible} />
                </div>
              )}
            </div>

            <div className={`absolute bottom-8 md:bottom-12 animate-bounce text-white/50 transition-opacity duration-500 ${extrasVisible ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
              <span className="text-xs uppercase tracking-widest block mb-2">Scroll</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mx-auto">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
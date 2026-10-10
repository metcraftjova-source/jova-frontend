import React, { useEffect, useRef, useState } from 'react';

/**
 * Replaces the old ImageSequence component (which drew hundreds of
 * individually-loaded JPGs to a canvas). Since these usages just loop
 * continuously and were never scroll-scrubbed, a real <video> element does
 * the same job with a fraction of the payload and no manual frame-drawing
 * logic needed.
 *
 * - Pauses playback while off-screen (perf), resumes on re-entry.
 * - Optional onProgress(currentTime, duration) fires on 'timeupdate', for
 *   callers that used to derive UI state from frame progress.
 */
const VideoLoop = ({ src, className = '', onProgress }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  // The video file is only requested once this component is near the screen,
  // so it never delays the page's initial load.
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    const video = videoRef.current;
    if (!el || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          video.play().catch(() => {}); // autoplay can be blocked pre-interaction; harmless if so
        } else {
          video.pause();
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !onProgress) return;
    const handle = () => onProgress(video.currentTime, video.duration || 1);
    video.addEventListener('timeupdate', handle);
    return () => video.removeEventListener('timeupdate', handle);
  }, [onProgress]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <video
        ref={videoRef}
        src={shouldLoad ? src : undefined}
        className="w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
    </div>
  );
};

export default VideoLoop;

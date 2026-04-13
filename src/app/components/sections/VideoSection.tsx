'use client';

import { useRef, useState } from 'react';

const VIDEO_ID = '0qquYVjZ5-g';

export default function VideoSection() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [playing, setPlaying] = useState(true); // starts playing due to autoplay

  function postCommand(command: string) {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: 'command', func: command }),
      '*'
    );
  }

  function togglePlay() {
    if (playing) {
      postCommand('pauseVideo');
    } else {
      postCommand('playVideo');
    }
    setPlaying(!playing);
  }

  return (
    <section className="relative bg-white pt-0 pb-6 overflow-hidden">
      <div
        className="group mx-24 sm:mx-40 lg:mx-64 rounded-2xl overflow-hidden relative"
        style={{ aspectRatio: '16/5' }}
      >
        <iframe
          ref={iframeRef}
          src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${VIDEO_ID}&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&enablejsapi=1`}
          title="Video"
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="border-0 absolute left-0 top-1/2 -translate-y-1/2"
          style={{ width: '100%', height: '200%' }}
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Play/Pause button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={togglePlay}
            className="w-16 h-16 rounded-full bg-black/60 flex items-center justify-center cursor-pointer"
          >
            {playing ? (
              // Pause icon
              <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              // Play icon
              <svg className="w-7 h-7 text-white translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useRef, useState } from 'react';

const VIDEO_ID = '9wxD6q2PMaw';

export default function VideoSection() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [playing, setPlaying] = useState(true); // starts playing due to autoplay
  const [muted, setMuted] = useState(true); // starts muted

  function postCommand(command: string) {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: 'command', func: command }),
      '*'
    );
  }

  function toggleMute() {
    postCommand(muted ? 'unMute' : 'mute');
    setMuted(!muted);
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
      <div className="w-full md:w-[92%] max-w-445 mx-auto">
      <div
        className="group rounded-none md:rounded-2xl overflow-hidden relative h-64 md:h-207.5"
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ aspectRatio: '16/9', minHeight: '100%', minWidth: '100%' }}
        >
          <iframe
            ref={iframeRef}
            src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${VIDEO_ID}&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&enablejsapi=1`}
            title="Video"
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="border-0 w-full h-full"
          />
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Mute button */}
        <button
          onClick={toggleMute}
          className="absolute top-6 right-6 z-30 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/60 transition-colors"
          aria-label={muted ? 'Ativar som' : 'Silenciar'}
        >
          {muted ? (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0 0 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06A8.99 8.99 0 0 0 17.73 18.6L19 19.73 20.73 18 4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
          )}
        </button>

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
      </div>
    </section>
  );
}

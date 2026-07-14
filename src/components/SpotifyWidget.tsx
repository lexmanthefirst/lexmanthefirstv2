import React, { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'

interface SpotifyTrack {
  isPlaying: boolean
  title?: string
  artist?: string
  albumImageUrl?: string
  songUrl?: string
  message?: string
}

export const SpotifyWidget: React.FC = () => {
  const [track, setTrack] = useState<SpotifyTrack>({ isPlaying: false })
  const [loading, setLoading] = useState(true)

  const fetchNowPlaying = async () => {
    try {
      const res = await fetch('/now-playing')
      if (res.ok) {
        const data = await res.json() as SpotifyTrack
        setTrack(data)
      }
    } catch (e) {
      // Fallback silently
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNowPlaying()
    const interval = setInterval(fetchNowPlaying, 30000) // Poll every 30s
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-zinc-600 text-xs mt-6">
        <Icon icon="solar:music-library-linear" className="animate-pulse" width="16" />
        <span>Checking Spotify...</span>
      </div>
    )
  }

  return (
    <div className="mt-6 border border-white/5 bg-white/[0.02] backdrop-blur-sm rounded-xl p-3.5 max-w-xs flex items-center gap-3">
      {track.isPlaying && track.albumImageUrl ? (
        <>
          {/* Album Cover Art */}
          <a 
            href={track.songUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="relative shrink-0 w-10 h-10 rounded overflow-hidden group/album"
          >
            <img 
              src={track.albumImageUrl} 
              alt={track.title} 
              className="w-full h-full object-cover group-hover/album:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/album:opacity-100 transition-opacity">
              <Icon icon="solar:play-bold" width="14" className="text-lime-400" />
            </div>
          </a>

          {/* Song Meta */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-lime-400 font-semibold tracking-wider uppercase flex items-center gap-1">
                {/* Audio Wave Visualizer Animation */}
                <span className="flex items-end gap-[2px] h-2.5 w-3 mb-0.5">
                  <span className="bg-lime-400 w-[2px] rounded-full animate-[bar-wave_1.2s_ease-in-out_infinite]"></span>
                  <span className="bg-lime-400 w-[2px] rounded-full animate-[bar-wave_1.2s_ease-in-out_0.3s_infinite] h-2"></span>
                  <span className="bg-lime-400 w-[2px] rounded-full animate-[bar-wave_1.2s_ease-in-out_0.6s_infinite]"></span>
                </span>
                Now Playing
              </span>
            </div>
            <a 
              href={track.songUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs font-semibold text-white hover:text-lime-400 transition-colors block truncate"
            >
              {track.title}
            </a>
            <span className="text-[10px] text-zinc-500 block truncate">{track.artist}</span>
          </div>
        </>
      ) : (
        <>
          {/* Offline / Idle Icon */}
          <div className="w-10 h-10 rounded bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-600 shrink-0">
            <Icon icon="ri:spotify-fill" width="20" />
          </div>

          {/* Idle Meta */}
          <div className="flex-1 min-w-0">
            <span className="text-[10px] text-zinc-600 font-semibold tracking-wider uppercase block">Spotify</span>
            <span className="text-xs text-zinc-500 block truncate">Not Listening</span>
          </div>
        </>
      )}
    </div>
  )
}

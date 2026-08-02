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
    const interval = setInterval(fetchNowPlaying, 15000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center gap-2.5 text-zinc-500 text-xs font-normal">
        <Icon icon="ri:spotify-fill" width="16" className="animate-spin text-emerald-500/70" />
        <span>Connecting Spotify...</span>
      </div>
    )
  }

  return (
    <div className="w-full sm:w-auto">
      {track.title && track.albumImageUrl ? (
        <a
          href={track.songUrl || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 p-2.5 pr-4 rounded-xl bg-zinc-900/50 hover:bg-zinc-900/80 border border-white/10 hover:border-emerald-500/40 backdrop-blur-md shadow-md transition-all duration-300 max-w-full sm:max-w-xs"
        >
          {/* Spinning Vinyl Album Cover Art */}
          <div className="relative shrink-0 w-10 h-10 rounded-full overflow-hidden border border-white/15 shadow-sm group-hover:scale-105 transition-transform duration-300">
            <img
              src={track.albumImageUrl}
              alt={track.title}
              className={`w-full h-full object-cover ${track.isPlaying ? 'animate-[spin_20s_linear_infinite]' : ''}`}
            />
            {/* Center vinyl hole */}
            <div className="absolute inset-0 m-auto w-2.5 h-2.5 rounded-full bg-zinc-950/80 border border-white/20"></div>
          </div>

          {/* Track Details */}
          <div className="min-w-0 flex-1 text-xs">
            <div className="flex items-center gap-1.5 mb-0.5">
              {track.isPlaying ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="text-emerald-400 text-xs font-medium">
                    Now playing
                  </span>
                </>
              ) : (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-500"></span>
                  <span className="text-zinc-400 text-xs font-medium">
                    Offline • Last played
                  </span>
                </>
              )}
            </div>

            <p className="font-semibold text-zinc-100 group-hover:text-emerald-400 transition-colors truncate max-w-[140px] xs:max-w-[180px] sm:max-w-[170px] text-[13px] leading-tight">
              {track.title}
            </p>
            <p className="text-[11px] text-zinc-400 truncate max-w-[140px] xs:max-w-[180px] sm:max-w-[170px]">
              {track.artist}
            </p>
          </div>

          {/* Spotify Icon */}
          <div className="shrink-0 pl-1 text-zinc-400 group-hover:text-emerald-400 transition-colors">
            <Icon icon="ri:spotify-fill" width="18" />
          </div>
        </a>
      ) : (
        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <Icon icon="ri:spotify-fill" width="16" className="text-zinc-500 shrink-0" />
          <span className="font-normal text-xs">Not Listening</span>
        </div>
      )}
    </div>
  )
}

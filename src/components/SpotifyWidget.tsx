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
    const interval = setInterval(fetchNowPlaying, 30000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-zinc-500 text-xs font-normal">
        <Icon icon="ri:spotify-fill" width="14" className="animate-pulse" />
        <span>Spotify</span>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3.5">
      {track.isPlaying && track.albumImageUrl ? (
        <>
          <a 
            href={track.songUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="relative shrink-0 w-8 h-8 rounded-md overflow-hidden group border border-white/10"
          >
            <img 
              src={track.albumImageUrl} 
              alt={track.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            />
          </a>

          <div className="min-w-0 text-xs">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="flex items-end gap-[2px] h-2.5 w-2.5">
                <span className="bg-emerald-400 w-[2px] rounded-full animate-[bar-wave_1.2s_ease-in-out_infinite]"></span>
                <span className="bg-emerald-400 w-[2px] rounded-full animate-[bar-wave_1.2s_ease-in-out_0.3s_infinite] h-2"></span>
                <span className="bg-emerald-400 w-[2px] rounded-full animate-[bar-wave_1.2s_ease-in-out_0.6s_infinite]"></span>
              </span>
              <span className="text-emerald-400 text-[10px] font-semibold tracking-wide uppercase">
                Now Playing
              </span>
            </div>
            <a 
              href={track.songUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-medium text-white hover:underline truncate block max-w-[180px]"
            >
              {track.title}
            </a>
            <span className="text-[11px] text-zinc-500 truncate block max-w-[180px]">{track.artist}</span>
          </div>
        </>
      ) : (
        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <Icon icon="ri:spotify-fill" width="16" className="text-zinc-500 shrink-0" />
          <span className="font-normal text-xs">Not Listening</span>
        </div>
      )}
    </div>
  )
}

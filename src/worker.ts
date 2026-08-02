export interface Env {
  SPOTIFY_CLIENT_ID: string
  SPOTIFY_CLIENT_SECRET: string
  SPOTIFY_REFRESH_TOKEN: string
  ASSETS: { fetch: typeof fetch }
}

export default {
  async fetch(request: Request, env: Env, _ctx: any): Promise<Response> {
    const url = new URL(request.url)

    if (url.pathname === '/now-playing') {
      const clientId = env.SPOTIFY_CLIENT_ID
      const clientSecret = env.SPOTIFY_CLIENT_SECRET
      const refreshToken = env.SPOTIFY_REFRESH_TOKEN

      const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json',
      }

      if (request.method === 'OPTIONS') {
        return new Response(null, { status: 204, headers })
      }

      if (!clientId || !clientSecret || !refreshToken) {
        return new Response(
          JSON.stringify({ 
            isPlaying: false, 
            message: 'Spotify credentials missing in environment variables.' 
          }), 
          { status: 200, headers }
        )
      }

      try {
        // 1. Get access token
        const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers: {
            'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
          }),
        })

        if (!tokenResponse.ok) {
          const errorText = await tokenResponse.text()
          return new Response(
            JSON.stringify({ isPlaying: false, error: 'Token refresh failed', details: errorText }),
            { status: 200, headers }
          )
        }

        const tokenData = await tokenResponse.json() as { access_token: string }
        const accessToken = tokenData.access_token

        // 2. Fetch currently playing track
        const spotifyResponse = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        })

        if (spotifyResponse.status === 200) {
          const trackData = await spotifyResponse.json() as any
          if (trackData && trackData.item) {
            return new Response(
              JSON.stringify({
                isPlaying: Boolean(trackData.is_playing),
                title: trackData.item.name,
                artist: trackData.item.artists?.map((art: any) => art.name).join(', '),
                album: trackData.item.album?.name,
                albumImageUrl: trackData.item.album?.images?.[0]?.url,
                songUrl: trackData.item.external_urls?.spotify,
              }),
              { status: 200, headers }
            )
          }
        }

        // 3. Fallback: Fetch recently played track
        const recentResponse = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        })

        if (recentResponse.status === 200) {
          const recentData = await recentResponse.json() as any
          const lastTrack = recentData.items?.[0]?.track
          if (lastTrack) {
            return new Response(
              JSON.stringify({
                isPlaying: false,
                title: lastTrack.name,
                artist: lastTrack.artists?.map((art: any) => art.name).join(', '),
                album: lastTrack.album?.name,
                albumImageUrl: lastTrack.album?.images?.[0]?.url,
                songUrl: lastTrack.external_urls?.spotify,
              }),
              { status: 200, headers }
            )
          }
        }

        return new Response(
          JSON.stringify({ isPlaying: false, message: 'No track found' }),
          { status: 200, headers }
        )
      } catch (error: any) {
        return new Response(
          JSON.stringify({ isPlaying: false, error: error.message }),
          { status: 500, headers }
        )
      }
    }

    // Serve static asset from dist for all other routes
    return env.ASSETS.fetch(request)
  },
}

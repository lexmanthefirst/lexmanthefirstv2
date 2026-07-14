interface Env {
  SPOTIFY_CLIENT_ID: string
  SPOTIFY_CLIENT_SECRET: string
  SPOTIFY_REFRESH_TOKEN: string
}

export const onRequest = async (context: {
  request: Request
  env: Env
}) => {
  const { env } = context
  const clientId = env.SPOTIFY_CLIENT_ID
  const clientSecret = env.SPOTIFY_CLIENT_SECRET
  const refreshToken = env.SPOTIFY_REFRESH_TOKEN

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  }

  // Handle preflight requests
  if (context.request.method === 'OPTIONS') {
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
    // 1. Get updated access token
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

    if (spotifyResponse.status === 204 || spotifyResponse.status > 400) {
      return new Response(
        JSON.stringify({ isPlaying: false, message: 'No track currently playing' }),
        { status: 200, headers }
      )
    }

    const trackData = await spotifyResponse.json() as any
    if (!trackData || !trackData.item) {
      return new Response(
        JSON.stringify({ isPlaying: false, message: 'No track playing' }),
        { status: 200, headers }
      )
    }

    const isPlaying = trackData.is_playing
    const title = trackData.item.name
    const artist = trackData.item.artists.map((art: any) => art.name).join(', ')
    const album = trackData.item.album.name
    const albumImageUrl = trackData.item.album.images[0]?.url
    const songUrl = trackData.item.external_urls.spotify

    return new Response(
      JSON.stringify({
        isPlaying,
        title,
        artist,
        album,
        albumImageUrl,
        songUrl,
      }),
      { status: 200, headers }
    )
  } catch (error: any) {
    return new Response(
      JSON.stringify({ isPlaying: false, error: error.message }),
      { status: 500, headers }
    )
  }
}

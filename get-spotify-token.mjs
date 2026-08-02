import http from 'http'
import { exec } from 'child_process'

const clientId = process.env.SPOTIFY_CLIENT_ID || process.argv[2]
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET || process.argv[3]

if (!clientId || !clientSecret) {
  console.error('\n❌ Usage: node get-spotify-token.mjs <CLIENT_ID> <CLIENT_SECRET>\n')
  process.exit(1)
}

const PORT = process.env.PORT || 8888
const REDIRECT_URI = `http://127.0.0.1:${PORT}/callback`
const SCOPE = 'user-read-currently-playing user-read-playback-state user-read-recently-played'

const authUrl = `https://accounts.spotify.com/authorize?` + new URLSearchParams({
  response_type: 'code',
  client_id: clientId,
  scope: SCOPE,
  redirect_uri: REDIRECT_URI,
}).toString()

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`)
  if (url.pathname === '/callback') {
    const code = url.searchParams.get('code')
    const error = url.searchParams.get('error')

    if (error) {
      res.end(`<h1>Authorization Failed</h1><p>${error}</p>`)
      console.error('❌ Authorization error:', error)
      server.close()
      process.exit(1)
    }

    if (code) {
      try {
        const authHeader = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
        const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers: {
            'Authorization': `Basic ${authHeader}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            grant_type: 'authorization_code',
            code,
            redirect_uri: REDIRECT_URI,
          }),
        })

        const data = await tokenRes.json()

        if (data.refresh_token) {
          res.end(`
            <div style="font-family: sans-serif; padding: 2rem;">
              <h1 style="color: #1DB954;">Success!</h1>
              <p>Your Spotify Refresh Token is:</p>
              <pre style="background: #eee; padding: 1rem; border-radius: 6px;">${data.refresh_token}</pre>
              <p>You can close this tab and check your terminal.</p>
            </div>
          `)
          console.log('\n======================================================')
          console.log('✅ SUCCESS! Your Refresh Token:')
          console.log('------------------------------------------------------')
          console.log(data.refresh_token)
          console.log('======================================================\n')
          console.log('Add the following to your .dev.vars file:\n')
          console.log(`SPOTIFY_CLIENT_ID="${clientId}"`)
          console.log(`SPOTIFY_CLIENT_SECRET="${clientSecret}"`)
          console.log(`SPOTIFY_REFRESH_TOKEN="${data.refresh_token}"\n`)
        } else {
          res.end(`<h1>Failed to get Refresh Token</h1><pre>${JSON.stringify(data, null, 2)}</pre>`)
          console.error('❌ Token response error:', data)
        }
      } catch (err) {
        res.end(`<h1>Error</h1><p>${err.message}</p>`)
        console.error('❌ Error exchanging code:', err)
      } finally {
        server.close()
        process.exit(0)
      }
    }
  }
})

server.listen(PORT, '127.0.0.1', () => {
  console.log(`\n🔑 Spotify Auth Helper running on http://127.0.0.1:${PORT}`)
  console.log(`1. Ensure 'http://127.0.0.1:${PORT}/callback' is added under Redirect URIs in your Spotify Developer App settings.`)
  console.log(`2. If the browser does not open automatically, open this link manually:\n`)
  console.log(`   ${authUrl}\n`)
  
  const startCmd = process.platform === 'win32' ? 'start ""' : process.platform === 'darwin' ? 'open' : 'xdg-open'
  exec(`${startCmd} "${authUrl}"`)
})

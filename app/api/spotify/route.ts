import { NextResponse } from "next/server"

export async function GET() {
  const clientId = process.env.SPOTIFY_CLIENT_ID!
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN!

  const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Authorization": `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ grant_type: "refresh_token", refresh_token: refreshToken }),
    cache: "no-store",
  })

  const { access_token } = await tokenRes.json()

  const topRes = await fetch("https://api.spotify.com/v1/me/top/tracks?limit=1&time_range=short_term", {
    headers: { Authorization: `Bearer ${access_token}` },
    cache: "no-store",
  })

  const topData = await topRes.json()
  const item = topData.items?.[0]

  if (!item) return NextResponse.json({ error: "No top track found" }, { status: 404 })

  return NextResponse.json({
    accessToken: access_token,
    track: {
      name: item.name,
      artist: item.artists.map((a: { name: string }) => a.name).join(", "),
      album: item.album.name,
      albumArt: item.album.images[0]?.url ?? "",
      duration: item.duration_ms,
      uri: item.uri,
    },
  })
}

import { v2 as cloudinary } from "cloudinary"
import { NextResponse } from "next/server"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function GET() {
  try {
    const result = await cloudinary.api.resources({
      type: "upload",
      max_results: 100,
      resource_type: "image",
    })

    const images = result.resources
      .filter((r: any) =>
        !r.public_id.startsWith("samples/") &&
        !r.public_id.startsWith("cld-sample") &&
        r.public_id !== "sample" &&
        r.public_id !== "main-sample"
      )
      .map((r: any) => ({
        publicId: r.public_id,
        url: r.secure_url,
        width: r.width,
        height: r.height,
      }))

    return NextResponse.json({ images })
  } catch (err: any) {
    console.error("Cloudinary error:", JSON.stringify(err, null, 2))
    return NextResponse.json({ error: err?.message ?? err?.error?.message ?? JSON.stringify(err) }, { status: 500 })
  }
}

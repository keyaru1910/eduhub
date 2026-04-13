import { NextResponse } from 'next'
import { requireAdminSession } from '@/server/auth/session'
import { adminResources } from '@/server/admin'
import { normalizeError } from '@/server/api'
import { generateSlug } from '@/utils/helpers'

export async function GET() {
  try {
    await requireAdminSession()
    const items = await adminResources.lessons.list()
    return NextResponse.json({ success: true, data: items })
  } catch (error) {
    return NextResponse.json(
      { success: false, ...normalizeError(error) },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    await requireAdminSession()
    const data = await request.json()
    
    // Auto-generate slug if skipped
    if (!data.slug) {
      data.slug = generateSlug(data.title)
    }

    // Convert order to number and clean videoUrl
    data.order = Number(data.order) || 0
    if (!data.videoUrl) data.videoUrl = null

    const item = await adminResources.lessons.create(data)
    return NextResponse.json({ success: true, data: item })
  } catch (error) {
    return NextResponse.json(
      { success: false, ...normalizeError(error) },
      { status: 400 }
    )
  }
}

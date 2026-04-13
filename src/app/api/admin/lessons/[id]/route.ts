import { NextResponse } from 'next'
import { requireAdminSession } from '@/server/auth/session'
import { adminResources } from '@/server/admin'
import { normalizeError } from '@/server/api'
import { generateSlug } from '@/utils/helpers'

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdminSession()
    const { id } = await params
    const data = await request.json()

    // Auto-generate slug if cleared
    if (data.title && !data.slug) {
      data.slug = generateSlug(data.title)
    }
    
    if (data.order !== undefined) {
      data.order = Number(data.order) || 0
    }

    const item = await adminResources.lessons.update(id, data)
    return NextResponse.json({ success: true, data: item })
  } catch (error) {
    return NextResponse.json(
      { success: false, ...normalizeError(error) },
      { status: 400 }
    )
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdminSession()
    const { id } = await params
    await adminResources.lessons.remove(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { success: false, ...normalizeError(error) },
      { status: 400 }
    )
  }
}

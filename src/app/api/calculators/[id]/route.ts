import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { verifyToken } from '@/lib/jwt'
import { cookies } from 'next/headers'

type Params = { params: Promise<{ id: string }> }

async function getAuthUserId(): Promise<string | null> {
  try {
    const token = (await cookies()).get('access_token')?.value
    if (!token) return null
    const payload = await verifyToken(token)
    return payload.sub as string
  } catch {
    return null
  }
}

// GET /api/calculators/[id]
export async function GET(_req: NextRequest, { params }: Params) {
  const userId = await getAuthUserId()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const supabase = createAdminClient()
  const { data, error } = await supabase.from('calculators').select('*').eq('id', id).single()

  if (error) return NextResponse.json({ error: error.message }, { status: 404 })
  return NextResponse.json(data)
}

// PATCH /api/calculators/[id]
export async function PATCH(req: NextRequest, { params }: Params) {
  const userId = await getAuthUserId()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const body = await req.json()
  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('calculators')
    .update({
      title: body.title,
      slug: body.slug,
      description: body.description,
      category: body.category,
      status: body.status,
      seo_title: body.seo_title,
      seo_description: body.seo_description,
      config: body.config,
      content: body.content,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    const status = error.code === '23505' ? 409 : 500
    return NextResponse.json({ error: error.message, code: error.code }, { status })
  }
  return NextResponse.json(data)
}

// DELETE /api/calculators/[id]
export async function DELETE(_req: NextRequest, { params }: Params) {
  const userId = await getAuthUserId()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const supabase = createAdminClient()
  const { error } = await supabase.from('calculators').delete().eq('id', id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return new NextResponse(null, { status: 204 })
}

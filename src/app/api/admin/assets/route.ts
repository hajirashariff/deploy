import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = createServerClient()
    
    const { data, error } = await supabase
      .from('assets')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching assets:', error)
      return NextResponse.json({ error: 'Failed to fetch assets' }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Assets API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const supabase = createServerClient()

    const { data, error } = await supabase
      .from('assets')
      .insert([{
        name: body.name,
        type: body.type,
        status: body.status || 'active',
        description: body.description,
        location: body.location,
        vendor: body.vendor,
        serial_number: body.serial_number,
        purchase_date: body.purchase_date
      }])
      .select()

    if (error) {
      console.error('Error creating asset:', error)
      return NextResponse.json({ error: 'Failed to create asset' }, { status: 500 })
    }

    return NextResponse.json(data[0])
  } catch (error) {
    console.error('Assets API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

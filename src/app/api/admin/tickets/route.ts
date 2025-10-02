import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = createServerClient()
    
    const { data, error } = await supabase
      .from('tickets')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching tickets:', error)
      return NextResponse.json({ error: 'Failed to fetch tickets' }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Tickets API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const supabase = createServerClient()

    // Generate ticket number
    const ticketNumber = `TKT-${Date.now().toString().slice(-6)}`

    const { data, error } = await supabase
      .from('tickets')
      .insert([{
        ticket_number: ticketNumber,
        title: body.title,
        description: body.description,
        status: body.status || 'open',
        priority: body.priority || 'medium',
        category: body.category,
        assigned_to: body.assigned_to
      }])
      .select()

    if (error) {
      console.error('Error creating ticket:', error)
      return NextResponse.json({ error: 'Failed to create ticket' }, { status: 500 })
    }

    return NextResponse.json(data[0])
  } catch (error) {
    console.error('Tickets API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

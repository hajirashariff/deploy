import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = createServerClient()
    const { data: tickets, error } = await supabase
      .from('tickets')
      .select('*')
      .eq('category', 'customer_request')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching customer tickets:', error)
      return NextResponse.json({ error: 'Failed to fetch tickets' }, { status: 500 })
    }

    return NextResponse.json(tickets || [])
  } catch (error) {
    console.error('API error fetching customer tickets:', error)
    return NextResponse.json({ error: 'Failed to fetch tickets' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const supabase = createServerClient()
    const ticketData = await request.json()
    
    const { data, error } = await supabase
      .from('tickets')
      .insert([{
        ticket_number: 'TKT-' + Date.now(),
        title: ticketData.title,
        description: ticketData.description,
        status: 'open',
        priority: ticketData.priority || 'medium',
        category: ticketData.category || 'customer_request',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()

    if (error) {
      console.error('Error creating ticket:', error)
      return NextResponse.json({ error: 'Failed to create ticket' }, { status: 500 })
    }

    return NextResponse.json(data[0], { status: 201 })
  } catch (error) {
    console.error('API error creating ticket:', error)
    return NextResponse.json({ error: 'Failed to create ticket' }, { status: 500 })
  }
}


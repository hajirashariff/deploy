import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = createServerClient()
    const { data: ratings, error } = await supabase.from('customer_ratings').select('*')

    if (error) {
      console.error('Error fetching ratings:', error)
      return NextResponse.json({ error: 'Failed to fetch ratings' }, { status: 500 })
    }

    return NextResponse.json(ratings)
  } catch (error) {
    console.error('API error fetching ratings:', error)
    return NextResponse.json({ error: 'Failed to fetch ratings' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const supabase = createServerClient()
    const ratingData = await request.json()
    const { data, error } = await supabase.from('customer_ratings').insert([ratingData]).select()

    if (error) {
      console.error('Error creating rating:', error)
      return NextResponse.json({ error: 'Failed to create rating' }, { status: 500 })
    }

    return NextResponse.json(data[0], { status: 201 })
  } catch (error) {
    console.error('API error creating rating:', error)
    return NextResponse.json({ error: 'Failed to create rating' }, { status: 500 })
  }
}


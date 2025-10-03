import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = createServerClient()

    // Get all customer services
    const { data: services } = await supabase.from('customer_services').select('*')
    
    // Get service usage statistics
    const { data: serviceStats } = await supabase
      .from('customer_service_requests')
      .select(`
        service_id,
        customer_services!inner(name, category, price),
        status,
        count:count(*)
      `)

    return NextResponse.json({
      services: services || [],
      serviceStats: serviceStats || [],
    })
  } catch (error) {
    console.error('Service management API error:', error)
    return NextResponse.json({ error: 'Failed to fetch service management data' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const supabase = createServerClient()
    const serviceData = await request.json()
    
    const { data, error } = await supabase
      .from('customer_services')
      .insert([serviceData])
      .select()

    if (error) {
      console.error('Error creating service:', error)
      return NextResponse.json({ error: 'Failed to create service' }, { status: 500 })
    }

    return NextResponse.json(data[0], { status: 201 })
  } catch (error) {
    console.error('Service management POST API error:', error)
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 })
  }
}


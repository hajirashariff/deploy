import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = createServerClient()

    // Get customer summary data
    const { data: summary } = await supabase.from('admin_customer_summary').select('*')
    
    // Get recent customer service requests
    const { data: serviceRequests } = await supabase.from('admin_customer_service_requests').select('*').limit(10)
    
    // Get recent customer ratings
    const { data: ratings } = await supabase.from('admin_customer_ratings').select('*').limit(10)
    
    // Get unified ticket view (admin + customer service tickets)
    const { data: unifiedTickets } = await supabase.from('unified_tickets_view').select('*').limit(10)

    return NextResponse.json({
      summary: summary?.[0] || {},
      recentServiceRequests: serviceRequests || [],
      recentRatings: ratings || [],
      unifiedTickets: unifiedTickets || [],
    })
  } catch (error) {
    console.error('Customer insights API error:', error)
    return NextResponse.json({ error: 'Failed to fetch customer insights' }, { status: 500 })
  }
}


import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = createServerClient()
    
    // Test connection by counting records in each table
    const [
      ticketsCount,
      assetsCount,
      settingsCount,
      usersCount,
      accountsCount
    ] = await Promise.all([
      supabase.from('tickets').select('*', { count: 'exact', head: true }),
      supabase.from('assets').select('*', { count: 'exact', head: true }),
      supabase.from('settings').select('*', { count: 'exact', head: true }),
      supabase.from('users').select('*', { count: 'exact', head: true }),
      supabase.from('accounts').select('*', { count: 'exact', head: true })
    ])

    return NextResponse.json({
      message: 'Supabase connection successful!',
      tableCounts: {
        tickets: ticketsCount.count || 0,
        assets: assetsCount.count || 0,
        settings: settingsCount.count || 0,
        users: usersCount.count || 0,
        accounts: accountsCount.count || 0
      },
      status: 'connected'
    })
  } catch (error) {
    console.error('Supabase connection test error:', error)
    return NextResponse.json({ 
      error: 'Failed to connect to Supabase',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

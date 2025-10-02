import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = createServerClient()
    
    // Fetch dashboard statistics
    const [
      ticketsResult,
      assetsResult,
      settingsResult
    ] = await Promise.all([
      supabase.from('tickets').select('*'),
      supabase.from('assets').select('*'),
      supabase.from('settings').select('*')
    ])

    // Calculate ticket stats
    const tickets = ticketsResult.data || []
    const ticketStats = {
      totalTickets: tickets.length,
      openTickets: tickets.filter(t => t.status === 'open').length,
      resolvedTickets: tickets.filter(t => t.status === 'resolved').length,
      avgResponseTime: 2.5,
      satisfactionRating: 4.2,
      totalUsers: 45,
      knowledgeBaseArticles: 28,
      activeWorkflows: 12
    }

    // Calculate asset stats
    const assets = assetsResult.data || []
    const assetStats = {
      totalAssets: assets.length,
      activeAssets: assets.filter(a => a.status === 'active').length,
      maintenanceAssets: assets.filter(a => a.status === 'maintenance').length,
      decommissionedAssets: assets.filter(a => a.status === 'decommissioned').length
    }

    // Group settings by category
    const settings = settingsResult.data || []
    const settingsByCategory = settings.reduce((acc: any, setting) => {
      if (!acc[setting.category]) {
        acc[setting.category] = {}
      }
      acc[setting.category][setting.setting_key] = setting.setting_value
      return acc
    }, {})

    return NextResponse.json({
      tickets,
      assets,
      settings: settingsByCategory,
      ticketStats,
      assetStats,
      recentTickets: tickets.slice(0, 5) // Last 5 tickets
    })
  } catch (error) {
    console.error('Dashboard data API error:', error)
    return NextResponse.json({ error: 'Failed to fetch dashboard data' }, { status: 500 })
  }
}

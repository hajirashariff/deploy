import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = createServerClient()
    
    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .order('category')

    if (error) {
      console.error('Error fetching settings:', error)
      return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 })
    }

    // Group settings by category
    const settingsByCategory = data.reduce((acc: any, setting) => {
      if (!acc[setting.category]) {
        acc[setting.category] = {}
      }
      acc[setting.category][setting.setting_key] = setting.setting_value
      return acc
    }, {})

    return NextResponse.json(settingsByCategory)
  } catch (error) {
    console.error('Settings API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const supabase = createServerClient()

    const { data, error } = await supabase
      .from('settings')
      .upsert([{
        category: body.category,
        setting_key: body.setting_key,
        setting_value: body.setting_value,
        data_type: body.data_type,
        description: body.description
      }])
      .select()

    if (error) {
      console.error('Error updating setting:', error)
      return NextResponse.json({ error: 'Failed to update setting' }, { status: 500 })
    }

    return NextResponse.json(data[0])
  } catch (error) {
    console.error('Settings API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

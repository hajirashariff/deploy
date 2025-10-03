import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = createServerClient()

    // Get customer ratings with aggregation
    const { data: ratingsData } = await supabase
      .from('customer_ratings')
      .select(`
        rating,
        review_text,
        created_at,
        customer_services!left(name, category),
        detailed_ratings
      `)
      .order('created_at', { ascending: false })

    // Calculate rating statistics
    const ratings = ratingsData || []
    const totalRatings = ratings.length
    const averageRating = totalRatings > 0 
      ? ratings.reduce((sum, r) => sum + r.rating, 0) / totalRatings 
      : 0
    const ratingDistribution = {
      5: ratings.filter(r => r.rating === 5).length,
      4: ratings.filter(r => r.rating === 4).length,
      3: ratings.filter(r => r.rating === 3).length,
      2: ratings.filter(r => r.rating === 2).length,
      1: ratings.filter(r => r.rating === 1).length,
    }

    return NextResponse.json({
      ratings: ratings,
      statistics: {
        totalRatings,
        averageRating: Math.round(averageRating * 10) / 10,
        ratingDistribution,
        satisfactionRate: totalRatings > 0 
          ? Math.round((ratingDistribution[5] + ratingDistribution[4]) / totalRatings * 100)
          : 0
      }
    })
  } catch (error) {
    console.error('Customer feedback API error:', error)
    return NextResponse.json({ error: 'Failed to fetch customer feedback' }, { status: 500 })
  }
}


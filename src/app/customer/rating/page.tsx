'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Star,
  Heart,
  MessageSquare,
  ThumbsUp,
  TrendingUp,
  Award,
  CheckCircle
} from 'lucide-react'

export default function CustomerRatingPage() {
  const [activeTab, setActiveTab] = useState('rate')
  const [selectedRating, setSelectedRating] = useState(0)
  const [reviewText, setReviewText] = useState('')
  const [selectedCategories, setSelectedCategories] = useState({
    support_quality: 0,
    responsiveness: 0,
    helpfulness: 0,
    resolution_time: 0
  })
  const [resolvedTickets, setResolvedTickets] = useState([])
  const [ratingSubmitted, setRatingSubmitted] = useState(false)

  // Fetch resolved tickets that need rating
  useEffect(() => {
    const fetchResolvedTickets = async () => {
      try {
        const response = await fetch('/api/customer/tickets')
        const allTickets = await response.json()
        const resolved = allTickets.filter(ticket => 
          ticket.status === 'resolved' && ticket.category === 'customer_request'
        )
        setResolvedTickets(resolved)
      } catch (error) {
        console.error('Error fetching resolved tickets:', error)
      }
    }
    
    fetchResolvedTickets()
  }, [])

  // Mock data for previous ratings
  const previousRatings = [
    {
      id: 'RATE-001',
      ticket_id: 'TKT-003',
      rating: 5,
      review_text: 'Excellent support! The agent was very helpful and resolved my issue quickly. Very professional and friendly.',
      categories: {
        support_quality: 5,
        responsiveness: 5,
        helpfulness: 5,
        resolution_time: 4
      },
      created_at: '2024-01-13 16:30',
      ticket_title: 'Feature enhancement request'
    },
    {
      id: 'RATE-002',
      ticket_id: 'TKT-002',
      rating: 4,
      review_text: 'Good support overall. The person was knowledgeable but took slightly longer to respond than expected.',
      categories: {
        support_quality: 4,
        responsiveness: 3,
        helpfulness: 4,
        resolution_time: 4
      },
      created_at: '2024-01-10 14:20',
      ticket_title: 'Password reset functionality'
    },
    {
      id: 'RATE-003',
      ticket_id: 'TKT-001',
      rating: 3,
      review_text: 'Average experience. Issue was resolved but communication could have been better.',
      categories: {
        support_quality: 3,
        responsiveness: 3,
        helpfulness: 3,
        resolution_time: 3
      },
      created_at: '2024-01-08 11:15',
      ticket_title: 'Account access issue'
    }
  ]

  const averageRating = previousRatings.reduce((sum, rating) => sum + rating.rating, 0) / previousRatings.length
  const totalRatings = previousRatings.length

  const handleCategoryRating = (category: string, rating: number) => {
    setSelectedCategories(prev => ({
      ...prev,
      [category]: rating
    }))
  }

  const handleSubmitRating = () => {
    if (selectedRating === 0) {
      alert('Please select an overall rating')
      return
    }
    
    console.log('Submitting rating:', {
      rating: selectedRating,
      categories: selectedCategories,
      review_text: reviewText
    })
    
    // Reset form
    setSelectedRating(0)
    setReviewText('')
    setSelectedCategories({
      support_quality: 0,
      responsiveness: 0,
      helpfulness: 0,
      resolution_time: 0
    })
    
    alert('Thank you for your feedback! Your rating has been submitted.')
  }

  const renderOverallRatingTab = () => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Star className="h-5 w-5 mr-2" />
          Overall Service Rating
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <h3 className="text-lg font-medium mb-4">How would you rate your overall experience?</h3>
          <div className="flex justify-center space-x-2 mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <Button
                key={star}
                variant="outline"
                size="lg"
                className={`w-12 h-12 p-0 ${selectedRating >= star ? 'bg-yellow-100 border-yellow-300' : ''}`}
                onClick={() => setSelectedRating(star)}
              >
                <Star className={`h-6 w-6 ${selectedRating >= star ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} />
              </Button>
            ))}
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { key: 'support_quality', label: 'Support Quality' },
              { key: 'responsiveness', label: 'Responsiveness' },
              { key: 'helpfulness', label: 'Helpfulness' },
              { key: 'resolution_time', label: 'Resolution Time' }
            ].map((category) => (
              <div key={category.key} className="text-center">
                <div className="text-sm font-medium mb-2">{category.label}</div>
                <div className="flex justify-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      className={`w-6 h-6 ${selectedCategories[category.key as keyof typeof selectedCategories] >= star ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
                      onClick={() => handleCategoryRating(category.key, star)}
                    >
                      <Star className="w-full h-full" />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <Textarea
            placeholder="Please share more details about your experience..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className="mb-4"
          />

          <Button onClick={handleSubmitRating} disabled={selectedRating === 0} className="w-full md:w-auto">
            <Star className="h-4 w-4 mr-2" />
            Submit Rating
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  const renderPreviousRatingsTab = () => (
    <div className="space-y-4">
      {previousRatings.map((rating, index) => (
        <Card key={rating.id}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Badge variant="outline">{rating.ticket_id}</Badge>
                <h4 className="font-medium">{rating.ticket_title}</h4>
              </div>
              <div className="flex items-center space-x-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < rating.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                  />
                ))}
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground italic mb-4">"{rating.review_text}"</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                <div className="text-xs text-muted-foreground">Support Quality</div>
                <div className="font-medium">{rating.categories.support_quality}/5</div>
              </div>
              <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                <div className="text-xs text-muted-foreground">Responsiveness</div>
                <div className="font-medium">{rating.categories.responsiveness}/5</div>
              </div>
              <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                <div className="text-xs text-muted-foreground">Helpfulness</div>
                <div className="font-medium">{rating.categories.helpfulness}/5</div>
              </div>
              <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                <div className="text-xs text-muted-foreground">Resolution Time</div>
                <div className="font-medium">{rating.categories.resolution_time}/5</div>
              </div>
            </div>
            
            <div className="text-xs text-muted-foreground">
              Rated on {rating.created_at}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  const renderStatisticsTab = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Your Rating Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Average Rating</span>
              <div className="flex items-center">
                <span className="text-2xl font-bold mr-2">{averageRating.toFixed(1)}</span>
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < Math.round(averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span>Total Ratings</span>
              <span className="font-medium">{totalRatings}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>5-Star Ratings</span>
              <span className="font-medium">{previousRatings.filter(r => r.rating === 5).length}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="h-5 w-5 mr-2" />
            Rating Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = previousRatings.filter(r => r.rating === star).length
              const percentage = totalRatings > 0 ? (count / totalRatings) * 100 : 0
              return (
                <div key={star} className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <span>{star}</span>
                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                  </div>
                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground">{count}</span>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ThumbsUp className="h-5 w-5 mr-2" />
            Support Impact
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {totalRatings > 0 ? Math.round((previousRatings.filter(r => r.rating >= 4).length / totalRatings) * 100) : 0}%
              </div>
              <div className="text-sm text-green-700 dark:text-green-300">Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Thank you for helping us improve our customer experience!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold flex items-center">
                <Heart className="h-6 w-6 mr-2 text-red-500" />
                Feedback & Ratings
              </h1>
              <p className="text-muted-foreground">Share your experience and help us improve our service</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-gray-800 border-b">
        <div className="px-6">
          <nav className="flex space-x-8">
            {[
              { id: 'rate', label: 'Rate Experience', icon: Star },
              { id: 'resolved', label: `Resolved Tickets${resolvedTickets.length > 0 ? ` (${resolvedTickets.length})` : ''}`, icon: CheckCircle },
              { id: 'history', label: 'Your Ratings', icon: MessageSquare },
              { id: 'stats', label: 'Statistics', icon: TrendingUp }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 transition-colors flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-red-500 text-red-500'
                    : 'border-transparent text-muted-foreground hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="p-6">
        {activeTab === 'rate' && renderOverallRatingTab()}
        {activeTab === 'history' && renderPreviousRatingsTab ()}
        {activeTab === 'stats' && renderStatisticsTab(        )}

        {/* Resolved Tickets Tab */}
        {activeTab === 'resolved' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Resolved Tickets - Rate Your Experience
                </CardTitle>
              </CardHeader>
              <CardContent>
                {resolvedTickets.length > 0 ? (
                  <div className="space-y-4">
                    {resolvedTickets.map((ticket) => (
                      <div key={ticket.id} className="border rounded-lg p-4 hover:bg-gray-50 dark:bg-gray-800">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-medium text-lg">{ticket.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Ticket: {ticket.ticket_number}</p>
                          </div>
                          <Badge variant="default">Resolved</Badge>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 mb-3">{ticket.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">
                            Resolved: {new Date(ticket.updated_at).toLocaleDateString()}
                          </span>
                          <Button onClick={() => setActiveTab('rate')} className="bg-primary hover:bg-primary/90">
                            Rate This Resolution
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <CheckCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No resolved tickets available for rating at the moment.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

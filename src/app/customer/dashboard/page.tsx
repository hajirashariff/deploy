'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  MessageSquare, 
  FileText, 
  Star,
  Settings,
  HelpCircle,
  LogOut,
  LayoutDashboard,
  Ticket,
  Heart,
  Package,
  Clock,
  CheckCircle,
  Plus,
  Search,
  Phone,
  Mail
} from 'lucide-react'

export default function CustomerPortal() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [user] = useState({ full_name: 'Customer Name' }) // Mock user for demo

  // Tab configuration
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'tickets', label: 'Tickets', icon: Ticket },
    { id: 'rating', label: 'Rating', icon: Heart },
    { id: 'services', label: 'Services', icon: Package },
    { id: 'help', label: 'Help', icon: HelpCircle }
  ]

  const handleSignOut = async () => {
    router.push('/')
  }

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'My Tickets', value: '5', icon: Ticket, color: 'text-blue-500', bgColor: 'bg-blue-50 dark:bg-blue-900/20' },
          { title: 'Open Tickets', value: '2', icon: Clock, color: 'text-orange-500', bgColor: 'bg-orange-50 dark:bg-orange-900/20' },
          { title: 'Resolved Tickets', value: '3', icon: CheckCircle, color: 'text-green-500', bgColor: 'bg-green-50 dark:bg-green-900/20' },
          { title: 'Avg Response Time', value: '2.1h', icon: Clock, color: 'text-purple-500', bgColor: 'bg-purple-50 dark:bg-purple-900/20' }
        ].map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              Recent Tickets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: '1', title: 'Login Issue', status: 'open', priority: 'high', date: '2024-01-15' },
                { id: '2', title: 'Feature Request', status: 'in_progress', priority: 'medium', date: '2024-01-14' },
                { id: '3', title: 'Password Reset', status: 'resolved', priority: 'low', date: '2024-01-13' }
              ].map((ticket) => (
                <div key={ticket.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{ticket.title}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant={ticket.status === 'open' ? 'destructive' : 'secondary'}>
                        {ticket.status}
                      </Badge>
                      <Badge variant="outline">{ticket.priority}</Badge>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">{ticket.date}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Submit New Ticket
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Search className="h-4 w-4 mr-2" />
              Search Knowledge Base
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <MessageSquare className="h-4 w-4 mr-2" />
              Live Chat Support
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Phone className="h-4 w-4 mr-2" />
              Call Support
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderTickets = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>My Support Tickets</CardTitle>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Ticket
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { 
                id: 'TKT-001', 
                title: 'Unable to access account dashboard', 
                description: 'Getting 404 error when trying to access account section',
                status: 'open', 
                priority: 'high', 
                created: '2024-01-15 10:30' 
              },
              { 
                id: 'TKT-002', 
                title: 'Password reset functionality', 
                description: 'Password reset emails not being received',
                status: 'in_progress', 
                priority: 'medium', 
                created: '2024-01-14 14:20' 
              },
              { 
                id: 'TKT-003', 
                title: 'Feature enhancement request', 
                description: 'Add bulk upload functionality for documents',
                status: 'resolved', 
                priority: 'low', 
                created: '2024-01-13 09:15' 
              }
            ].map((ticket) => (
              <div key={ticket.id} className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-medium">{ticket.title}</h3>
                    <Badge variant="outline">{ticket.id}</Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={ticket.status === 'open' ? 'destructive' : ticket.status === 'resolved' ? 'default' : 'secondary'}>
                      {ticket.status.replace('_', ' ')}
                    </Badge>
                    <Badge variant="outline">{ticket.priority}</Badge>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{ticket.description}</p>
                <span className="text-xs text-muted-foreground">Created: {ticket.created}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderRating = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Star className="h-5 w-5 mr-2" />
            Feedback & Ratings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="text-center py-8">
              <Heart className="h-16 w-16 mx-auto mb-4 text-red-500 opacity-50" />
              <h3 className="text-lg font-medium mb-2">Rate Your Experience</h3>
              <p className="text-muted-foreground mb-4">
                Help us improve by sharing your feedback on our support services
              </p>
              <div className="flex justify-center space-x-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Button key={star} variant="outline" size="sm">
                    <Star className="h-4 w-4" />
                  </Button>
                ))}
              </div>
              <Button>Submit Feedback</Button>
            </div>

            <div className="border-t pt-6">
              <h4 className="font-medium mb-4">Your Previous Ratings</h4>
              <div className="space-y-3">
                {[
                  { ticket: 'TKT-003', rating: 5, review: 'Excellent support! Resolution was quick and helpful', date: '2024-01-13' },
                  { ticket: 'TKT-002', rating: 4, review: 'Good support, took a bit longer than expected', date: '2024-01-10' }
                ].map((rating, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">{rating.ticket}</Badge>
                      <div className="flex items-center">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className={`h-4 w-4 ${star <= rating.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground italic">"{rating.review}"</p>
                    <span className="text-xs text-muted-foreground">{rating.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderServices = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Package className="h-5 w-5 mr-2" />
            Available Services
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                name: 'Priority Support Package',
                description: 'Expedited support with dedicated specialist',
                price: '$299.99',
                duration: '24 hours',
                category: 'Support'
              },
              {
                name: 'Platform Training Session',
                description: 'Personalized platform training for your team',
                price: '$199.99',
                duration: '2 hours',
                category: 'Training'
              },
              {
                name: 'Custom Integration Setup',
                description: 'Custom API integration tailored to your needs',
                price: '$599.99',
                duration: '16 hours',
                category: 'Technical'
              },
              {
                name: 'Emergency Support',
                description: '24/7 emergency support for critical issues',
                price: '$499.99',
                duration: '72 hours',
                category: 'Support'
              }
            ].map((service, index) => (
              <Card key={index} className="border-dashed">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-lg">{service.name}</CardTitle>
                    <Badge variant="outline">{service.category}</Badge>
                  </div>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-sm font-medium">Price: {service.price}</span>
                      <br />
                      <span className="text-sm text-muted-foreground">Duration: {service.duration}</span>
                    </div>
                  </div>
                  <Button className="w-full">Request Service</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderHelp = () => (
    <div className="space-y-6">
      {/* Search Help */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Search className="h-5 w-5 mr-2" />
            Search Knowledge Base
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <input 
              type="text" 
              placeholder="Search help articles..."
              className="flex-1 px-3 py-2 border rounded-md"
            />
            <Button><Search className="h-4 w-4" /></Button>
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Getting Started</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="cursor-pointer hover:underline">• Create Your Account</li>
              <li className="cursor-pointer hover:underline">• Setting Up Your Profile</li>
              <li className="cursor-pointer hover:underline">• First Steps Guide</li>
              <li className="cursor-pointer hover:underline">• Navigation Overview</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Common Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="cursor-pointer hover:underline">• Login Problems</li>
              <li className="cursor-pointer hover:underline">• Password Reset</li>
              <li className="cursor-pointer hover:underline">• Account Access</li>
              <li className="cursor-pointer hover:underline">• Browser Compatibility</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Contact Support</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <MessageSquare className="h-4 w-4 mr-2" />
                Live Chat
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Phone className="h-4 w-4 mr-2" />
                Phone Support
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Mail className="h-4 w-4 mr-2" />
                Email Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* FAQ */}
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                question: 'How do I reset my password?',
                answer: 'Click on "Forgot Password" on the login page and follow the email instructions.'
              },
              {
                question: 'What are your support hours?',
                answer: 'We provide 24/7 support for critical issues and business hours support for general inquiries.'
              },
              {
                question: 'How do I submit a ticket?',
                answer: 'Navigate to the Tickets tab and click "New Ticket" to create a support request.'
              }
            ].map((faq, index) => (
              <div key={index} className="border-b pb-3">
                <h4 className="font-medium mb-1">{faq.question}</h4>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard()
      case 'tickets':
        return renderTickets()
      case 'rating':
        return renderRating()
      case 'services':
        return renderServices()
      case 'help':
        return renderHelp()
      default:
        return renderDashboard()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold">Customer Portal</h1>
              <Badge variant="outline">Customer</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="bg-white dark:bg-gray-800 border-b">
        <div className="px-6">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 transition-colors flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
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

      {/* Welcome Section */}
      <div className="px-6 py-6">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">
            Welcome back, {user.full_name}!
          </h2>
          <p className="text-muted-foreground">
            Manage your support tickets, access services, and get help.
          </p>
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </div>
  )
}
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  MessageSquare, 
  FileText, 
  Clock,
  CheckCircle,
  Plus,
  Search,
  Star,
  HelpCircle,
  Settings,
  LogOut,
  Bell,
  Phone,
  Mail
} from 'lucide-react'
import { useAuth } from '@/components/providers/auth-provider'
import { supabase } from '@/lib/supabase/client'

export default function CustomerDashboard() {
  const router = useRouter()
  const { user, signOut } = useAuth()
  const [stats, setStats] = useState({
    myTickets: 0,
    openTickets: 0,
    resolvedTickets: 0,
    avgResolutionTime: 0
  })
  const [recentTickets, setRecentTickets] = useState<any[]>([])
  const [knowledgeBase, setKnowledgeBase] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // For demo purposes, bypass authentication check
    // if (!user || user.role !== 'customer') {
    //   router.push('/auth/login?role=customer')
    //   return
    // }
    fetchDashboardData()
  }, [user, router])

  const fetchDashboardData = async () => {
    try {
      // Mock data for frontend development
      const mockTickets = [
        {
          id: '1',
          title: 'Account Access Issue',
          description: 'Unable to access my account after password change',
          status: 'open',
          priority: 'high',
          created_at: new Date().toISOString(),
        },
        {
          id: '2',
          title: 'Feature Request',
          description: 'Would like to see more customization options',
          status: 'in_progress',
          priority: 'medium',
          created_at: new Date(Date.now() - 86400000).toISOString(),
        },
      ]

      const mockArticles = [
        {
          id: '1',
          title: 'Getting Started Guide',
          content: 'Learn how to use the BSM Platform effectively',
          category: 'Getting Started',
          helpful_count: 15,
        },
        {
          id: '2',
          title: 'Troubleshooting Common Issues',
          content: 'Solutions to frequently encountered problems',
          category: 'Support',
          helpful_count: 23,
        },
        {
          id: '3',
          title: 'Best Practices',
          content: 'Tips for optimal platform usage',
          category: 'Tips',
          helpful_count: 8,
        },
      ]

      setStats({
        myTickets: 5,
        openTickets: 2,
        resolvedTickets: 3,
        avgResolutionTime: 1.8
      })

      setRecentTickets(mockTickets)
      setKnowledgeBase(mockArticles)
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  const statCards = [
    {
      title: 'My Tickets',
      value: stats.myTickets,
      icon: MessageSquare,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      title: 'Open Tickets',
      value: stats.openTickets,
      icon: Clock,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20'
    },
    {
      title: 'Resolved Tickets',
      value: stats.resolvedTickets,
      icon: CheckCircle,
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      title: 'Avg Resolution Time',
      value: `${stats.avgResolutionTime}h`,
      icon: Clock,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold">Customer Portal</h1>
              <Badge variant="outline">Customer Portal</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
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

      <div className="p-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">
            Welcome back, {user?.full_name || 'Customer'}!
          </h2>
          <p className="text-muted-foreground">
            Manage your support tickets and access our knowledge base.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
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

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Tickets */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center">
                    <MessageSquare className="h-5 w-5 mr-2" />
                    My Recent Tickets
                  </CardTitle>
                  <CardDescription>
                    Your latest support tickets
                  </CardDescription>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Ticket
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTickets.length > 0 ? (
                  recentTickets.map((ticket) => (
                    <div key={ticket.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{ticket.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {ticket.description.substring(0, 100)}...
                        </p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge 
                            variant={ticket.status === 'open' ? 'destructive' : 'secondary'}
                          >
                            {ticket.status}
                          </Badge>
                          <Badge variant="outline">
                            {ticket.priority}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">
                          {new Date(ticket.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No tickets yet</p>
                    <Button className="mt-4">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Your First Ticket
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions & Knowledge Base */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <HelpCircle className="h-5 w-5 mr-2" />
                  Quick Actions
                </CardTitle>
                <CardDescription>
                  Common support tasks
                </CardDescription>
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
                <Button className="w-full justify-start" variant="outline">
                  <Mail className="h-4 w-4 mr-2" />
                  Email Support
                </Button>
              </CardContent>
            </Card>

            {/* Knowledge Base */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Knowledge Base
                </CardTitle>
                <CardDescription>
                  Popular help articles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {knowledgeBase.length > 0 ? (
                    knowledgeBase.map((article) => (
                      <div key={article.id} className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                        <h4 className="font-medium text-sm">{article.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {article.content.substring(0, 80)}...
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <Badge variant="outline" className="text-xs">
                            {article.category}
                          </Badge>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Star className="h-3 w-3 mr-1" />
                            {article.helpful_count}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 text-muted-foreground">
                      <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No articles available</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Support Options */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <HelpCircle className="h-5 w-5 mr-2" />
                Need Help?
              </CardTitle>
              <CardDescription>
                Multiple ways to get the support you need
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-6 border rounded-lg hover:bg-muted/50 cursor-pointer">
                  <MessageSquare className="h-8 w-8 mx-auto mb-4 text-blue-500" />
                  <h3 className="font-medium mb-2">Live Chat</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Chat with our support team in real-time
                  </p>
                  <Button size="sm">Start Chat</Button>
                </div>
                <div className="text-center p-6 border rounded-lg hover:bg-muted/50 cursor-pointer">
                  <Phone className="h-8 w-8 mx-auto mb-4 text-green-500" />
                  <h3 className="font-medium mb-2">Phone Support</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Call us for immediate assistance
                  </p>
                  <Button size="sm" variant="outline">Call Now</Button>
                </div>
                <div className="text-center p-6 border rounded-lg hover:bg-muted/50 cursor-pointer">
                  <Mail className="h-8 w-8 mx-auto mb-4 text-purple-500" />
                  <h3 className="font-medium mb-2">Email Support</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Send us an email and we&apos;ll respond quickly
                  </p>
                  <Button size="sm" variant="outline">Send Email</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  BarChart3, 
  Users, 
  FileText, 
  MessageSquare, 
  Clock,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Activity,
  Settings,
  LogOut,
  Bell,
  Search,
  Shield,
  Database,
  Server,
  Monitor,
  Zap
} from 'lucide-react'
import { useAuth } from '@/components/providers/auth-provider'

export default function AdminPortal() {
  const router = useRouter()
  const { user, signOut } = useAuth()
  const [stats, setStats] = useState({
    totalTickets: 0,
    openTickets: 0,
    resolvedTickets: 0,
    avgResponseTime: 0,
    satisfactionRating: 0,
    totalUsers: 0,
    knowledgeBaseArticles: 0,
    activeWorkflows: 0
  })
  const [recentTickets, setRecentTickets] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // For demo purposes, bypass authentication check
    // if (!user || user.role !== 'admin') {
    //   router.push('/auth/login?role=admin')
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
          title: 'Login Issue',
          description: 'User unable to login to the system',
          status: 'open',
          priority: 'high',
          created_at: new Date().toISOString(),
        },
        {
          id: '2',
          title: 'Password Reset',
          description: 'Need help resetting password',
          status: 'in_progress',
          priority: 'medium',
          created_at: new Date(Date.now() - 86400000).toISOString(),
        },
        {
          id: '3',
          title: 'Feature Request',
          description: 'Add dark mode support',
          status: 'resolved',
          priority: 'low',
          created_at: new Date(Date.now() - 172800000).toISOString(),
        },
      ]

      setStats({
        totalTickets: 156,
        openTickets: 23,
        resolvedTickets: 133,
        avgResponseTime: 2.5,
        satisfactionRating: 4.2,
        totalUsers: 45,
        knowledgeBaseArticles: 28,
        activeWorkflows: 12
      })

      setRecentTickets(mockTickets)
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Admin Portal...</p>
        </div>
      </div>
    )
  }

  const statCards = [
    {
      title: 'Total Tickets',
      value: stats.totalTickets,
      icon: MessageSquare,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      change: '+12%'
    },
    {
      title: 'Open Tickets',
      value: stats.openTickets,
      icon: AlertTriangle,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
      change: '+5%'
    },
    {
      title: 'Resolved Tickets',
      value: stats.resolvedTickets,
      icon: CheckCircle,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
      change: '+8%'
    },
    {
      title: 'Avg Response Time',
      value: `${stats.avgResponseTime}h`,
      icon: Clock,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
      change: '-15%'
    },
    {
      title: 'Satisfaction Rating',
      value: `${stats.satisfactionRating}/5`,
      icon: TrendingUp,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50',
      change: '+3%'
    },
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-50',
      change: '+7%'
    }
  ]

  const quickActions = [
    {
      title: 'Create Knowledge Article',
      description: 'Add new help documentation',
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      href: '#'
    },
    {
      title: 'Manage Workflows',
      description: 'Configure automation rules',
      icon: Settings,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      href: '#'
    },
    {
      title: 'User Management',
      description: 'Manage user accounts and permissions',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      href: '#'
    },
    {
      title: 'View Analytics',
      description: 'Performance metrics and reports',
      icon: BarChart3,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      href: '#'
    },
    {
      title: 'Search Tickets',
      description: 'Find and manage support tickets',
      icon: Search,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      href: '#'
    },
    {
      title: 'System Health',
      description: 'Monitor system performance',
      icon: Activity,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
      href: '#'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">BSM Admin Portal</h1>
                  <p className="text-sm text-gray-500">Business Service Management</p>
                </div>
              </div>
              <Badge variant="outline" className="ml-4">
                Admin Access
              </Badge>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.full_name || 'Admin'}!
          </h2>
          <p className="text-gray-600">
            Here&apos;s what&apos;s happening with your BSM Platform today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-xs text-green-600 font-medium">{stat.change}</p>
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Tickets */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-2" />
                Recent Tickets
              </CardTitle>
              <CardDescription>
                Latest support tickets requiring attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTickets.length > 0 ? (
                  recentTickets.map((ticket) => (
                    <div key={ticket.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{ticket.title}</h4>
                        <p className="text-sm text-gray-600">
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
                        <p className="text-sm text-gray-500">
                          {new Date(ticket.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No tickets found
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="h-5 w-5 mr-2" />
                Quick Actions
              </CardTitle>
              <CardDescription>
                Common administrative tasks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickActions.map((action, index) => (
                <Button 
                  key={index}
                  variant="outline" 
                  className="w-full justify-start h-auto p-4 hover:bg-gray-50"
                >
                  <div className={`p-2 rounded-lg ${action.bgColor} mr-3`}>
                    <action.icon className={`h-4 w-4 ${action.color}`} />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-gray-900">{action.title}</div>
                    <div className="text-sm text-gray-500">{action.description}</div>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* System Health */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Monitor className="h-5 w-5 mr-2" />
                System Health
              </CardTitle>
              <CardDescription>
                Real-time system status and performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2"></div>
                  <Database className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <p className="font-medium">Database</p>
                  <p className="text-sm text-gray-500">Healthy</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2"></div>
                  <Server className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <p className="font-medium">API</p>
                  <p className="text-sm text-gray-500">Healthy</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mx-auto mb-2"></div>
                  <Activity className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
                  <p className="font-medium">AI Services</p>
                  <p className="text-sm text-gray-500">Degraded</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2"></div>
                  <Database className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <p className="font-medium">Storage</p>
                  <p className="text-sm text-gray-500">Healthy</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

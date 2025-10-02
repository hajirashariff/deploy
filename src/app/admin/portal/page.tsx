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
  Zap,
  LayoutDashboard,
  Package,
  Ticket,
  Cog,
  Workflow,
  PieChart,
  UserCheck,
  BookOpen,
  Plug,
  Menu
} from 'lucide-react'
import { useAuth } from '@/components/providers/auth-provider'

export default function AdminPortal() {
  const router = useRouter()
  const { user, signOut } = useAuth()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(true)
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

  const navigationTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'asset-management', label: 'Asset Management', icon: Package },
    { id: 'ticket-management', label: 'Ticket Management', icon: Ticket },
    { id: 'rules-engine', label: 'Rules Engine', icon: Cog },
    { id: 'workflow-engine', label: 'Workflow Engine', icon: Workflow },
    { id: 'analytics-reports', label: 'Analytics & Reports', icon: PieChart },
    { id: 'account-management', label: 'Account Management', icon: UserCheck },
    { id: 'user-management', label: 'User Management', icon: Users },
    { id: 'knowledge-base', label: 'Knowledge Base', icon: BookOpen },
    { id: 'integrations', label: 'Integrations', icon: Plug },
    { id: 'settings', label: 'Settings', icon: Settings }
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-8">
            {/* Welcome Section */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {user?.full_name || 'Admin'}!
              </h2>
              <p className="text-gray-600">
                Here&apos;s what&apos;s happening with your BSM Platform today.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
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
        )
      case 'asset-management':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Asset Management</h2>
                <p className="text-gray-600">Manage and track your IT assets and resources</p>
              </div>
              <Button onClick={() => setActiveTab('asset-management')}>
                <Package className="h-4 w-4 mr-2" />
                Add Asset
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Sample Assets */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Company Server</span>
                    <Badge variant="secondary">Active</Badge>
                  </CardTitle>
                  <CardDescription>Dell PowerEdge Server</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Type:</span>
                      <span className="text-sm">Server</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Location:</span>
                      <span className="text-sm">Data Center A</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Vendor:</span>
                      <span className="text-sm">Dell</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Purchase Date:</span>
                      <span className="text-sm">2023-01-15</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Office Laptop</span>
                    <Badge variant="secondary">Active</Badge>
                  </CardTitle>
                  <CardDescription>MacBook Pro 16"</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Type:</span>
                      <span className="text-sm">Hardware</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Location:</span>
                      <span className="text-sm">Office Floor 2</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Vendor:</span>
                      <span className="text-sm">Apple</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Purchase Date:</span>
                      <span className="text-sm">2023-06-10</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Licensed Software</span>
                    <Badge variant="outline">Maintenance</Badge>
                  </CardTitle>
                  <CardDescription>Microsoft Office 365</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Type:</span>
                      <span className="text-sm">Software</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">License:</span>
                      <span className="text-sm">Annual</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Vendor:</span>
                      <span className="text-sm">Microsoft</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Renewal:</span>
                      <span className="text-sm">2024-03-15</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Asset Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Assets</p>
                      <p className="text-2xl font-bold text-gray-900">47</p>
                    </div>
                    <Package className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active</p>
                      <p className="text-2xl font-bold text-green-600">39</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Maintenance</p>
                      <p className="text-2xl font-bold text-yellow-600">5</p>
                    </div>
                    <Clock className="h-8 w-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Decommissioned</p>
                      <p className="text-2xl font-bold text-red-600">3</p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )
      case 'ticket-management':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Ticket Management</h2>
                <p className="text-gray-600">Manage support tickets and customer requests</p>
              </div>
              <Button>
                <Ticket className="h-4 w-4 mr-2" />
                Create Ticket
              </Button>
            </div>

            {/* Ticket Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Open Tickets</p>
                      <p className="text-2xl font-bold text-red-600">12</p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">In Progress</p>
                      <p className="text-2xl font-bold text-blue-600">8</p>
                    </div>
                    <Clock className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Resolved</p>
                      <p className="text-2xl font-bold text-green-600">156</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Avg Response</p>
                      <p className="text-2xl font-bold text-purple-600">2.5h</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Tickets Table */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Tickets</CardTitle>
                <CardDescription>Latest support requests requiring attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <Ticket className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">TKT-001234: Login Issues</h4>
                        <p className="text-sm text-gray-600">Customer unable to access account dashboard</p>
                        <p className="text-xs text-gray-500">Submitted 2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="destructive">High Priority</Badge>
                      <Badge variant="outline">Technical</Badge>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <Ticket className="h-5 w-5 text-yellow-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">TKT-001233: Password Reset</h4>
                        <p className="text-sm text-gray-600">User needs assistance with password recovery</p>
                        <p className="text-xs text-gray-500">Submitted 1 day ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary">Medium Priority</Badge>
                      <Badge variant="outline">Account</Badge>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <Ticket className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">TKT-001232: Feature Request</h4>
                        <p className="text-sm text-gray-600">Dark mode support implementation</p>
                        <p className="text-xs text-gray-500">Submitted 3 days ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">Low Priority</Badge>
                      <Badge variant="outline">Enhancement</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      case 'rules-engine':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Rules Engine</h2>
              <p className="text-gray-600">Configure business rules and automation logic</p>
            </div>
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-12">
                  <Cog className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Rules Engine</h3>
                  <p className="text-gray-500">Rules engine configuration coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      case 'workflow-engine':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Workflow Engine</h2>
              <p className="text-gray-600">Design and manage automated workflows</p>
            </div>
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-12">
                  <Workflow className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Workflow Engine</h3>
                  <p className="text-gray-500">Workflow automation features coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      case 'analytics-reports':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Analytics & Reports</h2>
              <p className="text-gray-600">View performance metrics and generate reports</p>
            </div>
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-12">
                  <PieChart className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Analytics & Reports</h3>
                  <p className="text-gray-500">Advanced analytics and reporting features coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      case 'account-management':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Account Management</h2>
              <p className="text-gray-600">Manage customer accounts and billing</p>
            </div>
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-12">
                  <UserCheck className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Account Management</h3>
                  <p className="text-gray-500">Account management features coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      case 'user-management':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
              <p className="text-gray-600">Manage user accounts, roles, and permissions</p>
            </div>
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-12">
                  <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">User Management</h3>
                  <p className="text-gray-500">User management features coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      case 'knowledge-base':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Knowledge Base</h2>
              <p className="text-gray-600">Manage help documentation and articles</p>
            </div>
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-12">
                  <BookOpen className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Knowledge Base</h3>
                  <p className="text-gray-500">Knowledge base management features coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      case 'integrations':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Integrations</h2>
              <p className="text-gray-600">Connect with third-party services and APIs</p>
            </div>
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-12">
                  <Plug className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Integrations</h3>
                  <p className="text-gray-500">Integration management features coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      case 'settings':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
              <p className="text-gray-600">Configure system settings and preferences</p>
            </div>
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-12">
                  <Settings className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Settings</h3>
                  <p className="text-gray-500">System settings and configuration coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      default:
        return (
          <div className="text-center py-12">
            <p className="text-gray-500">Select a tab to view content</p>
          </div>
        )
    }
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
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-white shadow-lg transition-all duration-300 flex flex-col`}>
        {/* Sidebar Header */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900">BSM Admin</h1>
                  <p className="text-xs text-gray-500">Portal</p>
                </div>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex-1 overflow-y-auto">
          <nav className="p-2 space-y-1">
            {navigationTabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon className={`h-5 w-5 ${sidebarOpen ? 'mr-3' : 'mx-auto'}`} />
                  {sidebarOpen && <span>{tab.label}</span>}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-gray-600">
                {user?.full_name?.charAt(0) || 'A'}
              </span>
            </div>
            {sidebarOpen && (
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {user?.full_name || 'Admin'}
                </p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {navigationTabs.find(tab => tab.id === activeTab)?.label || 'Dashboard'}
                </h2>
                <p className="text-sm text-gray-600">
                  {activeTab === 'dashboard' 
                    ? 'Here\'s what\'s happening with your BSM Platform today.'
                    : `Manage ${navigationTabs.find(tab => tab.id === activeTab)?.label.toLowerCase()} settings and configurations`
                  }
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm">
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                </Button>
                <Button variant="outline" size="sm" onClick={handleSignOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            {renderTabContent()}
          </div>
        </main>
      </div>
    </div>
  )
}

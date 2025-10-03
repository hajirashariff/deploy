'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Plus,
  Search,
  Filter,
  MessageSquare,
  Clock,
  CheckCircle,
  AlertTriangle,
  SortAsc,
  SortDesc
} from 'lucide-react'

export default function CustomerTicketsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [sortBy, setSortBy] = useState('date')

  // Mock ticket data
  const tickets = [
    {
      id: 'TKT-001',
      title: 'Unable to access account dashboard',
      description: 'Getting 404 error when trying to access account section. This started happening after the recent update.',
      status: 'open',
      priority: 'high',
      category: 'technical',
      created: '2024-01-15 10:30',
      updated: '2024-01-15 14:30',
      assigned_to: 'John Doe'
    },
    {
      id: 'TKT-002',
      title: 'Password reset functionality',
      description: 'Password reset emails not being received in inbox, checked spam folder.',
      status: 'in_progress',
      priority: 'medium',
      category: 'account',
      created: '2024-01-14 14:20',
      updated: '2024-01-15 09:15',
      assigned_to: 'Sarah Wilson'
    },
    {
      id: 'TKT-003',
      title: 'Feature enhancement request',
      description: 'Would like to add bulk upload functionality for documents to speed up workflow.',
      status: 'resolved',
      priority: 'low',
      category: 'enhancement',
      created: '2024-01-13 09:15',
      updated: '2024-01-14 16:45',
      assigned_to: 'Mike Chen'
    },
    {
      id: 'TKT-004',
      title: 'Performance issue with reports',
      description: 'Report generation is taking longer than usual, sometimes timeout.',
      status: 'open',
      priority: 'medium',
      category: 'technical',
      created: '2024-01-12 16:20',
      updated: '2024-01-15 08:30',
      assigned_to: 'Alex Rodriguez'
    },
    {
      id: 'TKT-005',
      title: 'Account permissions',
      description: 'Need to update user permissions for team collaboration features.',
      status: 'pending',
      priority: 'low',
      category: 'account',
      created: '2024-01-11 11:45',
      updated: '2024-01-11 11:45',
      assigned_to: 'Emma Davis'
    }
  ]

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || ticket.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'destructive'
      case 'in_progress': return 'secondary'
      case 'resolved': return 'default'
      case 'pending': return 'outline'
      default: return 'outline'
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return AlertTriangle
      case 'medium': return Clock
      case 'low': return CheckCircle
      default: return Clock
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return AlertTriangle
      case 'in_progress': return Clock
      case 'resolved': return CheckCircle
      case 'pending': return Clock
      default: return MessageSquare
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Support Tickets</h1>
              <p className="text-muted-foreground">Manage and track your support requests</p>
            </div>
            <Button onClick={() => router.push('/customer/create-ticket')}>
              <Plus className="h-4 w-4 mr-2" />
              New Ticket
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search tickets..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm{e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filterStatus === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterStatus('all')}
                >
                  All ({tickets.length})
                </Button>
                <Button
                  variant={filterStatus === 'open' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterStatus('open')}
                >
                  Open ({tickets.filter(t => t.status === 'open').length})
                </Button>
                <Button
                  variant={filterStatus === 'in_progress' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterStatus('in_in_progress')}
                >
                  In Progress ({tickets.filter(t => t.status === 'in_progress').length})
                </Button>
                <Button
                  variant={filterStatus === 'resolved' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterStatus('resolved')}
                >
                  Resolved ({tickets.filter(t => t.status === 'resolved').length})
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ticket List */}
        <div className="space-y-4">
          {filteredTickets.length > 0 ? (
            filteredTickets.map((ticket) => {
              const PriorityIcon = getPriorityIcon(ticket.priority)
              const StatusIcon = getStatusIcon(ticket.status)
              
              return (
                <Card key={ticket.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{ticket.title}</h3>
                          <Badge variant="outline">{ticket.id}</Badge>
                          <Badge variant={getStatusColor(ticket.status)}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {ticket.status.replace('_', ' ')}
                          </Badge>
                          <Badge variant="outline" className="flex items-center gap-1">
                            <PriorityIcon className="h-3 w-3" />
                            {ticket.priority}
                          </Badge>
                        </div>
                        
                        <p className="text-muted-foreground mb-4">{ticket.description}</p>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>• Created: {ticket.created}</span>
                          <span>• Updated: {ticket.updated}</span>
                          <span>• Assigned to: {ticket.assigned_to}</span>
                          <Badge variant="outline">{ticket.category}</Badge>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Reply
                        </Button>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <MessageSquare className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-lg font-medium mb-2">No tickets found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm || filterStatus !== 'all' 
                    ? 'Try adjusting your search or filter criteria'
                    : 'You haven\'t submitted any support tickets yet'
                  }
                </p>
                <Button onClick={() => router.push('/customer/create-ticket')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Ticket
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Statistics */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Your Ticket Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{tickets.length}</div>
                <div className="text-sm text-muted-foreground">Total Tickets</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-red-600">{tickets.filter(t => t.status === 'open').length}</div>
                <div className="text-sm text-muted-foreground">Open Tickets</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-green-600">{tickets.filter(t => t.status === 'resolved').length}</div>
                <div className="text-sm text-muted-foreground">Resolved</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{tickets.filter(t => t.status === 'in_progress').length}</div>
                <div className="text-sm text-muted-foreground">In Progress</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


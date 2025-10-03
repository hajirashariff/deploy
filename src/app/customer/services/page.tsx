'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Package,
  Search,
  Filter,
  ShoppingCart,
  Clock,
  Users,
  CheckCircle,
  Star,
  DollarSign,
  Calendar,
  AlertCircle
} from 'lucide-react'

export default function CustomerServicesPage() {
  const [activeTab, setActiveTab] = useState('available')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Mock services data
  const availableServices = [
    {
      id: 'SVC-001',
      name: 'Priority Support Package',
      category: 'Support',
      description: 'Expedited support with dedicated specialist and priority queue access',
      price: 299.99,
      duration_hours: 24,
      status: 'available',
      requirements: 'Active subscription required',
      features: ['Dedicated specialist', 'Priority queue', 'Phone support', 'Slack integration']
    },
    {
      id: 'SVC-002',
      name: 'Platform Training Session',
      category: 'Training',
      description: 'Personalized platform training for your team with hands-on practice',
      price: 199.99,
      duration_hours: 2,
      status: 'available',
      requirements: 'Minimum 3 attendees',
      features: ['Live demonstration', 'Q&A session', 'Custom scenarios', 'Training materials']
    },
    {
      id: 'SVC-003',
      name: 'Custom Integration Setup',
      category: 'Technical',
      description: 'Custom API integration tailored to your specific business needs',
      price: 599.99,
      duration_hours: 16,
      status: 'available',
      requirements: 'Technical requirements documentation',
      features: ['API development', 'Testing', 'Documentation', 'Maintenance plan']
    },
    {
      id: 'SVC-004',
      name: 'Emergency Support',
      category: 'Support',
      description: '24/7 emergency support for critical production issues',
      price: 499.99,
      duration_hours: 72,
      status: 'available',
      requirements: 'None',
      features: ['24/7 availability', 'Phone support', 'SLA guarantee', 'Expert escalation']
    },
    {
      id: 'SVC-005',
      name: 'Data Migration Service',
      category: 'Technical',
      description: 'Complete data migration from your old system with zero downtime',
      price: 799.99,
      duration_hours: 40,
      status: 'available',
      requirements: 'Data backup provided',
      features: ['Data mapping', 'Extraction', 'Transformation', 'Validation']
    },
    {
      id: 'SVC-006',
      name: 'Security Audit',
      category: 'Security',
      description: 'Comprehensive security assessment and recommendation report',
      price: 899.99,
      duration_hours: 8,
      status: 'available',
      requirements: 'System access required',
      features: ['Vulnerability scan', 'Penetration testing', 'Report generation', 'Remediation plan']
    }
  ]

  // Mock service requests
  const myServiceRequests = [
    {
      id: 'REQ-001',
      service_id: 'SVC-002',
      service_name: 'Platform Training Session',
      status: 'scheduled',
      request_date: '2024-01-10',
      scheduled_date: '2024-01-15',
      notes: 'Team training for new members'
    },
    {
      id: 'REQ-002',
      service_id: 'SVC-001',
      service_name: 'Priority Support Package',
      status: 'completed',
      request_date: '2024-01-05',
      scheduled_date: '2024-01-05',
      completion_date: '2024-01-06',
      notes: 'Expired, need renewal'
    },
    {
      id: 'REQ-003',
      service_id: 'SVC-003',
      service_name: 'Custom Integration Setup',
      status: 'in_progress',
      request_date: '2024-01-12',
      scheduled_date: '2024-01-14',
      notes: 'CRM integration setup'
    }
  ]

  const categories = ['all', 'Support', 'Training', 'Technical', 'Security']
  const statuses = ['requested', 'scheduled', 'in_progress', 'completed', 'cancelled']

  const filteredServices = availableServices.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'default'
      case 'in_progress': return 'secondary'
      case 'completed': return 'default'
      case 'requested': return 'outline'
      default: return 'outline'
    }
  where else:
      switch (status) {
        case 'scheduled': return CheckCircle
        case 'completed': return CheckCircle
        case 'in_progress': return Clock
        case 'requested': return Clock
        default: return AlertCircle
      }
    const StatusIcon = getStatusIcon(status)
    
    return (
      <Card key={request.id}>
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-medium">{request.service_name}</h3>
                <Badge variant={getStatusColor(request.status)}>
                  <StatusIcon className="h-3 w-3 mr-1" />
                  {request.status.replace('_', ' ')}
                </Badge>
              </div>
              
              <div className="text-sm text-muted-foreground space-y-1">
                <div>Request ID: {request.id}</div>
                <div>Requested: {request.request_date}</div>
                {request.scheduled_date && <div>Scheduled: {request.scheduled_date}</div>}
                {request.completion_date && <div>Completed: {request.completion_date}</div>}
                {request.notes && <div>Notes: {request.notes}</div>}
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              {request.status === 'scheduled' && (
                <Button variant="outline" size="sm">
                  Reschedule
                </Button>
              )}
              {request.status === 'requested' && (
                <Button variant="outline" size="sm">
                  Cancel
                </Button>
              )}
              {request.status === 'completed' && (
                <Button variant="default" size="sm">
                  <Star className="h-4 w-4 mr-2" />
                  Rate Service
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      )}
    </div>
  )

  const renderAvailableServicesTab = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <Card key={service.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <CardTitle className="text-lg">{service.name}</CardTitle>
                <Badge variant="outline">{service.category}</Badge>
              </div>
              <Badge variant="default" className="w-fit">
                <CheckCircle className="h-3 w-3 mr-1" />
                Available
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{service.description}</p>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium flex items-center">
                    <DollarSign className="h-4 w-4 mr-1" />
                    Price
                  </span>
                  <span className="font-bold">${service.price.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    Duration
                  </span>
                  <span>{service.duration_hours} hours</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    Requirements
                  </span>
                  <span className="text-xs text-right max-w-[120px]">{service.requirements}</span>
                </div>
              </div>

              <div>
                <div className="text-sm font-medium mb-2">Features included:</div>
                <ul className="text-xs space-y-1">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="h-3 w-3 mr-2 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <Button className="w-full">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Request Service
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderMyRequestsTab = () => (
    <div className="space-y-4">
      {myServiceRequests.map((request) => {
        const StatusIcon = getStatusIcon(request.status)
        
        return (
          <Card key={request.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-medium">{request.service_name}</h3>
                    <Badge variant={getStatusColor(request.status)}>
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {request.status.replace('_', ' ')}
                    </Badge>
                  </div>
                  
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div>Request ID: {request.id}</div>
                    <div>Requested: {request.request_date}</div>
                    {request.scheduled_date && <div>Scheduled: {request.scheduled_date}</div>}
                    {request.completion_date && <div>Completed: {request.completion_date}</div>}
                    {request.notes && <div>Notes: {request.notes}</div>}
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  {request.status === 'scheduled' && (
                    <Button variant="outline" size="sm">
                      Reschedule
                    </Button>
                  )}
                  {request.status === 'requested' && (
                    <Button variant="outline" size="sm">
                      Cancel
                    </Button>
                  )}
                  {request.status === 'completed' && (
                    <Button variant="default" size="sm">
                      <Star className="h-4 w-4 mr-2" />
                      Rate Service
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}

      {/* Statistics */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Your Service Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{myServiceRequests.length}</div>
              <div className="text-sm text-muted-foreground">Total Requests</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">{myServiceRequests.filter(r => r.status === 'completed').length}</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">{myServiceRequests.filter(r => r.status === 'in_progress').length}</div>
              <div className="text-sm text-muted-foreground">In Progress</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{myServiceRequests.filter(r => r.status === 'scheduled').length}</div>
              <div className="text-sm text-muted-foreground">Scheduled</div>
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
                <Package className="h-6 w-6 mr-2 text-blue-500" />
                Services
              </h1>
              <p className="text-muted-foreground">Discover and request additional services</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-gray-800 border-b">
        <div className="px-6">
          <nav className="flex space-x-8">
            {[
              { id: 'available', label: 'Available Services', icon: Package },
              { id: 'my-requests', label: 'My Requests', icon: ShoppingCart }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 transition-colors flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-500'
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
        {activeTab === 'available' && renderAvailableServicesTab()}
        {activeTab === 'my-requests' && renderMyRequestsTab()}
      </div>
    </div>
  )
}


'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  HelpCircle,
  Search,
  BookOpen,
  MessageSquare,
  Phone,
  Mail,
  ChevronRight,
  Star,
  FileText,
  Users,
  Settings,
  Shield,
  Zap,
  Calendar
} from 'lucide-react'

export default function CustomerHelpPage() {
  const [activeTab, setActiveTab] = useState('search')
  const [searchTerm, setSearchTerm] = useState('')

  // Mock knowledge base articles
  const knowledgeBaseArticles = [
    {
      id: 'KB-001',
      title: 'Getting Started with BSM Platform',
      category: 'Getting Started',
      lastUpdated: '2024-01-10',
      helpfulCount: 45,
      description: 'Complete guide to set up and navigate the BSM Platform',
      tags: ['setup', 'navigation', 'basics']
    },
    {
      id: 'KB-002',
      title: 'How to Reset Your Password',
      category: 'Account Management',
      lastUpdated: '2024-01-08',
      helpfulCount: 38,
      description: 'Step-by-step instructions for password reset',
      tags: ['password', 'security', 'login']
    },
    {
      id: 'KB-003',
      title: 'Common Login Issues',
      category: 'Troubleshooting',
      lastUpdated: '2024-01-12',
      helpfulCount: 52,
      description: 'Solutions to frequently encountered login problems',
      tags: ['login', 'errors', 'troubleshooting']
    }
  ]

  const faqData = [
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
  ]

  const filteredArticles = knowledgeBaseArticles.filter(article => {
    if (!searchTerm) return true
    return article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
           article.description.toLowerCase().includes(searchTerm.toLowerCase())
  })

  const renderSearchTab = () => (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search knowledge base..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Button>Search</Button>
          </div>
        </CardContent>
      </Card>

      {searchTerm && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Search Results</h3>
          <div className="space-y-4">
            {filteredArticles.map((article) => (
              <Card key={article.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-lg mb-2">{article.title}</h4>
                      <p className="text-sm text-muted-foreground mb-3">{article.description}</p>
                      <div className="flex items-center space-x-4 text-sm">
                        <Badge variant="outline">{article.category}</Badge>
                        <span className="flex items-center text-muted-foreground">
                          <Star className="h-4 w-4 mr-1" />
                          {article.helpfulCount} helpful
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )

  const renderFaqTab = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <HelpCircle className="h-5 w-5 mr-2" />
          Frequently Asked Questions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div key={index} className="border-b pb-4">
              <h4 className="font-medium mb-2">{faq.question}</h4>
              <p className="text-sm text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )

  const renderContactTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="text-center">
          <CardContent className="p-8">
            <MessageSquare className="h-12 w-12 mx-auto mb-4 text-green-500" />
            <h3 className="text-lg font-semibold mb-2">Live Chat Support</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Chat with our support team in real-time
            </p>
            <Button className="w-full">Start Live Chat</Button>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-8">
            <Phone className="h-12 w-12 mx-auto mb-4 text-blue-500" />
            <h3 className="text-lg font-semibold mb-2">Phone Support</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Call us for immediate assistance
            </p>
            <p className="text-lg font-bold mb-4">1-800-SUPPORT</p>
            <Button variant="outline" className="w-full">Call Now</Button>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-8">
            <Mail className="h-12 w-12 mx-auto mb-4 text-purple-500" />
            <h3 className="text-lg font-semibold mb-2">Email Support</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Send us an email
            </p>
            <p className="text-sm font-mono mb-4">support@bsmplatform.com</p>
            <Button variant="outline" className="w-full">Send Email</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold flex items-center">
                <HelpCircle className="h-6 w-6 mr-2 text-green-500" />
                Help Center
              </h1>
              <p className="text-muted-foreground">Find answers and get support</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 border-b">
        <div className="px-6">
          <nav className="flex space-x-8">
            {[
              { id: 'search', label: 'Knowledge Base', icon: BookOpen },
              { id: 'faq', label: 'FAQ', icon: HelpCircle },
              { id: 'contact', label: 'Contact Support', icon: Phone }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 transition-colors flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-500'
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
        {activeTab === 'search' && renderSearchTab()}
        {activeTab === 'faq' && renderFaqTab()}
        {activeTab === 'contact' && renderContactTab()}
      </div>
    </div>
  )
}


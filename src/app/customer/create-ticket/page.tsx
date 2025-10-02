'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeft,
  MessageSquare,
  Tag,
  AlertCircle,
  Clock,
  User,
  Mail,
  Phone,
  FileText,
  Plus,
  Upload,
  Send,
  CheckCircle
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { supabase } from '@/lib/supabase/client'
import toast from 'react-hot-toast'

export default function CreateTicketPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'general',
    priority: 'medium',
    contactMethod: 'email',
    contactInfo: ''
  })
  const [attachments, setAttachments] = useState<File[]>([])
  const [message, setMessage] = useState('')

  useState(() => {
    setIsVisible(true)
  }, [])

  const categories = [
    { value: 'general', label: 'General Question', icon: '❓', color: 'bg-gray-100' },
    { value: 'technical', label: 'Technical Issue', icon: '🔧', color: 'bg-blue-100' },
    { value: 'billing', label: 'Billing Support', icon: '💳', color: 'bg-green-100' },
    { value: 'feature', label: 'Feature Request', icon: '💡', color: 'bg-purple-100' },
    { value: 'bug', label: 'Bug Report', icon: '🐛', color: 'bg-red-100' },
    { value: 'account', label: 'Account Issue', icon: '👤', color: 'bg-yellow-100' }
  ]

  const priorities = [
    { value: 'low', label: 'Low', color: 'text-green-600 bg-green-50' },
    { value: 'medium', label: 'Medium', color: 'text-yellow-600 bg-yellow-50' },
    { value: 'high', label: 'High', color: 'text-orange-600 bg-orange-50' },
    { value: 'urgent', label: 'Urgent', color: 'text-red-600 bg-red-50' }
  ]

  const contactMethods = [
    { value: 'email', label: 'Email', icon: Mail },
    { value: 'phone', label: 'Phone Call', icon: Phone },
    { value: 'chat', label: 'Live Chat', icon: MessageSquare }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')
    setLoading(true)

    try {
      // For demo purposes, create a mock ticket
      const newTicket = {
        id: crypto.randomUUID(),
        title: formData.title,
        description: formData.description,
        category: formData.category,
        priority: formData.priority,
        status: 'open',
        created_at: new Date().toISOString(),
        attachments: attachments.map(file => file.name),
        contact_method: formData.contactMethod,
        contact_info: formData.contactInfo
      }

      console.log('Creating ticket:', newTicket)

      // In a real app, you would save this to Supabase
      /*
      const { data, error } = await supabase
        .from('tickets')
        .insert([{
          title: formData.title,
          description: formData.description,
          category: formData.category,
          priority: formData.priority,
          status: 'open',
          created_by: user?.id,
          contact_method: formData.contactMethod,
          contact_info: formData.contactInfo,
          attachments: attachments.map(file => file.name)
        }])

      if (error) {
        console.error('Error creating ticket:', error)
        throw error
      }
      */

      setMessage('Ticket created successfully! You will receive updates via email.')
      
      // Clear form
      setFormData({
        title: '',
        description: '',
        category: 'general',
        priority: 'medium',
        contactMethod: 'email',
        contactInfo: ''
      })
      setAttachments([])

      // Redirect after a short delay
      setTimeout(() => {
        router.push('/customer/dashboard')
      }, 2000)

    } catch (error: any) {
      console.error('Error creating ticket:', error)
      setMessage('Failed to create ticket. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setAttachments(prev => [...prev, ...files])
  }

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/customer/dashboard" className="flex items-center text-sm text-gray-600 hover:text-gray-900">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-2xl font-bold">Create Support Ticket</h1>
            </div>
            <Badge variant="outline">Customer Portal</Badge>
          </div>
        </div>
      </header>

      <div className="p-6">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.6 }}
        >
          {/* Progress Steps */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-center space-x-8">
                {[
                  { step: 1, title: 'Describe Issue', done: true },
                  { step: 2, title: 'Set Priority', done: !!formData.priority },
                  { step: 3, title: 'Contact Info', done: !!formData.contactMethod },
                  { step: 4, title: 'Submit', done: false }
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      item.done || (index === 0) ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                    }`}>
                      {item.done ? <CheckCircle className="h-4 w-4" /> : item.step}
                    </div>
                    <div className="ml-2 text-sm font-medium text-gray-700">{item.title}</div>
                    {index < 3 && <div className="w-8 h-px bg-gray-300 ml-4"></div>}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Ticket Information
                </CardTitle>
                <CardDescription>
                  Describe your issue or question in detail
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium">Subject *</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
					className="w-full"
                    placeholder="Brief description of your issue"
                    required
                  />
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Category *</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {categories.map((category) => (
                      <motion.button
                        key={category.value}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, category: category.value }))}
                        className={`p-4 rounded-lg border-2 text-left transition-all ${
                          formData.category === category.value
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-lg">{category.icon}</span>
                          <span className="font-medium text-sm">{category.label}</span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium">Details *</Label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Please provide as much detail as possible about your issue. Include steps to reproduce if applicable."
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Priority */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  Priority Level
                </CardTitle>
                <CardDescription>
                  How urgent is your request?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {priorities.map((priority) => (
                    <motion.button
                      key={priority.value}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, priority: priority.value }))}
                      className={`p-4 rounded-lg border text-center transition-all ${
                        formData.priority === priority.value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${priority.color}`}>
                        {priority.label} Priority
                      </div>
                    </motion.button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Contact Preferences
                </CardTitle>
                <CardDescription>
                  How would you like us to reach you?
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Contact Method */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Preferred Contact Method</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {contactMethods.map((method) => {
                      const IconComponent = method.icon
                      return (
                        <motion.button
                          key={method.value}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, contactMethod: method.value }))}
                          className={`p-4 rounded-lg border text-center transition-all ${
                            formData.contactMethod === method.value
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <IconComponent className="h-6 w-6 mx-auto mb-2 text-gray-600" />
                          <span className="font-medium text-sm">{method.label}</span>
                        </motion.button>
                      )
                    })}
                  </div>
                </div>

                {/* Contact Info */}
                {formData.contactMethod === 'email' && (
                  <div className="space-y-2">
                    <Label htmlFor="contactInfo" className="text-sm font-medium">
                      Email Address {formData.contactMethod === 'email' && '*'}
                    </Label>
                    <Input
                      id="contactInfo"
                      name="contactInfo"
                      type="email"
                      value={formData.contactInfo}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      className="w-full"
                      required={formData.contactMethod === 'email'}
                    />
                  </div>
                )}

                {formData.contactMethod === 'phone' && (
                  <div className="space-y-2">
                    <Label htmlFor="contactInfo" className="text-sm font-medium">
                      Phone Number *
                    </Label>
                    <Input
                      id="contactInfo"
                      name="contactInfo"
                      type="tel"
                      value={formData.contactInfo}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 123-4567"
                      className="w-full"
                      required={formData.contactMethod === 'phone'}
                    />
                  </div>
                )}

                {formData.contactMethod === 'chat' && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Live Chat
                    </Label>
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-700">
                        We'll contact you through live chat during business hours (9 AM - 6 PM EST)
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Attachments */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Upload className="h-5 w-5 mr-2" />
                  Attachments (Optional)
                </CardTitle>
                <CardDescription>
                  Upload screenshots, documents, or other relevant files
                </CardContent>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                      accept="image/*,.pdf,.doc,.docx,.txt"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-600">Click to upload files</p>
                      <p className="text-xs text-gray-400">Images, PDFs, documents (max 10MB each)</p>
                    </label>
                  </div>

                  {attachments.length > 0 && (
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Attached Files:</Label>
                      {attachments.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <FileText className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-700">{file.name}</span>
                            <span className="text-xs text-gray-500">({(file.size / 1024).toFixed(1)} KB)</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeAttachment(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Success Message */}
            <AnimatePresence>
              {message && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-2"
                >
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-green-700">{message}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Ticket will be created and assigned a reference number
                  </div>
                  <Button
                    type="submit"
                    disabled={loading || !formData.title || !formData.description}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {loading ? (
                      <>
                        <motion.div
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full mr-2"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        Creating Ticket...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Submit Ticket
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

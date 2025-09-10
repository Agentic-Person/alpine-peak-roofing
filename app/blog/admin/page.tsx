'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { 
  Lock, 
  User,
  Eye,
  EyeOff,
  ArrowLeft,
  Shield,
  Edit3,
  FileText,
  Calendar,
  Trash2
} from 'lucide-react'

export default function BlogAdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [loginError, setLoginError] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple authentication - in production, this would be handled more securely
    if (credentials.username === 'admin' && credentials.password === 'alpineadmin2025') {
      setIsLoggedIn(true)
      setLoginError('')
    } else {
      setLoginError('Invalid username or password')
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCredentials({ username: '', password: '' })
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold">Alpine Peak Roofing</span>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900 flex items-center justify-center">
              <Lock className="h-6 w-6 mr-2" />
              Admin Login
            </CardTitle>
            <CardDescription>
              Access the blog management system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Enter username"
                    value={credentials.username}
                    onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter password"
                    value={credentials.password}
                    onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              
              {loginError && (
                <div className="text-red-600 text-sm text-center bg-red-50 p-2 rounded">
                  {loginError}
                </div>
              )}
              
              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <Link href="/blog" className="text-blue-600 hover:text-blue-700 text-sm flex items-center justify-center">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Blog
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Shield className="h-6 w-6 text-blue-600" />
              <span className="font-bold">Alpine Peak Roofing</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-600">Blog Admin</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, Admin</span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Dashboard */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Blog Management</h1>
          <p className="text-gray-600">Create, edit, and manage blog posts for Alpine Peak Roofing</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mx-auto mb-4">
                <Edit3 className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Create New Post</h3>
              <p className="text-gray-600 text-sm">Write a new blog post</p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 mx-auto mb-4">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Manage Posts</h3>
              <p className="text-gray-600 text-sm">Edit existing posts</p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 mx-auto mb-4">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Schedule Posts</h3>
              <p className="text-gray-600 text-sm">Plan future content</p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mx-auto mb-4">
                <Trash2 className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Drafts & Trash</h3>
              <p className="text-gray-600 text-sm">Manage drafts and deleted posts</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Posts */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Posts</CardTitle>
            <CardDescription>
              Latest blog posts and their status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-gray-500">
              <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium mb-2">No posts yet</p>
              <p className="text-sm">Create your first blog post to get started</p>
              <Button className="mt-4">
                <Edit3 className="h-4 w-4 mr-2" />
                Create First Post
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="mt-8 text-center">
          <Link href="/blog" className="text-blue-600 hover:text-blue-700 inline-flex items-center">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Blog
          </Link>
        </div>
      </div>
    </div>
  )
}
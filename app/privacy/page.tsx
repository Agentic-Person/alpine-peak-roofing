import React from 'react'
import { Shield, Eye, Lock, Users, FileText, Phone } from 'lucide-react'

export const metadata = {
  title: 'Privacy Policy | Alpine Peak Roofing',
  description: 'Alpine Peak Roofing privacy policy. Learn how we protect your personal information and data.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-blue-600 rounded-full">
                <Shield className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
            <p className="text-lg text-gray-600">
              Your privacy is important to us. This policy explains how Alpine Peak Roofing collects, uses, and protects your information.
            </p>
            <p className="text-sm text-gray-500 mt-2">Last updated: September 13, 2025</p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="space-y-8">
              
              {/* Information We Collect */}
              <section>
                <div className="flex items-center mb-4">
                  <Eye className="h-6 w-6 text-blue-600 mr-3" />
                  <h2 className="text-2xl font-semibold text-gray-900">Information We Collect</h2>
                </div>
                <div className="space-y-4 text-gray-700">
                  <p><strong>Personal Information:</strong> Name, email address, phone number, and mailing address when you contact us or request services.</p>
                  <p><strong>Property Information:</strong> Address, roof details, and project specifications for estimates and services.</p>
                  <p><strong>Communication Records:</strong> Chat conversations, emails, and phone call records for quality and service purposes.</p>
                  <p><strong>Website Usage:</strong> IP address, browser type, pages visited, and interaction data through cookies and analytics.</p>
                </div>
              </section>

              {/* How We Use Information */}
              <section>
                <div className="flex items-center mb-4">
                  <Users className="h-6 w-6 text-blue-600 mr-3" />
                  <h2 className="text-2xl font-semibold text-gray-900">How We Use Your Information</h2>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li>• Provide roofing estimates, consultations, and services</li>
                  <li>• Communicate about projects, schedules, and updates</li>
                  <li>• Process payments and maintain business records</li>
                  <li>• Improve our website, services, and customer experience</li>
                  <li>• Send relevant information about roofing maintenance and services</li>
                  <li>• Comply with legal obligations and business requirements</li>
                </ul>
              </section>

              {/* AI Chatbot Privacy */}
              <section>
                <div className="flex items-center mb-4">
                  <FileText className="h-6 w-6 text-blue-600 mr-3" />
                  <h2 className="text-2xl font-semibold text-gray-900">AI Chatbot Privacy</h2>
                </div>
                <div className="space-y-4 text-gray-700">
                  <p>Our AI chatbot is designed to help you with roofing questions and service requests:</p>
                  <ul className="space-y-2 ml-4">
                    <li>• Chat conversations are stored to improve service quality</li>
                    <li>• No conversations are shared with third parties for marketing</li>
                    <li>• Personal information shared in chat is handled with the same privacy standards</li>
                    <li>• You can request deletion of your chat history at any time</li>
                  </ul>
                </div>
              </section>

              {/* Information Protection */}
              <section>
                <div className="flex items-center mb-4">
                  <Lock className="h-6 w-6 text-blue-600 mr-3" />
                  <h2 className="text-2xl font-semibold text-gray-900">How We Protect Your Information</h2>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li>• SSL encryption for all data transmission</li>
                  <li>• Secure servers with access controls and monitoring</li>
                  <li>• Regular security audits and updates</li>
                  <li>• Limited employee access on a need-to-know basis</li>
                  <li>• Industry-standard data protection practices</li>
                </ul>
              </section>

              {/* Information Sharing */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information Sharing</h2>
                <div className="space-y-4 text-gray-700">
                  <p>We do not sell your personal information. We may share information only in these circumstances:</p>
                  <ul className="space-y-2 ml-4">
                    <li>• With service providers who help us deliver services (e.g., payment processors)</li>
                    <li>• When required by law or to protect legal rights</li>
                    <li>• With your explicit consent for specific purposes</li>
                    <li>• In connection with a business transfer or merger</li>
                  </ul>
                </div>
              </section>

              {/* Your Rights */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Privacy Rights</h2>
                <ul className="space-y-2 text-gray-700">
                  <li>• Access and review your personal information</li>
                  <li>• Request corrections to inaccurate information</li>
                  <li>• Request deletion of your personal information</li>
                  <li>• Opt-out of marketing communications</li>
                  <li>• Request information about data sharing practices</li>
                </ul>
              </section>

              {/* Cookies */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Cookies and Tracking</h2>
                <div className="space-y-4 text-gray-700">
                  <p>We use cookies and similar technologies to:</p>
                  <ul className="space-y-2 ml-4">
                    <li>• Remember your preferences and settings</li>
                    <li>• Analyze website traffic and usage patterns</li>
                    <li>• Improve website functionality and user experience</li>
                    <li>• Provide relevant content and advertisements</li>
                  </ul>
                  <p>You can control cookies through your browser settings.</p>
                </div>
              </section>

              {/* Contact */}
              <section className="bg-blue-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <Phone className="h-6 w-6 text-blue-600 mr-3" />
                  <h2 className="text-2xl font-semibold text-gray-900">Contact Us About Privacy</h2>
                </div>
                <div className="space-y-2 text-gray-700">
                  <p>If you have questions about this privacy policy or want to exercise your privacy rights:</p>
                  <p><strong>Email:</strong> privacy@alpinepeakroofing.com</p>
                  <p><strong>Phone:</strong> (970) 446-8995</p>
                  <p><strong>Mail:</strong> Alpine Peak Roofing, Privacy Officer, Denver, CO</p>
                </div>
              </section>

              {/* Updates */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Policy Updates</h2>
                <p className="text-gray-700">
                  We may update this privacy policy periodically to reflect changes in our practices or applicable laws. 
                  We will notify you of material changes by posting the updated policy on our website with a new effective date.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
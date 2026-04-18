import React from 'react'
import { Shield, Eye, Lock, Users, FileText, Phone, MessageSquare, Bot } from 'lucide-react'

export const metadata = {
  title: 'Privacy Policy | Alpine Peak Roofing',
  description: 'Alpine Peak Roofing privacy policy. Learn how we collect, use, and protect your personal information including SMS communications.',
  alternates: {
    canonical: 'https://alpinepeakroofing.com/privacy',
  },
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
            <p className="text-sm text-gray-500 mt-2">Effective Date: March 8, 2026</p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="space-y-8">

              {/* 1. Who We Are */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Who We Are</h2>
                <p className="text-gray-700">
                  Alpine Peak Roofing is a premium roofing contractor serving the Denver metro area and Colorado mountain communities.
                  This Privacy Policy applies to our website, AI chat assistant, AI voice agent, contact forms, and all other
                  communication channels through which you may interact with us.
                </p>
              </section>

              {/* 2. Information We Collect */}
              <section>
                <div className="flex items-center mb-4">
                  <Eye className="h-6 w-6 text-blue-600 mr-3" />
                  <h2 className="text-2xl font-semibold text-gray-900">2. Information We Collect</h2>
                </div>
                <div className="space-y-3 text-gray-700">
                  <p><strong>Contact Information:</strong> Name, email address, phone number, and mailing address when you contact us, request services, or submit a form.</p>
                  <p><strong>Property Information:</strong> Property address, roof details, and project specifications for estimates and service delivery.</p>
                  <p><strong>Communication Records:</strong> Chat conversations, SMS messages, voice call transcripts, and emails for service quality and follow-up purposes.</p>
                  <p><strong>Website Usage:</strong> IP address, browser type, pages visited, and interaction data through cookies and analytics tools.</p>
                  <p><strong>Service Request Details:</strong> Information you share about roofing needs, insurance claims, storm damage, or other service inquiries.</p>
                </div>
              </section>

              {/* 3. How We Use Your Information */}
              <section>
                <div className="flex items-center mb-4">
                  <Users className="h-6 w-6 text-blue-600 mr-3" />
                  <h2 className="text-2xl font-semibold text-gray-900">3. How We Use Your Information</h2>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li>• Respond to your roofing inquiries and service requests</li>
                  <li>• Provide estimates, consultations, and roofing services</li>
                  <li>• Send appointment confirmations, scheduling updates, and project follow-ups</li>
                  <li>• Coordinate insurance claims and communicate with adjusters on your behalf</li>
                  <li>• Process payments and maintain business records</li>
                  <li>• Improve our website, AI systems, and customer experience</li>
                  <li>• Comply with legal obligations</li>
                </ul>
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <p className="text-gray-800 font-medium">
                    We do not sell, rent, or share your personal information with third parties for marketing purposes.
                  </p>
                </div>
              </section>

              {/* 4. SMS and Text Messaging */}
              <section>
                <div className="flex items-center mb-4">
                  <MessageSquare className="h-6 w-6 text-blue-600 mr-3" />
                  <h2 className="text-2xl font-semibold text-gray-900">4. SMS and Text Messaging</h2>
                </div>
                <div className="space-y-3 text-gray-700">
                  <p>
                    By providing your phone number and requesting communication from us, you consent to receive SMS text messages
                    related to your inquiry. These messages may include:
                  </p>
                  <ul className="space-y-2 ml-4">
                    <li>• Responses to questions or service requests you have submitted</li>
                    <li>• Appointment confirmations and reminders</li>
                    <li>• Estimates, inspection scheduling, and project updates</li>
                    <li>• Insurance claim status updates</li>
                    <li>• Follow-up from our team regarding your roofing project</li>
                  </ul>
                  <p><strong>Message frequency varies</strong> based on your interaction. <strong>Message and data rates may apply</strong> depending on your carrier and plan.</p>
                  <p>
                    To opt out of SMS messages at any time, reply <strong>STOP</strong> to any message. You will receive one
                    final confirmation and no further messages will be sent. For help, reply <strong>HELP</strong> or contact us
                    at <a href="mailto:info@alpinepeakroofing.com" className="text-blue-600 underline">info@alpinepeakroofing.com</a>.
                  </p>
                  <p>Opting out of SMS does not affect other communication channels (email, phone) unless you separately request that.</p>
                </div>
              </section>

              {/* 5. AI-Powered Communications */}
              <section>
                <div className="flex items-center mb-4">
                  <Bot className="h-6 w-6 text-blue-600 mr-3" />
                  <h2 className="text-2xl font-semibold text-gray-900">5. AI-Powered Communications</h2>
                </div>
                <div className="space-y-3 text-gray-700">
                  <p>Our website and phone system use artificial intelligence, including an AI chat assistant and AI voice agent. When you interact with these systems:</p>
                  <ul className="space-y-2 ml-4">
                    <li>• You may be communicating with an AI, not a human representative</li>
                    <li>• AI responses are generated automatically and may not always be perfectly accurate — verify important details (pricing, scheduling, availability) directly with our team</li>
                    <li>• Conversations may be logged and reviewed to improve service quality</li>
                    <li>• Personal information shared in AI conversations is handled with the same privacy standards as all other channels</li>
                    <li>• You can request deletion of your conversation history at any time</li>
                  </ul>
                </div>
              </section>

              {/* 6. Information Protection */}
              <section>
                <div className="flex items-center mb-4">
                  <Lock className="h-6 w-6 text-blue-600 mr-3" />
                  <h2 className="text-2xl font-semibold text-gray-900">6. How We Protect Your Information</h2>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li>• SSL/TLS encryption for all data transmission</li>
                  <li>• Secure cloud storage with access controls and monitoring</li>
                  <li>• Limited employee access on a need-to-know basis</li>
                  <li>• Industry-standard data protection practices</li>
                </ul>
                <p className="text-gray-700 mt-3">
                  No method of data transmission over the internet is 100% secure. We encourage you not to share sensitive
                  financial information through chat or SMS.
                </p>
              </section>

              {/* 7. Information Sharing */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Information Sharing and Third Parties</h2>
                <div className="space-y-3 text-gray-700">
                  <p>We do not sell your personal information. We share information only in these limited circumstances:</p>
                  <ul className="space-y-2 ml-4">
                    <li>• <strong>Service providers</strong> who help us deliver our services (e.g., SMS infrastructure, AI platforms, payment processors) — these providers are contractually prohibited from using your data for their own marketing purposes</li>
                    <li>• <strong>Insurance companies or adjusters</strong> when you have requested claim assistance and authorized us to communicate on your behalf</li>
                    <li>• <strong>Legal requirements</strong> when required by law or to protect our legal rights</li>
                    <li>• <strong>Business transfers</strong> in connection with a merger or acquisition, with notice to you</li>
                  </ul>
                </div>
              </section>

              {/* 8. Data Retention */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Data Retention</h2>
                <p className="text-gray-700">
                  We retain your contact information and communication history for as long as necessary to fulfill your
                  service request and maintain our business records, typically no longer than 24 months from your last
                  interaction unless required otherwise by law. You may request deletion of your data at any time.
                </p>
              </section>

              {/* 9. Your Rights */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Your Privacy Rights</h2>
                <ul className="space-y-2 text-gray-700">
                  <li>• Access and review your personal information</li>
                  <li>• Request corrections to inaccurate information</li>
                  <li>• Request deletion of your personal information</li>
                  <li>• Opt out of SMS or marketing communications</li>
                  <li>• Request information about data sharing practices</li>
                </ul>
                <p className="text-gray-700 mt-3">
                  <strong>California residents</strong> may have additional rights under the California Consumer Privacy Act (CCPA),
                  including the right to know what personal information is collected and to request deletion.
                </p>
                <p className="text-gray-700 mt-2">
                  To exercise any of these rights, contact us at{' '}
                  <a href="mailto:info@alpinepeakroofing.com" className="text-blue-600 underline">info@alpinepeakroofing.com</a>.
                </p>
              </section>

              {/* 10. Cookies */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Cookies and Tracking</h2>
                <div className="space-y-3 text-gray-700">
                  <p>We use cookies and similar technologies to:</p>
                  <ul className="space-y-2 ml-4">
                    <li>• Remember your preferences and settings</li>
                    <li>• Analyze website traffic and usage patterns</li>
                    <li>• Improve website functionality and user experience</li>
                  </ul>
                  <p>You can control cookies through your browser settings.</p>
                </div>
              </section>

              {/* 11. Children's Privacy */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Children's Privacy</h2>
                <p className="text-gray-700">
                  Our services are not directed to children under the age of 13. We do not knowingly collect personal
                  information from children. If you believe we have inadvertently collected such information, please
                  contact us immediately.
                </p>
              </section>

              {/* 12. Policy Updates */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Policy Updates</h2>
                <p className="text-gray-700">
                  We may update this privacy policy periodically to reflect changes in our practices or applicable laws.
                  We will notify you of material changes by posting the updated policy on our website with a new effective date.
                  Continued use of our services after changes are posted constitutes acceptance of the updated policy.
                </p>
              </section>

              {/* Contact */}
              <section className="bg-blue-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <Phone className="h-6 w-6 text-blue-600 mr-3" />
                  <h2 className="text-2xl font-semibold text-gray-900">Contact Us About Privacy</h2>
                </div>
                <div className="space-y-2 text-gray-700">
                  <p>If you have questions about this privacy policy or want to exercise your privacy rights:</p>
                  <p><strong>Email:</strong> info@alpinepeakroofing.com</p>
                  <p><strong>Phone:</strong> (970) 456-1176</p>
                  <p><strong>Mail:</strong> Alpine Peak Roofing, Denver, Colorado</p>
                </div>
              </section>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

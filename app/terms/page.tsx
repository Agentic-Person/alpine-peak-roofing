import React from 'react'
import { FileText, CheckCircle, AlertTriangle, Phone, Gavel, Shield, MessageSquare, Bot } from 'lucide-react'

export const metadata = {
  title: 'Terms of Service | Alpine Peak Roofing',
  description: 'Alpine Peak Roofing terms of service. Read our service terms, SMS consent policy, AI assistant terms, and conditions.',
  alternates: {
    canonical: 'https://alpinepeakroofing.com/terms',
  },
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-blue-600 rounded-full">
                <FileText className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
            <p className="text-lg text-gray-600">
              These terms govern your use of Alpine Peak Roofing services, website, AI assistant, and communications.
            </p>
            <p className="text-sm text-gray-500 mt-2">Effective Date: March 8, 2026</p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="space-y-8">

              {/* 1. Acceptance */}
              <section>
                <div className="flex items-center mb-4">
                  <Gavel className="h-6 w-6 text-blue-600 mr-3" />
                  <h2 className="text-2xl font-semibold text-gray-900">1. Acceptance of Terms</h2>
                </div>
                <div className="space-y-3 text-gray-700">
                  <p>
                    By accessing our website, using our AI assistant, submitting a contact form, or communicating with us
                    via chat, SMS, or voice, you agree to these Terms of Service and all applicable laws and regulations.
                    If you do not agree, please discontinue use of our services.
                  </p>
                  <p>
                    These terms apply to all users of Alpine Peak Roofing services, including customers, website visitors,
                    and anyone who communicates with us through any channel.
                  </p>
                </div>
              </section>

              {/* 2. Services */}
              <section>
                <div className="flex items-center mb-4">
                  <CheckCircle className="h-6 w-6 text-blue-600 mr-3" />
                  <h2 className="text-2xl font-semibold text-gray-900">2. Our Services</h2>
                </div>
                <div className="space-y-3 text-gray-700">
                  <p><strong>Roofing Services:</strong> Installation, repair, maintenance, and inspection of residential and commercial roofing systems in the Denver metro area and Colorado mountain communities.</p>
                  <p><strong>Emergency Services:</strong> 24/7 emergency roofing repairs and storm damage response.</p>
                  <p><strong>Insurance Assistance:</strong> Coordination with insurance companies and adjusters for storm damage claims.</p>
                  <p><strong>Consultation Services:</strong> Roofing assessments, estimates, and expert advice.</p>
                  <p><strong>Digital Services:</strong> Website tools, AI chat assistant, AI voice agent, and online resources.</p>
                </div>
              </section>

              {/* 3. SMS Communications & Consent */}
              <section>
                <div className="flex items-center mb-4">
                  <MessageSquare className="h-6 w-6 text-blue-600 mr-3" />
                  <h2 className="text-2xl font-semibold text-gray-900">3. SMS Communications &amp; Consent</h2>
                </div>
                <div className="space-y-3 text-gray-700">
                  <p>
                    By providing your phone number and submitting a request through our website, contact form, or AI assistant,
                    you expressly consent to receive SMS text messages from Alpine Peak Roofing related to your inquiry.
                    These messages may include:
                  </p>
                  <ul className="space-y-2 ml-4">
                    <li>• Responses to questions or service requests you have submitted</li>
                    <li>• Appointment confirmations and reminders</li>
                    <li>• Estimates, inspection scheduling, and project updates</li>
                    <li>• Insurance claim status and follow-up</li>
                    <li>• Follow-up from our team regarding your roofing project</li>
                  </ul>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="font-medium text-gray-800">
                      This consent is not a condition of any purchase or service. You are not required to consent to SMS
                      messages to receive our services through other channels.
                    </p>
                  </div>
                  <p><strong>Message frequency varies</strong> based on your interaction. <strong>Message and data rates may apply</strong> depending on your carrier and plan.</p>
                  <p>
                    To opt out of SMS messages at any time, reply <strong>STOP</strong> to any message. You will receive
                    one confirmation message and no further SMS will be sent. For help, reply <strong>HELP</strong> or
                    contact us at <a href="mailto:info@alpinepeakroofing.com" className="text-blue-600 underline">info@alpinepeakroofing.com</a>.
                  </p>
                </div>
              </section>

              {/* 4. AI-Powered Services */}
              <section>
                <div className="flex items-center mb-4">
                  <Bot className="h-6 w-6 text-blue-600 mr-3" />
                  <h2 className="text-2xl font-semibold text-gray-900">4. AI-Powered Services</h2>
                </div>
                <div className="space-y-3 text-gray-700">
                  <p>Our website and phone system use artificial intelligence, including an AI chat assistant and AI voice agent. By using these services, you acknowledge:</p>
                  <ul className="space-y-2 ml-4">
                    <li>• You may be interacting with an AI system, not a human representative</li>
                    <li>• AI responses are generated automatically and may not always be perfectly accurate</li>
                    <li>• For accurate estimates, pricing, and scheduling, verify details directly with our human team</li>
                    <li>• Emergency situations should always be reported directly by phone: <strong>(970) 456-1176</strong></li>
                    <li>• Conversations with our AI systems may be logged for quality assurance and service improvement</li>
                  </ul>
                </div>
              </section>

              {/* 5. Website Use */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Website Use</h2>
                <div className="space-y-3 text-gray-700">
                  <p>You may use our website for lawful purposes only. You agree not to:</p>
                  <ul className="space-y-2 ml-4">
                    <li>• Use the site in any way that violates applicable laws or regulations</li>
                    <li>• Transmit or send unsolicited commercial communications</li>
                    <li>• Attempt to gain unauthorized access to our systems</li>
                    <li>• Interfere with the security or functionality of the website</li>
                    <li>• Use automated systems to access the site without permission</li>
                    <li>• Attempt to manipulate, deceive, or misuse our AI systems</li>
                    <li>• Submit another person's phone number without their explicit consent</li>
                  </ul>
                </div>
              </section>

              {/* 6. Service Agreements */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Service Agreements</h2>
                <div className="space-y-3 text-gray-700">
                  <p><strong>Estimates:</strong> All estimates are preliminary and subject to final inspection and written agreement.</p>
                  <p><strong>Contracts:</strong> Formal contracts will specify detailed terms, timeline, and pricing for each project.</p>
                  <p><strong>Changes:</strong> Project modifications must be agreed upon in writing and may affect pricing and timeline.</p>
                  <p><strong>Weather Dependencies:</strong> Roofing work is weather-dependent and schedules may be adjusted for safety.</p>
                </div>
              </section>

              {/* 7. Payment Terms */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Payment Terms</h2>
                <ul className="space-y-2 text-gray-700">
                  <li>• Payment schedules are specified in individual service contracts</li>
                  <li>• We accept various payment methods as outlined in your contract</li>
                  <li>• Late payments may be subject to fees as specified in your agreement</li>
                  <li>• Insurance claims require coordination with your insurance provider</li>
                  <li>• Final payment is due upon satisfactory completion of work</li>
                  <li>• 0% financing available for qualified homeowners — subject to credit approval</li>
                </ul>
              </section>

              {/* 8. Warranties */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Warranties and Guarantees</h2>
                <div className="space-y-3 text-gray-700">
                  <p><strong>Workmanship Warranty:</strong> We guarantee our workmanship as specified in your service contract.</p>
                  <p><strong>Material Warranties:</strong> Material warranties are provided by manufacturers and vary by product.</p>
                  <p><strong>Warranty Claims:</strong> Must be reported promptly and are subject to inspection and verification.</p>
                  <p><strong>Exclusions:</strong> Warranties do not cover damage from extreme weather events, normal wear, or improper maintenance by others.</p>
                </div>
              </section>

              {/* 9. Disclaimer of Warranties */}
              <section>
                <div className="flex items-center mb-4">
                  <AlertTriangle className="h-6 w-6 text-blue-600 mr-3" />
                  <h2 className="text-2xl font-semibold text-gray-900">9. Disclaimer of Warranties</h2>
                </div>
                <div className="space-y-3 text-gray-700">
                  <p>
                    Our website, AI assistant, and digital services are provided <strong>"as is"</strong> and{' '}
                    <strong>"as available"</strong> without warranties of any kind, express or implied. We do not guarantee that:
                  </p>
                  <ul className="space-y-2 ml-4">
                    <li>• Our digital services will be uninterrupted or error-free</li>
                    <li>• AI-generated responses will be accurate, complete, or suitable for your specific situation</li>
                    <li>• SMS messages will be delivered in real time or at all times</li>
                  </ul>
                </div>
              </section>

              {/* 10. Limitation of Liability */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Limitation of Liability</h2>
                <div className="space-y-3 text-gray-700">
                  <p>
                    To the fullest extent permitted by law, Alpine Peak Roofing shall not be liable for any indirect,
                    incidental, special, consequential, or punitive damages, including but not limited to loss of profits,
                    data, or use, arising from your use of our services, website, or reliance on AI-generated information.
                  </p>
                  <p>
                    Our total liability to you for any claim shall not exceed the amount paid for the specific services
                    that gave rise to the claim.
                  </p>
                </div>
              </section>

              {/* 11. Insurance and Licensing */}
              <section>
                <div className="flex items-center mb-4">
                  <Shield className="h-6 w-6 text-blue-600 mr-3" />
                  <h2 className="text-2xl font-semibold text-gray-900">11. Insurance and Licensing</h2>
                </div>
                <div className="space-y-3 text-gray-700">
                  <p>Alpine Peak Roofing maintains:</p>
                  <ul className="space-y-2 ml-4">
                    <li>• General liability insurance</li>
                    <li>• Workers' compensation insurance</li>
                    <li>• Professional licensing as required by Colorado law</li>
                    <li>• Bonding for applicable projects</li>
                  </ul>
                  <p>Insurance certificates are available upon request.</p>
                </div>
              </section>

              {/* 12. Privacy */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Privacy</h2>
                <p className="text-gray-700">
                  Your use of our services is governed by our{' '}
                  <a href="/privacy" className="text-blue-600 underline">Privacy Policy</a>, which is incorporated
                  into these Terms by reference. Please review it to understand our data practices, including how we
                  handle SMS communications and AI conversation data.
                </p>
              </section>

              {/* 13. Dispute Resolution */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Dispute Resolution and Governing Law</h2>
                <div className="space-y-3 text-gray-700">
                  <p>We encourage direct communication to resolve any concerns:</p>
                  <ol className="space-y-2 ml-4">
                    <li>1. Contact us directly to discuss the issue</li>
                    <li>2. If unresolved, we may recommend mediation</li>
                    <li>3. Legal disputes will be governed by the laws of the State of Colorado</li>
                    <li>4. Venue for legal proceedings will be in Denver County, Colorado</li>
                  </ol>
                </div>
              </section>

              {/* 14. Modifications */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Modifications to These Terms</h2>
                <p className="text-gray-700">
                  We reserve the right to modify these terms at any time. Changes will be posted on our website with
                  an updated effective date. Continued use of our services after changes constitutes acceptance of
                  the modified terms.
                </p>
              </section>

              {/* Contact */}
              <section className="bg-blue-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <Phone className="h-6 w-6 text-blue-600 mr-3" />
                  <h2 className="text-2xl font-semibold text-gray-900">Contact Information</h2>
                </div>
                <div className="space-y-2 text-gray-700">
                  <p>For questions about these terms or our services:</p>
                  <p><strong>Phone:</strong> (970) 456-1176</p>
                  <p><strong>Email:</strong> info@alpinepeakroofing.com</p>
                  <p><strong>Address:</strong> Alpine Peak Roofing, Denver, Colorado</p>
                  <p><strong>Business Hours:</strong> Monday–Friday 8:00 AM – 6:00 PM</p>
                  <p><strong>Emergency:</strong> 24/7 emergency service available</p>
                </div>
              </section>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

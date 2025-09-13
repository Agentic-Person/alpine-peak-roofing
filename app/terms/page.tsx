import React from 'react'
import { FileText, CheckCircle, AlertTriangle, Phone, Gavel, Shield } from 'lucide-react'

export const metadata = {
  title: 'Terms of Service | Alpine Peak Roofing',
  description: 'Alpine Peak Roofing terms of service. Read our service terms, conditions, and policies.',
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
              These terms govern your use of Alpine Peak Roofing services and website.
            </p>
            <p className="text-sm text-gray-500 mt-2">Last updated: September 13, 2025</p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="space-y-8">
              
              {/* Agreement */}
              <section>
                <div className="flex items-center mb-4">
                  <Gavel className="h-6 w-6 text-blue-600 mr-3" />
                  <h2 className="text-2xl font-semibold text-gray-900">Agreement to Terms</h2>
                </div>
                <div className="space-y-4 text-gray-700">
                  <p>
                    By accessing our website or using our services, you agree to be bound by these Terms of Service 
                    and all applicable laws and regulations. If you do not agree with any of these terms, 
                    you are prohibited from using our services.
                  </p>
                  <p>
                    These terms apply to all users of Alpine Peak Roofing services, including customers, 
                    website visitors, and anyone who communicates with us through any channel.
                  </p>
                </div>
              </section>

              {/* Services */}
              <section>
                <div className="flex items-center mb-4">
                  <CheckCircle className="h-6 w-6 text-blue-600 mr-3" />
                  <h2 className="text-2xl font-semibold text-gray-900">Our Services</h2>
                </div>
                <div className="space-y-4 text-gray-700">
                  <p><strong>Roofing Services:</strong> Installation, repair, maintenance, and inspection of residential and commercial roofing systems.</p>
                  <p><strong>Emergency Services:</strong> 24/7 emergency roofing repairs and storm damage response.</p>
                  <p><strong>Consultation Services:</strong> Roofing assessments, estimates, and expert advice.</p>
                  <p><strong>Digital Services:</strong> Website tools, AI chatbot assistance, and online resources.</p>
                </div>
              </section>

              {/* Website Use */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Website Use</h2>
                <div className="space-y-4 text-gray-700">
                  <p>You may use our website for lawful purposes only. You agree not to:</p>
                  <ul className="space-y-2 ml-4">
                    <li>• Use the site in any way that violates applicable laws or regulations</li>
                    <li>• Transmit or send unsolicited commercial communications</li>
                    <li>• Attempt to gain unauthorized access to our systems</li>
                    <li>• Interfere with the security or functionality of the website</li>
                    <li>• Use automated systems to access the site without permission</li>
                    <li>• Impersonate Alpine Peak Roofing or our representatives</li>
                  </ul>
                </div>
              </section>

              {/* AI Chatbot Terms */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">AI Chatbot Services</h2>
                <div className="space-y-4 text-gray-700">
                  <p>Our AI chatbot is provided for informational and service purposes:</p>
                  <ul className="space-y-2 ml-4">
                    <li>• Chatbot responses are for general guidance and not professional advice</li>
                    <li>• For accurate estimates and technical advice, speak with our human experts</li>
                    <li>• Chatbot availability may vary and is not guaranteed 24/7</li>
                    <li>• Emergency situations should be reported directly by phone: (970) 446-8995</li>
                  </ul>
                </div>
              </section>

              {/* Service Agreements */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Service Agreements</h2>
                <div className="space-y-4 text-gray-700">
                  <p><strong>Estimates:</strong> All estimates are preliminary and subject to final inspection and agreement.</p>
                  <p><strong>Contracts:</strong> Formal contracts will specify detailed terms, timeline, and pricing for each project.</p>
                  <p><strong>Changes:</strong> Project modifications must be agreed upon in writing and may affect pricing and timeline.</p>
                  <p><strong>Weather Dependencies:</strong> Roofing work is weather-dependent and schedules may be adjusted for safety.</p>
                </div>
              </section>

              {/* Payment Terms */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Payment Terms</h2>
                <ul className="space-y-2 text-gray-700">
                  <li>• Payment schedules are specified in individual service contracts</li>
                  <li>• We accept various payment methods as outlined in your contract</li>
                  <li>• Late payments may be subject to fees as specified in your agreement</li>
                  <li>• Insurance claims require coordination with your insurance provider</li>
                  <li>• Final payment is due upon satisfactory completion of work</li>
                </ul>
              </section>

              {/* Warranties */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Warranties and Guarantees</h2>
                <div className="space-y-4 text-gray-700">
                  <p><strong>Workmanship Warranty:</strong> We guarantee our workmanship as specified in your service contract.</p>
                  <p><strong>Material Warranties:</strong> Material warranties are provided by manufacturers and vary by product.</p>
                  <p><strong>Warranty Claims:</strong> Must be reported promptly and are subject to inspection and verification.</p>
                  <p><strong>Exclusions:</strong> Warranties do not cover damage from extreme weather, normal wear, or improper maintenance.</p>
                </div>
              </section>

              {/* Limitations */}
              <section>
                <div className="flex items-center mb-4">
                  <AlertTriangle className="h-6 w-6 text-blue-600 mr-3" />
                  <h2 className="text-2xl font-semibold text-gray-900">Limitations of Liability</h2>
                </div>
                <div className="space-y-4 text-gray-700">
                  <p>
                    To the fullest extent permitted by law, Alpine Peak Roofing shall not be liable for any 
                    indirect, incidental, special, consequential, or punitive damages, including but not limited to 
                    loss of profits, data, or use, arising from your use of our services or website.
                  </p>
                  <p>
                    Our total liability shall not exceed the amount paid for the specific services that gave rise to the claim.
                  </p>
                </div>
              </section>

              {/* Insurance */}
              <section>
                <div className="flex items-center mb-4">
                  <Shield className="h-6 w-6 text-blue-600 mr-3" />
                  <h2 className="text-2xl font-semibold text-gray-900">Insurance and Licensing</h2>
                </div>
                <div className="space-y-4 text-gray-700">
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

              {/* Dispute Resolution */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Dispute Resolution</h2>
                <div className="space-y-4 text-gray-700">
                  <p>We encourage direct communication to resolve any concerns:</p>
                  <ol className="space-y-2 ml-4">
                    <li>1. Contact us directly to discuss the issue</li>
                    <li>2. If unresolved, we may recommend mediation</li>
                    <li>3. Legal disputes will be governed by Colorado state law</li>
                    <li>4. Venue for legal proceedings will be in Denver County, Colorado</li>
                  </ol>
                </div>
              </section>

              {/* Modifications */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Terms Modifications</h2>
                <p className="text-gray-700">
                  We reserve the right to modify these terms at any time. Changes will be posted on our website 
                  with an updated effective date. Continued use of our services after changes constitutes acceptance 
                  of the modified terms.
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
                  <p><strong>Phone:</strong> (970) 446-8995</p>
                  <p><strong>Email:</strong> info@alpinepeakroofing.com</p>
                  <p><strong>Address:</strong> Alpine Peak Roofing, Denver, Colorado</p>
                  <p><strong>Business Hours:</strong> Monday-Friday 8:00 AM - 6:00 PM</p>
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
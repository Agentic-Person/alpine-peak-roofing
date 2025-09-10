import { ChatWidget } from '@/components/chatbot'

export default function ChatbotDemoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
              AI Chatbot Demo
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-blue-100">
              Experience our intelligent chatbot that helps customers with roofing questions, provides estimates, and qualifies leads automatically
            </p>
            <div className="mt-4">
              <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-500 text-white rounded-full">
                Demonstration Environment
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Demo Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                AI-Powered Customer Support
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Experience our intelligent chatbot that helps customers with roofing questions, 
                provides estimates, and qualifies leads automatically.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Features</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="h-6 w-6 bg-blue-600 rounded-full flex items-center justify-center">
                      <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-700">
                      <strong>Intelligent Lead Scoring:</strong> Automatically scores leads from 0-100 
                      based on urgency, project type, and contact information.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="h-6 w-6 bg-blue-600 rounded-full flex items-center justify-center">
                      <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-700">
                      <strong>Emergency Detection:</strong> Instantly identifies urgent situations 
                      and routes to emergency response team.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="h-6 w-6 bg-blue-600 rounded-full flex items-center justify-center">
                      <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-700">
                      <strong>CRM Integration:</strong> Automatically syncs qualified leads 
                      to your CRM system with complete conversation history.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="h-6 w-6 bg-blue-600 rounded-full flex items-center justify-center">
                      <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-700">
                      <strong>File Upload Support:</strong> Customers can upload damage photos 
                      for instant preliminary assessment.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-900 mb-4">How to Test</h3>
              <div className="space-y-2 text-blue-800">
                <p>1. Click the chat icon in the bottom-right corner</p>
                <p>2. Try different conversation scenarios:</p>
                <ul className="ml-4 space-y-1">
                  <li>• "I need a roof replacement quote"</li>
                  <li>• "My roof is leaking - this is an emergency!"</li>
                  <li>• "How much does a roof inspection cost?"</li>
                  <li>• "I'd like to schedule an appointment"</li>
                </ul>
                <p>3. Provide contact information to see lead scoring in action</p>
                <p>4. Upload an image to test file handling</p>
              </div>
            </div>
          </div>

          {/* Demo Scenarios */}
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Test Scenarios</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-medium text-green-900">High-Value Lead</h4>
                  <p className="text-sm text-green-700">
                    "Hi, I need a complete roof replacement for my 3,000 sq ft home. 
                    My name is John Smith, email john@email.com, phone 555-0123. 
                    When can you come out for an estimate?"
                  </p>
                  <p className="text-xs text-green-600 mt-1">Expected Score: 85-95/100</p>
                </div>

                <div className="border-l-4 border-red-500 pl-4">
                  <h4 className="font-medium text-red-900">Emergency Response</h4>
                  <p className="text-sm text-red-700">
                    "Help! My roof is leaking badly after the storm. 
                    Water is flooding into my living room. This is an emergency!"
                  </p>
                  <p className="text-xs text-red-600 mt-1">Expected: Immediate escalation</p>
                </div>

                <div className="border-l-4 border-yellow-500 pl-4">
                  <h4 className="font-medium text-yellow-900">Information Seeker</h4>
                  <p className="text-sm text-yellow-700">
                    "What are the signs that I need a new roof? 
                    How long do asphalt shingles typically last?"
                  </p>
                  <p className="text-xs text-yellow-600 mt-1">Expected Score: 20-40/100</p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-medium text-blue-900">Qualified Lead</h4>
                  <p className="text-sm text-blue-700">
                    "I'm planning to replace my roof next spring. 
                    Can you give me a ballpark estimate? I'm in Denver, CO."
                  </p>
                  <p className="text-xs text-blue-600 mt-1">Expected Score: 50-70/100</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Technical Implementation</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <p>
                  <strong>Frontend:</strong> React components with TypeScript, 
                  real-time messaging, file upload support
                </p>
                <p>
                  <strong>Backend:</strong> n8n workflows for AI processing, 
                  lead scoring, and CRM integration
                </p>
                <p>
                  <strong>AI Model:</strong> GPT-4 Turbo for intelligent responses 
                  and conversation analysis
                </p>
                <p>
                  <strong>Database:</strong> Supabase for conversation storage 
                  and lead management
                </p>
                <p>
                  <strong>Integrations:</strong> CRM sync, email/SMS notifications, 
                  calendar scheduling
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-lg text-white">
              <h3 className="text-xl font-semibold mb-4">Ready to Transform Your Business?</h3>
              <p className="mb-4">
                This AI chatbot can generate 150+ qualified leads monthly while 
                reducing your customer acquisition costs by 40%.
              </p>
              <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Get Your Custom Implementation
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Chat Widget */}
      <ChatWidget 
        position="responsive-top-right"
        theme="alpine"
        autoOpen={false}
      />
    </div>
  )
}
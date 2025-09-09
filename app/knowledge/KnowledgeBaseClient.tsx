'use client'

import React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Search,
  BookOpen,
  HelpCircle,
  FileText,
  Mountain,
  Snowflake,
  Settings,
  Leaf,
  Shield,
  Calculator,
  MessageCircle,
  TrendingUp,
  MapPin,
  ExternalLink,
  ArrowRight,
  Star,
  Clock,
  Phone
} from 'lucide-react'

interface KnowledgeResource {
  id: string
  title: string
  description: string
  url: string
  type: 'faq' | 'glossary' | 'guide' | 'resource' | 'tool' | 'service' | 'location'
  category: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  icon: React.ReactNode
  tags: string[]
  featured?: boolean
  estimatedReadTime?: string
  lastUpdated?: string
}

const knowledgeResources: KnowledgeResource[] = [
  // Featured Resources
  {
    id: 'faq-comprehensive',
    title: 'Comprehensive FAQ',
    description: 'Complete collection of 50+ frequently asked questions covering mountain roofing, materials, installation, pricing, and emergency services. Optimized for voice search and AI understanding.',
    url: '/faq',
    type: 'faq',
    category: 'Essential Knowledge',
    difficulty: 'beginner',
    icon: <HelpCircle className="h-6 w-6" />,
    tags: ['voice search', 'common questions', 'mountain roofing', 'emergency services'],
    featured: true,
    estimatedReadTime: '15 min',
    lastUpdated: '2025-01-15'
  },
  {
    id: 'technical-glossary',
    title: 'Technical Glossary',
    description: 'Comprehensive roofing terminology with 95+ technical definitions, categorized by specialty area. Essential reference for understanding roofing concepts and mountain-specific techniques.',
    url: '/glossary',
    type: 'glossary',
    category: 'Technical Reference',
    difficulty: 'intermediate',
    icon: <BookOpen className="h-6 w-6" />,
    tags: ['terminology', 'technical definitions', 'reference guide', 'LLM optimized'],
    featured: true,
    estimatedReadTime: '30 min',
    lastUpdated: '2025-01-15'
  },
  {
    id: 'mountain-roofing-guide',
    title: 'Mountain Roofing Complete Guide',
    description: 'Comprehensive guide to roofing in Colorado\'s mountain climate, covering high-altitude challenges, material selection, weather considerations, and installation best practices.',
    url: '/guides/mountain-roofing-colorado',
    type: 'guide',
    category: 'Expert Guides',
    difficulty: 'intermediate',
    icon: <Mountain className="h-6 w-6" />,
    tags: ['mountain climate', 'high altitude', 'colorado', 'installation guide'],
    featured: true,
    estimatedReadTime: '25 min',
    lastUpdated: '2025-01-10'
  },

  // Service Resources
  {
    id: 'emergency-services',
    title: 'Emergency Roofing Services',
    description: '24/7 emergency response for storm damage, hail damage, and urgent repairs. Rapid assessment, temporary protection, and permanent restoration services.',
    url: '/services/emergency',
    type: 'service',
    category: 'Emergency Services',
    difficulty: 'beginner',
    icon: <Clock className="h-6 w-6" />,
    tags: ['emergency', '24/7 service', 'storm damage', 'urgent repairs'],
    featured: false,
    estimatedReadTime: '8 min',
    lastUpdated: '2025-01-12'
  },
  {
    id: 'premium-services',
    title: 'Premium Roofing Services',
    description: 'Luxury roofing solutions including copper, slate, and high-end materials. Specialized installation techniques for exclusive mountain properties and architectural masterpieces.',
    url: '/services/premium',
    type: 'service',
    category: 'Premium Services',
    difficulty: 'advanced',
    icon: <Star className="h-6 w-6" />,
    tags: ['luxury roofing', 'copper', 'slate', 'premium materials'],
    featured: false,
    estimatedReadTime: '12 min',
    lastUpdated: '2025-01-08'
  },
  {
    id: 'sustainability-roofing',
    title: 'Sustainable Roofing Solutions',
    description: 'Eco-friendly roofing options including solar integration, cool roofing technology, recycled materials, and energy-efficient systems for environmental stewardship.',
    url: '/sustainability',
    type: 'guide',
    category: 'Sustainability',
    difficulty: 'intermediate',
    icon: <Leaf className="h-6 w-6" />,
    tags: ['sustainable', 'solar integration', 'energy efficiency', 'green building'],
    featured: false,
    estimatedReadTime: '18 min',
    lastUpdated: '2025-01-05'
  },

  // Technical Resources
  {
    id: 'technical-resources',
    title: 'Technical Resources',
    description: 'Advanced technical documentation including installation specifications, material data sheets, engineering guidelines, and professional reference materials.',
    url: '/resources/technical',
    type: 'resource',
    category: 'Technical Reference',
    difficulty: 'advanced',
    icon: <FileText className="h-6 w-6" />,
    tags: ['technical specs', 'installation guides', 'engineering', 'professional'],
    featured: false,
    estimatedReadTime: '45 min',
    lastUpdated: '2025-01-03'
  },
  {
    id: 'weather-impacts',
    title: 'Weather Impact Analysis',
    description: 'Comprehensive analysis of how Colorado weather affects roofing systems, including hail, snow loads, wind resistance, and seasonal considerations for optimal performance.',
    url: '/weather-impacts',
    type: 'guide',
    category: 'Weather Systems',
    difficulty: 'intermediate',
    icon: <Snowflake className="h-6 w-6" />,
    tags: ['weather analysis', 'hail protection', 'snow loads', 'wind resistance'],
    featured: false,
    estimatedReadTime: '20 min',
    lastUpdated: '2025-01-07'
  },
  {
    id: 'investment-analysis',
    title: 'Roofing Investment Analysis',
    description: 'Complete financial analysis of roofing investments including ROI calculations, material comparisons, energy savings, and long-term value propositions.',
    url: '/investment-analysis',
    type: 'resource',
    category: 'Financial Planning',
    difficulty: 'intermediate',
    icon: <TrendingUp className="h-6 w-6" />,
    tags: ['ROI analysis', 'investment planning', 'cost comparison', 'value analysis'],
    featured: false,
    estimatedReadTime: '22 min',
    lastUpdated: '2025-01-04'
  },

  // Tools and Interactive
  {
    id: 'roof-estimator',
    title: 'Roofing Cost Estimator',
    description: 'Interactive tool for estimating roofing project costs based on materials, size, complexity, and location factors. Get preliminary pricing for planning purposes.',
    url: '/estimator',
    type: 'tool',
    category: 'Planning Tools',
    difficulty: 'beginner',
    icon: <Calculator className="h-6 w-6" />,
    tags: ['cost calculator', 'pricing tool', 'project planning', 'estimates'],
    featured: false,
    estimatedReadTime: '5 min',
    lastUpdated: '2025-01-14'
  },
  {
    id: 'ai-chatbot',
    title: 'AI Roofing Assistant',
    description: 'Intelligent chatbot providing instant answers to roofing questions, preliminary assessments, and guidance for your specific roofing needs and concerns.',
    url: '/chatbot-demo',
    type: 'tool',
    category: 'AI Tools',
    difficulty: 'beginner',
    icon: <MessageCircle className="h-6 w-6" />,
    tags: ['AI assistant', 'instant answers', 'chatbot', 'automated help'],
    featured: false,
    estimatedReadTime: '3 min',
    lastUpdated: '2025-01-13'
  },

  // Location-Specific Knowledge
  {
    id: 'aspen-roofing',
    title: 'Aspen Roofing Expertise',
    description: 'Specialized knowledge for roofing in Aspen, including luxury resort properties, historic preservation requirements, and extreme elevation considerations.',
    url: '/locations/aspen',
    type: 'location',
    category: 'Location Expertise',
    difficulty: 'intermediate',
    icon: <MapPin className="h-6 w-6" />,
    tags: ['aspen', 'luxury properties', 'historic preservation', 'high altitude'],
    featured: false,
    estimatedReadTime: '12 min',
    lastUpdated: '2025-01-06'
  },
  {
    id: 'vail-roofing',
    title: 'Vail Roofing Solutions',
    description: 'Expert roofing services for Vail properties, including ski resort facilities, residential properties, and commercial developments in extreme mountain conditions.',
    url: '/locations/vail',
    type: 'location',
    category: 'Location Expertise',
    difficulty: 'intermediate',
    icon: <MapPin className="h-6 w-6" />,
    tags: ['vail', 'ski resort', 'commercial', 'extreme conditions'],
    featured: false,
    estimatedReadTime: '12 min',
    lastUpdated: '2025-01-06'
  },
  {
    id: 'telluride-roofing',
    title: 'Telluride Historic Roofing',
    description: 'Specialized roofing for Telluride\'s historic district, combining traditional craftsmanship with modern performance for unique architectural preservation.',
    url: '/locations/telluride',
    type: 'location',
    category: 'Location Expertise',
    difficulty: 'advanced',
    icon: <MapPin className="h-6 w-6" />,
    tags: ['telluride', 'historic district', 'preservation', 'traditional craftsmanship'],
    featured: false,
    estimatedReadTime: '15 min',
    lastUpdated: '2025-01-06'
  }
]

const categories = [
  { name: 'Essential Knowledge', icon: <HelpCircle className="h-5 w-5" />, color: 'bg-blue-100 text-blue-800' },
  { name: 'Technical Reference', icon: <FileText className="h-5 w-5" />, color: 'bg-gray-100 text-gray-800' },
  { name: 'Expert Guides', icon: <BookOpen className="h-5 w-5" />, color: 'bg-green-100 text-green-800' },
  { name: 'Premium Services', icon: <Star className="h-5 w-5" />, color: 'bg-purple-100 text-purple-800' },
  { name: 'Emergency Services', icon: <Clock className="h-5 w-5" />, color: 'bg-red-100 text-red-800' },
  { name: 'Planning Tools', icon: <Calculator className="h-5 w-5" />, color: 'bg-yellow-100 text-yellow-800' },
  { name: 'Location Expertise', icon: <MapPin className="h-5 w-5" />, color: 'bg-indigo-100 text-indigo-800' },
  { name: 'Sustainability', icon: <Leaf className="h-5 w-5" />, color: 'bg-emerald-100 text-emerald-800' },
]

export function KnowledgeBaseClient() {
  const [searchTerm, setSearchTerm] = React.useState('')
  const [selectedCategory, setSelectedCategory] = React.useState('All')
  const [selectedDifficulty, setSelectedDifficulty] = React.useState('All')

  const filteredResources = knowledgeResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === 'All' || resource.difficulty === selectedDifficulty
    
    return matchesSearch && matchesCategory && matchesDifficulty
  })

  const featuredResources = knowledgeResources.filter(resource => resource.featured)

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return <Badge className="bg-green-100 text-green-800">Beginner</Badge>
      case 'intermediate':
        return <Badge className="bg-yellow-100 text-yellow-800">Intermediate</Badge>
      case 'advanced':
        return <Badge className="bg-red-100 text-red-800">Advanced</Badge>
      default:
        return null
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'faq':
        return <HelpCircle className="h-5 w-5" />
      case 'glossary':
        return <BookOpen className="h-5 w-5" />
      case 'guide':
        return <FileText className="h-5 w-5" />
      case 'tool':
        return <Calculator className="h-5 w-5" />
      case 'service':
        return <Settings className="h-5 w-5" />
      case 'location':
        return <MapPin className="h-5 w-5" />
      default:
        return <FileText className="h-5 w-5" />
    }
  }

  return (
    <div className="min-h-screen bg-background-secondary py-12">
      <div className="container mx-auto max-w-7xl px-4">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <BookOpen className="h-12 w-12 text-interactive-primary" />
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary">
              Knowledge Base
            </h1>
          </div>
          <p className="text-xl text-text-secondary max-w-4xl mx-auto leading-relaxed">
            Comprehensive roofing knowledge center featuring expert guides, technical resources, FAQs, and specialized tools. 
            Your complete resource for mountain roofing information, best practices, and professional expertise.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary h-5 w-5" />
              <input
                type="text"
                placeholder="Search knowledge base articles, guides, and resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-border-primary rounded-lg bg-background-primary text-text-primary focus:outline-none focus:ring-2 focus:ring-interactive-primary"
              />
            </div>
            
            {/* Quick Filters */}
            <div className="flex flex-wrap gap-2">
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-3 py-2 border border-border-primary rounded-lg bg-background-primary text-text-primary text-sm"
              >
                <option value="All">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === 'All'
                  ? 'bg-interactive-primary text-white'
                  : 'bg-background-primary text-text-secondary hover:bg-background-accent border border-border-primary'
              }`}
            >
              All Categories ({knowledgeResources.length})
            </button>
            {categories.map(category => {
              const count = knowledgeResources.filter(resource => resource.category === category.name).length
              return (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                    selectedCategory === category.name
                      ? 'bg-interactive-primary text-white'
                      : 'bg-background-primary text-text-secondary hover:bg-background-accent border border-border-primary'
                  }`}
                >
                  {category.icon}
                  {category.name} ({count})
                </button>
              )
            })}
          </div>

          {/* Results Count */}
          <div className="text-text-secondary mb-6">
            Showing {filteredResources.length} of {knowledgeResources.length} resources
            {searchTerm && (
              <span className="ml-2">
                for "{searchTerm}"
              </span>
            )}
          </div>
        </div>

        {/* Featured Resources Section */}
        {!searchTerm && selectedCategory === 'All' && selectedDifficulty === 'All' && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-text-primary mb-6 flex items-center gap-2">
              <Star className="h-6 w-6 text-interactive-primary" />
              Featured Resources
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredResources.map((resource) => (
                <Card key={resource.id} className="border-border-primary hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-interactive-primary/10 rounded-lg">
                          {resource.icon}
                        </div>
                        <div>
                          <CardTitle className="text-lg text-text-primary">
                            {resource.title}
                          </CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            {getDifficultyBadge(resource.difficulty)}
                            <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <CardDescription className="text-text-secondary mb-4 leading-relaxed">
                      {resource.description}
                    </CardDescription>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-text-secondary">
                        {resource.estimatedReadTime && (
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {resource.estimatedReadTime}
                          </span>
                        )}
                      </div>
                      
                      <Link
                        href={resource.url}
                        className="inline-flex items-center gap-2 text-interactive-primary hover:text-interactive-primary/80 font-medium"
                      >
                        Explore
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* All Resources Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-text-primary mb-6">
            All Resources
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => {
              const categoryInfo = categories.find(cat => cat.name === resource.category)
              
              return (
                <Card key={resource.id} className="border-border-primary hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="p-2 bg-interactive-primary/10 rounded-lg">
                          {getTypeIcon(resource.type)}
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg text-text-primary mb-1">
                            {resource.title}
                          </CardTitle>
                          <div className="flex flex-wrap items-center gap-2">
                            {categoryInfo && (
                              <Badge className={categoryInfo.color}>
                                {resource.category}
                              </Badge>
                            )}
                            {getDifficultyBadge(resource.difficulty)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <CardDescription className="text-text-secondary mb-4 leading-relaxed">
                      {resource.description}
                    </CardDescription>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {resource.tags.slice(0, 3).map((tag) => (
                        <Badge 
                          key={tag}
                          variant="secondary"
                          className="text-xs bg-background-accent text-text-secondary"
                        >
                          {tag}
                        </Badge>
                      ))}
                      {resource.tags.length > 3 && (
                        <Badge 
                          variant="secondary"
                          className="text-xs bg-background-accent text-text-secondary"
                        >
                          +{resource.tags.length - 3} more
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-text-secondary">
                        {resource.estimatedReadTime && (
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {resource.estimatedReadTime}
                          </span>
                        )}
                      </div>
                      
                      <Link
                        href={resource.url}
                        className="inline-flex items-center gap-2 text-interactive-primary hover:text-interactive-primary/80 font-medium"
                      >
                        {resource.type === 'tool' ? 'Use Tool' : 'Read More'}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* No Results Message */}
        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-text-secondary mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-text-primary mb-2">
              No resources found
            </h3>
            <p className="text-text-secondary mb-6">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('All')
                setSelectedDifficulty('All')
              }}
              className="text-interactive-primary hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Quick Links Section */}
        <Card className="mt-12 bg-background-primary border-border-primary">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-text-primary">
              Quick Access Links
            </CardTitle>
            <CardDescription className="text-lg text-text-secondary">
              Direct links to our most popular resources and tools
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link
                href="/faq"
                className="flex items-center gap-3 p-4 bg-background-accent rounded-lg hover:bg-background-accent/80 transition-colors group"
              >
                <HelpCircle className="h-8 w-8 text-interactive-primary" />
                <div>
                  <div className="font-semibold text-text-primary group-hover:text-interactive-primary">FAQ</div>
                  <div className="text-sm text-text-secondary">50+ Questions</div>
                </div>
              </Link>
              
              <Link
                href="/glossary"
                className="flex items-center gap-3 p-4 bg-background-accent rounded-lg hover:bg-background-accent/80 transition-colors group"
              >
                <BookOpen className="h-8 w-8 text-interactive-primary" />
                <div>
                  <div className="font-semibold text-text-primary group-hover:text-interactive-primary">Glossary</div>
                  <div className="text-sm text-text-secondary">95+ Terms</div>
                </div>
              </Link>
              
              <Link
                href="/estimator"
                className="flex items-center gap-3 p-4 bg-background-accent rounded-lg hover:bg-background-accent/80 transition-colors group"
              >
                <Calculator className="h-8 w-8 text-interactive-primary" />
                <div>
                  <div className="font-semibold text-text-primary group-hover:text-interactive-primary">Estimator</div>
                  <div className="text-sm text-text-secondary">Get Pricing</div>
                </div>
              </Link>
              
              <Link
                href="/contact"
                className="flex items-center gap-3 p-4 bg-background-accent rounded-lg hover:bg-background-accent/80 transition-colors group"
              >
                <Phone className="h-8 w-8 text-interactive-primary" />
                <div>
                  <div className="font-semibold text-text-primary group-hover:text-interactive-primary">Contact</div>
                  <div className="text-sm text-text-secondary">Get Help</div>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
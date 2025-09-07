# Frontend Integration Tasks

## 🎯 Overview
Create a responsive, engaging chat widget that showcases our AI automation capabilities and integrates seamlessly with the n8n workflows.

## 🖥️ Chat Widget Component Requirements

### Component Location: `components/chatbot/ChatWidget.tsx`

### Core Features:
1. **Responsive Design**
   - Mobile-first approach
   - Collapsible/expandable interface
   - Floating button when minimized
   - Full-screen mode on mobile devices

2. **Real-time Messaging**
   - WebSocket connection for live updates
   - Typing indicators
   - Message delivery status
   - Auto-scroll to latest message

3. **Rich Message Support**
   - Text messages with markdown
   - File upload for damage photos
   - Quick reply buttons
   - Suggested responses
   - Link previews

### 📋 Implementation Checklist

#### Phase 1: Basic Chat Interface
- [ ] **Create ChatWidget component**
  ```typescript
  interface ChatWidgetProps {
    isOpen: boolean
    onToggle: () => void
    position?: 'bottom-right' | 'bottom-left'
    theme?: 'light' | 'dark' | 'alpine'
  }
  ```

- [ ] **Implement Chat Message Component**
  ```typescript
  interface ChatMessage {
    id: string
    type: 'user' | 'bot' | 'system'
    content: string
    timestamp: Date
    metadata?: {
      lead_score?: number
      confidence?: number
      actions?: QuickAction[]
    }
  }
  ```

- [ ] **Create Message Input Component**
  - Text input with send button
  - File upload capability
  - Voice input option (future)
  - Character counter for long messages

- [ ] **Build Chat Header**
  - Alpine Peak Roofing branding
  - Online status indicator
  - Minimize/maximize controls
  - Settings/preferences access

#### Phase 2: Advanced Features
- [ ] **Typing Indicators**
  - Show when bot is processing
  - Animated dots or spinner
  - Processing time estimation

- [ ] **Quick Actions**
  - Predefined response buttons
  - Common requests (quote, schedule, emergency)
  - Contact information collection forms

- [ ] **Conversation History**
  - Persist across page refreshes
  - Session storage management
  - Clear conversation option

- [ ] **File Upload System**
  - Image compression before upload
  - Progress indicators
  - File type validation
  - Preview thumbnails

#### Phase 3: Integration Features
- [ ] **Analytics Integration**
  - Track conversation events
  - Monitor user engagement
  - A/B testing capabilities

- [ ] **Lead Scoring Display** (Admin Mode)
  - Real-time score updates
  - Scoring factor breakdown
  - Priority level indicators

- [ ] **Handoff Interface**
  - Seamless transition to human agent
  - Context preservation
  - Queue position display

## 🔌 API Integration Layer

### Service Location: `lib/chatbot/chatService.ts`

### Required Methods:
```typescript
class ChatService {
  // Send message to n8n chatbot workflow
  async sendMessage(sessionId: string, message: string, context?: any): Promise<ChatResponse>
  
  // Upload file for analysis
  async uploadFile(sessionId: string, file: File): Promise<UploadResponse>
  
  // Get conversation history
  async getConversation(sessionId: string): Promise<ChatMessage[]>
  
  // Update user context (location, preferences, etc.)
  async updateContext(sessionId: string, context: UserContext): Promise<void>
  
  // Request human handoff
  async requestHumanAgent(sessionId: string, reason: string): Promise<HandoffResponse>
}
```

### API Integration Checklist:
- [ ] **Create ChatService class**
- [ ] **Implement message sending to n8n webhook**
- [ ] **Handle file uploads with progress tracking**
- [ ] **Set up session management**
- [ ] **Implement error handling and retries**
- [ ] **Add offline mode capabilities**

## 🎨 UI/UX Design Specifications

### Design System Integration:
- Use existing Button, Input, and Card components
- Follow Alpine Peak Roofing branding guidelines
- Consistent color scheme with main website

### Chat Widget Styling:
```css
/* Key design elements */
.chat-widget {
  /* Position: Fixed bottom-right */
  /* Z-index: High (9999) */
  /* Border radius: 12px */
  /* Shadow: Elevated */
  /* Animation: Smooth open/close */
}

.chat-message-bot {
  /* Background: Alpine blue gradient */
  /* Border radius: Rounded left, squared right */
  /* Typography: Sans-serif, readable */
}

.chat-message-user {
  /* Background: Gray gradient */
  /* Border radius: Squared left, rounded right */
  /* Alignment: Right */
}
```

### Responsive Breakpoints:
- **Mobile (< 768px):** Full-screen overlay when open
- **Tablet (768px - 1024px):** 400px width, 600px height
- **Desktop (> 1024px):** 380px width, 500px height

### Animation Requirements:
- **Open/Close:** Smooth scale and fade transition (300ms)
- **New Messages:** Slide-in from bottom with subtle bounce
- **Typing Indicator:** Pulsing dots animation
- **File Upload:** Progress bar with smooth fill

## 📱 Mobile Optimization

### Mobile-Specific Features:
- [ ] **Touch-friendly Interface**
  - Larger touch targets (44px minimum)
  - Swipe gestures for navigation
  - Pull-to-refresh conversation

- [ ] **Keyboard Handling**
  - Auto-resize when keyboard appears
  - Send button accessibility
  - Voice input support

- [ ] **Performance Optimization**
  - Lazy load message history
  - Image compression for uploads
  - Minimal JavaScript bundle

## 🧪 State Management

### Context Structure:
```typescript
interface ChatState {
  isOpen: boolean
  sessionId: string
  messages: ChatMessage[]
  isTyping: boolean
  currentUser: UserInfo | null
  leadScore: number
  conversationContext: ConversationContext
}

interface ConversationContext {
  pageVisited: string[]
  timeSpent: number
  previousInteractions: number
  userAgent: string
  referralSource: string
  utmParams: UtmParameters
}
```

### State Management Checklist:
- [ ] **Set up Zustand store for chat state**
- [ ] **Implement session persistence**
- [ ] **Handle state hydration**
- [ ] **Create state selectors and actions**

## 🔧 Technical Integration

### WebSocket Setup (Optional Enhancement):
```typescript
// Real-time connection for instant responses
const setupWebSocket = (sessionId: string) => {
  const ws = new WebSocket(`ws://localhost:3000/chat/${sessionId}`)
  
  ws.onmessage = (event) => {
    const message = JSON.parse(event.data)
    addMessageToChat(message)
  }
  
  ws.onclose = () => {
    // Fallback to HTTP polling
    setupPolling(sessionId)
  }
}
```

### Integration Checklist:
- [ ] **Set up real-time messaging (WebSocket or SSE)**
- [ ] **Implement fallback HTTP polling**
- [ ] **Configure session management**
- [ ] **Set up error boundary components**
- [ ] **Add loading states and skeletons**

## 🔍 Analytics & Tracking

### Events to Track:
- **Conversation Started:** User opens chat widget
- **Message Sent:** User sends a message
- **Lead Qualified:** Lead score exceeds threshold
- **File Uploaded:** User shares images/documents
- **Human Requested:** User asks for human agent
- **Conversation Ended:** User closes chat or navigates away

### Analytics Implementation:
- [ ] **Integrate with Google Analytics 4**
- [ ] **Set up custom events for chat interactions**
- [ ] **Track conversion funnel from chat to lead**
- [ ] **Monitor chat performance metrics**

## 🚀 Performance Requirements

### Speed Targets:
- **Widget Load Time:** < 1 second
- **Message Send/Receive:** < 2 seconds
- **File Upload Processing:** < 5 seconds
- **Conversation History Load:** < 800ms

### Optimization Strategies:
- [ ] **Code splitting for chat components**
- [ ] **Image optimization for message attachments**
- [ ] **Message virtualization for long conversations**
- [ ] **Preload common responses**

## 🧪 Testing Strategy

### Unit Tests:
- [ ] **ChatWidget component rendering**
- [ ] **Message handling logic**
- [ ] **API integration functions**
- [ ] **State management actions**

### Integration Tests:
- [ ] **Chat flow end-to-end**
- [ ] **File upload functionality**
- [ ] **n8n workflow integration**
- [ ] **Error handling scenarios**

### User Testing:
- [ ] **Mobile device testing**
- [ ] **Accessibility validation**
- [ ] **Cross-browser compatibility**
- [ ] **Performance testing under load**

---

## 🎯 Success Criteria

### Functional Requirements:
- [ ] Widget loads and displays correctly on all devices
- [ ] Messages send and receive within 2 seconds
- [ ] File uploads work reliably
- [ ] Lead scoring integrates properly with n8n

### Quality Requirements:
- [ ] 95%+ uptime for chat functionality
- [ ] Zero critical accessibility issues
- [ ] Mobile-first responsive design
- [ ] Consistent branding with main website

---

**Next Steps:**
1. Create the basic ChatWidget component structure
2. Implement API integration with n8n workflows
3. Test core messaging functionality
4. Add advanced features and optimizations

**Questions/Blockers:** Document in `05-handoff-notes.md`
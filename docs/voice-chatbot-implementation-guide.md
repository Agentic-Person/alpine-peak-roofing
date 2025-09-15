# Alpine Peak Voice Chatbot Implementation Guide

## Overview

This guide covers deploying the enhanced Alpine Peak Roofing chatbot with voice AI capabilities and Supabase CRM integration.

## Prerequisites

- n8n instance (cloud or self-hosted)
- Supabase project with PostgreSQL database
- OpenAI API account with GPT-4 and Whisper access
- Domain with SSL certificate for webhooks

## Database Setup

### 1. Supabase Configuration

1. Create new Supabase project or use existing
2. Execute the database schema from `docs/supabase-database-schema.sql`
3. Enable Row Level Security policies
4. Note your project URL and service role key

### 2. Required Extensions

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector";
```

### 3. Environment Variables

Add to your Supabase environment:
```bash
SUPABASE_URL=your_project_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## n8n Workflow Deployment

### 1. Import Workflow

1. Open n8n interface
2. Import `n8n/workflows/alpine-peak-voice-chatbot-rag-with-crm.json`
3. The workflow includes:
   - Voice input webhook (`/webhook/voice-input`)
   - Text input webhook (`/webhook/text-input`)
   - OpenAI Whisper transcription
   - RAG knowledge retrieval
   - Supabase CRM integration
   - Multi-format response generation
   - Text-to-speech output

### 2. Configure Credentials

Create the following credentials in n8n:

#### OpenAI Credential
- **Type**: OpenAI
- **API Key**: Your OpenAI API key
- **Organization**: Your OpenAI organization (optional)

#### Supabase Credential
- **Type**: HTTP Request Auth
- **Authentication**: Bearer Token
- **Token**: Your Supabase service role key

#### PostgreSQL Credential (for vector search)
- **Type**: PostgreSQL
- **Host**: Your Supabase database host
- **Database**: postgres
- **User**: postgres
- **Password**: Your database password
- **Port**: 5432
- **SSL**: enabled

### 3. Update Webhook URLs

1. Get your n8n webhook URLs
2. Update frontend integration to point to:
   - Text: `https://your-n8n.app/webhook/text-input`
   - Voice: `https://your-n8n.app/webhook/voice-input`

## Frontend Integration

### Voice Recording Component

```typescript
// components/VoiceRecorder.tsx
import { useState, useRef } from 'react';

export default function VoiceRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const audioChunks: BlobPart[] = [];
      mediaRecorder.addEventListener('dataavailable', (event) => {
        audioChunks.push(event.data);
      });

      mediaRecorder.addEventListener('stop', () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        setAudioBlob(audioBlob);
        sendVoiceMessage(audioBlob);
      });

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const sendVoiceMessage = async (audioBlob: Blob) => {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.wav');
    formData.append('session_id', generateSessionId());

    try {
      const response = await fetch('https://your-n8n.app/webhook/voice-input', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      handleChatbotResponse(result);
    } catch (error) {
      console.error('Error sending voice message:', error);
    }
  };

  return (
    <div className="voice-recorder">
      <button
        onMouseDown={startRecording}
        onMouseUp={stopRecording}
        className={`voice-btn ${isRecording ? 'recording' : ''}`}
      >
        {isRecording ? '🎤 Recording...' : '🎤 Hold to Talk'}
      </button>
    </div>
  );
}
```

### Text Chat Integration

```typescript
// lib/chatService.ts
export interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  audioUrl?: string;
  timestamp: Date;
}

export class ChatService {
  private sessionId: string;

  constructor() {
    this.sessionId = this.generateSessionId();
  }

  async sendTextMessage(message: string): Promise<ChatMessage> {
    const response = await fetch('https://your-n8n.app/webhook/text-input', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        session_id: this.sessionId,
        response_format: 'text' // or 'voice', 'markdown', 'pdf'
      }),
    });

    const result = await response.json();

    return {
      id: result.id || crypto.randomUUID(),
      type: 'assistant',
      content: result.response,
      audioUrl: result.audio_url,
      timestamp: new Date(),
    };
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
```

## Testing Procedures

### 1. Voice Input Testing

1. **Record Audio Message**:
   ```bash
   curl -X POST https://your-n8n.app/webhook/voice-input \
     -F "audio=@test-recording.wav" \
     -F "session_id=test_session_001"
   ```

2. **Expected Response**:
   ```json
   {
     "transcription": "I need a roof estimate",
     "response": "I'd be happy to help with your roofing estimate...",
     "audio_url": "https://audio-storage.com/response.mp3",
     "intent": "estimation_request",
     "lead_score": 75,
     "contact_id": "uuid-here"
   }
   ```

### 2. Text Input Testing

```bash
curl -X POST https://your-n8n.app/webhook/text-input \
  -H "Content-Type: application/json" \
  -d '{
    "message": "My roof is leaking badly!",
    "session_id": "test_session_002",
    "response_format": "voice"
  }'
```

### 3. Database Verification

Check that contacts are being created:
```sql
SELECT * FROM contacts WHERE created_at > NOW() - INTERVAL '1 hour';
```

Check conversation history:
```sql
SELECT * FROM chat_conversations WHERE created_at > NOW() - INTERVAL '1 hour';
```

## Workflow Features

### Voice Capabilities
- **Input**: Whisper transcription with high accuracy
- **Output**: Nova voice TTS with natural speech
- **Formats**: WAV, MP3, OGG support
- **Quality**: 16kHz sample rate recommended

### CRM Integration
- **Lead Capture**: Automatic contact creation
- **Lead Scoring**: 0-100 scale based on intent
- **Intent Analysis**: 9 categories including emergency, estimation
- **Priority Levels**: URGENT, HIGH, NORMAL
- **Follow-up**: Automated email sequences

### Response Formats
- **Text**: Standard chat responses
- **Voice**: Audio file with natural speech
- **Markdown**: Formatted text with structure
- **PDF**: Generated documents for estimates

### Knowledge Base
- **35,000+ words** of roofing expertise
- **Vector search** with pgvector
- **Semantic matching** using OpenAI embeddings
- **Confidence scoring** for answer quality

## Monitoring and Analytics

### Key Metrics to Track

1. **Voice Usage**:
   ```sql
   SELECT
     COUNT(*) FILTER (WHERE has_audio = true) as voice_conversations,
     COUNT(*) as total_conversations,
     ROUND(COUNT(*) FILTER (WHERE has_audio = true) * 100.0 / COUNT(*), 2) as voice_percentage
   FROM chat_conversations
   WHERE created_at > NOW() - INTERVAL '7 days';
   ```

2. **Lead Quality**:
   ```sql
   SELECT
     intent,
     AVG(lead_score) as avg_score,
     COUNT(*) as total_leads
   FROM contacts
   WHERE created_at > NOW() - INTERVAL '7 days'
   GROUP BY intent
   ORDER BY avg_score DESC;
   ```

3. **Response Performance**:
   ```sql
   SELECT
     response_format,
     AVG(knowledge_confidence) as avg_confidence,
     COUNT(*) as usage_count
   FROM chat_conversations
   WHERE created_at > NOW() - INTERVAL '7 days'
   GROUP BY response_format;
   ```

## Troubleshooting

### Common Issues

1. **Audio Upload Fails**:
   - Check file size limits (max 25MB for Whisper)
   - Verify audio format (WAV, MP3, M4A supported)
   - Ensure proper Content-Type headers

2. **Database Connection Issues**:
   - Verify Supabase credentials
   - Check RLS policies are properly configured
   - Ensure service role key has sufficient permissions

3. **Poor Transcription Quality**:
   - Use 16kHz or higher sample rate
   - Reduce background noise
   - Ensure audio is at least 0.1 seconds long

4. **Vector Search Not Working**:
   - Verify pgvector extension is installed
   - Check embedding table has data
   - Ensure OpenAI embeddings credentials are valid

### Debugging Commands

```sql
-- Check recent workflow executions
SELECT * FROM chat_conversations
WHERE created_at > NOW() - INTERVAL '1 hour'
ORDER BY created_at DESC;

-- Monitor lead creation
SELECT
  email, name, intent, lead_score, contact_priority,
  created_at
FROM contacts
WHERE created_at > NOW() - INTERVAL '1 hour'
ORDER BY created_at DESC;

-- Analyze knowledge base matches
SELECT
  title, category,
  embedding <=> '[your-query-embedding]' as similarity
FROM knowledge_base
ORDER BY similarity ASC
LIMIT 5;
```

## Security Considerations

1. **Environment Variables**: Never expose API keys in workflow JSON
2. **Rate Limiting**: Implement request throttling for webhooks
3. **Data Encryption**: Ensure all communications use HTTPS
4. **Access Control**: Use RLS policies to protect sensitive data
5. **Audio Storage**: Consider temporary storage for voice files

## Deployment Checklist

- [ ] Supabase database schema deployed
- [ ] n8n workflow imported and credentials configured
- [ ] Webhook URLs updated in frontend
- [ ] Voice recording component integrated
- [ ] Text chat service implemented
- [ ] Testing completed for both voice and text inputs
- [ ] Monitoring dashboard configured
- [ ] Security measures implemented
- [ ] Documentation reviewed with team

## Support and Maintenance

### Regular Tasks
- Monitor webhook endpoint health
- Review lead quality and scoring accuracy
- Update knowledge base content
- Check audio storage usage
- Analyze conversation analytics

### Monthly Reviews
- Evaluate voice transcription accuracy
- Optimize response generation prompts
- Review and update intent classification
- Analyze lead conversion rates
- Update knowledge base with new content

This implementation provides a complete voice-enabled chatbot system with robust CRM integration, delivering an enhanced customer experience for Alpine Peak Roofing.
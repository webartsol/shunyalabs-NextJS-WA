# Audio Transcription Widget

A comprehensive multi-purpose audio transcription widget built according to the design specification. This widget provides different audio processing capabilities through a tabbed interface with dynamic content based on user selection, supporting live transcription workflows.

## Features

### 🎯 Main Functionality

- **Speech To Text**: Audio transcription to text with speaker identification and real-time processing
- **Medical Transcription**: Specialized medical audio transcription with terminology support
- **Text to Speech**: Convert text to natural-sounding audio (planned)
- **Sentiment Analysis**: Analyze emotional tone in text (planned)
- **Conversation AI**: Intelligent conversational AI interactions (planned)

### 🎨 User Interface

- **Header Tabs**: 5 main categories with icons and descriptions
- **Inner Tabs**: Context-specific tabs that change based on header selection
- **Live Transcription Widget**: Real-time audio recording and transcription interface
- **Conversation Display**: Multi-speaker conversation visualization with avatars
- **Audio Player**: Play/pause controls, progress tracking, and file management
- **Language Selection**: Support for 40+ languages with flag indicators

### 🔧 Technical Features

- **Responsive Design**: Adapts to different screen sizes with mobile-first approach
- **API Integration**: Full transcription API service with polling and real-time updates
- **Live Recording**: Real-time audio recording with microphone access and WebRTC support
- **Multi-language Support**: 40+ languages with automatic detection
- **Configuration System**: JSON-based configuration for dynamic content mapping
- **Export Options**: Multiple export formats (TXT, JSON, SRT)
- **Accessibility**: Keyboard navigation and screen reader support

## File Structure

```
src/modules/widget/
├── index.tsx                           # Main widget module with routing
├── pages/
│   ├── WidgetPage.tsx                  # Main widget page component
│   └── LiveTranscriptionPage.tsx       # Live transcription page
├── components/
│   ├── WidgetHeader.tsx                # Header tabs component
│   ├── WidgetContent.tsx              # Main content area
│   ├── InnerTabs.tsx                  # Context-specific inner tabs
│   ├── LiveTranscriptionWidget.tsx    # Live transcription interface
│   ├── LiveTranscription.tsx          # Live transcription component
│   ├── ConversationDisplay.tsx        # Multi-speaker conversation display
│   └── DemoAudioPlayer.tsx            # Audio player interface
├── config/
│   ├── widget-config.json             # Main widget configuration
│   ├── language-mapping.ts            # Language configuration utilities
│   └── widget-config.json.backup      # Configuration backup
├── hooks/
│   └── useContentMapping.ts           # Content mapping hook
├── services/
│   └── transcriptionApi.ts            # API service for transcription
└── README.md                          # This file
```

## Usage

### Accessing the Widget

Navigate to `/widget` in your application to access the main widget interface, or `/widget/live-transcription` for the live transcription page.

### API Endpoints

The widget integrates with the following API endpoints:

- `POST /api/transcribe-new/upload` - Process recorded audio for transcription
- `GET /api/transcribe-new/status/{upload_id}` - Check transcription status
- `GET /api/transcribe-new/result/{upload_id}` - Get transcription results
- `POST /api/transcribe-new/cancel/{upload_id}` - Cancel ongoing transcription

### Supported Audio Recording Formats

The widget records audio in the following formats (browser-dependent):

- WebM (preferred, with Opus codec)
- MP4 (AAC codec)
- OGG (Vorbis codec)
- WAV (uncompressed, fallback)

### Supported Languages

The widget supports 40+ languages including:

- English, Spanish, French, German, Italian, Portuguese
- Chinese, Japanese, Korean, Russian, Arabic, Hindi
- Dutch, Swedish, Norwegian, Danish, Finnish, Polish
- Turkish, Thai, Vietnamese, Indonesian, Malay
- Hebrew, Ukrainian, Czech, Hungarian, Romanian
- And many more European and Asian languages

## Component Architecture

### WidgetPage

Main container component that manages:

- Selected header tab state
- Selected inner tab state
- Event handlers for tab changes and transcription
- Integration with site header and footer
- Content rendering based on selected tabs

### LiveTranscriptionPage

Dedicated page for live transcription functionality:

- Standalone live transcription interface
- Gradient background design
- Full-screen widget container
- Direct access to live recording features

### WidgetHeader

Renders the 5 main header tabs with:

- Icons and labels
- Selection states
- Hover effects
- Responsive design
- Dynamic tab configuration from JSON

### WidgetContent

Dynamic content area that renders different content based on selected header tab:

- Speech To Text: Demo audio player and live transcription interface
- Medical Transcription: Specialized medical interface with live recording
- Other tabs: Placeholder content with appropriate messaging
- Content mapping based on configuration system

### LiveTranscriptionWidget

Advanced live transcription component with:

- Real-time audio recording using WebRTC
- Live transcription processing with API integration
- Multi-speaker conversation display
- Language selection and configuration
- Progress tracking and status updates
- Export and copy functionality
- File size validation and error handling

### ConversationDisplay

Multi-speaker conversation visualization:

- Speaker avatars with gradient colors
- Timestamped conversation segments
- Speaker role identification
- Copy and download functionality
- Responsive conversation layout
- Real-time conversation updates

### DemoAudioPlayer

Audio player component for sample audio:

- Play/pause controls for sample audio files
- Progress tracking and duration display
- Integration with configuration system
- Responsive design for mobile and desktop

### Configuration System

JSON-based configuration system:

- `widget-config.json`: Main configuration file
- Dynamic content mapping
- Language support configuration
- Feature flags and settings
- Audio sample management

## Styling

The widget follows the design specification with:

- **Main Widget**: Dark gray background (#2D2D2D) with white content cards
- **Live Transcription**: Gradient background (indigo to purple) with glassmorphism effects
- **Selected Tabs**: Light blue background with smooth transitions
- **Speaker Avatars**: Gradient colors (pink/purple/blue) with role-based styling
- **Buttons**: Blue for primary actions, black for secondary actions
- **Typography**: Clean, modern fonts with proper hierarchy
- **Responsive Design**: Mobile-first approach with breakpoint-specific layouts
- **Animations**: Smooth transitions and micro-interactions for better UX

## Development

### Adding New Features

1. Create new components in the `components/` directory
2. Update the main `WidgetPage.tsx` to include new functionality
3. Add new API endpoints to `transcriptionApi.ts` if needed
4. Update the routing in `index.tsx` for new pages
5. Update `widget-config.json` for new tab configurations
6. Add language support in the configuration files

### Configuration Management

The widget uses a JSON-based configuration system:

- **widget-config.json**: Main configuration file with tabs, languages, and features
- **language-mapping.ts**: Language utilities and mapping functions
- **useContentMapping.ts**: React hook for dynamic content mapping

### Customizing Styles

The widget uses Tailwind CSS classes for styling. You can customize:

- Colors in the component files
- Layout and spacing
- Responsive breakpoints
- Animation and transitions
- Theme configuration in `widget-config.json`

### Adding New Languages

1. Add language configuration to `widget-config.json`
2. Update `language-mapping.ts` if needed
3. Test with sample audio files
4. Update UI text translations

## Future Enhancements

- **Real-time Streaming**: WebSocket-based real-time transcription streaming
- **Advanced Audio Analysis**: Noise reduction, audio enhancement, and quality metrics
- **External Service Integration**: Support for multiple transcription providers
- **Batch Processing**: Multiple file upload and processing capabilities
- **Custom Speaker Training**: User-specific speaker recognition and training
- **Audio Preprocessing**: Advanced audio filtering and enhancement options
- **Advanced Export Formats**: SRT, VTT, and custom format support
- **Voice Cloning**: Text-to-speech with custom voice generation
- **Sentiment Analysis**: Real-time emotion and sentiment detection
- **Conversation AI**: Advanced conversational AI integration

## Dependencies

- React 18+
- React Router DOM
- Tailwind CSS
- TypeScript
- Lucide React (icons)
- Modern browser with audio support
- WebRTC API support for live recording

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

The widget requires modern browser features for:

- Audio playback and recording
- Clipboard API for copy functionality
- Fetch API for HTTP requests
- WebRTC API for live audio recording
- MediaRecorder API for audio capture
- Web Audio API for audio processing
- Microphone access permissions

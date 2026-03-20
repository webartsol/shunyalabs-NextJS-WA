import React from 'react';
import { WidgetPage } from './pages/WidgetPage';
import { LiveTranscriptionPage } from './pages/LiveTranscriptionPage';

const WidgetModule: React.FC = () => {
  return (
    <>
    </>
    // <Routes>
    //   <Route path="/" element={<WidgetPage />} />
    //   <Route path="/live-transcription" element={<LiveTranscriptionPage />} />
    // </Routes>
  );
};

export default WidgetModule;

// Export components for external use
export { LiveTranscriptionWidget } from './components/LiveTranscriptionWidget';
export { LiveTranscriptionPage } from './pages/LiveTranscriptionPage';
export type { LiveTranscriptionWidgetRef } from './components/LiveTranscriptionWidget';

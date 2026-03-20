import React, { useState, useRef, useCallback } from 'react';
import { Upload, AlertCircle } from 'lucide-react';
import { cn } from '@/app/lib/utils';

interface AudioUploadZoneProps {
  onFileSelect: (file: File) => void;
  disabled?: boolean;
  className?: string;
}

// Extended list to include both audio and video formats supported by the backend
// Audio:  .wav, .mp3, .m4a, .flac, .ogg, .aac, .wma
// Video:  .mp4, .mkv, .mov, .avi, .webm
const SUPPORTED_FORMATS = [
  'mp3',
  'wav',
  'm4a',
  'aac',
  'ogg',
  'flac',
  'wma',
  'mp4',
  'mkv',
  'mov',
  'avi',
  'webm',
];
const MAX_FILE_SIZE_MB = 100;

export const AudioUploadZone: React.FC<AudioUploadZoneProps> = ({
  onFileSelect,
  disabled = false,
  className,
}) => {
  const [error, setError] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset selected file when component becomes disabled (i.e., when switching modes)
  React.useEffect(() => {
    if (disabled) {
      setSelectedFile(null);
      setError('');
    }
  }, [disabled]);

  const validateFile = useCallback((file: File): { valid: boolean; error?: string } => {
    // Check file size
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > MAX_FILE_SIZE_MB) {
      return {
        valid: false,
        error: `File too large (${fileSizeMB.toFixed(1)}MB). Max ${MAX_FILE_SIZE_MB}MB.`,
      };
    }

    // Check file type
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    if (!fileExtension || !SUPPORTED_FORMATS.includes(fileExtension)) {
      return {
        valid: false,
        error: `Unsupported format. Use: ${SUPPORTED_FORMATS.join(', ')}`,
      };
    }

    return { valid: true };
  }, []);

  const handleFile = useCallback(
    (file: File) => {
      setError('');
      const validation = validateFile(file);

      if (!validation.valid) {
        setError(validation.error || 'Invalid file');
        return;
      }

      setSelectedFile(file);
      onFileSelect(file);
    },
    [validateFile, onFileSelect]
  );

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleFile(file);
      }
      // Reset the input value so the same file can be selected again
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    },
    [handleFile]
  );

  return (
    <div className={cn( className)}>
      {/* Upload Button - Same width as Start Transcription */}
      <button
        id='UploadFile'
        onClick={() => !disabled && fileInputRef.current?.click()}
        disabled={disabled}
        className={cn(
          'px-3 sm:px-6 py-2 sm:py-3 bg-white hover:bg-white text-black font-sm md:font-medium lg:font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white',
          'whitespace-nowrap relative'
        )}
      >
        <Upload className="w-4 h-4" />
        Upload File
        {/* File name overlay - appears on top of button */}
        {selectedFile && !error && (
          <div className="absolute -top-8 left-0 right-0 bg-green-100 border border-green-300 rounded px-2 py-1 text-xs">
            <div className="flex items-center justify-center">
              <span className="text-green-800 truncate max-w-40">{selectedFile.name}</span>
            </div>
          </div>
        )}
        {/* Error overlay - appears on top of button */}
        {error && (
          <div className="absolute -top-8 left-0 right-0 bg-red-100 border border-red-300 rounded px-2 py-1 text-xs">
            <div className="flex items-center gap-1 text-red-600">
              <AlertCircle className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">{error}</span>
            </div>
          </div>
        )}
      </button>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="audio/*,video/*"
        onChange={handleFileInputChange}
        className="hidden"
        disabled={disabled}
      />
    </div>
  );
};

export default AudioUploadZone;

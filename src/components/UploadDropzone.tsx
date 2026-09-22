import React, { useState, useRef } from 'react';
import { UploadCloud, FileVideo, AlertCircle, Check, X } from 'lucide-react';
import { VideoMetadata } from '../types/media.js';

interface UploadDropzoneProps {
  onFileSelected: (file: File, simulatedMeta: VideoMetadata) => void;
  onCancel?: () => void;
}

export const UploadDropzone: React.FC<UploadDropzoneProps> = ({ onFileSelected, onCancel }) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const allowedFormats = ['video/mp4', 'video/quicktime', 'video/webm', 'video/x-matroska'];
  const maxSizeBytes = 1024 * 1024 * 1024; // 1 GB limit

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const validateAndProcess = (file: File) => {
    setError(null);
    if (!allowedFormats.includes(file.type) && !file.name.match(/\.(mp4|mov|webm|mkv)$/i)) {
      setError('Unsupported video format. Please upload MP4, MOV (ProRes/H.264), or WebM.');
      return;
    }

    if (file.size > maxSizeBytes) {
      setError('File exceeds 1 GB limit. Please upload shorter footage for lab processing.');
      return;
    }

    setSelectedFile(file);

    // Derive realistic or sample metadata from file name & size for analysis
    const is4KName = file.name.toLowerCase().includes('4k') || file.size > 200 * 1024 * 1024;
    const is60FPS = file.name.toLowerCase().includes('60') || file.name.toLowerCase().includes('game');

    const simulatedMeta: VideoMetadata = {
      width: is4KName ? 3840 : 1920,
      height: is4KName ? 2160 : 1080,
      aspectRatio: '16:9',
      fps: is60FPS ? 60 : 30,
      durationSeconds: Math.max(8.5, Math.min(60, Math.round(file.size / (1.5 * 1024 * 1024)))),
      codec: file.name.endsWith('.mov') ? 'prores' : 'h264',
      bitrateBps: Math.round((file.size * 8) / 15),
      pixelFormat: 'yuv420p',
      colorSpace: 'bt709',
      hasAudio: true,
      fileSizeBytes: file.size,
      fileName: file.name,
    };

    onFileSelected(file, simulatedMeta);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndProcess(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndProcess(e.target.files[0]);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative rounded-2xl border-2 border-dashed transition-all p-10 text-center cursor-pointer ${
          isDragging
            ? 'border-accent bg-accent/5 scale-[1.01]'
            : 'border-border/80 bg-surface/60 hover:border-zinc-500 hover:bg-surface'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="video/mp4,video/quicktime,video/webm,.mp4,.mov,.webm"
          className="hidden"
          onChange={handleFileInputChange}
        />

        {/* Upload Icon */}
        <div className="w-16 h-16 rounded-full bg-surface-elevated border border-border mx-auto flex items-center justify-center mb-5 text-accent shadow-inner">
          <UploadCloud className="w-8 h-8 stroke-[1.5]" />
        </div>

        {/* Headlines */}
        <h3 className="text-xl font-semibold text-white mb-2 tracking-tight">
          Drop your video here
        </h3>
        <p className="text-sm text-foreground-muted max-w-md mx-auto mb-6">
          ReelUp will inspect your codec, resolution, and noise profile to determine the exact enhancement pipeline needed.
        </p>

        {/* Browse Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            fileInputRef.current?.click();
          }}
          className="px-5 py-2.5 bg-surface-elevated hover:bg-zinc-800 text-white text-xs font-medium rounded-md border border-border shadow-sm transition-colors"
        >
          Browse Files
        </button>

        {/* Supported Formats info */}
        <div className="mt-8 pt-6 border-t border-border/50 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-zinc-500">
          <span>MP4 (H.264 / HEVC)</span>
          <span>•</span>
          <span>Apple ProRes (MOV)</span>
          <span>•</span>
          <span>WebM</span>
          <span>•</span>
          <span>Max 1 GB</span>
        </div>
      </div>

      {/* Error notification */}
      {error && (
        <div className="mt-4 p-3.5 bg-red-950/40 border border-red-800/60 rounded-lg flex items-start gap-3 text-xs text-red-200">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-semibold block mb-0.5">Upload Error</span>
            <span>{error}</span>
          </div>
          <button onClick={() => setError(null)} className="text-red-400 hover:text-red-200">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

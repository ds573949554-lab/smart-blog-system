'use client';

import { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X, Upload, Image as ImageIcon, Video } from 'lucide-react';
import Image from 'next/image';
import { useI18n } from '@/lib/i18n/I18nContext';

interface MediaUploaderProps {
  onUploadComplete: (urls: string[]) => void;
  maxFiles?: number;
  acceptImages?: boolean;
  acceptVideos?: boolean;
}

export function MediaUploader({
  onUploadComplete,
  maxFiles = 10,
  acceptImages = true,
  acceptVideos = true,
}: MediaUploaderProps) {
  const { t } = useI18n();
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const acceptTypes = [
    ...(acceptImages ? ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/heic'] : []),
    ...(acceptVideos ? ['video/mp4', 'video/quicktime', 'video/x-msvideo'] : []),
  ].join(',');

  const handleFileSelect = useCallback((selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const newFiles = Array.from(selectedFiles).slice(0, maxFiles - files.length);
    const newPreviews: string[] = [];

    newFiles.forEach((file) => {
      const url = URL.createObjectURL(file);
      newPreviews.push(url);
    });

    setFiles((prev) => [...prev, ...newFiles]);
    setPreviews((prev) => [...prev, ...newPreviews]);
  }, [files.length, maxFiles]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const removeFile = (index: number) => {
    URL.revokeObjectURL(previews[index]);
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadFiles = async () => {
    if (files.length === 0) return;

    setUploading(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('files', file);
      });

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || t.auth.uploadFailed || '上传失败');
      }

      const data = await response.json();
      setUploadProgress(100);

      // 清理预览
      previews.forEach((url) => URL.revokeObjectURL(url));
      setFiles([]);
      setPreviews([]);

      onUploadComplete(data.urls);
    } catch (error) {
      console.error('上传失败:', error);
      alert(error instanceof Error ? error.message : t.auth.uploadRetry || '上传失败，请重试');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="space-y-4">
      {/* 拖拽上传区域 */}
      <Card
        className={`border-2 border-dashed p-8 text-center cursor-pointer transition-colors ${
          isDragging ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary/50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptTypes}
          multiple
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
        />
        <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <h3 className="text-lg font-semibold mb-2">
          {isDragging ? t.auth.dragToUpload || '放开以上传文件' : t.auth.clickOrDrag || '点击或拖拽文件到此处'}
        </h3>
        <p className="text-sm text-muted-foreground">
          {t.auth.supports || '支持'}
          {acceptImages && ` ${t.auth.images || '图片'}`}
          {acceptImages && acceptVideos && ` ${t.auth.and || '和'}`}
          {acceptVideos && ` ${t.auth.videos || '视频'}`}
          {`，${t.auth.maxFiles || '最多'} ${maxFiles} ${t.auth.files || '个文件'}`}
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          {t.auth.fileSizeLimit || '图片最大 10MB，视频最大 60MB（约1分钟）'}
        </p>
      </Card>

      {/* 预览区域 */}
      {previews.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {previews.map((preview, index) => {
            const file = files[index];
            const isVideo = file.type.startsWith('video/');

            return (
              <Card key={index} className="relative group overflow-hidden">
                <div className="aspect-square relative bg-gray-100">
                  {isVideo ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-200">
                      <Video className="w-12 h-12 text-gray-400 mb-2" />
                      <p className="text-xs text-gray-600 px-2 text-center truncate w-full">
                        {file.name}
                      </p>
                    </div>
                  ) : (
                    <Image
                      src={preview}
                      alt={`${t.auth.preview || '预览'} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  type="button"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 truncate">
                  {file.name}
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* 上传按钮 */}
      {files.length > 0 && (
        <div className="flex items-center gap-4">
          <Button
            onClick={uploadFiles}
            disabled={uploading}
            className="flex-1"
          >
            {uploading
              ? `${t.auth.uploading || '上传中...'} ${uploadProgress}%`
              : `${t.auth.upload || '上传'} ${files.length} ${t.auth.files || '个文件'}`
            }
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              previews.forEach((url) => URL.revokeObjectURL(url));
              setFiles([]);
              setPreviews([]);
            }}
            disabled={uploading}
          >
            {t.auth.clear || '清空'}
          </Button>
        </div>
      )}
    </div>
  );
}

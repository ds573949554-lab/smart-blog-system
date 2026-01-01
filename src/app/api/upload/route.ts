import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';

// 允许的文件类型
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/heic'];
const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/quicktime', 'video/x-msvideo'];

// 最大文件大小
const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_VIDEO_SIZE = 60 * 1024 * 1024; // 60MB

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: '没有上传文件' },
        { status: 400 }
      );
    }

    const uploadedUrls: string[] = [];

    for (const file of files) {
      // 验证文件类型
      const isImage = ALLOWED_IMAGE_TYPES.includes(file.type);
      const isVideo = ALLOWED_VIDEO_TYPES.includes(file.type);

      if (!isImage && !isVideo) {
        return NextResponse.json(
          { error: `不支持的文件类型: ${file.type}` },
          { status: 400 }
        );
      }

      // 验证文件大小
      const maxSize = isVideo ? MAX_VIDEO_SIZE : MAX_IMAGE_SIZE;
      if (file.size > maxSize) {
        return NextResponse.json(
          {
            error: `文件过大: ${file.name}。${isVideo ? '视频' : '图片'}最大 ${maxSize / 1024 / 1024}MB`
          },
          { status: 400 }
        );
      }

      // 生成唯一文件名
      const timestamp = Date.now();
      const random = Math.random().toString(36).substring(7);
      const ext = file.name.split('.').pop();
      const fileName = `${timestamp}-${random}.${ext}`;

      // 上传到 Vercel Blob
      const blob = await put(fileName, file, {
        access: 'public',
      });

      uploadedUrls.push(blob.url);
    }

    return NextResponse.json({
      urls: uploadedUrls,
      message: `成功上传 ${uploadedUrls.length} 个文件`
    });
  } catch (error) {
    console.error('文件上传错误:', error);
    return NextResponse.json(
      { error: '文件上传失败，请重试' },
      { status: 500 }
    );
  }
}

// 配置路由以支持大文件
export const config = {
  api: {
    bodyParser: false,
  },
};

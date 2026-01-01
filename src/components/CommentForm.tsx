'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { trpc } from '@/lib/trpc/client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useI18n } from '@/lib/i18n/I18nContext';

interface CommentFormProps {
  postId: string;
  onSuccess?: () => void;
}

export function CommentForm({ postId, onSuccess }: CommentFormProps) {
  const { t } = useI18n();
  const utils = trpc.useUtils();

  // 动态创建验证 schema
  const commentSchema = z.object({
    content: z.string().min(1, t.auth.commentRequired || '评论内容不能为空'),
  });

  type CommentFormData = z.infer<typeof commentSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
  });

  const createComment = trpc.comment.create.useMutation({
    onSuccess: () => {
      utils.comment.getByPostId.invalidate({ postId });
      reset();
      onSuccess?.();
    },
  });

  const onSubmit = async (data: CommentFormData) => {
    await createComment.mutateAsync({
      content: data.content,
      postId,
      authorId: 'cmjtxid8r0000xxb32rwvhfhj', // 测试用户ID
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="comment">{t.postDetail.leaveComment}</Label>
        <Textarea
          id="comment"
          {...register('content')}
          placeholder={t.auth.commentPlaceholder || '写下你的想法...'}
          rows={4}
        />
        {errors.content && (
          <p className="text-sm text-destructive">{errors.content.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? t.auth.commentSending || '发送中...' : t.auth.commentSubmit || '发送评论'}
      </Button>
    </form>
  );
}

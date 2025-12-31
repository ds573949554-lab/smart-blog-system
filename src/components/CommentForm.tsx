'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { trpc } from '@/lib/trpc/client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const commentSchema = z.object({
  content: z.string().min(1, '评论内容不能为空'),
});

type CommentFormData = z.infer<typeof commentSchema>;

interface CommentFormProps {
  postId: string;
  onSuccess?: () => void;
}

export function CommentForm({ postId, onSuccess }: CommentFormProps) {
  const utils = trpc.useUtils();

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
      authorId: 'cmjtvrnvk0000xxkq0z230qjb', // 测试用户ID
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="comment">发表评论</Label>
        <Textarea
          id="comment"
          {...register('content')}
          placeholder="写下你的想法..."
          rows={4}
        />
        {errors.content && (
          <p className="text-sm text-destructive">{errors.content.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? '发送中...' : '发送评论'}
      </Button>
    </form>
  );
}

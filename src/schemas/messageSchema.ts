import { z } from 'zod';

export const messageSchema = z.object({
  content: z.string().min(10, "Message content is required").max(300, "Message must be under 300 characters")
});
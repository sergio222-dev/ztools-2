import { z } from 'nestjs-zod/z';

export const addRecordInfo = (createdAtDescribe, updatedAtDescribe) => ({
  createdAt: z.dateString().describe(createdAtDescribe),
  updatedAt: z.dateString().describe(updatedAtDescribe),
});

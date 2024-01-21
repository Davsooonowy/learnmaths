// TODO: add zod parsers

import { z } from 'zod';

export const termSchema = z.object({
    id: z.number(),
    startDateTime: z.coerce.date(),
    duration: z.number().multipleOf(15).lte(60).gte(15),
    votes: z.array(z.enum(['AVAILABLE', 'NOT_AVAILABLE', 'MAYBE', 'PENDING'])),
});

export type Term = z.infer<typeof termSchema>;

import { z } from 'zod';

export const operationSchema = z.object({
    type: z.enum(['TRANSFER', 'INVESTMENT'] as const),
    amount: z.coerce.number()
        .min(0.01, "O valor deve ser maior que zero")
        .max(10000000, "Valor excede o limite permitido"),

    // Conditionally required fields based on type would ideally use .superRefine, 
    // but for simplicity we'll keep them optional in the base object and refine later or just keep simple.
    // Let's use specific fields.

    recipient: z.string().optional(),
    assetId: z.string().optional(),
    description: z.string().max(100).optional(),
}).superRefine((data, ctx) => {
    if (data.type === 'TRANSFER') {
        if (!data.recipient || data.recipient.length < 5) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Informe um destinatário válido (mín. 5 caracteres)",
                path: ["recipient"],
            });
        }
    }

    if (data.type === 'INVESTMENT') {
        if (!data.assetId) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Selecione um ativo para investimento",
                path: ["assetId"],
            });
        }
    }
});

export type OperationFormValues = z.infer<typeof operationSchema>;

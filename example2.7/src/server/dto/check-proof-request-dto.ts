import {z} from "zod";

export const CheckProofRequest = z.object({
  name: z.string(),
  description: z.string(),
  image_data: z.string(),
  symbol: z.string(),
  decimals: z.number(),
  amount: z.string(),
});

export type CheckProofRequestDto = z.infer<typeof CheckProofRequest>;

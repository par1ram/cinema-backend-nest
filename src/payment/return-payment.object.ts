import { Prisma } from '@prisma/client'

export const returnPaymentObject: Prisma.PaymentSelect = {
  id: true,
  createdAt: true,
  status: true,
  amount: true,
  user: {
    select: {
      id: true,
    },
  },
}

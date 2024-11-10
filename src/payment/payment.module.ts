import { Module } from '@nestjs/common'
import { PaymentService } from './payment.service'
import { PaymentController } from './payment.controller'
import { PrismaService } from '../prisma.service'
import { UserService } from '../user/user.service'

@Module({
  controllers: [PaymentController],
  providers: [PaymentService, PrismaService, UserService],
})
export class PaymentModule {}

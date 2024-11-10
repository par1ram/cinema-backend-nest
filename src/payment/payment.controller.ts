import {
  Body,
  Controller, Delete, Get,
  HttpCode, NotFoundException, Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { PaymentService } from './payment.service'
import { Auth } from '../auth/decorators/auth.decorator'
import { PaymentDto } from './dto/payment.dto'
import { CurrentUser } from '../user/decorators/user.decorator'
import {PaymentStatusDto} from "./dto/payment-status.dto";

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  async chekout(@Body() dto: PaymentDto, @CurrentUser('id') userId: string) {
    return this.paymentService.chekout(dto, userId)
  }

  @HttpCode(200)
  @Post('status')
  async updateStatus(@Body() dto: PaymentStatusDto) {
    return this.paymentService.updateStatus(dto)
  }

  @Get('get/all')
  @Auth('admin')
  async getAll() {
    return this.paymentService.getAll()
  }

  @Delete('delete/:id')
  @Auth('admin')
  async delete(@Param('id') id: string) {
    const deletedPayment = await this.paymentService.delete(id)

    if (!deletedPayment) throw new NotFoundException('Платёж не найден')
    return deletedPayment
  }
}

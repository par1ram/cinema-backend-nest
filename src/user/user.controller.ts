import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { UserService } from './user.service'
import { Auth } from '../auth/decorators/auth.decorator'
import { CurrentUser } from './decorators/user.decorator'
import { UpdateUserDto } from './dto/update-user.dto'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @Auth()
  async getProfile(@CurrentUser('id') id: string) {
    return this.userService.getById(id)
  }

  @Post('profile/favorites')
  @HttpCode(200)
  @Auth()
  async toggleFavorite(
    @Body('movieId') movieId: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.userService.toggleFavorite(userId, movieId)
  }

  @Get('all')
  @Auth('admin')
  async getAllUsers(@Query('SearchTerm') searchTerm?: string) {
    return this.userService.getAllUsers(searchTerm)
  }

  @Get('get/:id')
  @Auth('admin')
  async getById(@Param('id') id: string) {
    return this.userService.getById(id)
  }

  @Put('update/:id')
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth('admin')
  async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.userService.update(id, dto)
  }

  @Delete('delete/:id')
  @HttpCode(200)
  @Auth('admin')
  async delete(@Param('id') id: string) {
    return this.userService.delete(id)
  }
}

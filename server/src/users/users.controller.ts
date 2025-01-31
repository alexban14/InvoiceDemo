import { Controller, Get, Param, Body, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto, UserSchema } from '../dtos/user.dto';
import { ZodPipe } from '../pipes/zod.pipe';

@Controller('users')
export class UsersController {
    // constructor(private usersService: UsersService) {}
    //
    // @Get(':id')
    // async findOne(@Param('id', ZodPipe(UserSchema.pick({ id: true }))) id: string): Promise<UserDto | null> {
    //     return this.usersService.findOne(id);
    // }
    //
    // @Post()
    // async create(@Body(new ZodPipe(UserSchema.omit({ id: true }))) userData: Omit<UserDto, 'id'>): Promise<UserDto> {
    //     return this.usersService.create(userData);
    // }
}

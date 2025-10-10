import {
  Body,
  Controller,
  Get,
  Patch,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Serialize } from 'src/common/decorators/serialize.decorator';
import { UserRole } from 'src/common/enums/user-role.enum';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { AuthRequest } from 'src/common/interfaces/auth-request.interface';
import { GetProfileDto } from './dto/get-profile.dto';
import { UserService } from './user.service';
import { UpdateProfileDto } from './dto/upadate-profile.dto';
import { ChangePasswordDto } from './dto/change-passrord.dto';
import { PrivacySettingDto } from './dto/privacy-setting.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from './entities/user.entity';

@ApiBearerAuth('BearerAuth')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @Serialize(GetProfileDto)
  async getProfile(@Req() req: AuthRequest): Promise<GetProfileDto | null> {
    const user_id = req.user.id;
    return await this.userService.findById(user_id);
  }

  @Patch('profile')
  async upadateProfile(
    @CurrentUser() user: User,
    @Body()
    updateProfileDto: UpdateProfileDto,
  ): Promise<GetProfileDto | null> {
    return await this.userService.updateProfile(user.id, updateProfileDto);
  }

  @Put('password-change')
  async changePassword(
    @CurrentUser() user: User,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<void> {
    return await this.userService.changePassword(
      user.id,
      changePasswordDto.newPassword,
    );
  }

  @Patch('privacy')
  async updatePrivacy(
    @CurrentUser() user: User,
    @Body() privacySettingDto: PrivacySettingDto,
  ): Promise<void> {
    return await this.userService.updatePrivacy(user.id, privacySettingDto);
  }
}

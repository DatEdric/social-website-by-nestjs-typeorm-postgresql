import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRole } from 'src/common/enums/user-role.enum';
import { RegisterDto } from './dto/register.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';
import { UpdateProfileDto } from './dto/upadate-profile.dto';
import { PrivacySettingDto } from './dto/privacy-setting.dto';
import { Privacy } from 'src/common/enums/privacy.enum';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(registerDto: RegisterDto): Promise<User> {
    const check_existing = await this.userRepository.findByEmail(
      registerDto.email,
    );
    if (check_existing) throw new ConflictException('Email already exists');

    const hashed_password = await bcrypt.hash(registerDto.password, 10);
    return this.userRepository.createAndSave({
      email: registerDto.email,
      password: hashed_password,
      name: registerDto.name,
      role: registerDto.role ?? UserRole.READER,
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  async findById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async updateProfile(id: string, dto: UpdateProfileDto): Promise<User | null> {
    return await this.userRepository.updateAndSave(id, dto);
  }

  comparePassword(plain: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plain, hashed);
  }
  async changePassword(id: string, newPassword: string): Promise<void> {
    const hashed_password = await bcrypt.hash(newPassword, 10);
    await this.userRepository.changePassword(id, { password: hashed_password });
  }

  async updatePrivacy(id: string, dto: PrivacySettingDto): Promise<void> {
    await this.userRepository.updatePrivacy(id, dto.privacy);
  }
}

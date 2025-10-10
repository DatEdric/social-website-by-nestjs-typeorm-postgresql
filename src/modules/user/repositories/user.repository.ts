import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { BaseRepository } from 'src/common/repositories/base-repository.repository';
import { UpdateProfileDto } from '../dto/upadate-profile.dto';
import { Privacy } from 'src/common/enums/privacy.enum';
import { plainToInstance } from 'class-transformer';
import { PublicProfileDto } from '../dto/public-profile.dto';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {
    super(repo);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repo.findOne({ where: { email } });
  }

  async findById(id: string): Promise<User | null> {
    return this.repo.findOne({ where: { id } });
  }

  async createAndSave(userData: Partial<User>): Promise<User> {
    const user = this.repo.create(userData);
    return this.repo.save(user);
  }

  async updateAndSave(
    id: string,
    updateData: UpdateProfileDto,
  ): Promise<User | null> {
    const result = await this.repo.findOne({ where: { id } });

    if (!result) return null;

    Object.assign(result, updateData);

    await this.repo.save(result);

    return result;
  }

  async changePassword(id: string, data: { password: string }): Promise<void> {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) throw new Error('User not found');

    user.password = data.password;
    await this.repo.save(user);
  }

  async updatePrivacy(id: string, privacy: Privacy): Promise<void> {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) throw new Error('User not found');

    user.privacy = privacy;
    await this.repo.save(user);
  }

  async getPublicProfileById(
    id: string,
    viewerId?: string,
  ): Promise<PublicProfileDto | null> {
    const profile = await this.findById(id);
    if (!profile) throw new NotFoundException('User not found');

    switch (profile.privacy) {
      case Privacy.PRIVATE:
        if (viewerId !== id)
          throw new BadRequestException('This profile is private.');

        break;

      case Privacy.FRIENDS:
        if (viewerId !== id)
          throw new BadRequestException('This profile is only for friends.');
        break;

      case Privacy.PUBLIC:
      default:
        break;
    }
    return plainToInstance(PublicProfileDto, profile, {
      excludeExtraneousValues: true,
    });
  }

  async findAllUser(): Promise<User[]> {
    return await this.findAll();
  }

  async removeUser(id: string): Promise<boolean> {
    return await this.softDelete(id);
  }
}

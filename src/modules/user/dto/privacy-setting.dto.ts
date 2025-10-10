import { IsEnum } from 'class-validator';
import { Privacy } from 'src/common/enums/privacy.enum';

export class PrivacySettingDto {
  @IsEnum(Privacy, {
    message: 'privacy must be public, friends, or private',
  })
  privacy: Privacy;
}

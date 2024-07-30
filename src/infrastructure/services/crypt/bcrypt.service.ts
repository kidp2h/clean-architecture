import { ICryptService } from '@/domain/adapters';
import bcrypt from 'bcryptjs';

export class BcryptService implements ICryptService {
  compare(str: string, hashed: string) {
    return bcrypt.compare(str, hashed);
  }
  hash(str: string, salt?: number) {
    return bcrypt.hash(str, salt || 10);
  }
}

import { ICryptService } from '@/domain/adapters';
import md5 from 'md5';

export class MD5Service implements ICryptService {
  compare(str: string, hashed: string) {
    return md5(str) === hashed;
  }
  hash(str: string) {
    return md5(str);
  }
}

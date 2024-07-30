import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IJwtService, IJwtPayload } from '@/domain/adapters';

@Injectable()
export class JwtTokenService implements IJwtService {
  constructor(private readonly jwtService: JwtService) {}

  async decode(token: string, secret?: string): Promise<any> {
    try {
      const decode = await this.jwtService.verifyAsync(token, {
        secret: secret || process.env.JWT_SECRET,
      });
      return decode;
    } catch (e) {
      return null;
    }
  }

  async encode(
    payload: IJwtPayload,
    secret?: string,
    expiresIn?: string,
  ): Promise<string> {
    return this.jwtService.sign(payload, {
      secret: secret || process.env.JWT_SECRET,
      expiresIn: expiresIn || process.env.JWT_EXPIRES_IN,
    });
  }
}

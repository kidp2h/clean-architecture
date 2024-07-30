export interface ICryptService {
  compare(str: string, hashed: string): Promise<boolean> | boolean;
  hash(str: string, salt?: number): Promise<string> | string;
}

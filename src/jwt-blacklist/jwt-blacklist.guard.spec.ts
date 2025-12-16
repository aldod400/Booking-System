import { JwtBlacklistGuard } from './jwt-blacklist.guard';

describe('JwtBlacklistGuard', () => {
  it('should be defined', () => {
    expect(new JwtBlacklistGuard()).toBeDefined();
  });
});

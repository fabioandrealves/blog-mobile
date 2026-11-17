import * as Keychain from 'react-native-keychain';

import type { TokenStorage } from './token-storage';

const TOKEN_SERVICE = 'com.blog_mobile.auth';

export class SecureTokenStorage implements TokenStorage {
  async get(): Promise<string | null> {
    const credentials = await Keychain.getGenericPassword({
      service: TOKEN_SERVICE,
    });

    return credentials ? credentials.password : null;
  }

  async save(token: string): Promise<void> {
    await Keychain.setGenericPassword(
      'auth-token',
      token,
      { service: TOKEN_SERVICE },
    );
  }

  async clear(): Promise<void> {
    await Keychain.resetGenericPassword({
      service: TOKEN_SERVICE,
    });
  }
}
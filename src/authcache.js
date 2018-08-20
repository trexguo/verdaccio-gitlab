// @flow

import type { Logger } from '@verdaccio/types';

import Crypto from 'crypto';
import NodeCache from 'node-cache';

export class AuthCache {
  logger: Logger;
  ttl: number;
  storage: NodeCache;

  constructor(logger: Logger, ttl?: number) {
    this.logger = logger;
    this.ttl = ttl || AuthCache.DEFAULT_TTL;

    this.storage = new NodeCache({
      stdTTL: this.ttl,
      useClones: false
    });
    this.storage.on('expired', (key, value) => {
      if (this.logger.trace()) {
        this.logger.trace(`[gitlab] expired key: ${key} with value:`, value);
      }
    });
  }

  static get DEFAULT_TTL() {
    return 300;
  }

  static _generateKeyHash(username: string, password: string) {
    const sha = Crypto.createHash('sha256');
    sha.update(JSON.stringify({ username: username, password: password }));
    return sha.digest('hex');
  }

  findUser(username: string, password: string): UserData {
    return this.storage.get(AuthCache._generateKeyHash(username, password));
  }

  storeUser(username: string, password: string, userData: UserData): boolean {
    return this.storage.set(AuthCache._generateKeyHash(username, password), userData);
  }
}

export type UserDataGroups = {
  publish: string[]
};

export class UserData {
  constructor(username: string, groups: UserDataGroups) {
    this._username = username;
    this._groups = groups;
  }

  _username: string;

  get username(): string {
    return this._username;
  }

  _groups: UserDataGroups;

  get groups(): UserDataGroups {
    return this._groups;
  }

  set groups(groups: UserDataGroups) {
    this._groups = groups;
  }
}

import { genSalt, hash, compare} from "bcrypt";

import { Hasher } from "./hasher";
import { SALT_ROUNDS } from "libs/account/blog-user/src/blog-user-module/blog-user.constant";

export class BcryptHasher implements Hasher {
  async hash(data: string): Promise<string> {
    const salt = await genSalt(SALT_ROUNDS);
    return hash(data, salt);
  }

  compare(expected: string, actual: string): Promise<boolean> {
    return compare(expected, actual);
  }
}

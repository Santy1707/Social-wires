/* eslint-disable prettier/prettier */
import { hash, compare as bcryptCompare } from 'bcrypt';
export const basicCrypt = async (password: string) => {
  return await hash(password, 13);
};

export const compareToEncrypted = async (
  data: string,
  encryptedData: Undefined<Nullable<string>>,
) => {
  if (!encryptedData) return false;

  return bcryptCompare(data, encryptedData);
};
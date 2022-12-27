import * as bcrypt from 'bcrypt';

export async function HashPassword(rawPassword: string): Promise<string> {
  var salt = bcrypt.genSaltSync(10);
  return bcrypt.hash(rawPassword, salt);
}

const ComparePassword = (
  rawpassword: string,
  hashedPassword: string,
): boolean => {
  return bcrypt.compareSync(rawpassword, hashedPassword);
};

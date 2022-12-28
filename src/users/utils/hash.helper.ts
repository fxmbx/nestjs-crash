import * as bcrypt from 'bcrypt';

export async function HashData(rawString: string): Promise<string> {
  var salt = bcrypt.genSaltSync(10);
  return bcrypt.hash(rawString, salt);
}

export const CompareHash = (
  rawString: string,
  hasedString: string,
): boolean => {
  return bcrypt.compareSync(rawString, hasedString);
};

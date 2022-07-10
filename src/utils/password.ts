import bcrypt from 'bcrypt';
import crypto from 'crypto';

export const generatePasswordHash = async (password: string) => {
  return await bcrypt.hash(password, 12);
};

export const compareFields = async (
  normalField: string,
  hashedField: string,
) => {
  return await bcrypt.compare(normalField, hashedField);
};

export const generateResetTokenHash = (resetToken: string) => {
  return crypto.createHash('sha256').update(resetToken).digest('hex');
};
export const generatePasswordResetToken = async () => {
  const resetToken = crypto.randomBytes(32).toString('hex');
  const hashedResetToken = await generateResetTokenHash(resetToken);
  return { resetToken, hashedResetToken };
};

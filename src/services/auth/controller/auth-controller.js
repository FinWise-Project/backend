import AuthRepositories from '../repositories/auth-repositories.js';
import InvariantError from '../../../exceptions/invariant-error.js';
import response from '../../../utils/response.js';
import NotFoundError from '../../../exceptions/not-found-error.js';
import TokenManager from '../../../security/token-manager.js';

export const register = async (req, res, next) => {
  const {
    name,
    email,
    password,
    phone,
  } = req.validated;

  const isNameExist = await AuthRepositories.verifyNewUser(name);
  if (isNameExist) {
    throw new InvariantError('username sudah digunakan');
  }

  const isEmailExist = await AuthRepositories.verifyEmail(email);
  if (isEmailExist) {
    return next(new InvariantError('email sudah terdaftar'));
  }

  const user = await AuthRepositories.createUser({
    name,
    email,
    password,
    phone,
  });

  if (!user) {
    return next(new InvariantError('user gagal ditambahkan'));
  }

  return response(res, 201, 'user berhasil ditambahkan', { id: user.id });
};

export const login = async (req, res, next) => {
  const { email, password } = req.validated;

  const userId = await AuthRepositories.verifyUserCredential(email, password);
  if (!userId) {
    return next(new NotFoundError('user tidak ditemukan'));
  }

  const accessToken = TokenManager.generateAccessToken({ id: userId });
  const refreshToken = TokenManager.generateRefreshToken({ id: userId });
  const expiredAt = new Date();
  expiredAt.setDate(expiredAt.getDate() + 3);

  await AuthRepositories.addRefreshToken({
    token: refreshToken,
    userId,
    expiredAt,
  });

  return response(res, 200, 'login berhasil', {
    accessToken,
    refreshToken,
  });
};

export const refreshAccessToken = async (req, res) => {
  const { refreshToken } = req.validated;

  await AuthRepositories.verifyRefreshToken(refreshToken);

  const { id } = TokenManager.verifyRefreshToken(refreshToken);
  const accessToken = TokenManager.generateAccessToken({ id });

  return response(res, 200, 'access token berhasil diperbarui', { accessToken });
};

export const logout = async (req, res) => {
  const { refreshToken } = req.validated;

  await AuthRepositories.verifyRefreshToken(refreshToken);
  await AuthRepositories.deleteRefreshToken(refreshToken);

  return response(res, 200, 'refresh token berhasil dihapus');
};
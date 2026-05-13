import PaymentRepositories from '../repositories/payment-repositories.js';
import InvariantError from '../../../exceptions/invariant-error.js';
import response from '../../../utils/response.js';
import NotFoundError from '../../../exceptions/not-found-error.js';

export const createPaymentMethod = async (req, res, next) => {
  const { name } = req.validated;
  const userId = req.user.id;

  const isPaymentMethodExist = await PaymentRepositories.verifyNewPaymentMethod(name);

  if (isPaymentMethodExist) {
    throw new InvariantError('nama metode pembayaran sudah digunakan');
  }

  const method = await PaymentRepositories.createPaymentMethod({
    userId,
    name,
  });

  if (!method) {
    return next(new InvariantError('metode pembayaran gagal ditambahkan'));
  }

  return response(res, 201, 'metode pembayaran berhasil ditambahkan', {
    id: method.id,
  });
};

export const getPaymentMethods = async (req, res, next) => {
  const paymentMethods = await PaymentRepositories.getPaymentMethod();

  if (!paymentMethods) {
    return next(new NotFoundError('data metode pembayaran kosong'));
  }

  return response(res, 200, 'berhasil mengambil data metode pembayaran', { paymentMethods });
};

export const getPaymentMethodById = async (req, res, next) => {
  const { id } = req.params;

  const method = await PaymentRepositories.getPaymentMethodById(id);

  if (!method) {
    return next(new NotFoundError('data metode pembayaran tidak ditemukan'));
  }

  return response(res, 200, 'berhasil mengambil data metode pembayaran', { method });
};

export const editPaymentMethod = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.validated;

  const isPaymentMethodExist = await PaymentRepositories.verifyNewPaymentMethod(name);

  if (isPaymentMethodExist) {
    throw new InvariantError('nama metode pembayaran sudah digunakan');
  }

  const method = await PaymentRepositories.editPaymentMethod({
    id,
    name,
  });

  if (!method) {
    return next(new InvariantError('metode pembayaran gagal diperbarui'));
  }

  return response(res, 200, 'metode pembayaran berhasil diperbarui', method);
};

export const deletePaymentMethod = async (req, res, next) => {
  const { id } = req.params;

  const method = await PaymentRepositories.deletePaymentMethod(id);

  if (!method) {
    return next(new InvariantError('metode pembayaran gagal dihapus'));
  }

  return response(res, 200, 'metode pembayaran berhasil dihapus', method);
};

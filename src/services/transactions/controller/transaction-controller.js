import TransactionRepositories from '../repositories/transaction-repositories.js';
import InvariantError from '../../../exceptions/invariant-error.js';
import response from '../../../utils/response.js';
import NotFoundError from '../../../exceptions/not-found-error.js';

export const createTransaction = async (req, res, next) => {
  const { date, amount, type, subCategoryId, paymentMethodId, description } = req.validated;
  const userId = req.user.id;

  const transaction = await TransactionRepositories.createTransaction({
    date,
    amount,
    type,
    subCategoryId,
    paymentMethodId,
    description,
    userId,
  });

  if (!transaction) {
    return next(new InvariantError('transaksi gagal ditambahkan'));
  }

  return response(res, 201, 'transaksi berhasil ditambahkan', {
    id: transaction.id,
  });
};

export const getTransactions = async (req, res) => {
  const { type, categoryId, categoryName } = req.query;

  const transactions = await TransactionRepositories.getTransactions({ type, categoryId, categoryName });

  return response(res, 200, 'berhasil mengambil data transaksi', { transactions });
};

export const getTransactionById = async (req, res, next) => {
  const { id } = req.params;

  const transaction = await TransactionRepositories.getTransactionById(id);

  if (!transaction) {
    return next(new NotFoundError('data tr ansaksi tidak ditemukan'));
  }

  return response(res, 200, 'berhasil mengambil data transaksi', { transaction });
};

export const editTransaction = async (req, res, next) => {
  const { id } = req.params;
  const {
    date,
    amount,
    type,
    subCategoryId,
    paymentMethodId,
    description
  } = req.validated;

  const transaction = await TransactionRepositories.editTransaction({
    id,
    date,
    amount,
    type,
    subCategoryId,
    paymentMethodId,
    description
  });

  if (!transaction) {
    return next(new InvariantError('transaksi gagal diperbarui'));
  }

  return response(res, 200, 'transaksi berhasil diperbarui', transaction);
};

export const deleteTransaction = async (req, res, next) => {
  const { id } = req.params;

  const transaction = await TransactionRepositories.deleteTransaction(id);

  if (!transaction) {
    return next(new InvariantError('transaksi gagal dihapus'));
  }

  return response(res, 200, 'transaksi berhasil dihapus', transaction);
};

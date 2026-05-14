import CategoryRepositories from '../repositories/category-repositories.js';
import InvariantError from '../../../exceptions/invariant-error.js';
import response from '../../../utils/response.js';
import NotFoundError from '../../../exceptions/not-found-error.js';

export const createCategory = async (req, res, next) => {
  const { name } = req.validated;
  const userId = req.user.id;

  const isCategotyExist = await CategoryRepositories.verifyNewCategory(name);

  if (isCategotyExist) {
    throw new InvariantError('nama kategori sudah digunakan');
  }

  const category = await CategoryRepositories.createCategory({
    userId,
    name,
  });

  if (!category) {
    return next(new InvariantError('kategori gagal ditambahkan'));
  }

  return response(res, 201, 'kategori berhasil ditambahkan', {
    id: category.id,
  });
};

export const getCategories = async (req, res) => {
  const { categoryId, categoryName } = req.query;

  const categories = await CategoryRepositories.getCategory({ categoryId, categoryName });

  return response(res, 200, 'berhasil mengambil data kategori', { categories });
};

export const getCategoryById = async (req, res, next) => {
  const { id } = req.params;

  const category = await CategoryRepositories.getCategoryById(id);

  if (!category) {
    return next(new NotFoundError('data kategori tidak ditemukan'));
  }

  return response(res, 200, 'berhasil mengambil data kategori', { category });
};

export const editCategory = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.validated;

  const category = await CategoryRepositories.editCategory({
    id,
    name,
  });

  if (!category) {
    return next(new InvariantError('kategori gagal diperbarui'));
  }

  return response(res, 200, 'kategori berhasil diperbarui', category);
};

export const deleteCategory = async (req, res, next) => {
  const { id } = req.params;

  const category = await CategoryRepositories.deleteCategory(id);

  if (!category) {
    return next(new InvariantError('kategori gagal dihapus'));
  }

  return response(res, 200, 'kategori berhasil dihapus', category);
};

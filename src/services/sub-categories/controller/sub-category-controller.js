import SubCategoryRepositories from '../repositories/sub-category-repositories.js';
import InvariantError from '../../../exceptions/invariant-error.js';
import response from '../../../utils/response.js';
import NotFoundError from '../../../exceptions/not-found-error.js';

export const createSubCategory = async (req, res, next) => {
  const { name } = req.validated;
  const { categoryId } = req.body;
  const userId = req.user.id;

  const isCategotyExist = await SubCategoryRepositories.verifyNewSubCategory(name);

  if (isCategotyExist) {
    throw new InvariantError('nama sub kategori sudah digunakan');
  }

  const category = await SubCategoryRepositories.createSubCategory({
    userId,
    categoryId,
    name,
  });

  if (!category) {
    return next(new InvariantError('sub kategori gagal ditambahkan'));
  }

  return response(res, 201, 'sub kategori berhasil ditambahkan', {
    id: category.id,
  });
};

export const getSubCategories = async (req, res, next) => {
  const categories = await SubCategoryRepositories.getSubCategory();

  if (!categories) {
    return next(new NotFoundError('data sub kategori kosong'));
  }

  return response(res, 200, 'berhasil mengambil data sub kategori', { categories });
};

export const getSubCategoryById = async (req, res, next) => {
  const { id } = req.params;

  const category = await SubCategoryRepositories.getSubCategoryById(id);

  if (!category) {
    return next(new NotFoundError('data sub kategori tidak ditemukan'));
  }

  return response(res, 200, 'berhasil mengambil data sub kategori', { category });
};

export const getSubCategoryByCategory = async (req, res) => {
  const { categoryId } = req.params;

  const subCategories =await SubCategoryRepositories.getSubCategoryByCategoryId(categoryId);

  return response(res, 200, 'berhasil mengambil sub kategori', {
    subCategories,
  });
};

export const editSubCategory = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.validated;

  const category = await SubCategoryRepositories.editSubCategory({
    id,
    name,
  });

  if (!category) {
    return next(new InvariantError('sub kategori gagal diperbarui'));
  }

  return response(res, 200, 'sub kategori berhasil diperbarui', category);
};

export const deleteSubCategory = async (req, res, next) => {
  const { id } = req.params;

  const category = await SubCategoryRepositories.deleteSubCategory(id);

  if (!category) {
    return next(new InvariantError('sub kategori gagal dihapus'));
  }

  return response(res, 200, 'sub kategori berhasil dihapus', category);
};

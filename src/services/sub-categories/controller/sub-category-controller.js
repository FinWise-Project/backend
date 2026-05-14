import SubCategoryRepositories from '../repositories/sub-category-repositories.js';
import InvariantError from '../../../exceptions/invariant-error.js';
import response from '../../../utils/response.js';
import NotFoundError from '../../../exceptions/not-found-error.js';

export const createSubCategory = async (req, res, next) => {
  const { name } = req.validated;
  const { categoryId } = req.body;
  const userId = req.user.id;

  const isSubCategotyExist = await SubCategoryRepositories.verifyNewSubCategory(name);

  if (isSubCategotyExist) {
    throw new InvariantError('nama sub kategori sudah digunakan');
  }

  const subCategory = await SubCategoryRepositories.createSubCategory({
    userId,
    categoryId,
    name,
  });

  if (!subCategory) {
    return next(new InvariantError('sub kategori gagal ditambahkan'));
  }

  return response(res, 201, 'sub kategori berhasil ditambahkan', {
    id: subCategory.id,
  });
};

export const getSubCategories = async (req, res) => {
  const { categoryName, subCategoryName, categoryId } = req.query;

  const subCategories = await SubCategoryRepositories.getSubCategory({ categoryName, subCategoryName, categoryId });

  return response(res, 200, 'berhasil mengambil data sub kategori', { subCategories });
};

export const getSubCategoryById = async (req, res, next) => {
  const { id } = req.params;

  const subCategory = await SubCategoryRepositories.getSubCategoryById(id);

  if (!subCategory) {
    return next(new NotFoundError('data sub kategori tidak ditemukan'));
  }

  return response(res, 200, 'berhasil mengambil data sub kategori', { subCategory });
};

export const editSubCategory = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.validated;

  const subCategory = await SubCategoryRepositories.editSubCategory({
    id,
    name,
  });

  if (!subCategory) {
    return next(new InvariantError('sub kategori gagal diperbarui'));
  }

  return response(res, 200, 'sub kategori berhasil diperbarui', subCategory);
};

export const deleteSubCategory = async (req, res, next) => {
  const { id } = req.params;

  const subCategory = await SubCategoryRepositories.deleteSubCategory(id);

  if (!subCategory) {
    return next(new InvariantError('sub kategori gagal dihapus'));
  }

  return response(res, 200, 'sub kategori berhasil dihapus', subCategory);
};

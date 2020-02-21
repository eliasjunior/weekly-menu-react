import ApiService from "../../service/ApiService";

const RESOURCE_PATH = "categories";

const CategoryService = {
  update(category) {
    return ApiService.put(RESOURCE_PATH, category);
  },
  save(category) {
    return ApiService.post(RESOURCE_PATH, category);
  },
  get() {
    return ApiService.get(RESOURCE_PATH);
  },
  getOne(id) {
    return ApiService.get(`${RESOURCE_PATH}${id}`);
  },
  delete() {}
};
export default CategoryService;

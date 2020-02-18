export default function Inventory({ CategoryService }) {
  async function getCategories() {
    try {
      return await CategoryService.get();
    } catch (error) {
      return error;
    }
  }

  return {
    getCategories
  };
}

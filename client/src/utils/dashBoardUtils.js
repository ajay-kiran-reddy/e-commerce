const RenderCategoryByChildren = (category) => {
  const categories = [];
  if (category?.children.length > 0) {
    categories.push(category);
    category?.children?.forEach((subCat) => {
      RenderCategoryByChildren(subCat);
    });
  } else {
    categories.push(category);
  }
  console.log(categories, "[CATS]");
};

export { RenderCategoryByChildren };

const { Category, validate } = require('../model/category');
const slugify = require('slugify');
const shortid = require("shortid");


const createCategories = (categories, parentId = null) => {
  const categoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter(cat => cat.parentId == undefined);
  } else {
    category = categories.filter(cat => cat.parentId == parentId);
  }

  for (let cate of category) {
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      parentId: cate.parentId,
      children: createCategories(categories, cate._id)
    });
  }
  return categoryList;
}


exports.addCategory = async (req,res) => {

    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

        const category = Category({
            name: req.body.name,
            slug: `${slugify(req.body.name)}-${shortid.generate()}`,
        });

         if(req.file){
            category.categoryImage = process.env.API + '/public/' + req.file.filename;
         }

          if(req.body.parentId){
              category.parentId = req.body.parentId
          }

            try {
                const cat = await category.save();
                res.status(201).send({category: cat});
                // return res.status(201).json({ category });
            } catch (error) {
               res.status(400).json({ error });
            }

};

exports.getCategories = async (req, res) => {
  const categories = await Category.find();

  if (!categories) return res.status(404).send('No categories found');

  const categoryList = createCategories(categories);
  res.send({ 'categoryList': categoryList });
};

exports.updateCategories = async (req, res) => {
  const { _id, name, parentId, type } = req.body;
  const updatedCategories = [];
  if (name instanceof Array) {
    for (let i = 0; i < name.length; i++) {
      const category = {
        name: name[i],
        type: type[i],
      };
      if (parentId[i] !== "") {
        category.parentId = parentId[i];
      }

      const updatedCategory = await Category.findOneAndUpdate(
        { _id: _id[i] },
        category,
        { new: true }
      );
      updatedCategories.push(updatedCategory);
    }
    return res.status(201).json({ updateCategories: updatedCategories });
  } else {
    const category = {
      name,
      type,
    };
    if (parentId !== "") {
      category.parentId = parentId;
    }
    const updatedCategory = await Category.findOneAndUpdate({ _id }, category, {
      new: true,
    });
    return res.status(201).json({ updatedCategory });
  }
};

exports.deleteCategories = async (req, res) => {
  const { ids } = req.body.payload;
  const deletedCategories = [];
  for (let i = 0; i < ids.length; i++) {
    const deleteCategory = await Category.findOneAndDelete({
      _id: ids[i]._id,
      createdBy: req.user._id,
    });
    deletedCategories.push(deleteCategory);
  }

  if (deletedCategories.length == ids.length) {
    res.status(201).json({ message: "Categories removed" });
  } else {
    res.status(400).json({ message: "Something went wrong" });
  }
};

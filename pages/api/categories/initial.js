import schema from './schema'

async function getCategories ( amount ) {
  const category = await schema()
  var categories = await category.find().sort({date: -1, _id: -1}).limit(amount)
  const count = await category.countDocuments({})

  return  JSON.stringify({ categories: categories, count: count })
}


module.exports = getCategories
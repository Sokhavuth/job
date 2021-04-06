import schema from './schema'

async function getCategories ( amount ) {
  const category = await schema()

  const categories = await category.find().sort({date: -1, _id: -1}).limit(amount)
  return JSON.stringify(categories)
}


module.exports = getCategories
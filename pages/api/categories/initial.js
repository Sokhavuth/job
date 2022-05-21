import schema from './schema'

async function getCategories ( amount ) {
  const categorySchema = await schema()
  if (amount) {
    var categories = await categorySchema.find().sort({date: -1, _id: -1}).limit(amount)
  } else {
    var categories = await categorySchema.find().sort({ name: 1 })
  }

  const count = await categorySchema.countDocuments({})
  return  JSON.stringify({ categories: categories, count: count })
}


module.exports = getCategories
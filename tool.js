import mongoose from 'mongoose'

export async function getFetch(uri) {
  try {
    let response = await fetch(uri)
    return await response.json()
  } catch(err) {
    alert(err);
  }
}

export async function postFetch(uri, data) {
  const options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {"Content-type": "application/json; charset=UTF-8"}
  }

  try {
    let response = await fetch(uri, options)
    return await response.json()
  } catch(err) {
    alert(err);
  }
}

export async function setDbConnection() {
  if (mongoose.connections[0].readyState) {
    return
  }
  await mongoose.connect(process.env.DATABASE_URI, {
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true
  })
}
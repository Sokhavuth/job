import mongoose from 'mongoose'
import cheerio from 'cheerio'

export async function getFetch(uri) {
  try {
    let response = await fetch(uri)
    return await response.json()
  } catch(err) {
    console.log(err);
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
    console.log(err)
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

export function getThumbUrl(contents, type=false){
  const noPost = "/images/no-image.png"
  const noUser = "/images/userthumb.png"
  const playIcon = "/images/play.png"

  let $ = null

  var thumbUrls = []
  var thumbObjUrl = {}

  for(var v in contents){
    $ = cheerio.load(contents[v].info)
    
    if($('img').length > 0){
      if (type === "thumbObjUrl"){
        thumbObjUrl[contents[v].name] = $("img").first().attr("src")
      } else {
        thumbUrls.push($("img").first().attr("src"))
      }
    }else{
      if(type == 'author'){
        thumbUrls.push(noUser)
      } else {
        if (type === "thumbObjUrl"){
          thumbObjUrl[contents[v].name] = noPost
        } else {
          thumbUrls.push(noPost)
        }
      }
    }
  }

  if(type === "thumbObjUrl"){
    return (thumbObjUrl)
  } else {
    return (thumbUrls)
  }
  
}
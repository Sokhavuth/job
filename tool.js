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

  var thumbUrls = [];
  for(var v in contents){
    const $ = cheerio.load(contents[v].info);
    if($('img').length > 0){
      thumbUrls.push($("img").first().attr("src"));
    }else{
      if(type == 'author')
        thumbUrls.push(noUser);
      else
        thumbUrls.push(noPost);
    }
  }
  return (thumbUrls);
}
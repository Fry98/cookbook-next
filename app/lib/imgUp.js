const fetch = require('node-fetch');

// Upload food image to Imgur
module.exports = (rawImg)=>{
  return new Promise((resolve, reject)=>{
    if(rawImg === undefined){
      resolve(undefined);
    }
    else{
      rawImg = rawImg.substr(rawImg.indexOf(',') + 1);
      fetch('https://api.imgur.com/3/image',{
        method: 'POST',
        headers: {'Authorization': `Client-ID ${process.env.IMGUR_TOKEN}`}, // Imgur API token has to be specified in ENVIROMENT VARIABLES
        body: rawImg
      })
      .then(res => res.json())
      .then((res)=>{
        resolve(res.data.id);
      });
    }
  });
};
const unirest = require("unirest");
const cheerio = require("cheerio");
const puppeteer = require('puppeteer');
const fs = require('fs')
const pretty = require("pretty"); 
    
     exports.googleSearchData = (req, res) => {
      return unirest
        .get("https://www.google.com/search?q=" + req.params.search)
        .headers({
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
        })
        .then((response) => {
          let $ = cheerio.load(response.body);
    
          let titles = [];
          let links = [];
          let snippets = [];
          let displayedLinks = [];
    
          $(".yuRUbf > a > h3").each((i, el) => {
            titles[i] = $(el).text();
          });
          $(".yuRUbf > a").each((i, el) => {
            links[i] = $(el).attr("href");
          });
          $(".g .VwiC3b ").each((i, el) => {
            snippets[i] = $(el).text();
          });
          $(".g .yuRUbf .NJjxre .tjvcx").each((i, el) => {
            displayedLinks[i] = $(el).text();
          });
    
          const organicResults = [];
          
          for (let i = 0; i < titles.length; i++) {
            organicResults[i] = {
              title: titles[i],
              links: links[i],
              snippet: snippets[i],
              displayedLink: displayedLinks[i],
            };
          }
          console.log(organicResults)
          return res.status(200).send({ data: organicResults });

        });
    };



function MeteoSearchingSys(meteo) {
  let weather = ''
  let frmeteo = meteo.includes('meteo')
  let frtemps = meteo.includes('temps')
  let Usweather = meteo.includes('weather')

  if (frmeteo == true)
    {weather = meteo.replace('meteo','')
    return weather}

  if (frtemps == true){
    weather = meteo.replace('temps','')
    return weather
  }
  
  if (Usweather == true){
    weather = meteo.replace('weather','')
    return weather
  }
}

    exports.googleMeteoData = (req, res) => {
        unirest
        .get("https://www.google.com/search?q=meteo " + MeteoSearchingSys(req.params.search) + "&hl=fr")
        .headers({
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
        })
        .then((response) => {
          console.log("https://www.google.com/search?q=meteo" + MeteoSearchingSys(req.params.search) + "&hl=fr")
          let $ = cheerio.load(response.body);
          // console.log(pretty($.html()))
          let location = [];
          let time = [];
          let descri = [];
          let temperature = [];
          let image = [];


          $(".VQF4g > span > .wob_loc").each((i, el) => {
            location[i] = $(el).text();
          });
          $(".VQF4g > span > .wob_dts").each((i, el) => {
            time[i] = $(el).text();
          });
          $(".VQF4g > span > .wob_dcp > span").each((i, el) => {
            descri[i] = $(el).text();
          });
          $(".Ab33Nc > div > .SGNhVe > span").each((i, el) => {
            temperature[i] = $(el).text();
          });
          $(".UQt4rd > img").each((i, el) => {
            image[i] = $(el).attr("src");
          });
    
          const temperatures = [];
          for (let i = 0; i < temperature.length; i++) {
            temperatures[i] = {
              temperature: temperature[i],
            };
          }
           const organicResults = ({
              location: location[0],
              time: time[0],
              description: descri[0],
              temperatureCelFar: temperatures,
              image: image[0]
            });
          
        
          console.log(organicResults)
          return res.status(200).send({ data: organicResults });

        });
    };
   


    exports.googleNewsData = (req, res) => {
      
        let search = "technologie"

        unirest
        .get("https://news.google.com/search?for=" + search + "&hl=fr&gl=FR&ceid=FR:fr")
        .headers({
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
        })
        .then((response) => {
          console.log("https://news.google.com/search?for=" + search)
          let $ = cheerio.load(response.body);
          
          let logo = []
          let titles = [];
          let image = []
          let date = []
          
         
          $(".xrnccd > article > .wsLqz.RD0gLb > img").each((i, el) => {
            logo[i] = $(el).attr("src");
          });
          $(".xrnccd > article > h3").each((i, el) => {
            titles[i] = $(el).text();
          });
          $("figure > img").each((i, el) => {
            image[i] = $(el).attr("src");
          });
          $(".xrnccd > article > div > div > time").each((i, el) => {
            date[i] = $(el).text();
          });
    
          const organicResults = [];
          
          for (let i = 0; i < titles.length; i++) {
            organicResults[i] = {
              logo: logo[i],
              title: titles[i],
              image: image[i],
              date: date[i]
            };
          }
          console.log(organicResults)
          return res.status(200).send({ data: organicResults });

        });
    };
 
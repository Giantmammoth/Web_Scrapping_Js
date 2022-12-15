const unirest = require("unirest");
const cheerio = require("cheerio");
const pretty = require("pretty"); 
const wiki = require('wiki-page');
const translate = require('translate-google');
const { data } = require("cherio/lib/api/attributes");

exports.wiki = (req, res) => {
        
    unirest
      .get("https://fr.wikipedia.org/wiki/" + req.params.search)
      .headers({
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
      })
      .then((response) => {
        let $ = cheerio.load(response.body);
  
        let descri = [];
       
  
        $(".mw-parser-output > p").each((i, el) => {
          descri[i] = $(el).text();
        });
       
        const organicResults = [];
  
        for (let i = 0; i < 3; i++) {
          organicResults[i] = {
            descri: descri[i],
          };
        }
        console.log(organicResults)
        return res.status(200).send({ data: organicResults });

      });
  };

   TranslatorFunc = async(text) => {
    let trans = ""
    await translate(text, {to: 'fr'}).then(res => {
        // console.log(res)
        trans = res
    }).catch(err => {
        console.error(err)
    })
    return trans
  }

  exports.wikiApi =  async (req, res) => {
    
      let wikiresult = {
        description: "",
        text: ""
      }
       wiki.fetch({query: '/page/summary/' + req.params.search}, async (data) => { 
            console.log(data)
             wikiresult = ({
                description : await TranslatorFunc(data.description),
                text: await TranslatorFunc(data.extract)
            })
            return res.status(200).send({ data: wikiresult });
        });
  
  }
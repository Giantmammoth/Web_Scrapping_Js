const unirest = require("unirest");
const cheerio = require("cheerio");
const pretty = require("pretty"); 
const wiki = require('wiki-page');
const translate = require('translate-google');
const wikifetch = require('node-wikifetch');
const { Configuration, OpenAIApi } = require("openai");
const OpenAI = require('openai-nodejs');

   TranslatorFr = async(text) => {
    let trans = ""
    await translate(text, {to: 'fr'}).then(res => {
        // console.log(res)
        trans = res
    }).catch(err => {
        console.error(err)
    })
    return trans
  }

  TranslatorEn = async(text) => {
    let trans = ""
    await translate(text, {to: 'En'}).then(res => {
        // console.log(res)
        trans = res
    }).catch(err => {
        console.error(err)
    })
    return trans
  }

  exports.wikiApi =  async (req, res) => {
      const text = await TranslatorEn(req.params.search)
      console.log(text)
      let wikiresult = {
        description: "",
        text: ""
      }
      
       await wiki.fetch({
        section: 'page',
        type: 'summary',
        title: text,
      }, async (data) => { 
        console.log(data)
             wikiresult = ({
                description : await TranslatorFr(data.description),
                text: await TranslatorFr(data.extract)
            })
            return res.status(200).send({ data: wikiresult });
        });
  
  }

exports.openai = async (req, res) => {
const apiKey = process.env.openai_key;
console.log(apiKey)
const model = 'davinci';
const prompt = 'What is the capital of France?';

unirest.post('https://api.openai.com/v1/edits')
  .headers({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
  })
  .send({
    'model': model,
    'prompt': prompt,
    'max_tokens': 2048,
  })
  .end(function (response) {
    // console.log(response);
    return res.status(200).send({ data:  response });
  });
}
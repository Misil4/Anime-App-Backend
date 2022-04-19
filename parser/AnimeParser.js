import cheerio from 'cheerio'

export const animeContentHandler = async(id) => {
    const res = await fetch(`${url}/${id}`);
    const body = await res.text();
    const extra = [];
    const $ = cheerio.load(body);
    const eps_temp_list = [];
    let episodes_aired = '';
    $('div#container div.left-container div.navigation a').each(async(index , element) => {
        const $element = $(element);
        const total_eps = $element.text();
        eps_temp_list.push(total_eps);
    })
    try{episodes_aired = eps_temp_list[0].split('-')[1].trim();}catch(err){}
    const episodes_List = Array.from({length: episodes_aired} , (v , k) =>{
      return{
        episode: k + 1,
        id: id
      }
    });
    
    $('div#container div.serie-info').each(async(index, element) => {
      const $element = $(element);
      let sinopsis = $element.find('div.sinopsis-box p.pc').text().trim();
      let type = $element.find('div.info-content div.info-field span.info-value').first().text().split('\n')[0].trim();
      let state = $element.find('div.info-content div.info-field span.info-value b').last().text();
      const content = {
        type: type,
        sinopsis: sinopsis,
        state: state,
        episodes: episodes_aired,
        episodeList: episodes_List
      }
      extra.push(content);
    })
    return await Promise.all(extra);
  };
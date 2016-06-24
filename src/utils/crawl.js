import scrapeIt from 'scrape-it';
import cheerio from 'cheerio';
import {requestRaw} from './request';

const debug = require('debug')('popura:crawl');

export default function crawler(authToken, url = '/', parseModel = {}, requestOpts = {}) {
	debug(`Crawling ${url}`);
	return requestRaw(authToken, url, requestOpts)
		.then(({body}) => scrapeIt.scrapeHTML(cheerio.load(body), parseModel));
}

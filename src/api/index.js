import axios from 'axios';
import app from '../../app.json';

const BASE_URL = 'https://api.nytimes.com/svc/topstories/v2/';

export const getStoriesByCategory = (category = 'home', callback) => {
  axios({
    method: 'get',
    url: `${BASE_URL}${category}.json?api-key=${app.apiKey}`,
  })
    .then(response => {
      callback && callback?.(response?.data?.results || []);
    })
    .catch(err => {
      console.log('[1;34m ~>>>>~ ERROR API', err);
    });
};

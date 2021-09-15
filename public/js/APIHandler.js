class APIHandler {
    constructor (baseUrl) {
  
      this.BASE_URL = baseUrl;
      this.app = axios.create({
        baseURL: 'https://restcountries.eu/rest/v2/all'
    })
}
}
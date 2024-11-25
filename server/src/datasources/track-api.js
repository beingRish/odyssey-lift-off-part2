const { RESTDataSource } = require ('@apollo/datasource-rest');

class trackAPI extends RESTDataSource {
    baseURL = 'https://odyssey-lift-off-rest-api.herokuapp.com/';

    getTracksForHome() {
        return this.get("tracks");
    }

    getAuthor(authorId) {
        this.get(`author/${authorId}`);
    }
}

module.exports = trackAPI;
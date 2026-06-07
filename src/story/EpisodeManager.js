export default class EpisodeManager {
    constructor(game) {
        this.game = game;
        this.episodes = {};
    }

    async loadEpisode(id) {
        // In a real app, this would be a fetch
        const data = await import(`../data/episodes/episode${id}.json`);
        this.episodes[id] = data.default;
        return data.default;
    }

    getScene(episodeId, sceneId) {
        return this.episodes[episodeId].scenes.find(s => s.id === sceneId);
    }
}

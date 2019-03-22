import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    games: [],
    teams: [],
    gameLiveFeed: [],
    gameBoxscore: [],
    gameLinescore: [],
    lastUpdateTimestampLiveFeed: '',
    currentScheduleDate: null,
  },
  mutations: {
    setGames(state, getGamesResponse) {
      state.games = getGamesResponse;
    },
    setTeams(state, getTeamsResponse) {
      state.teams = getTeamsResponse;
    },
    setGameLivefeed(state, getGameLivefeedResult) {
      state.gameLiveFeed = getGameLivefeedResult;
    },
    setGameBoxscore(state, getGameBoxscoreResult) {
      state.gameBoxscore = getGameBoxscoreResult;
    },
    setLastUpdateTimestampLiveFeed(state, lastUpdate) {
      state.lastUpdateTimestampLiveFeed = lastUpdate;
    },
    setCurrentScheduleDate(state, currentDate) {
      state.currentScheduleDate = currentDate;
    },
  },
  actions: {
    loadGames({ commit }) {
      // tslint:disable-next-line:max-line-length
      axios.get(`https://statsapi.mlb.com/api/v1/schedule?sportId=1&sortBy=gameDate&hydrate=game(content(summary,media(epg))),linescore(runners),flags,team,review`)
        .then((response: any) => {
          commit('setGames', response.data.dates[0].games);
          commit('setCurrentScheduleDate', response.data.dates[0].date);
        });
    },
    loadTeams({ commit }) {
      axios.get('https://statsapi.mlb.com/api/v1/teams?sportId=1')
        .then((response: any) => {
          commit('setTeams', response.data.teams);
        });
    },
    loadGameLiveFeed({ commit }, { gamePk }) {
      axios.get(`https://statsapi.mlb.com/api/v1.1/game/${gamePk}/feed/live`)
        .then((response: any) => {
          commit('setGameLiveFeed', response.data.gameData);
          commit('setLastUpdateTimestampLiveFeed', response.data.metadata.timeStamp);
        });
    },
    loadGameBoxscore({ commit }, { gamePk }) {
      axios.get(`https://statsapi.mlb.com/api/v1.1/game/${gamePk}/boxscore`)
        .then((response: any) => {
          commit('setGameBoxscore', response.data);
        });
    },
    loadGameLinescore({ commit }, { gamePk }) {
      axios.get(`https://statsapi.mlb.com/api/v1.1/game/${gamePk}/linescore`)
        .then((response: any) => {
          commit('setGameLinescore', response.data);
        });
    },
  },
  getters: {
    getTeamById: (state) => (teamId: number) => {
      return state.teams.find((team: any) => team.id === teamId);
    },
  },
});

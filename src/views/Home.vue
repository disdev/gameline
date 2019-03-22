<template>
  <div>
    <b-row>
      <b-col cols="12">
        <h4>Games for {{ currentDate }}</h4>
      </b-col>
    </b-row>
    <b-row v-if="games && teams">
      <b-col cols="6" md="4" lg="2" v-for="game in games" :key="game.pk">
        <GameListing :game="game" />
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State, Action, Getter } from 'vuex-class';
import GameListing from '@/components/GameListing.vue';
import moment from 'moment';

@Component({
  components: {
    GameListing,
  },
})
export default class Home extends Vue {
  @State('games') private games: any;
  @State('teams') private teams: any;
  @State('currentScheduleDate') private currentScheduleDate: any;

  @Action('loadGames') private loadGames: any;
  @Action('loadTeams') private loadTeams: any;

  get currentDate() {
    return moment(this.currentScheduleDate, 'YYYY-MM-DD').format('dddd, MMMM Do');
  }

  private mounted() {
    this.loadGames();
    this.loadTeams();

    setInterval(this.loadGames, 30000);
  }
}
</script>

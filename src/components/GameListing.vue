<template>
  <b-card footer-tag="footer" style="max-width: 20rem;" class="mb-2">
    <b-card-text>
      <b-row>
        <b-col>
          {{ game.teams.away.team.abbreviation }}
        </b-col>
        <b-col class="text-right">
          {{ game.teams.away.score }}
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          {{ game.teams.home.team.abbreviation }}
        </b-col>
        <b-col class="text-right">
          {{ game.teams.home.score }}
        </b-col>
      </b-row>
      <b-row>
        <b-col class="text-center font-italic">
          <b-link v-if="game.status.statusCode === 'I' || game.status.statusCode === 'F'">{{ gameByline }}</b-link>
          <span v-if="game.status.statusCode === 'S' || game.status.statusCode === 'P'">{{ gameByline }}</span>
        </b-col>
      </b-row>
    </b-card-text>
  </b-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { State, Action, Getter } from 'vuex-class';
import moment from 'moment';

@Component
export default class GameListing extends Vue {
  @Prop() public game!: any;
  @State('games') private games: any;
  @Getter('getTeamById') private getTeamById: any;

  get gameByline() {
    console.log(this.game.status);
    if (this.game.status.statusCode === 'P' || this.game.status.statusCode === 'S') {
      return moment(this.game.gameDate).format('LT');
    } else if (this.game.statusCode === 'F') {
      return this.game.status.detailedState;
    } else {
      return `${this.game.linescore.inningState} ${this.game.linescore.currentInningOrdinal}`;
    }
  }

  private mounted() {
    // this.homeTeam = this.getTeamById(this.game.teams.home.team.id);
    // this.awayTeam = this.getTeamById(this.game.teams.away.team.id);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

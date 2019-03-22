<template>
  <b-card style="max-width: 20rem;" class="mb-2">
    <b-card-text>
      <b-row>
        <b-col>
          {{ awayTeam.abbreviation }}
        </b-col>
        <b-col>
          {{ game.teams.away.score }}
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          {{ homeTeam.abbreviation }}
        </b-col>
        <b-col>
          {{ game.teams.home.score }}
        </b-col>
      </b-row>
    </b-card-text>
  </b-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { State, Action, Getter } from 'vuex-class';

@Component
export default class GameListing extends Vue {
  @Prop() public game!: any;
  @State('games') private games: any;
  @Getter('getTeamById') private getTeamById: any;

  get awayTeam() {
    return this.getTeamById(this.game.teams.away.team.id);
  }

  get homeTeam() {
    return this.getTeamById(this.game.teams.home.team.id);
  }

  private mounted() {
    // this.homeTeam = this.getTeamById(this.game.teams.home.team.id);
    // this.awayTeam = this.getTeamById(this.game.teams.away.team.id);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
dt {
  display: inline;
}

dd {
  display: inline;
  margin-left: 12px;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

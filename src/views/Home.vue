<template>
  <b-row v-if="games">
    <b-col cols="6" md="4" lg="2" v-for="game in games" :key="game.pk">
      <GameListing :game="game" />
    </b-col>
  </b-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State, Action, Getter } from 'vuex-class';
import GameListing from '@/components/GameListing.vue';

@Component({
  components: {
    GameListing,
  },
})
export default class Home extends Vue {
  @State('games') private games: any;

  @Action('loadGames') private loadGames: any;
  @Action('loadTeams') private loadTeams: any;

  private mounted() {
    this.loadGames();
    this.loadTeams();

    setInterval(this.loadGames, 30000);
  }
}
</script>

<template>
  <div v-if="gameLiveFeed">
    <Linescore
      :linescore="gameLiveFeed.liveData.linescore"
      :away="gameLiveFeed.gameData.teams.away.abbreviation"
      :home="gameLiveFeed.gameData.teams.home.abbreviation" />
    <Plays :plays="gameLiveFeed.liveData.plays.allPlays" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State, Action, Getter } from 'vuex-class';
import moment from 'moment';

import Linescore from '@/components/Linescore.vue';
import Plays from '@/components/Plays.vue';

@Component({
  components: {
    Linescore,
    Plays
  },
})
export default class Game extends Vue {
  @State('gameLiveFeed') private gameLiveFeed: any;
  @State('lastUpdateTimestampLiveFeed') private lastUpdateTimestampLiveFeed: any;

  @Action('loadGameLiveFeed') private loadGameLiveFeed: any;
  @Action('loadGameDiffPatch') private loadGameDiffPatch: any;

  private mounted() {
    this.loadGameLiveFeed(this.$route.params.id);
    setInterval(() => {
      this.loadGameDiffPatch({
        gamePk: this.$route.params.id,
        timecode: this.lastUpdateTimestampLiveFeed
      });
      console.log('updated game feed');
    }, 15000);
  }
}
</script>

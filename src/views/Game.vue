<template>
  <div v-if="gameLiveFeed">
    <Linescore
      :linescore="gameLiveFeed.liveData.linescore"
      :away="gameLiveFeed.gameData.teams.away.abbreviation"
      :home="gameLiveFeed.gameData.teams.home.abbreviation" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State, Action, Getter } from 'vuex-class';
import moment from 'moment';

import Linescore from '@/components/Linescore.vue';

@Component({
  components: {
    Linescore,
  },
})
export default class Game extends Vue {
  @State('gameLiveFeed') private gameLiveFeed: any;
  @State('lastUpdateTimestampLiveFeed') private lastUpdateTimestampLiveFeed: any;

  @Action('loadGameLiveFeed') private loadGameLiveFeed: any;

  private mounted() {
    this.loadGameLiveFeed(this.$route.params.id);
    setTimeout(this.loadGameLiveFeed(this.$route.params.id), 15000);
  }
}
</script>

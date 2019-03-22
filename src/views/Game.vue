<template>
  <div>
    <h4>This is the game route</h4>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State, Action, Getter } from 'vuex-class';
import moment from 'moment';

@Component
export default class Game extends Vue {
  @State('gameLiveFeed') private gameLiveFeed: any;
  @State('gameBoxscore') private gameBoxscore: any;
  @State('gameLinescore') private gameLinescore: any;
  @State('lastUpdateTimestampLiveFeed') private lastUpdateTimestampLiveFeed: any;

  @State('currentScheduleDate') private currentScheduleDate: any;

  @Action('loadGameLiveFeed') private loadGameLiveFeed: any;
  @Action('loadGameBoxscore') private loadGameBoxscore: any;
  @Action('loadGameLinescore') private loadGameLinescore: any;

  private mounted() {
    this.loadGameLiveFeed(this.$route.params.id);
    //this.loadGameBoxscore(this.$route.params.id);
    //this.loadGameLinescore(this.$route.params.id);

    setTimeout(this.loadGameLiveFeed(this.$route.params.id), 15000);
    //setTimeout(this.loadGameBoxscore(this.$route.params.id), 15000);
    //setTimeout(this.loadGameLinescore(this.$route.params.id), 15000);
  }
}
</script>

<template>
  <b-card v-if="linescore">
    <b-table id="linescore-table" hover :items="linescoreData" :fields="linescoreFields" class="text-center" />
  </b-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { State, Action, Getter } from 'vuex-class';

@Component
export default class Linescore extends Vue {
  @Prop() public home!: string;
  @Prop() public away!: string;
  @Prop() public linescore!: any;

  get linescoreFields() {
    const output: any = [];

    output.push({
      key: 'team',
      label: 'Team',
    });

    this.linescore.innings.forEach((inning: any) => {
      output.push({
        key: `${inning.num}`,
        label: `${inning.num}`,
      });
    });

    output.push({
      key: 'runs',
      label: 'Runs',
    });

    output.push({
      key: 'hits',
      label: 'Hits',
    });

    output.push({
      key: 'errors',
      label: 'Errors',
    });
    
    return output;
  }

  get linescoreData() {
    const output: any = [];

    const awayRow: any = {};
    const homeRow: any = {};

    awayRow.team = this.away;
    homeRow.team = this.home;

    this.linescore.innings.forEach((inning: any) => {
      awayRow[`${inning.num}`] = inning.away.runs;
      homeRow[`${inning.num}`] = inning.home.runs;
    });

    awayRow.runs = this.linescore.teams.away.runs;
    awayRow.hits = this.linescore.teams.away.hits;
    awayRow.errors = this.linescore.teams.away.errors;
    homeRow.runs = this.linescore.teams.home.runs;
    homeRow.hits = this.linescore.teams.home.hits;
    homeRow.errors = this.linescore.teams.home.errors;

    output.push(awayRow);
    output.push(homeRow);
    
    return output;
  }

  private created() {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

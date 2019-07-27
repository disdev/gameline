<template>
  <b-card>
    <p v-for="play in plays">
      {{ play.result.description }}
    </p>
  </b-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { State, Action, Getter } from 'vuex-class';
import moment from 'moment';

@Component
export default class Plays extends Vue {
  @Prop() public plays!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

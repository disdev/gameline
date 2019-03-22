<template>
  <b-container>
    <router-view/>
  </b-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Action, Getter } from 'vuex-class';

export default class App extends Vue {}
</script>

<style>
</style>

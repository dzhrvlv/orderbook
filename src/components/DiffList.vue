<template>
  <v-container fluid class="overflow-auto">
    <v-row>
      <v-col>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on">
              Symbol = {{ currentSymbol }}
            </v-btn>
          </template>
          <v-list>
            <v-list-item-group v-model="currentSymbolIndex">
              <v-list-item v-for="(item, index) in symbols" :key="index">
                <v-list-item-title>{{ item }}</v-list-item-title>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
    <v-divider class="my-1"></v-divider>
    <v-row class=" align-center">
      <v-col fluid class="mx-auto ">
        <v-lazy v-model="isLazyActive" transition="fade-transition">
          <v-responsive height="70vh">
            <v-list class="fill-height overflow-y-auto">
              <v-list-item v-for="(diff, index) in diffs" :key="diff.E">
                <v-list-item-content>
                  <v-list-item-title>Event type: {{ diff.e }}</v-list-item-title>
                  <v-list-item-subtitle>Event time: {{ diff.E }}</v-list-item-subtitle>
                  <v-list-item-subtitle>Symbol: {{ diff.s }}</v-list-item-subtitle>
                  <v-list-item-subtitle>First update ID: {{ diff.U }}</v-list-item-subtitle>
                  <v-list-item-subtitle>Final update ID: {{ diff.u }}</v-list-item-subtitle>
                  <v-list-item-subtitle>Bids: {{ diff.b.length }}</v-list-item-subtitle>
                  <v-list-item-subtitle>Asks: {{ diff.a.length }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-responsive>
        </v-lazy>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "DiffList",
  data: () => ({
    symbols: ["BTCUSDT", "BNBBTC", "ETHBTC"],
    currentSymbol: "BTCUSDT",
    currentSymbolIndex: 0,
    diffs: [],
    isLazyActive: false
  }),
  watch: {
    currentSymbolIndex(index) {
      console.log(index)
      if (this.currentSymbol !== this.symbols[index]) {
        this.currentSymbol = this.symbols[index]
        this.diffs = []
        this.$bus.$emit('changeSymbol', this.currentSymbol);
      }
    },
  },
  created() {
    this.$bus.$on("changeDiff", diff => {
      this.diffs = [...this.diffs, diff]
    })
  }
};
</script>

<style scoped>

</style>

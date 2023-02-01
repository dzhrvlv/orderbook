<template>
    <v-container fluid class="overflow-auto">
        <v-row class="mt-0">
            <v-col class="py-0">
                <p class="font-weight-medium"> Symbol: <span class="font-weight-bold">{{ symbol }}</span></p>
            </v-col>
        </v-row>

        <v-row class="" v-if="snapshot">
            <v-col class="pt-0">
                <MyTable :items="snapshot.bids">
                    <p class="font-weight-medium ma-0">Bids:</p>
                </MyTable>
            </v-col>
            <v-col class="pt-0">
                <MyTable :items="snapshot.asks">
                    <p class="font-weight-medium ma-0">Asks:</p>
                </MyTable>
            </v-col>
        </v-row>
    </v-container>

</template>

<script>
import MyTable from "./MyTable.vue";
export default {
    name: "DepthState",
    components: { MyTable },
    data: () => ({
        snapshot: {
            asks: null,
            bids: null,
            lastUpdateId: null
        },
        symbol: "BTCUSDT",
        lastDiff: null,
        ws: null
    }),
    created() {
        this.wsSubscribe();
        this.$bus.$on("changeSymbol", symbol => {
            console.log("CHANGE SYMBOL", symbol)
            this.symbol = symbol;
            this.lastDiff = null
            this.ws.close();
            console.log(this.ws)
            this.wsSubscribe();
        });

    },
    destroyed() {
        this.ws.close();
        this.lastDiff = null
    },
    methods: {
        async getSnapshot() {
            let snapshot = await this.$sdk.get(this.symbol, 500);
            console.log("SNAPSHOT: ", snapshot)
            this.snapshot = {
                asks: snapshot.asks.reverse(),
                bids: snapshot.bids.reverse(),
                lastUpdateId: snapshot.lastUpdateId,
            }
            console.log("THIS SNAPSHOT: ", this.snapshot)
        },
        wsSubscribe() {
            this.getSnapshot();

            console.log("subscribe")
            this.ws = this.$sdk.subscribe(this.symbol);
            this.ws.onmessage = event => {

                let data = JSON.parse(event.data);

                if (data && data.u > this.snapshot.lastUpdateId) {
                    let newDiff = null;
                    if (!this.lastDiff) {
                        if (data.U <= this.snapshot.lastUpdateId + 1) {

                            newDiff = data
                        }
                    }
                    else {
                        if (data.U === this.lastDiff.u + 1) {
                            newDiff = data
                        }
                    }

                    if (newDiff) {
                        newDiff.a = newDiff.a.filter(item => item[1] != 0)
                        newDiff.b = newDiff.b.filter(item => item[1] != 0)

                        this.lastDiff = newDiff
                        this.$bus.$emit("changeDiff", this.lastDiff)
                    }

                }
            };
        }
    },
};
</script>

<style scoped>

</style>

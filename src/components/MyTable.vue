<template>
    <v-card class=" " outlined>
        <v-container class="pr-0 my-class">
            <v-row>
                <v-col>
                    <slot></slot>
                </v-col>
            </v-row>
            <v-row class="mt-0">
                <v-col class="pt-0 scrollbar-gutter overflow-y-hidden">
                    <v-card elevation="0" outlined>
                        <v-container>
                            <v-row>
                                <v-col>
                                    <v-card-title class="pa-0">
                                        {{ "Price" }}
                                    </v-card-title>
                                </v-col>
                                <v-col>
                                    <v-card-title class="pa-0">
                                        {{ "Ammount" }}
                                    </v-card-title>
                                </v-col>
                                <v-col v-if="$vuetify.breakpoint.mdAndUp">
                                    <v-card-title class="pa-0">
                                        {{ "Total" }}
                                    </v-card-title>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card>
                </v-col>
            </v-row>
            <v-row class="" dense>
                <v-col class="">
                    <v-lazy v-model="isLazyActive" transition="fade-transition">
                        <v-responsive class="scrollbar-gutter " :max-height="tableHeight" :class="[
                    $vuetify.breakpoint.xs
                        ? 'overflow-y-auto'
                        : (scrollVisible
                            ? 'overflow-y-auto'
                            : 'overflow-y-hidden'
                        )]" @mouseover="scrollVisible = true" @mouseleave="scrollVisible = false">
                            <v-container class=" " fluid>
                                <v-row v-for="(item, index) in items" :key="item[0]">
                                    <v-col class="pa-0">
                                        <v-card elevation="1" outlined class=" pa-0 mb-1">
                                            <v-container class=" ">
                                                <v-row class="flex-nowrap">
                                                    <v-col>
                                                        <v-card-text class="pa-0">
                                                            {{ item[0] }}
                                                        </v-card-text>
                                                    </v-col>
                                                    <v-col>
                                                        <v-card-text class="pa-0">
                                                            {{ item[1] }}
                                                        </v-card-text>
                                                    </v-col>
                                                    <v-col v-if="!$vuetify.breakpoint.xs && !$vuetify.breakpoint.sm">
                                                        <v-card-text class="pa-0">
                                                            {{ (item[0] * item[1]).toFixed(8) }}
                                                        </v-card-text>
                                                    </v-col>
                                                </v-row>
                                            </v-container>
                                        </v-card>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-responsive>
                    </v-lazy>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
export default {
    name: "MyTable",
    props: {
        items: {
            type: Array
        }
    },
    data() {
        return {
            headers: [
                {
                    text: "Price",
                },
                {
                    text: "Ammount",
                },
                {
                    text: "Total",
                },
            ],
            scrollVisible: false,
            isLazyActive: false
        }
    },
    computed: {
        tableHeight() {
            switch (this.$vuetify.breakpoint.name) {
                case 'xs': return '25vh'
                case 'sm': return '30vh'
                case 'md': return '55vh'
                case 'lg': return '60vh'
                case 'xl': return '70vh'
            }
        },
    }
}
</script>

<style scoped>
.my-class {
    box-sizing: border-box;
    max-height: 100%;
    height: auto
}

.scrollbar-gutter {
    scrollbar-gutter: stable !important;
}
</style>

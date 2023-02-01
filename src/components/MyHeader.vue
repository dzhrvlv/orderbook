<template>
    <v-app-bar app color="primary">
        <v-app-bar-nav-icon @click="switchDrawer()"></v-app-bar-nav-icon>
        <v-toolbar-title>
            <slot></slot>
        </v-toolbar-title>
    </v-app-bar>
</template>

<script>
export default {
    props: ['drawer',],
    name: 'MyHeader',
    data: () => ({

    }),
    methods: {
        switchTab(tab) {
            this.$emit('switchTab', tab)
        },
        switchDrawer() {
            this.$emit("switchDrawer", !this.drawer)
        }
    },
};
</script>

<style scoped>

</style>
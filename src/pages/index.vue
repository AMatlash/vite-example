<template>
    [Index page] {{ store.state.count }}
</template>

<script lang="ts">
    import { useStore } from '~/store';

    export default {
        setup () {
            const store = useStore();
            console.log(store);
            store.commit('increment', '120');
            console.log(store.state.count);
            return { store };
        }
    };
</script>

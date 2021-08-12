<template>
    <div>
        <nav class="flex justify-center w-full">
            <button
                v-for="(tab, index) in tabs"
                :key="index"
                class="h-10 w-1/2 font-bold"
                :class="{
                    'bg-blue-600 text-white': tab.value === currentTab,
                    'bg-gray-300 text-gray-700': tab.value !== currentTab
                }"
                @click="handleSelectTab(tab)"
            >
                {{ tab.name.value }}
            </button>
        </nav>
    </div>
    <section>
        <slot :name="currentTab"/>
    </section>
</template>

<script lang="ts">
    export interface iTab {
        name: ComputedRef<string>,
        value: string
    }
</script>

<script setup lang="ts">
    import { ComputedRef, ref } from 'vue';

    interface Props {
        tabs: iTab[]
    }

    const props = defineProps<Props>();

    const currentTab = ref(props.tabs[0].value);
    const handleSelectTab = (tab: iTab) => {
        currentTab.value = tab.value;
    };
</script>

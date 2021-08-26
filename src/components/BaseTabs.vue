<template>
    <div>
        <nav class="flex justify-center w-full">
            <button
                v-for="(tab, index) in tabs"
                :key="index"
                class="h-10 w-1/2 font-bold"
                :class="{
                    'bg-blue-600 text-white': tab.name === currentTab,
                    'bg-gray-300 text-gray-700': tab.name !== currentTab
                }"
                @click="handleSelectTab(tab)"
            >
                {{ tab.title.value }}
            </button>
        </nav>
    </div>
    <section>
        <slot :name="currentTab"/>
    </section>
</template>

<script lang="ts">
    export interface iTab {
        title: ComputedRef<string>,
        name: string
    }
</script>

<script setup lang="ts">
    import { ComputedRef } from 'vue';

    const props = defineProps<{
        tabs: iTab[],
        currentTab: string
    }>();
    const emit = defineEmits<{
        (e: 'update:currentTab', tabName: string): string
    }>();

    const handleSelectTab = (tab: iTab) => {
        emit('update:currentTab', tab.name);
    };
</script>

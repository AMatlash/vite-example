<template>
    <div>
        <nav class="flex justify-center w-full h-auto">
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
        <section class="relative">
            <transition :name="transitionName">
                <div :key="currentTab" class="w-full">
                    <slot :name="currentTab"/>
                </div>
            </transition>
        </section>
    </div>
</template>

<script lang="ts">
    export interface iTab {
        title: ComputedRef<string>,
        name: string
    }
</script>

<script setup lang="ts">
    import { computed, ComputedRef, ref } from 'vue';
    import { Transitions } from '~/types';

    const props = defineProps<{
        tabs: iTab[],
        currentTab: string
    }>();
    const emit = defineEmits<{
        (e: 'update:currentTab', tabName: string): string
    }>();

    const tabNames = computed(() => props.tabs.map(({ name }) => name));
    const transitionName = ref(Transitions.none);

    const handleSelectTab = (tab: iTab) => {
        const currrentIndex = tabNames.value.indexOf(props.currentTab);
        const newIndex = props.tabs.indexOf(tab);
        if (newIndex > currrentIndex) {
            transitionName.value = Transitions.slideLeft;
        } else {
            transitionName.value = Transitions.slideRight;
        }
        emit('update:currentTab', tab.name);
    };
</script>

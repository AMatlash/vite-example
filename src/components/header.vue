<template>
    <header class="relative h-14 py-3 px-10 bg-blue-500 text-white">
        <mdi:arrow-left-bold
            v-if="showBackIcon"
            class="absolute top-3 left-2 w-8 h-8 inline drop-shadow-xl"
            @click="handleGoBack()"
        />
        <div class="h-full w-full flex items-center justify-center">
            <p class="text-xl font-bold uppercase drop-shadow-sm">
                {{ title }}
            </p>
        </div>
        <mdi:plus-circle
            v-if="showAddIcon"
            class="absolute top-3 right-2 w-8 h-8 inline drop-shadow-xl"
            @click="handleAdd()"
        />
    </header>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { useI18n } from 'vue-i18n';
    import { ROUTER_PATHS } from '~/router';
    
    const { t } = useI18n();

    const title = ref(t('header.default'));
    const showBackIcon = ref(false);
    const showAddIcon = ref(false);

    const backPath = ref(ROUTER_PATHS.null);
    backPath.value = ROUTER_PATHS.makePayment;

    const handleGoBack = () => {
        /* console.log('handleGoBack'); */
    };
    const handleAdd = () => {
        /* console.log('handleAdd'); */
    };
</script>

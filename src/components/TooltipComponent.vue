<script setup lang="ts">
import { ref, nextTick } from "vue";

const props = defineProps({
    content: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
});

const isVisible = ref(false);
const tooltipRef = ref<HTMLElement | null>(null);
let hideTimeout: ReturnType<typeof setTimeout> | null = null;

function showTooltip() {
    if (hideTimeout) {
        clearTimeout(hideTimeout);
        hideTimeout = null;
    }
    isVisible.value = true;
    nextTick(() => {
        adjustTooltipPosition();
    });
}

function hideTooltip() {
    hideTimeout = setTimeout(() => {
        isVisible.value = false;
    }, 0);
}

function adjustTooltipPosition() {
    const tooltip = tooltipRef.value;
    if (tooltip) {
        const rect = tooltip.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        if (rect.right > viewportWidth) {
            tooltip.style.left = `calc(100% - ${rect.width}px)`;
        }
        if (rect.bottom > viewportHeight) {
            tooltip.style.top = `calc(100% - ${rect.height}px)`;
        }
    }
}
</script>

<template>
    <div class="relative inline-block">
        <img
            src="/assets/components/product-widget/tooltip.svg"
            alt="Tooltip"
            @mouseenter="showTooltip"
            @mouseleave="hideTooltip"
        />

        <Transition name="fade">
            <div
                ref="tooltipRef"
                @mouseenter="showTooltip"
                @mouseleave="hideTooltip"
                v-show="isVisible"
                class="absolute z-10 bg-white text-gray px-4 py-6 shadow-lg w-[248px] rounded-[4px] text-center"
                :style="{ top: 'calc(100% + 15px)', left: '50%', transform: 'translateX(-50%)' }"
            >
                <p class="text-sm text-gray leading-[17px]">{{ props.content }}</p>
                <a class="text-green text-sm font-bold mt-3 block" :href="props.link" target="_blank">View Public Profile</a>
            </div>
        </Transition>
    </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s ease-in-out;
}
.fade-enter-from, .fade-leave-to {
    transition: opacity 0.3s ease-in-out;
    opacity: 0;
}
</style>
<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue';

const props = defineProps<{
    modelValue: string,
    name: string,
    id: string,
    color: string,
}>();

const emit = defineEmits(['update:modelValue']);

const isChecked = ref(props.modelValue === props.color);

watch(() => props.modelValue, (newValue) => {
    isChecked.value = newValue === props.color;
});

function selectColor() {
    emit('update:modelValue', props.color);
}
</script>

<template>
    <div class="relative">
        <input type="radio" :id="props.id" :name="props.name" class="hidden" :value="props.color" :checked="isChecked" @change="selectColor">
        <label :for="props.id" :class="['color-check-label', `bg-${props.color}`, { 'checked': isChecked }]"></label>
    </div>
</template>

<style scoped>
.color-check-label {
    display: inline-block;
    width: 16px;
    height: 16px;
    box-sizing: border-box;
    border: 1.5px solid transparent;
    border-radius: 0;
    cursor: pointer;
    transition: opacity 0.2s, border-color 0.2s;
}
.color-check-label:hover {
    opacity: 0.8;
}
.color-check-label.checked {
    border-color: #B0B0B0;
}
.hidden {
    position: absolute;
    opacity: 0;
    pointer-events: none;
}
</style>
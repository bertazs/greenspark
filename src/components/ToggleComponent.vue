<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue';

const props = defineProps<{
    modelValue: boolean,
    id: string,
}>();

const emit = defineEmits(['update:modelValue', 'toggle']);

const isChecked = ref(props.modelValue);

watch(() => props.modelValue, (newValue) => {
    isChecked.value = newValue;
});

function toggleCheckbox() {
    isChecked.value = !isChecked.value;
    emit('update:modelValue', isChecked.value);
    emit('toggle', isChecked.value);
}
</script>

<template>
    <div class="relative flex items-center">
        <input type="checkbox" :id="props.id" value="checkbox" class="hidden" @click="toggleCheckbox">
        <label :for="props.id" class="border border-light-green toggle-label" :class="{'!bg-green !border-[#B0B0B0]': isChecked}">
            <span class="border border-beige toggle-button" :class="{'!border-green !left-[20px]': isChecked}"></span>
            <span class="hover-state bg-light-green" :class="{'!left-[13px]': isChecked}"></span>
        </label>
    </div>
</template>

<style scoped>
.hidden {
    position: absolute;
    opacity: 0;
    pointer-events: none;
}
.toggle-label {
    display: inline-block;
    width: 42px;
    height: 22px;
    box-sizing: border-box;
    background-color: #F9F9F9;
    border-radius: 25px;
    position: relative;
    cursor: pointer;
    z-index: 2;
    transition: background-color 0.2s;
    box-shadow: 0px 1.03px 6.84px 0px #00000026 inset;
}
.toggle-button {
    display: inline-block;
    width: 22px;
    height: 22px;
    background-color: #F9F9F9;
    border-radius: 50%;
    position: absolute;
    box-sizing: border-box;
    top: -1px;
    left: -1px;
    z-index: 3;
    transition: border 0.2s, left 0.2s;
    box-shadow: 0px 0px 1.37px 0px #00000059;
}
.hover-state {
    display: inline-block;
    width: 36.4px;
    height: 36.4px;
    border-radius: 25px;
    position: absolute;
    opacity: 0;
    top: -8px;
    left: -8px;
    z-index: 1;
    transition: opacity 0.2s, left 0.2s;
}
.toggle-label:hover .hover-state {
    opacity: 0.5;
}
</style>
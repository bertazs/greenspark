<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue';

const props = defineProps<{
    modelValue: boolean,
    id: string,
}>();

const emit = defineEmits(['update:modelValue']);

const isChecked = ref(props.modelValue);

watch(() => props.modelValue, (newValue) => {
    isChecked.value = newValue;
});

function toggleCheckbox() {
    isChecked.value = !isChecked.value;
    emit('update:modelValue', isChecked.value);
}
</script>

<template>
    <div class="relative flex items-center">
        <input type="checkbox" :id="props.id" class="hidden" @click="toggleCheckbox">
        <label :for="props.id" class="checkbox-label" :class="{'checked': isChecked}">
            <span class="hover-bg bg-light-green"></span>
        </label>
    </div>
</template>

<style scoped>
.checkbox-label {
    display: inline-flex;
    position: relative;
    cursor: pointer;
    width: 18px;
    height: 18px;
    background: url("/assets/components/checkbox/unchecked.svg") no-repeat center center;
    background-size: cover;
    border-radius: 4px;
    transition: background-image 0.2s ease-in-out;
}
.checkbox-label .hover-bg {
    width: 37.26px;
    height: 37.26px;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: opacity 0.2s;
}
.checkbox-label:hover .hover-bg {
    opacity: 0.5;
}
.checkbox-label.checked {
    background-image: url("/assets/components/checkbox/checked.svg");
}
.hidden {
    position: absolute;
    opacity: 0;
    pointer-events: none;
}
</style>
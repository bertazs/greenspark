<script setup lang="ts">
import { ref, onMounted } from 'vue';
import BasicLayout from "@/layouts/BasicLayout.vue";
import {useProductStore} from "@/stores/product";
import CheckboxComponent from "@/components/CheckboxComponent.vue";
import ToggleComponent from "@/components/ToggleComponent.vue";
import ColorCheckComponent from "@/components/ColorCheckComponent.vue";
import ProductWidget from "@/components/ProductWidget.vue";

const isLoading = ref(true);
const productStore = useProductStore();

async function init() {
    try {
        await productStore.getAll();
    } catch (error) {
        console.error("An error occurred while initializing: ", error);
    } finally {
        isLoading.value = false;
    }
}

onMounted(() => {
    init();
});

const isChecked = ref(false);
</script>

<template>
    <BasicLayout>
            <div class="lg:min-h-screen w-full flex md:justify-center md:items-center px-[22px] pt-12 pb-[67px]">
                <div class="max-w-[851px] w-full shadow-xl rounded-[8px] bg-[#F9F9F9] max-sm:pb-12 py-9 px-4 xs:px-7 sm:p-9 min-h-[419px]">
                    <div class="mx-auto max-sm:max-w-[265px] w-full">
                        <h1 class="text-gray text-center lg:text-left font-bold text-2xl xs:text-3xl leading-[36px]">Per Product Widgets</h1>
                        <div class="w-full h-[2px] bg-[#B0B0B0] mt-3 mb-5"></div>
                        <Transition name="fade">
                            <div v-show="!isLoading" class="flex justify-center lg:justify-between gap-10 flex-wrap">
                                <ProductWidget :product="product" v-for="product in productStore.products" :key="product.id"/>
                            </div>
                        </Transition>
                    </div>
                </div>
            </div>
    </BasicLayout>
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
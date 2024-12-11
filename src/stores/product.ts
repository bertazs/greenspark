import { defineStore } from 'pinia'
import type { Product } from '@/types/product'
import ProductService from "@/services/ProductService";

interface ProductState {
    products: Product[],
}

interface ProductActions {
    getAll(): void,
    filterActivations(): void,
    activateWidget(product: Product): void,
}

export const useProductStore = defineStore<'product', ProductState, {}, ProductActions>('product', {
    state: (): ProductState => ({
        products: [],
    }),
    actions: {
        async getAll() {
            this.products = [];
            const response =  await ProductService.getAll();
            this.products = response.data
            this.filterActivations();
        },
        filterActivations() {
            const lastActive: Product | undefined = this.products.find(product => product.active);
            this.products.forEach(product => {
                if (product.id !== lastActive!.id) {
                    product.active = false;
                }
            });
        },
        activateWidget(product: Product) {
            this.products.forEach(p => {
                p.active = p.id === product.id;
            });
        }
    }
})
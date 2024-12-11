import {axiosGet} from "@/composables/axios";

export default {
    getAll() {
        return axiosGet(`/product-widgets`)
    },
}

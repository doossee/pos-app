<template>
    <v-container>
        <v-sheet color="surface" rounded="xl" class="py-2">
            <v-data-table :items="orders">
                <template #bottom></template>
            </v-data-table>
        </v-sheet>
        <v-col cols="12">
            <!-- <v-pagination v-model="page" @update:modelValue="loadItems" active-color="primary" density="comfortable" variant="flat"
                :length="Math.ceil(count / itemsPerPage)"></v-pagination> -->
        </v-col>
    </v-container>
</template>

<script setup lang="ts">
import { Order } from '@/types'
import { ref, onMounted } from 'vue'
import { getOrders } from '@/api/order'


const orders = ref<Order[]>([])
const handleGetOreds = async () => {
    const { data } = await getOrders()
    orders.value = data.result
}

onMounted(async () => {
    await handleGetOreds()
})
</script>
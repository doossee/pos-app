<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12">
                <v-card rounded="xl" flat>
                    <v-card-text class="pa-1">
                        <v-data-table
                            v-model:items-per-page="itemsPerPage"
                            :page="page"
                            :loading="loading"
                            :items-length="count"
                            @update:options="loadItems"
                            density="comfortable"
                            hover
                            :items="items"
                            color="primary"
                            :headers="headers"
                            item-value="id">
                            <template #item.date="{item}">
                                <span>{{ new Date(item.created_at).toLocaleString() }}</span>
                            </template>
                            <template #item.id="{item}">
                                <span>#{{ item.id.toString().padStart(6, '0') }}</span>
                            </template>
                            <template #item.total="{item}">
                                <span>{{ Number(item.total).toLocaleString('en-EN') }} so'm</span>
                            </template>
                            <template #bottom></template>
                        </v-data-table>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12">
                <v-pagination v-model="page" @update:modelValue="loadItems" active-color="primary" density="comfortable" variant="flat"
                   :length="Math.ceil(count / itemsPerPage)"></v-pagination>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Order } from '@/types';
import { getOrders } from '@/api/order'

const page = ref(1)
const count = ref(0);
const loading = ref(true);
const itemsPerPage = ref(25)
const items = ref<Order[]>([])
const headers = ref([
    { title: 'ID', key: 'id', sortable: false },
    { title: 'Buyurtma narxi', key: 'total', sortable: false },
    { title: 'Stol Raqami', key: 'table', sortable: false },
    { title: 'Sana/Vaqt', key: 'date', sortable: false },
])
const loadItems =  async () => {
    loading.value = true
    const { data } = await getOrders({
        page: page.value,
        limit: itemsPerPage.value
    })
    items.value = data.result
    count.value = data.total
    loading.value = false
}
</script>
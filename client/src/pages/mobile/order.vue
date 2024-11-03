<template>
    <v-navigation-drawer temporary v-model="drawer" location="right">
        <v-card rounded="xl" flat class="mt-2">
            <div class="pl-4">
                <v-text-field v-model="table" min="0" max-width="230" type="number" hide-details variant="outlined" placeholder="Stol Raqami" flat density="compact" color="primary" rounded="xl" />
            </div>
            <v-card-title>Buyurtma yaratish</v-card-title>
            <v-card-text class="pb-0">
                <v-list>
                    <span class="text-grey text-subtitle-1" v-show="store.getCart.length==0">Bo'sh</span>
                    <template v-for="c in store.getCart" :key="c.id">
                        <v-list-item class="px-0">
                            <v-list-item-title>{{ c.name }}</v-list-item-title>
                            <v-list-item-subtitle>{{ c.price }} so'm x {{ c.quantity }} = {{ Number(c.price * c.quantity!).toLocaleString('en-EN') }} so'm</v-list-item-subtitle>
                        </v-list-item>
                        <v-divider />
                    </template>
                </v-list>
            </v-card-text>
            <v-card-text>
                Jami: {{ Number(store.getCartTotal).toLocaleString('en-EN') }} so'm
            </v-card-text>
            <v-card-actions class="pb-3">
                <div class="d-flex ga-10 flex-column w-100">
                    <v-btn @click="handleCreateOrder" :disabled="store.getCart.length<=0||table===null" rounded color="primary" variant="elevated" class="w-100" block flat>Yaratish</v-btn>
                    <v-btn @click="store.clearCart" :disabled="store.getCart.length<=0" rounded color="primary" variant="outlined" class="w-100" block flat>Tozalash</v-btn>
                </div>
            </v-card-actions>
        </v-card>
    </v-navigation-drawer>
    <v-app-bar flat color="background" height="140">
        <v-container>
            <div class="d-flex ga-2 align-center justify-space-between mb-4">
                <span></span>
                <v-badge :color="store.getCart.length===0?'transparent':'primary'" text-color="white">
                    <template #badge>
                        {{store.getCart.length || ''}}
                    </template>
                    <v-btn @click="drawer=true" icon="mdi-cart-variant" color="surface" variant="flat"></v-btn>
                </v-badge>
            </div>
            <div>
                <v-sheet rounded="xl" width="100%" color="surface" class="overflow-hidden" height="50" elevation="0">
                    <v-slide-group :show-arrows="false" mandatory v-model="category">
                        <v-slide-group-item v-for="cy,n in categories" :value="cy.name":key="n" v-slot="{ isSelected, toggle }">
                            <v-btn v-show="groups[cy.name]?.length>0" class="ma-2 text-body-2" rounded variant="flat" :color="isSelected ? 'primary' : undefined" @click="toggle">
                                <v-avatar size="20" rounded class="mr-2">
                                    <v-img cover :src="cy.image||'/nophoto.jpg'"></v-img>
                                </v-avatar>
                                {{ cy.name }} ({{ groups[cy.name]?.length }})
                            </v-btn>
                        </v-slide-group-item>
                    </v-slide-group>
                </v-sheet>
            </div>
        </v-container>
    </v-app-bar>
    <v-container fluid>
        <v-sheet color="surface" rounded="xl" class="py-2">
            <v-data-table :headers="headers" :items="groups[category]||[]">
                <template #headers></template>
                <template #bottom></template>
                <template #item.add="{item: food}">
                    <div class="d-flex align-center ga-3" v-if="store.getCart.some(c => c.id === food.id)">
                        <v-btn size="37" rounded @click="store.removeFromCart(food)" color="primary" variant="flat">
                            <v-icon>mdi-minus</v-icon>
                        </v-btn>
                        <div class="w-100 text-center text-h6 text-primary">
                            {{ store.getCart.find(c => c.id === food.id)?.quantity }}
                        </div>
                        <v-btn size="37" rounded @click="store.addToCart(food)" color="primary" variant="flat">
                            <v-icon>mdi-plus</v-icon>
                        </v-btn>
                    </div>
                    <v-btn v-else rounded @click="store.addToCart(food)" color="primary" variant="flat" block>Qo'shish</v-btn>
                </template>
            </v-data-table>
        </v-sheet>
    </v-container>
    
    <v-dialog :model-value="!!order" max-width="500">
        <v-card rounded="xl" flat>
            <v-card-text class="pb-0 text-primary text-h3">{{ order?.id ? generatedFunction(order?.id) : 'A-00' }}</v-card-text>
            <v-card-text class="pt-0">Buyurtma raqami: #{{ (order?.id||0).toString().padStart(6, '0') }}</v-card-text>
            <v-card-text class="pt-0">Buyurtma narxi: {{ Number(order?.total||0).toLocaleString('en-EN') }} so'm</v-card-text>
            <v-card-text class="pt-0">
                <v-table>
                    <tbody>
                        <tr v-for="food,i in order?.orderItems||[]" :key="i">
                            <td>{{ food.food.name }}</td>
                            <td>{{ food.food.price }} x {{ food.quantity }}</td>
                            <td>{{ food.food.price * food.quantity }}</td>
                        </tr>
                    </tbody>
                </v-table>
            </v-card-text>
            <v-card-text class="pt-0">
                <v-btn color="green" rounded flat block @click="order=null">Davom etish</v-btn>
            </v-card-text>
        </v-card>
    </v-dialog>
    <!-- <v-container fluid>
        <v-expansion-panels multiple variant="accordion" flat rounded="xl">
            <v-expansion-panel
                v-for="category,i in categories" :key="i">
                <v-expansion-panel-title>{{ category.name }} ({{ groups[category.name]?.length }})</v-expansion-panel-title>
                <v-expansion-panel-text>
                    <v-row dense>
                        <v-col cols="6" v-for="food in groups[category.name]" :key="food.id">

                            <v-card flat border rounded="xl" class="text-center">
                                <v-card-title class="text-subtitle-1 pb-0">{{ food.name }}</v-card-title>
                                <v-card-title class="text-h6  text-primary my-0 py-0">{{ Number(food.price).toLocaleString('en-EN') }}</v-card-title>
                                <v-card-actions>
                                    <template v-if="store.getCart.some(c => c.id === food.id)">
                                        <v-btn rounded @click="store.removeFromCart(food)" color="primary" variant="flat">
                                            <v-icon>mdi-minus</v-icon>
                                        </v-btn>
                                        <div class="w-100 text-center text-h6">
                                            {{ store.getCart.find(c => c.id === food.id)?.quantity }}
                                        </div>
                                        <v-btn rounded @click="store.addToCart(food)" color="primary" variant="flat">
                                            <v-icon>mdi-plus</v-icon>
                                        </v-btn>
                                    </template>
                                    <v-btn v-else rounded @click="store.addToCart(food)" color="primary" variant="flat" block>Qo'shish</v-btn>
                                </v-card-actions>
                            </v-card>

                        </v-col>
                    </v-row>
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
    </v-container> -->
</template>

<script setup lang="ts">
import { Food } from '@/types'
import { computed, ref } from 'vue'
import { useStore } from '@/stores'
import { getFoods } from '@/api/food'
import { createOrder } from '@/api/order'
import { categories, generatedFunction } from '@/constants'

const store = useStore()
const drawer = ref(false)
const loading = ref(false)
const order = ref<any>(null)
const items = ref<Food[]>([])
const category = ref("Burger")
const table = ref<null|number>(null)


const headers = [
    { title: 'Nomi', key: 'name', sortable: false },
    { title: 'Narxi', key: 'price', sortable: false },
    { title: 'Qo\'shish', key: 'add', sortable: false },
]

const groups = computed(() => {
    const groupBy: { [key: string]: Food[] } = {}

    categories.map(category => {
        groupBy[category.name] = items.value.filter(food => food.category === category.name) 
    })
    
    return groupBy
})

const init = async () => {
    const { data } = await getFoods()
    items.value = data
    
}

const handleCreateOrder = async () => {
    loading.value = true
    const newOrder = {
        table: +table.value!,
        total: store.getCartTotal,
        items: store.getCart.map(({id, quantity})=>({foodId: id, quantity}))
    }
    const { data } = await createOrder(newOrder)
    store.clearCart()
    order.value = data
    table.value = null
    loading.value = false
}

init()
</script>
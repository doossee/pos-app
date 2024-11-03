<template>
    <v-app-bar flat color="background" class="px-2">
        <v-sheet rounded="xl" width="100%" color="white" class="overflow-hidden" height="50" elevation="0">
            <v-slide-group :show-arrows="false" mandatory v-model="category">
                <v-slide-group-item v-for="cy,n in categories" :value="cy.name":key="n" v-slot="{ isSelected, toggle }">
                    <v-btn v-show="groups[cy.name]?.length>0" class="ma-2 text-body-2" rounded variant="flat" :color="isSelected ? 'primary' : undefined" @click="toggle">
                        <v-avatar size="20" rounded class="mr-2">
                            <v-img cover :src="cy.image||'/nophoto.jpg'"></v-img>
                        </v-avatar>
                        {{ cy.name }} ({{ groups[cy.name]?.length }})
                    </v-btn>
                </v-slide-group-item>
                <template #next>
                    <v-btn rounded color="primary" variant="flat" size="40">
                        <AkChevronRight style="width: 20; height: 20;" />
                    </v-btn>
                </template>
                <template #prev>
                    <v-btn rounded color="primary" variant="flat" size="40">
                        <AkChevronLeft style="width: 20; height: 20;" />
                    </v-btn>
                </template>
            </v-slide-group>
        </v-sheet>
    </v-app-bar>
    <v-container fluid>
        <v-row>
            <v-col cols="6" md="8"  style="height: 90vh; overflow: auto;">
                <v-row>
                    <v-col cols="12" md="6" lg="3" class="pa-2" v-for="food,i in groups[category]||[]" :key="i">
                        <v-card rounded="xl" flat>
                            <v-card-text class="pt-3 pb-2 text-center text-body-1 font-weight-medium">{{ food.name }}</v-card-text>
                            <v-card-text class="text-h6 pt-0 pb-1 text-center text-primary">{{ Number(food.price).toLocaleString('en-EN') }} so'm</v-card-text>
                            <v-card-actions>
                                <template v-if="store.getCart.some(c => c.id === food.id)">
                                    <v-btn rounded @click="store.removeFromCart(food)" color="primary" variant="flat">
                                        <ChMinus />
                                    </v-btn>
                                    <div class="w-100 text-center text-h6">
                                        {{ store.getCart.find(c => c.id === food.id)?.quantity }}
                                    </div>
                                    <v-btn rounded @click="store.addToCart(food)" color="primary" variant="flat">
                                        <GlPlus />
                                    </v-btn>
                                </template>
                                <v-btn v-else rounded @click="store.addToCart(food)" color="primary" variant="flat" block>Qo'shish</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="6" md="4" class="pa-2">
                <v-card rounded="xl" flat>
                    <v-card-title>Buyurtma yaratish</v-card-title>
                    <v-card-text class="pb-0">
                        <v-list>
                            <span class="text-grey text-subtitle-1" v-show="store.getCart.length==0">Bo'sh</span>
                            <v-list-item v-for="c,i in store.getCart" :key="i" class="px-0">
                                <v-list-item-title>{{ c.name }}</v-list-item-title>
                                <v-list-item-subtitle>{{ c.price }} so'm x {{ c.quantity }} = {{ Number(c.price * c.quantity!).toLocaleString('en-EN') }} so'm</v-list-item-subtitle>
                            </v-list-item>
                        </v-list>
                    </v-card-text>
                    <v-card-text>
                        Jami: {{ Number(store.getCartTotal).toLocaleString('en-EN') }} so'm
                    </v-card-text>
                    <v-card-actions>
                        <v-btn :loading="loading" @click="create" :disabled="store.getCart.length<=0" rounded color="primary" variant="elevated" block flat>Yaratish</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
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
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStore } from '@/stores'
import { getFoods } from '@/api/food'
import { createOrder } from '@/api/order'
import { create_food } from '@/api/socket'
import { Food, Order, OrderItem } from '@/types'
import { categories, generatedFunction } from '@/constants'
import { GlPlus, ChMinus, AkChevronLeft, AkChevronRight } from '@kalimahapps/vue-icons'

interface IOrder extends Order {
    orderItems: (
        OrderItem &
        { food: Food }
    )[]
}

const store = useStore()
const loading = ref(false)
const items = ref<Food[]>([])
const category = ref("Burger")
const order = ref<IOrder|null>(null)

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

const create = async () => {
    loading.value = true
    const newOrder = {
        table: 1,
        total: store.getCartTotal,
        items: store.getCart.map(({id, quantity})=>({foodId: id, quantity}))
    }
    const { data } = await createOrder(newOrder)
    order.value = data as any
    create_food(data)
    loading.value = false
    store.clearCart()
}

init()
</script>
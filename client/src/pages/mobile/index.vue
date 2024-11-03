<template>
    <v-app>
        <v-main>
            <router-view />
        </v-main>
        <v-bottom-navigation height="70" border flat mode="shift" mandatory>
            <v-row dense>
                <v-col cols="6" class="px-0">
                    <v-btn variant="plain" color="primary" class="w-100" to="/app" exact>
                        <v-icon size="28">mdi-cart-plus</v-icon>
                        <span class="text-subtitle-2">Создать</span>
                    </v-btn>
                </v-col>
                <!-- <v-col cols="4" class="px-0">
                    <v-btn variant="plain" color="primary" class="w-100" to="/app/orders">
                        <v-icon size="28">mdi-list-box</v-icon>
                        <span class="text-subtitle-2">Заказы</span>
                    </v-btn>
                </v-col> -->
                <v-col cols="6" class="px-0">
                    <v-btn variant="plain" color="primary" class="w-100" to="/app/settings">
                        <v-icon size="28">mdi-cog</v-icon>
                        <span class="text-subtitle-2">Настройки</span>
                    </v-btn>
                </v-col>
            </v-row>
        </v-bottom-navigation>
    </v-app>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useStore } from '@/stores'
import { getFoods } from '@/api/food'

const store = useStore()

onMounted(async () => {
    const foods = await getFoods()
    store.setFoods(foods.data)
})
</script>
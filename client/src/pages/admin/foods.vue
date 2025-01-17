<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12" class="d-flex justify-end align-center pb-2">
                <v-btn @click="dialog=true" rounded color="primary" flat>Yaratish</v-btn>
            </v-col>
            <v-col cols="12">
                <v-card rounded="xl" flat>
                    <v-card-text class="px-1">
                        <v-data-table :items="items" :headers="headers" items-per-page="-1">
                            <template #bottom></template>
                            <template #item.actions="{item,index}">
                                <div class="d-flex ga-2">
                                    <v-btn size="40" color="primary" rounded flat @click="editItem(item, index)">
                                        <BxSolidPencil style="width: 20px; height: 20px;" />
                                    </v-btn>
                                    <v-btn size="40" color="primary" rounded flat @click="deleteItem(item.id, index)">
                                        <MdRoundDelete style="width: 20px; height: 20px;" />
                                    </v-btn>
                                </div>
                            </template>
                        </v-data-table>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
    <v-dialog v-model="dialog" max-width="550">
        <v-card>
            <v-card-title>Ovqat yaratish</v-card-title>
            <v-card-text>
                <v-row>
                    <v-col cols="12">
                        <v-text-field color="primary" rounded variant="outlined" flat v-model="item.name" hide-details label="Nomi"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field color="primary" rounded variant="outlined" flat v-model="item.price" hide-details label="Narxi" min="0" type="number"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-select color="primary" rounded variant="outlined" flat v-model="item.category" :items="categories" item-title="name" item-value="name" hide-details label="Kategoriya" clearable>
                            <template #selection="{item}">
                                <span>{{ item.raw.parent }}: {{ item.raw.name }}</span>
                            </template>
                        </v-select>
                    </v-col>
                    <v-col cols="12">
                        <v-btn height="50" @click="save" color="primary" variant="flat" rounded block>Saqlash</v-btn>
                    </v-col>
                </v-row>
            </v-card-text>
            <div class="py-2"></div>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { Food } from '@/types'
import { ref, reactive } from 'vue'
import { categories } from '@/constants'
import { MdRoundDelete, BxSolidPencil } from '@kalimahapps/vue-icons'
import { getFoods, deleteFood, createFood, updateFood } from '@/api/food'

const dialog = ref(false)
const items = ref<Food[]>([])
const createLoading = ref(false)
const itemIndex = ref<number|null>(null)

const headers = [
    { title: "Nomi", key: "name", sortable: false },
    { title: "Narxi", key: "price", sortable: false },
    { title: "Kategoriya", key: "category", sortable: false },
    { title: "Boshqarish", key: "actions", sortable: false },
]

const item = reactive({
    name: "",
    price: 0,
    category: ""
})

const init = async () => {
    const foods = await getFoods()
    items.value = foods.data
}

const editItem = (d: any, index: number) => {
    Object.assign(item, d)
    itemIndex.value = index
    dialog.value = true
}

const deleteItem = async (id: number, index: number) => {
    if(!confirm('Вы хотите удалить это?')) return
    await deleteFood(id)
    items.value.splice(index, 1)
}

const add = async (body: any) => {
    const { data } = await createFood(body)
    items.value.push(data)
}

const update = async (index: number, {id, ...body}: any) => {
    const { data } = await updateFood(id, body)
    
    Object.assign(items.value[index], data)
}

const save = async () => {
    try {
        createLoading.value = true
        if(itemIndex.value !== null)
            await update(itemIndex.value, item)
        else
            await add(item)
        close()
    } catch (error) {
        console.log(error);
    } finally {
        createLoading.value = false
    }
}

const close = () => {
    Object.assign(item, {
        name: "",
        price: 0,
        category: "",
    })
    dialog.value = false
    itemIndex.value = null
}

init()
</script>
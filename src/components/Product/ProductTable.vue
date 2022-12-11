<template>
     <div class="card">
        <div class="card-body">
            <div class="table-responsive">
                <table class="table mb-0">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nome</th>
                            <th>Preço</th>
                            <th>Quantidade</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="product in products"
                            :key="product.id"
                        >
                            <th scope="row">
                                {{ product.id }}
                            </th>
                            <td>{{ product.name }}</td>
                            <td>{{ product.amount }}</td>
                            <td>{{ product.qty }}</td>
                            <td>
                                <ul class="list-inline mb-0">
                                    <li class="list-inline-item">
                                        <a
                                            class="px-2 text-primary"
                                            title="Edit"
                                            @click.stop.prevent="onUpdate(product)"
                                        >
                                            Editar
                                        </a>
                                    </li>

                                    <li class="list-inline-item">
                                        <a
                                            class="px-2 text-danger"
                                            title="Delete"
                                            @click="onDelete(product)"
                                        >
                                            Deletar
                                        </a>
                                    </li>
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'

const props = defineProps({
  products: Array
})
const prod = ref(null);
const emit = defineEmits(['deleteClicked', 'updateClicked']);

function onUpdate(product) {
    emit('updateClicked', product);
};

function onDelete(product) {
    emit('deleteClicked', product);
};
</script>
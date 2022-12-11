<template>
    <div class="col-lg-12">
        <div class="card">
            <div class="card-body">
               <form
                    class="grid gap-6"
                    @submit.stop.prevent="save()"
                >
               <div>
                    <BFormGroup
                            label="Nome do produto"
                            label-for="formrow-name-input"
                            class="mb-3"
                        >
                            <BFormInput
                                id="formrow-name-input"
                                v-model="productLocal.name"
                                type="text"
                            />
                        </BFormGroup>
                </div>

                    <div class="row">
                        <div
                            class="col-md-6"
                        >
                            <BFormGroup
                                label="Preço"
                                label-for="formrow-amount-input"
                                class="mb-3"
                            >
                                <BFormInput
                                    id="formrow-amount-input"
                                    v-model="productLocal.amount"
                                    type="number"
                                />
                            </BFormGroup>
                        </div>

                        <div
                            class="col-md-6"
                        >
                            <BFormGroup
                                label="Quantidade"
                                label-for="formrow-qty-input"
                                class="mb-3"
                            >
                                <BFormInput
                                    id="formrow-qty-input"
                                    v-model="productLocal.qty"
                                    type="number"
                                />
                            </BFormGroup>
                        </div>
                    </div>

                    <div
                        class="mb-3"
                    >
                        <BFormGroup
                            label="Descrição"
                            label-for="formrow-description-input"
                        >
                            <textarea
                                id="formrow-description-input"
                                v-model="productLocal.description"
                                class="form-control"
                                name="description"
                                rows="5"
                            />
                        </BFormGroup>
                    </div>
               </form>
            </div>

            <BAlert
                :show="!!response.message"
                dismissible
                :variant="response.variant"
            >
                <span v-html="response.message" />
            </BAlert>

            <div class="mt-4">
                <BButton
                    type="submit"
                    variant="primary"
                    @click="save()"
                >
                <BSpinner v-if="spinner.submit" small type="grow"/>
                    Submit
                </BButton>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ProductForm',

        props: {
            product: {
                type: Object,
                default: () => ({}),
            },
        },

        data() {
            return {
                productLocal: {
                    name: '',
                    amount: null,
                    description: '',
                    qty: 1,
                },
                response: {
                    variant: '',
                    message: '',
                },
                spinner: {
                    submit: false,
                },
                apiUrl: import.meta.env.VITE_API_URL,
            };
        },

        mounted() {
            if (this.product.id) {
                this.productLocal.name = this.product.name;
                this.productLocal.description = this.product.description;
                this.productLocal.amount = this.product.amount;
            }
        },

        methods: {
            async save() {
                const payload = {
                    name: this.productLocal.name,
                    description: this.productLocal.description,
                    amount: this.productLocal.amount,
                    qty: this.productLocal.qty,
                };

                if (this.product.id) {
                    this.updateProduct(payload);
                } else {
                    this.storeProduct(payload);
                }
            },

            storeProduct(payload) {
                this.spinner.submit = true;

                   fetch(`${this.apiUrl}/api/v1/products`, {
                    method:'post',
                    headers: {
                    'content-type': 'application/json',
                    "X-Requested-With": "XMLHttpRequest",
                    "Access-Control-Allow-Origin": "*"
                    },
                    body: JSON.stringify(payload),
                }).then(() => {
                    this.$emit('afterStore');
                }).finally(() => {
                    this.spinner.submit = false;
                });
            },

            updateProduct(payload) {
                this.spinner.submit = true;

                fetch(`${this.apiUrl}/api/v1/products/${this.product.id}`, {
                    method:'put',
                    headers: {
                    'content-type': 'application/json',
                    "X-Requested-With": "XMLHttpRequest",
                    "Access-Control-Allow-Origin": "*"
                    },
                    body: JSON.stringify(payload),
                }).then(async(response) => {
                    const product = await response.json();
                    this.$emit('update', product.data);
                }).finally(() => {
                    this.spinner.submit = false;
                });
            },

            onClose() {
                this.$emit('close');
            },
        },
    };
</script>

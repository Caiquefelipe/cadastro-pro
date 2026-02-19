<script setup lang="ts">
  import { reactive, ref, computed } from 'vue'
  import { type QDialog, useQuasar } from 'quasar'
  import CFormDialog from './CFormDialog.vue'
  import customerService from 'src/services/customerService'
  import { format, isValid, parse } from 'date-fns'
  import type { ICustomer } from 'src/interfaces/ICustomer'

  const $q = useQuasar()
  const dialog = ref<QDialog>()
  const isViewMode = ref<boolean>(false)
  const id = ref<number>()
  const client = reactive<{ data: ICustomer }>({
    data: {} as ICustomer,
  })
  console.log(client)
  async function createClient() {
    await customerService
      .addCustomer(client.data)
      .then(() => {
        emit('client-saved', client.data)
        dialog.value?.hide()
        $q.notify({
          type: 'positive',
          message: 'Cliente cadastrado com sucesso',
        })
      })
      .catch((e) => {
        $q.notify({
          type: 'negative',
          message: e.response?.data?.data?.message ?? 'Erro ao cadastrar cliente',
        })
      })
  }

   async function editClient() {
    await customerService
      .editCustomer(client.data.id,client.data)
      .then(() => {
        emit('client-saved', client.data)
        dialog.value?.hide()

        $q.notify({
          type: 'positive',
          message: 'Cliente editado com sucesso',
        })
      })
      .catch((e) => {
        $q.notify({
          type: 'negative',
          message: e.response?.data?.data?.message ?? 'Erro ao editar cliente',
        })
      })
  }

  const emit = defineEmits(['client-saved'])
   async function submitForm() {
    console.log('ID do cliente para salvar:', client.data.id)

    if (client.data.birthDate) {
      try {
        const parsed = parse(client.data.birthDate, 'dd/MM/yyyy', new Date())
        if (isValid(parsed)) {
          client.data.birthDate = format(parsed, 'dd/MM/yyyy')
        }
      } catch (error) {
        console.warn('Data de nascimento inválida ou não pôde ser formatada:', error)
      }
    }

    if (client.data.id) {
     await editClient()
    } else {
      await createClient()
    }
  }

  const titleForm = computed(() => {
    if (id.value) {
      if (isViewMode.value) {
        return 'Visualizar Cliente'
      }
      return 'Editar Cliente'
    } else {
      return 'Cadastrar Cliente'
    }
  })

  function onCancel() {
    dialog.value?.hide()
  }

  async function show(itemId?: number, profileViewMode?: boolean) {
    isViewMode.value = profileViewMode ?? false
    id.value = itemId

    if (id.value) {
      await customerService
        .getCustomerById(id.value)
        .then((res) => {
          client.data = {
            ...res,
          } as ICustomer
          dialog.value?.show()
        })
        
        .catch(() => {
          $q.notify({
            type: 'negative',
            message: 'Erro ao carregar cliente',
          })
      dialog.value?.show()

        })
    } else {
      dialog.value?.show()
      client.data = {} as ICustomer
    }
  }

  defineExpose({ show })
</script>

<template>
  <CFormDialog
    ref="dialog"
    :title="titleForm"
    :persistent="true">
    <q-form
      @submit="submitForm"
      ref="form"
      aria-labelledby="form.title">
      <q-card>
        <q-card-section
          style="max-height: 60vh"
          class="scroll">
          <div class="row q-col-gutter-md">
            <div class="col-xs-12 col-sm-6">
              <q-input
                v-model="client.data.name"
                label="Nome"
                :dense="false"
                autofocus
                outlined
                :disable="isViewMode"
                lazy-rules
                :rules="[(val) => !!val || 'Campo obrigatório!']" />
            </div>
            <div class="col-xs-12 col-sm-6">
              <q-input
                v-model="client.data.phone"
                label="Telefone"
                :dense="false"
                :disable="isViewMode"
                mask="(##) #####-####"
                outlined
                :rules="[
                  (val: string): string | boolean => val.length >= 14 || 'Telefone inválido',
                ]" />
            </div>
            <div class="col-xs-12 col-sm-6">
              <q-input
                v-model="client.data.birthDate"
                label="Nascimento"
                :mask="'##/##/####'"
                :disable="isViewMode"
                :rules="[
                  (vall) => !!vall || 'Campo obrigatório!',
                  (vall) => {
                    const analisado = parse(vall, 'dd/MM/yyyy', new Date())
                    return isValid(analisado) || 'data invalida'
                  },
                ]"
                :dense="false"
                outlined>
                <template v-slot:append>
                  <q-icon
                    name="event"
                    class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale">
                      <q-date
                        v-model="client.data.birthDate"
                        mask="DD/MM/YYYY">
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            :disable="isViewMode"
                            label="Fechar"
                            color="primary"
                            flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div class="col-xs-12 col-sm-6">
              <q-input
                v-model="client.data.postalCode"
                label="CEP"
                :dense="false"
                outlined
                :disable="isViewMode"
                :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório!']" />
            </div>
            <div class="col-xs-12 col-sm-6">
              <q-input
                v-model="client.data.address"
                :disable="isViewMode"
                label="Endereço"
                :dense="false"
                outlined
                :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório!']" />
            </div>
            <div class="col-xs-12 col-sm-6">
              <q-input
                v-model="client.data.addressNumber"
                label="Número"
                :disable="isViewMode"
                :dense="false"
                outlined
                :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório!']" />
            </div>
            <div class="col-xs-12 col-sm-6">
              <q-input
                v-model="client.data.neighborhood"
                label="Bairro"
                :dense="false"
                :disable="isViewMode"
                outlined
                :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório!']" />
            </div>
            <div class="col-xs-12 col-sm-6">
              <q-input
                v-model="client.data.city"
                label="Cidade"
                :disable="isViewMode"
                :dense="false"
                outlined
                :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório!']" />
            </div>
            <div class="col-xs-12 col-sm-12">
              <q-input
                v-model="client.data.state"
                label="Estado"
                :dense="false"
                :disable="isViewMode"
                outlined
                :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório!']" />
            </div>
            <div class="col-xs-12 col-sm-12">
              <q-input
                :disable="isViewMode"
                type="textarea"
                label="Descrição"
                v-model="client.data.description"
                outlined />
            </div>
          </div>

          <div class="row">
            <div class="col">
              <pre> {{ JSON.stringify(client, null, 2) }} </pre>
            </div>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn
            unelevated
            color="grey"
            style="width: 100px"
            :disable="isViewMode"
            class="gt-xs"
            label="Cancelar"
            @click="onCancel" />
          <q-btn
            unelevated
            color="primary"
            style="width: 100px"
            class="gt-xs"
            :disable="isViewMode"
            label="Salvar"
            type="submit" />
        </q-card-actions>
      </q-card>
    </q-form>
  </CFormDialog>
</template>
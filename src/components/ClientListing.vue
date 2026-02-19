<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { type ICustomer } from 'src/interfaces/ICustomer'
  import { columns } from './ClientColumnsTable'
  import RegisterProfile from './RegisterProfile.vue'
  import CDefaultTable from './CDefaultTable.vue'
  import DeleteClient from './DeleteClient.vue'
  import ViewClient from './ViewClient.vue'
  import customerService from 'src/services/customerService'
  import { useQuasar } from 'quasar'
  import EditClient from './EditClient.vue'

  const dialog = ref<typeof RegisterProfile>()
  const rows = ref<ICustomer[]>([])
  const $q = useQuasar()

  async function loadClients() {
    rows.value = await customerService.getCustomers()
  }

  function onEdit(row: ICustomer) {
    dialog.value?.show(row.id)
  }

  function deleteClient(id: number) {
    customerService
      .deleteCustomer(id)
      .then(async () => {
        await loadClients()
        $q.notify({
          type: 'positive',
          message: 'Cliente deletado com sucesso!',
        })
      })
      .catch((e) => {
        $q.notify({
          type: 'negative',
          message: e.response?.data?.data?.message ?? 'Erro ao deletar cliente',
        })
      })
  }

  function view(id: number) {
    dialog.value?.show(id, true)
  }

  onMounted(async () => {
    await loadClients()
  })
</script>
<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title class="text-center">Cadastro Pro</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-btn
        unelevated
        color="primary"
        label="Novo Cliente"
        @click="dialog?.show()"
        style="left: 25px; top: 20px; margin-bottom: 7px" />

      <q-page class="q-pa-lg">
        <CDefaultTable
          title="Lista de Clientes"
          :rows="rows ?? []"
          row-key="id"
          :columns="columns">
          <template #actions="actionProps">
            <EditClient @click="onEdit(actionProps.props.row)" />
            <DeleteClient @click="deleteClient(actionProps.props.row.id)" />
            <ViewClient @click="view(actionProps?.props?.row.id)" />
          </template>
        </CDefaultTable>
      </q-page>
    </q-page-container>

    <RegisterProfile
      ref="dialog"
      @client-saved="loadClients" />
  </q-layout>
</template>
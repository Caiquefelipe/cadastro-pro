import { storeTable } from 'src/helper/StoreTable'
import type ColumnsTable from 'src/interfaces/ColumnsTable'

export const columns = [
  {
    name: 'name',
    label: 'Nome',
    field: (row) => row.name,
    align: 'left',
    headerStyle: `${storeTable.headerStyleFirstElement}`,
    sortable: true,
  },
  {
    name: 'description',
    label: 'Descrição',
    field: (row) => row.description,
    align: `${storeTable.alignContent}`,
    headerStyle: `${storeTable.headerStyleElements}`,

    sortable: true,
  },
  {
    name: 'phone',
    label: 'Telefone',
    headerStyle: `${storeTable.headerStyleElements}`,
    field: (row) => row.phone,
    align: 'left',
    sortable: true,
  },
  {
    name: 'birthDate',
    label: 'Data de nascimento',
    field: (row) => row.birthDate,
    headerStyle: `${storeTable.headerStyleElements}`,
    align: 'left',
    sortable: true,
  },
  {
    name: 'actions',
    headerStyle: `${storeTable.headerStyleElements}`,
    align: 'right',
    label: '',
  },
] as ColumnsTable[]
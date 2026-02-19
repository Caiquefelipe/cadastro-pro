const sortByFormatter = (column: string, desc: boolean) => {
  return {
    sortByColumn: column,
    sortOrder: desc ? 'desc' : 'asc',
  }
}

export { sortByFormatter }

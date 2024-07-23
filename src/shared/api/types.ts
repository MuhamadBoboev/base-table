export interface DataPagination<Data> {
  data: Data[]
  meta: {
    current_page: number
    from?: number
    total: number
    per_page: number
    last_page?: number
  }
}

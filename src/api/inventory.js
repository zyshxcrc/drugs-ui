import { get, post } from '@/util/http'

export const getInventoryList = p => post('/api/inventory/list', p)

import { get, post } from '@/util/http'

export const getInventoryList = p => get('/api/inventory/list', p)

export const getWarehouseList = p => get('/api/warehouse/list', p)
export const handleWarehouseCreate = p => post('/api/warehouse/batchInsert', p)

export const getOutOfStackList = p => get('/api/outOfStack/list', p)
export const getItemById = p => get('/api/outOfStack/getItemById', p)
export const handleOutOfstackCreate = p => post('/api/outOfStack/batchInsert', p)
export const handleOutOfstackUpdate = p => post('/api/outOfStack/update', p)

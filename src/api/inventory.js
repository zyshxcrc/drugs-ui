import { get, post } from '@/util/http'

export const getInventoryList = p => get('/api/inventory/list', p)

export const getWarehouseList = p => get('/api/warehouse/list', p)
export const getWarehouseById = p => get('/api/warehouse/getItemById', p)
export const handleWarehouseCreate = p => post('/api/warehouse/batchInsert', p)
export const handleWarehouseUpdate = p => post('/api/warehouse/update', p)
export const handleWarehouseDelete = p => get('/api/warehouse/deleteById', p)

export const getOutOfStackList = p => get('/api/outOfStack/list', p)
export const getItemById = p => get('/api/outOfStack/getItemById', p)
export const handleOutOfstackCreate = p => post('/api/outOfStack/batchInsert', p)
export const handleOutOfstackUpdate = p => post('/api/outOfStack/update', p)
export const handleOutOfstackDelete = p => get('/api/outOfStack/deleteById', p)
export const handleOutOfstackExcelDownload = p => get('/api/outOfStack/ExcelDownload', p)

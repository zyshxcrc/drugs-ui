import { get, post } from '@/util/http'

export const getDrugList = p => get('/api/drug/list', p)
export const getAllDrugList = p => get('/api/drug/allList', p)
export const handleCreate = p => post('/api/drug/insert', p)
export const getDrugDetail = p => get('/api/drug/getDrugById', p)
export const handleEdit = p => post('/api/drug/updateById', p)

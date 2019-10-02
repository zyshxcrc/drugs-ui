import { get, post } from '@/util/http'

export const getCompanyList = p => get('/api/company/list', p)
export const getAllCompanyList = p => get('/api/company/allList', p)
export const handleCreate = p => post('/api/company/insert', p)
export const getCompanyDetail = p => get('/api/company/getCompanyById', p)
export const handleEdit = p => post('/api/company/updateById', p)

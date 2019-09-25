import { get, post } from '@/util/http'

export const getCompanyList = p => get('/api/company/list', p)
export const getAllCompanyList = p => get('/api/company/allList', p)

import { get, post } from '@/util/http'

export const getCompanyList = p => get('/api/company/list', p)

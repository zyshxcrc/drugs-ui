import { get, post } from '@/util/http'

export const getDrugList = p => get('/api/drug/list', p)

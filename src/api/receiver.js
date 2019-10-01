import { get, post } from '@/util/http'

export const getReceiverList = p => get('/api/receiver/list', p)
export const getAllReceiverList = p => get('/api/receiver/allList', p)
export const handleCreate = p => post('/api/receiver/insert', p)

import axios, { type CreateAxiosDefaults } from 'axios'
import qs from 'qs'

export const createAxiosInstance = (config?: CreateAxiosDefaults) =>
  axios.create({
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: 'repeat' }),
    ...config,
  })

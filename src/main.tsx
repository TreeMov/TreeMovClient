import { setDefaultOptions } from 'date-fns'
import { ru } from 'date-fns/locale'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'

import { router } from './router'

import './assets/styles.css'

setDefaultOptions({ locale: ru })

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)

import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
    base: '/power-of-prayer/',
    plugins: [react()],
    server: {
        host: '0.0.0.0',
    },
})

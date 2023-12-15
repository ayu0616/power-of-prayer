import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: '/power-of-prayer/',
    server: {
        host: '0.0.0.0',
    },
})

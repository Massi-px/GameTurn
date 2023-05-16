import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default ({ mode }) => {
    // import.meta.env.VITE_NAME available here with: process.env.VITE_NAME
    // import.meta.env.VITE_PORT available here with: process.env.VITE_PORT

    return defineConfig({
        plugins: [react()],
        server: {
            proxy: {
                '/api': {
                    target: 'http://127.0.0.1:8080',
                    changeOrigin: true,
                },
            },
        },
        define: {
            'process.env': {...loadEnv(mode, process.cwd())}
        }
    });
}
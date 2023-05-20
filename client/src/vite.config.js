import { defineConfig, loadEnv } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default ({ mode }) => {
    return defineConfig({
        plugins: [
            reactRefresh(),
            react()
        ],
        /*
        server: {
            middleware: [require.resolve('./setupProxy.js')],
        },*/
        define: {
            'process.env': loadEnv(mode, process.cwd())
        }
    });
}

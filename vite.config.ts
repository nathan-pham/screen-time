import { defineConfig, UserConfigExport } from "vite";
import react from "@vitejs/plugin-react";

import { resolve } from "path";

// build background
const isBackground = process.env.LIB_NAME === "background";
const backgroundConfig: UserConfigExport = {
    build: {
        lib: {
            entry: resolve(__dirname, "./src/extension/background.ts"),
            fileName: "background",
            formats: ["es"],
        },
        emptyOutDir: false,
    },
};

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    ...(isBackground ? backgroundConfig : {}),
});

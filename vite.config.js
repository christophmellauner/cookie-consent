// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
    appType: "mpa"
    // build: {
    //     lib: {
    //         // Could also be a dictionary or array of multiple entry points
    //         entry: {
    //             main: resolve(__dirname, "src/main.ts"),
    //             // list all the possibilities here
    //             vanilla: resolve(__dirname, "src/vanilla/main.ts"),
    //             react: resolve(__dirname, "src/react/main.ts"),
    //             vue: resolve(__dirname, "src/vue/main.ts"),
    //         },
    //         // name: 'MyLib',
    //         // the proper extensions will be added
    //         // fileName: 'my-lib',
    //     },
    //     rollupOptions: {
    //         // make sure to externalize deps that shouldn't be bundled
    //         // into your library
    //         external: ["vue"],
    //         output: {
    //             // Provide global variables to use in the UMD build
    //             // for externalized deps
    //             globals: {
    //                 vue: "Vue",
    //             },
    //         },
    //     },
    // },
});

// vite.config.ts
import { loadEnv } from "file:///F:/demo/react-admin-design/node_modules/.pnpm/vite@4.2.1_@types+node@18.15.11_less@4.1.3/node_modules/vite/dist/node/index.js";
import react from "file:///F:/demo/react-admin-design/node_modules/.pnpm/@vitejs+plugin-react@3.0.1_vite@4.2.1/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { createSvgIconsPlugin } from "file:///F:/demo/react-admin-design/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@4.2.1/node_modules/vite-plugin-svg-icons/dist/index.mjs";

// build/utils.ts
function wrapperEnv(envConf) {
  const result = {};
  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, "\n");
    realName = realName === "true" ? true : realName === "false" ? false : realName;
    if (envName === "VITE_PORT") {
      realName = Number(realName);
    }
    if (envName === "VITE_PROXY" && realName) {
      try {
        realName = JSON.parse(realName.replace(/'/g, '"'));
      } catch (error) {
        realName = "";
      }
    }
    result[envName] = realName;
    if (typeof realName === "string") {
      process.env[envName] = realName;
    } else if (typeof realName === "object") {
      process.env[envName] = JSON.stringify(realName);
    }
  }
  return result;
}

// vite.config.ts
import { resolve } from "path";
var __vite_injected_original_dirname = "F:\\demo\\react-admin-design";
var vite_config_default = ({ command, mode }) => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);
  const { VITE_PORT, VITE_DROP_CONSOLE } = viteEnv;
  return {
    base: "./",
    server: {
      // Listening on all local ips
      host: true,
      port: VITE_PORT
    },
    plugins: [
      react(),
      createSvgIconsPlugin({
        iconDirs: [resolve(process.cwd(), "src/assets/icons")],
        symbolId: "icon-[dir]-[name]"
      })
    ],
    build: {
      target: "es2015",
      cssTarget: "chrome86",
      minify: "terser",
      terserOptions: {
        compress: {
          keep_infinity: true,
          // used to delete console and debugger in production environment
          drop_console: VITE_DROP_CONSOLE
        }
      },
      chunkSizeWarningLimit: 2e3
    },
    resolve: {
      alias: {
        "@": resolve(__vite_injected_original_dirname, "./src")
      }
    }
  };
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAiYnVpbGQvdXRpbHMudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJGOlxcXFxkZW1vXFxcXHJlYWN0LWFkbWluLWRlc2lnblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRjpcXFxcZGVtb1xcXFxyZWFjdC1hZG1pbi1kZXNpZ25cXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Y6L2RlbW8vcmVhY3QtYWRtaW4tZGVzaWduL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHR5cGUgeyBDb25maWdFbnYsIFVzZXJDb25maWcgfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgeyBsb2FkRW52IH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xyXG5pbXBvcnQgeyBjcmVhdGVTdmdJY29uc1BsdWdpbiB9IGZyb20gJ3ZpdGUtcGx1Z2luLXN2Zy1pY29ucydcclxuaW1wb3J0IHsgd3JhcHBlckVudiB9IGZyb20gJy4vYnVpbGQvdXRpbHMnXHJcbi8vIG5lZWQgaW5zdGFsbCBwbHVnaW4gQHR5cGVzL25vZGVcclxuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnXHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCAoeyBjb21tYW5kLCBtb2RlIH06IENvbmZpZ0Vudik6IFVzZXJDb25maWcgPT4ge1xyXG4gIGNvbnN0IHJvb3QgPSBwcm9jZXNzLmN3ZCgpXHJcblxyXG4gIGNvbnN0IGVudiA9IGxvYWRFbnYobW9kZSwgcm9vdClcclxuXHJcbiAgLy8gdGhpcyBmdW5jdGlvbiBjYW4gYmUgY29udmVydGVkIHRvIGRpZmZlcmVudCB0eXBlc1xyXG4gIGNvbnN0IHZpdGVFbnYgPSB3cmFwcGVyRW52KGVudilcclxuICBjb25zdCB7IFZJVEVfUE9SVCwgVklURV9EUk9QX0NPTlNPTEUgfSA9IHZpdGVFbnZcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGJhc2U6ICcuLycsXHJcbiAgICBzZXJ2ZXI6IHtcclxuICAgICAgLy8gTGlzdGVuaW5nIG9uIGFsbCBsb2NhbCBpcHNcclxuICAgICAgaG9zdDogdHJ1ZSxcclxuICAgICAgcG9ydDogVklURV9QT1JULFxyXG4gICAgfSxcclxuICAgIHBsdWdpbnM6IFtcclxuICAgICAgcmVhY3QoKSxcclxuICAgICAgY3JlYXRlU3ZnSWNvbnNQbHVnaW4oe1xyXG4gICAgICAgIGljb25EaXJzOiBbcmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCAnc3JjL2Fzc2V0cy9pY29ucycpXSxcclxuICAgICAgICBzeW1ib2xJZDogJ2ljb24tW2Rpcl0tW25hbWVdJ1xyXG4gICAgICB9KVxyXG4gICAgXSxcclxuXHJcbiAgICBidWlsZDoge1xyXG4gICAgICB0YXJnZXQ6ICdlczIwMTUnLFxyXG4gICAgICBjc3NUYXJnZXQ6ICdjaHJvbWU4NicsXHJcbiAgICAgIG1pbmlmeTogJ3RlcnNlcicsXHJcbiAgICAgIHRlcnNlck9wdGlvbnM6IHtcclxuICAgICAgICBjb21wcmVzczoge1xyXG4gICAgICAgICAga2VlcF9pbmZpbml0eTogdHJ1ZSxcclxuICAgICAgICAgIC8vIHVzZWQgdG8gZGVsZXRlIGNvbnNvbGUgYW5kIGRlYnVnZ2VyIGluIHByb2R1Y3Rpb24gZW52aXJvbm1lbnRcclxuICAgICAgICAgIGRyb3BfY29uc29sZTogVklURV9EUk9QX0NPTlNPTEVcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogMjAwMFxyXG4gICAgfSxcclxuXHJcbiAgICByZXNvbHZlOiB7XHJcbiAgICAgIGFsaWFzOiB7XHJcblx0XHRcdFx0J0AnOiByZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjJylcclxuXHRcdFx0fVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkY6XFxcXGRlbW9cXFxccmVhY3QtYWRtaW4tZGVzaWduXFxcXGJ1aWxkXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJGOlxcXFxkZW1vXFxcXHJlYWN0LWFkbWluLWRlc2lnblxcXFxidWlsZFxcXFx1dGlscy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRjovZGVtby9yZWFjdC1hZG1pbi1kZXNpZ24vYnVpbGQvdXRpbHMudHNcIjtkZWNsYXJlIHR5cGUgUmVjb3JkYWJsZTxUID0gYW55PiA9IFJlY29yZDxzdHJpbmcsIFQ+XHJcblxyXG5pbnRlcmZhY2UgVml0ZUVudiB7XHJcbiAgVklURV9QT1JUOiBudW1iZXJcclxuICBWSVRFX1BST1hZOiBbc3RyaW5nLCBzdHJpbmddW11cclxuICBWSVRFX0RST1BfQ09OU09MRTogYm9vbGVhblxyXG59XHJcblxyXG4vLyByZWFkIGFsbCBlbnZpcm9ubWVudCB2YXJpYWJsZSBjb25maWd1cmF0aW9uIGZpbGVzIHRvIHByb2Nlc3MuZW52XHJcbmV4cG9ydCBmdW5jdGlvbiB3cmFwcGVyRW52KGVudkNvbmY6IFJlY29yZGFibGUpOiBWaXRlRW52IHtcclxuICBjb25zdCByZXN1bHQ6IGFueSA9IHt9XHJcblxyXG4gIGZvciAoY29uc3QgZW52TmFtZSBvZiBPYmplY3Qua2V5cyhlbnZDb25mKSkge1xyXG4gICAgbGV0IHJlYWxOYW1lID0gZW52Q29uZltlbnZOYW1lXS5yZXBsYWNlKC9cXFxcbi9nLCAnXFxuJylcclxuICAgIHJlYWxOYW1lID0gcmVhbE5hbWUgPT09ICd0cnVlJyA/IHRydWUgOiByZWFsTmFtZSA9PT0gJ2ZhbHNlJyA/IGZhbHNlIDogcmVhbE5hbWVcclxuXHJcbiAgICBpZiAoZW52TmFtZSA9PT0gJ1ZJVEVfUE9SVCcpIHtcclxuICAgICAgcmVhbE5hbWUgPSBOdW1iZXIocmVhbE5hbWUpXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGVudk5hbWUgPT09ICdWSVRFX1BST1hZJyAmJiByZWFsTmFtZSkge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIHJlYWxOYW1lID0gSlNPTi5wYXJzZShyZWFsTmFtZS5yZXBsYWNlKC8nL2csICdcIicpKVxyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIHJlYWxOYW1lID0gJydcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlc3VsdFtlbnZOYW1lXSA9IHJlYWxOYW1lXHJcblxyXG4gICAgaWYgKHR5cGVvZiByZWFsTmFtZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgcHJvY2Vzcy5lbnZbZW52TmFtZV0gPSByZWFsTmFtZVxyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgcmVhbE5hbWUgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgIHByb2Nlc3MuZW52W2Vudk5hbWVdID0gSlNPTi5zdHJpbmdpZnkocmVhbE5hbWUpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gcmVzdWx0XHJcbn0iXSwKICAibWFwcGluZ3MiOiAiO0FBQ0EsU0FBUyxlQUFlO0FBQ3hCLE9BQU8sV0FBVztBQUNsQixTQUFTLDRCQUE0Qjs7O0FDTTlCLFNBQVMsV0FBVyxTQUE4QjtBQUN2RCxRQUFNLFNBQWMsQ0FBQztBQUVyQixhQUFXLFdBQVcsT0FBTyxLQUFLLE9BQU8sR0FBRztBQUMxQyxRQUFJLFdBQVcsUUFBUSxPQUFPLEVBQUUsUUFBUSxRQUFRLElBQUk7QUFDcEQsZUFBVyxhQUFhLFNBQVMsT0FBTyxhQUFhLFVBQVUsUUFBUTtBQUV2RSxRQUFJLFlBQVksYUFBYTtBQUMzQixpQkFBVyxPQUFPLFFBQVE7QUFBQSxJQUM1QjtBQUVBLFFBQUksWUFBWSxnQkFBZ0IsVUFBVTtBQUN4QyxVQUFJO0FBQ0YsbUJBQVcsS0FBSyxNQUFNLFNBQVMsUUFBUSxNQUFNLEdBQUcsQ0FBQztBQUFBLE1BQ25ELFNBQVMsT0FBUDtBQUNBLG1CQUFXO0FBQUEsTUFDYjtBQUFBLElBQ0Y7QUFFQSxXQUFPLE9BQU8sSUFBSTtBQUVsQixRQUFJLE9BQU8sYUFBYSxVQUFVO0FBQ2hDLGNBQVEsSUFBSSxPQUFPLElBQUk7QUFBQSxJQUN6QixXQUFXLE9BQU8sYUFBYSxVQUFVO0FBQ3ZDLGNBQVEsSUFBSSxPQUFPLElBQUksS0FBSyxVQUFVLFFBQVE7QUFBQSxJQUNoRDtBQUFBLEVBQ0Y7QUFFQSxTQUFPO0FBQ1Q7OztBRGhDQSxTQUFTLGVBQWU7QUFOeEIsSUFBTSxtQ0FBbUM7QUFTekMsSUFBTyxzQkFBUSxDQUFDLEVBQUUsU0FBUyxLQUFLLE1BQTZCO0FBQzNELFFBQU0sT0FBTyxRQUFRLElBQUk7QUFFekIsUUFBTSxNQUFNLFFBQVEsTUFBTSxJQUFJO0FBRzlCLFFBQU0sVUFBVSxXQUFXLEdBQUc7QUFDOUIsUUFBTSxFQUFFLFdBQVcsa0JBQWtCLElBQUk7QUFFekMsU0FBTztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sUUFBUTtBQUFBO0FBQUEsTUFFTixNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsSUFDUjtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04scUJBQXFCO0FBQUEsUUFDbkIsVUFBVSxDQUFDLFFBQVEsUUFBUSxJQUFJLEdBQUcsa0JBQWtCLENBQUM7QUFBQSxRQUNyRCxVQUFVO0FBQUEsTUFDWixDQUFDO0FBQUEsSUFDSDtBQUFBLElBRUEsT0FBTztBQUFBLE1BQ0wsUUFBUTtBQUFBLE1BQ1IsV0FBVztBQUFBLE1BQ1gsUUFBUTtBQUFBLE1BQ1IsZUFBZTtBQUFBLFFBQ2IsVUFBVTtBQUFBLFVBQ1IsZUFBZTtBQUFBO0FBQUEsVUFFZixjQUFjO0FBQUEsUUFDaEI7QUFBQSxNQUNGO0FBQUEsTUFDQSx1QkFBdUI7QUFBQSxJQUN6QjtBQUFBLElBRUEsU0FBUztBQUFBLE1BQ1AsT0FBTztBQUFBLFFBQ1QsS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxNQUNoQztBQUFBLElBQ0M7QUFBQSxFQUNGO0FBQ0Y7IiwKICAibmFtZXMiOiBbXQp9Cg==

/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string
}

interface importMeta {
    readonly env: ImportMetaEnv
}

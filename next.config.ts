import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 webpack: (config, { isServer }) => {
    // We need to stub out the `oracledb` module and its optional dependencies
    // for the client-side bundle. This is because `knex` bundles them all.
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        // Stub out all optional dependencies of oracledb
        "oracledb": false,
        "@sap/hana-client": false,
        "@vscode/sqlite3": false,
        "mysql": false,
        "mysql2": false,
        "pg-query-stream": false,
        "sqlite3": false,
        "tedious": false,
        "better-sqlite3": false,
        // The specific ones from your error
        "@azure/keyvault-secrets": false,
        "@azure/identity": false,
        // You may not need all of these, but it's good to have them
        // in case you hit other optional dependency errors.
      };
    }

    return config;
  },
};

export default nextConfig;

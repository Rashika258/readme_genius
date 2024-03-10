// const { i18n } = require("./next-i18next.config");
// const { i18n } = require('./next-i18next.config')

import config from './next-i18next.config.js';
const { i18n } = config;

// import {i18n} from "./next-i18next.config"
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n,
};

module.exports = nextConfig;

import vikeReact from "vike-react/config";
import type { Config } from "vike/types";
import Head from "./head";
import Layout from "./layout";

// Default config (can be overridden by pages)
// https://vike.dev/config

export default {
  // https://vike.dev/Layout
  Head,
  Layout,

  // https://vike.dev/head-tags
  title: "My Vike App",
  description: "Demo showcasing Vike",

  extends: vikeReact,
} satisfies Config;

import { Scalekit } from "@scalekit-sdk/node";

const scalekit = new Scalekit(
  process.env.SCALEKIT_ENVIROMENT_URL! ,
  process.env.SCALEKIT_CLIENT_ID! ,
  process.env.SCALEKIT_CLIENT_SECRET!
);

export default scalekit;

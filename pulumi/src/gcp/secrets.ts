import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";
import {secretmanager} from "./services";

const apolloCfg = new pulumi.Config("apollo");
const gcpCfg = new pulumi.Config("gcp");

const secretDefaults = {
  project: gcpCfg.require("project"),
  replication: {
    userManaged: {
      replicas: [
        {
          location: gcpCfg.require("region"),
        },
      ],
    },
  },
};

const apolloRouterSecret = new gcp.secretmanager.Secret(
  "apolloRouterSecret",
  {
    secretId: "apolloRouterSecret",
    ...secretDefaults,
  }, {
    protect: true,
    dependsOn: secretmanager,
  }
);

new gcp.secretmanager.SecretVersion("apolloRouterSecretVersion", {
  secret: apolloRouterSecret.id,
  secretData: `
APOLLO_KEY=${apolloCfg.requireSecret("key")}
APOLLO_GRAPH_REF=${apolloCfg.requireSecret("graphRef")}
  `,
});

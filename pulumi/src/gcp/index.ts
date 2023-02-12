import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";

const auth = new gcp.cloudrunv2.Service(
  "auth",
  {
    name: "auth",
    location: "europe-west3",
    ingress: "INGRESS_TRAFFIC_ALL",
    launchStage: "GA",
    template: {
      containers: [
        {
          image: "docker.io/chjdev/explore:auth-0.0.2",
        },
      ],
    },
    traffics: [
      {
        percent: 100,
        type: "TRAFFIC_TARGET_ALLOCATION_TYPE_LATEST",
      },
    ],
  },
  {
    protect: true,
  },
);

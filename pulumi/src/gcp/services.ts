import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";

const gcpCfg = new pulumi.Config("gcp");

export const cloudrun = new gcp.projects.Service("cloudrun", {
  project: gcpCfg.require("project"),
  service: "run.googleapis.com",
}, {
  protect: true,
});

export const secretmanager = new gcp.projects.Service("secretmanager", {
  project: gcpCfg.require("project"),
  service: "secretmanager.googleapis.com",
}, {
  protect: true,
});
import * as github from "@pulumi/github";
import * as pulumi from "@pulumi/pulumi";
import { repo } from "./repo";

const environment = new github.RepositoryEnvironment("environment", {
  repository: repo.name,
  environment: pulumi.getStack(),
});

const dockerhubConfig = new pulumi.Config("dockerhub");

const dockerhubUsername = new github.ActionsEnvironmentSecret(
  "dockerhubUsername",
  {
    repository: repo.name,
    environment: environment.environment,
    secretName: "DOCKERHUB_USERNAME",
    plaintextValue: dockerhubConfig.requireSecret("username"),
  },
);

const dockerhubToken = new github.ActionsEnvironmentSecret("dockerhubToken", {
  repository: repo.name,
  environment: environment.environment,
  secretName: "DOCKERHUB_TOKEN",
  plaintextValue: dockerhubConfig.requireSecret("token"),
});

// vars seem not to be supported yet
const dockerhubRepo = new github.ActionsEnvironmentSecret("dockerhubRepo", {
  repository: repo.name,
  environment: environment.environment,
  secretName: "DOCKERHUB_REPO",
  plaintextValue: dockerhubConfig.require("repo"),
});

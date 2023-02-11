import * as github from "@pulumi/github";
import { repo } from "./repo";

const main = new github.Branch(
  "main",
  {
    repository: repo.name,
    branch: "main",
  },
  {
    protect: true,
  },
);

const mainBranchProtection = new github.BranchProtection(
  "mainBranchProtection",
  {
    pattern: main.branch,
    repositoryId: repo.nodeId,
    requiredLinearHistory: true,
    requiredPullRequestReviews: [
      {
        requiredApprovingReviewCount: 0,
      },
    ],
    requiredStatusChecks: [{ strict: true }],
  },
  {
    protect: false,
  },
);

const defaultBranch = new github.BranchDefault(
  "defaultBranch",
  {
    branch: main.branch,
    repository: repo.name,
  },
  {
    protect: true,
  },
);

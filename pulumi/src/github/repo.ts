import * as github from "@pulumi/github";

export const repo = new github.Repository(
  "repo",
  {
    name: "explore",
    visibility: "public",
    allowRebaseMerge: true,
    allowSquashMerge: true,
    allowMergeCommit: false,
    allowUpdateBranch: true,
    deleteBranchOnMerge: true,
    hasDiscussions: true,
    hasIssues: true,
    securityAndAnalysis: {
      secretScanning: {
        status: "enabled",
      },
      secretScanningPushProtection: {
        status: "enabled",
      },
    },
    archiveOnDestroy: true,
  },
  {
    protect: true,
  },
);

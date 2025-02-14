---
article_id: 25160431579165
name: Restoring or migrating from a backup
position: 2
labels: green, data
---

There are two ways you can use a backup:
- You can use a backup to recover your existing configuration on your current system.
- You can use a backup during the onboarding process to restore your configuration. For example, if you want to migrate from another device to a Home Assistant Green.

## Elements included in full backup

A full backup includes the following elements:

- your system configuration
- add-on data
- automations
- scripts
- and media stored on Home Assistant.

Before creating a backup, you can select what to include or explude for a backup.

## Estimated duration

The time it takes to restore a backup depends on your installation. Home Assistant Core and all add-ons are being reinstalled. For a larger installation, this process can take about 45 minutes to 1 hour.

## Restoring from a backup during onboarding

1. If you want to migrate your configuration from another device, make sure the [prerequisites](https://www.home-assistant.io/common-tasks/general/#restoring-a-backup-during-onboarding) are met. Specifically, check the size of your current installation. Home Assistant Green has 32 GB of disk space, so your installation needs to be a bit smaller than that.
2. Start up Home Assistant Green as described in the [Getting started](https://www.home-assistant.io/getting-started/) procedure.
3. Follow the steps described in the [Restoring a backup during onboarding](https://www.home-assistant.io/common-tasks/general/#restoring-a-backup-during-onboarding) procedure.

## Restoring a backup on your current installation

If you want to restore your full configuration or even only parts of it, follow the steps described in the procedure on [restoring a backup on your current system](https://www.home-assistant.io/common-tasks/general/#to-restore-a-backup-on-your-current-system).

## Related topics

- [Restoring a backup during onboarding](https://www.home-assistant.io/common-tasks/general/#restoring-a-backup-during-onboarding)
- [Restoring a backup on your current system](https://www.home-assistant.io/common-tasks/general/#to-restore-a-backup-on-your-current-system)
- [Creating a backup](https://www.home-assistant.io/common-tasks/os/#making-a-backup-from-the-ui) from the Home Assistant user interface.




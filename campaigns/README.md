---
title: Campaign Workflow
---

# Campaign Workflow

Campaign drafts live here as Markdown so Future Shock Media copy can be reviewed before anything is created in the newsletter database or sent.

## Folders

- `updates/` — general Future Shock Media updates
- `episodes/` — emails tied to a specific episode or post
- `other/` — anything that does not fit the two main types yet
- `_templates/` — copy these when drafting a new campaign

## Required Shape

Every campaign Markdown file must include frontmatter:

```markdown
---
slug: 2026-05-example
subject: "Example subject"
type: update
---
```

Subjects should read like a straightforward news/update email. Do not use em dashes (`—`) in subject lines.

Every campaign body must start with:

```text
Hey,
```

Every campaign body must end with this marker:

```text
{{campaign_footer}}
```

The newsletter scripts replace that marker with the shared footer from `campaigns/_templates/footer.md`.

The newsletter Worker replaces `{{unsubscribe_url}}` for each subscriber. Do not send a campaign until the Markdown draft and preview are reviewed.

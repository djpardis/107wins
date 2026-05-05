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

Every campaign body must start with:

```text
Hey,
```

Every campaign body must end with:

```text
More soon.

— Future Shock Media
Boring on purpose.

You're receiving this because you subscribed to Future Shock Media. To stop, unsubscribe here:
{{unsubscribe_url}}.
```

In Markdown drafts, write that footer as a link:

```markdown
You're receiving this because you subscribed to Future Shock Media. To stop, [unsubscribe here]({{unsubscribe_url}}).
```

The newsletter Worker replaces `{{unsubscribe_url}}` for each subscriber. Do not send a campaign until the Markdown draft and preview are reviewed.

# Guidelines

## Branches
branches names should have the next structure
```text
[purpose]/[description]
```
purpose can be one of the next options
 - feature: branch for a new feature
 - bugfix: branch to fix a bug
 - improvement: branch for improvement

`[description]`: a brief description of the purpose of the branch in pascalCase

## Pull Request
pull request title should have the next structure
```text
[purpose]: [description]
```
where ``[purpose]`` is an emoji or the purpose of the branch and ``[description]`` is a summary of all commits

#### Conventions
- feature: 🚀
- bugfix: 🐞
- improvement: 🌟

example
```text
🌟: Changed in README.md and configurations
```

## Commits
commit should have the next structure
```text
[emoji/reason]: [changes]
```

where `[emoji/reason]` is a word or emoji that sum up the git message in one word,
the only case where *two words* are allowed is only for refactor, and 
`[changes]` are the changes in the current commit

example
```text
📃: Add some docs
```

#### Conventions
Reasons:
- 📃/documents/docs: used for update docs
- 🐋/docker: used for update docker files
- 🪟/view/front: used for update frontend/components/styles
- 🦴/service/repository/controller: used for update backend
- ⚙️/configuration: used for update configuration
- ♻️/refactor: used for refactor commits
- ❤️‍🩹/fix: used when fix something
- 🧻/clean: used for clean the code

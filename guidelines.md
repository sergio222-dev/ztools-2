# Guidelines

## Commits
commit should have the next structure
```text
[BranchName]
[emoji/reason]: [changes]
```

where **[BranchName]** is the name of the current branch, 
**[emoji/reason]** is a word or emoji that sum up the git message in one word,
the only case where *two words* are allowed is only for refactor, and 
**[changes]** are the changes in the current commit

example
```text
feature/docs
📃: Add some docs
```

#### Conventions
Reasons:
- 📃/documents/docs: used for update docs
- 🐋/docker: used for update docker files
- 🪟/view/front: used for update frontend/components/styles
- 🦴/service/repository/controller: used for update backend
- ⚙️/configuration: used for update configuration
- ⛑️/refactor: used for refactor commits
- 🧻/clean: used for clean the code

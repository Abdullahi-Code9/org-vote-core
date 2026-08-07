# Contributing to Org-Vote

Thank you for helping build transparent governance on Stellar and Soroban. This guide covers how to contribute during open-source sprints — including **Drips Wave** — and beyond.

## Code of Conduct

Be respectful, constructive, and inclusive. Focus feedback on the work, not the person.

## Ways to Contribute

- **Bug reports** — open an issue with steps to reproduce
- **Feature proposals** — open an issue describing the use case before large PRs
- **Code** — fix bugs, improve UI, extend contract logic, add tests
- **Documentation** — clarify setup steps, add examples, fix typos

## Drips Wave Sprint Workflow

During Drips Wave sprints, contributors typically work in short, focused cycles:

1. **Browse open issues** labeled `good first issue`, `help wanted`, or `drips-wave`
2. **Comment on an issue** you want to claim so maintainers can assign it and avoid duplicate work
3. **Fork** the repository and create a branch from `main`:
   ```bash
   git checkout -b feat/short-description
   ```
4. **Implement** your change with minimal scope — one concern per PR
5. **Test locally**:
   ```bash
   npm install && npm run lint && npm run build
   cd contracts && cargo test
   ```
6. **Open a Pull Request** against `main` using the template below

### PR Title Format

```
<type>: <short summary>
```

Types: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`

Examples:
- `feat: add poll expiration to Soroban contract`
- `fix: prevent double vote toast on reconnect`

### Pull Request Checklist

- [ ] Branch is up to date with `main`
- [ ] Changes are scoped to a single feature or fix
- [ ] Frontend builds without errors (`npm run build`)
- [ ] Contract tests pass (`cargo test` in `contracts/`)
- [ ] README or inline docs updated if behavior changed
- [ ] No secrets, private keys, or `.env` files committed

### PR Description Template

```markdown
## Summary
Brief description of what changed and why.

## Related Issue
Fixes #123

## Test Plan
- [ ] Step to verify the change
- [ ] Another verification step

## Screenshots (if UI)
```

## Development Guidelines

### Smart Contract (`contracts/`)

- Keep contract logic minimal and auditable
- Use `require_auth()` for any address that must sign
- Add unit tests in `lib.rs` under `#[cfg(test)]`
- Panic messages should be clear for integrators

### Frontend (`app/`, `components/`, `lib/`)

- Use TypeScript strict mode
- Prefer server/client component boundaries as Next.js recommends
- Match existing Tailwind styling patterns
- Wallet integration should degrade gracefully when Freighter is unavailable

### Commit Messages

Write clear, imperative commit messages:

```
Add poll expiration field to contract storage
Fix wallet disconnect state not clearing votes
```

## Getting Help

- Open a [GitHub Discussion](https://github.com/your-org/org-vote-core/discussions) for questions
- Tag maintainers on your issue if blocked for more than 48 hours during a sprint

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](./LICENSE).

<!--
Sync Impact Report
- Version change: 0.0.0-template → 1.0.0
- Modified principles:
	- Template Principle 1 → I. Code Quality as a Release Gate
	- Template Principle 2 → II. Testing Evidence is Mandatory
	- Template Principle 3 → III. User Experience Consistency by Default
	- Template Principle 4 → IV. Performance Budgets are Required
	- Template Principle 5 → V. Simplicity and Operability
- Added sections:
	- Engineering Standards
	- Delivery Workflow & Quality Gates
- Removed sections:
	- None
- Templates requiring updates:
	- ✅ .specify/templates/plan-template.md
	- ✅ .specify/templates/spec-template.md
	- ✅ .specify/templates/tasks-template.md
	- ⚠ pending .specify/templates/commands/*.md (directory not present in repository)
- Follow-up TODOs:
	- None
-->

# App Test AI Coding Agent Constitution

## Core Principles

### I. Code Quality as a Release Gate
All code merged to the default branch MUST pass linting, formatting, and static analysis
configured by the repository. Pull requests MUST keep modules cohesive, avoid dead code,
and include clear naming and error handling. Non-trivial design decisions MUST be recorded
in the relevant spec or plan document before implementation starts.

Rationale: Quality failures are cheaper to catch before merge and clearer design records
reduce long-term maintenance risk.

### II. Testing Evidence is Mandatory
Every behavior change MUST include automated tests at the appropriate level (unit,
integration, or contract). Bug fixes MUST include a regression test that fails before the
fix and passes after it. CI test suites MUST pass before merge; no failing tests may be
ignored without documented, time-bounded exception approval.

Rationale: Mandatory test evidence prevents regressions and provides objective proof that
requirements are met.

### III. User Experience Consistency by Default
User-facing changes MUST use established design-system patterns, interaction states, and
language conventions. Every affected flow MUST handle loading, success, empty, and error
states consistently. Accessibility-critical behavior (keyboard access, semantic labels,
and readable contrast) MUST be preserved or improved.

Rationale: Consistent UX lowers cognitive load and accessibility compliance protects product
usability for all users.

### IV. Performance Budgets are Required
Each feature plan MUST define measurable performance goals and constraints relevant to its
scope (for example latency, throughput, memory, or bundle size). Implementations MUST
include a repeatable method to validate these goals. Any change that exceeds agreed budget
thresholds MUST include mitigation or an explicitly approved exception.

Rationale: Performance requirements only remain actionable when they are measured and gated.

### V. Simplicity and Operability
Solutions MUST prefer the simplest design that satisfies current requirements, with
complexity justified in the implementation plan. New or changed critical flows MUST include
actionable logging and clear error messages to support diagnosis. Public interfaces MUST
document compatibility expectations and version-impact when changed.

Rationale: Simple, observable systems are faster to evolve, easier to debug, and safer to
operate.

## Engineering Standards

- Approved repository tooling for formatting, linting, static checks, and tests MUST be run
	in local development and CI.
- Definition of done for every feature includes: updated specification artifacts,
	implementation, automated tests, and user-facing documentation when behavior changes.
- Any constitution exception MUST document scope, owner, expiration date, and rollback plan.

## Delivery Workflow & Quality Gates

1. Specification artifacts (`spec.md`, `plan.md`, and `tasks.md`) MUST trace feature work to
	 measurable requirements, tests, and performance goals.
2. Pull requests MUST include a constitution check confirming compliance with all five core
	 principles.
3. Reviewers MUST block merge if required tests, UX consistency checks, or performance
	 validations are missing.
4. Releases SHOULD include a brief verification summary of quality, test, UX, and
	 performance outcomes for changed features.

## Governance

This constitution overrides conflicting local practices for project delivery. Amendments
require: (a) proposed change text, (b) impact summary across templates/workflows,
and (c) approval by project maintainers. Compliance review is required for every pull
request and at least once per release cycle.

Versioning policy for this constitution follows semantic versioning:
- MAJOR: Removes or redefines a principle/section in a backward-incompatible way.
- MINOR: Adds a new principle/section or materially expands governance requirements.
- PATCH: Clarifies language, fixes wording, or makes non-semantic improvements.

**Version**: 1.0.0 | **Ratified**: 2026-02-21 | **Last Amended**: 2026-02-21

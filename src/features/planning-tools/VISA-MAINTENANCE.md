# Visa policy maintenance

Scope: this dataset covers unilateral 30-day visits and 240-hour transit only, not every entry exemption. Port and area eligibility require the visitor to consult and confirm the linked official NIA list.

- Verify changes against NIA or Chinese embassy announcements. Preserve source URLs and distinguish original effective dates from the snapshot coverage start.
- Update expiry and country coverage only after reading official evidence. Never extend expiry or refresh `lastVerified` automatically.
- Set `reviewDue` after verification. Once overdue, results downgrade to review even if the published policy has no expiry.
- For extensions, update the verified rule or add a dated replacement and tests covering both sides of the boundary. Dates outside verified coverage must return review, not a blanket visa requirement.
- Test nationality coverage, missing answers, expiry, review deadlines and transit conditions before releasing.

This is an in-code lifecycle safeguard, not an automated policy monitoring service or a site-wide rules administration system.

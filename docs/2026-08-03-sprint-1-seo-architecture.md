# Sprint 1 SEO architecture

The six planned landing pages are implemented. Each page owns one search intent and sends users to the existing deterministic checker for evaluation.

## Implemented landing pages

| URL | Primary intent | Existing tool to support it | Publish when |
| --- | --- | --- | --- |
| `/china-payment-checker` | Check whether China payment will work | `/checks/payment` | Published |
| `/china-app-checker` | Find apps needed for a China trip | `/checks/apps` | Published |
| `/china-phone-checker` | Check SIM, SMS and account recovery | `/checks/payment` | Published |
| `/china-booking-checker` | Check booking identities and channels | `/checks/readiness` | Published |
| `/china-hotel-checker` | Check foreign-guest hotel arrival readiness | `/checks/hotel-arrival` | Published |
| `/china-train-checker` | Check 12306 and passport booking readiness | `/checks/train-booking` | Published |

The landing pages are canonical SEO entry points for broad search intent. `/checks/[slug]` remains the interactive product surface.

## Topic clusters

- Payment: Alipay, WeChat Pay, Visa/Mastercard, cash, SMS, eSIM and original phone number.
- Apps: Alipay, WeChat, DiDi, Trip.com, maps and 12306.
- Train: booking channel, passport identity, ticket status, holidays and station-day preparation.
- Passport: hotels, trains, flights, attractions, real-name services and loss recovery.
- Hotels: foreign-guest readiness, name matching, late arrival, Chinese address and transport backup.
- Travel dates: public holidays, National Day, ticket pressure, hotel demand and attraction reservations.

Each cluster follows the same internal-link order: checker → FAQ → supporting guide. Guides do not lead the cluster.

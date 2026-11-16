import type { Article } from "../articles";

export const article: Article = {
  slug: "bank-reconciliation-explained",
  title: "Bank Reconciliation Explained in Plain English",
  description:
    "Bank reconciliation explained in plain English: how it differs from matching your bank feed, and how to get the difference to $0.00 in QuickBooks.",
  author: "Faizan Qureshi",
  publishDate: "2026-11-17",
  datePublished: "2026-11-17",
  dateModified: "2026-11-17",
  body: `If your bank account in QuickBooks shows a balance, it can still be wrong. The short answer: a bank reconciliation is the monthly check that your books match the actual bank or credit card statement, line by line, until the difference is $0.00. Matching your bank feed is a helpful first step. It is not the same as reconciling.

This article covers what a reconciliation is, how to do one in QuickBooks Online, and what to check when the difference will not go to zero. It is bookkeeping guidance, not tax advice. Questions about how a leftover difference should be treated on your tax return belong with your tax preparer. SteadyBooks does not file taxes.

## What a bank reconciliation is (and isn't)

Reconciling means you take a statement from your bank, credit card or payment app and compare it to the same account in your books. You check off every transaction that appears on both. When you're done, the ending balance in QuickBooks should match the ending balance on the statement, and the difference in the Reconcile tool should be $0.00.

What it is not:

- **Matching the bank feed.** Connecting a bank or card lets QuickBooks download transactions for you to match or categorize. That records what the bank already has. It does not prove your register is complete, or that last month's ending balance still holds.
- **Glancing at the balance.** The number in QuickBooks can look close to the bank app and still be off because of outstanding checks, pending deposits, duplicates or a transaction booked to the wrong account.

A finished reconciliation is the proof those issues have been found and fixed for that period.

## Why it matters

A clean reconciliation catches missing deposits, duplicate expenses and mistyped amounts before they sit in your reports. It also keeps your profit and loss and balance sheet trustworthy, and it gives your tax preparer books that are already tax-preparer-ready.

If you're also working through year-end, reconciling every account is the first step on our [year-end bookkeeping checklist](/articles/year-end-bookkeeping-checklist/).

## What you need before you start

- The statement for the account and period you're reconciling
- All transactions for that period entered and categorized in QuickBooks

If this is the first time the account has been reconciled, check that the opening balance in QuickBooks matches the statement balance on your start date. A wrong opening balance is one of the most common reasons a first reconciliation will not finish. Our guide on [how to set up QuickBooks Online for a new LLC](/articles/set-up-quickbooks-online-new-llc/) covers that first reconcile.

## How to reconcile in QuickBooks Online

The current steps in QuickBooks Online are:

1. Go to **All apps**, then **Reconcile**. (If you do not see it there, look under **Settings**, then **Reconcile**. Layouts vary.)
2. Choose the account. If you have more than one account at the same bank, pick the right one.
3. Check the last statement ending date. Your current statement should start the day after that.
4. Enter the **ending balance** and **ending date** exactly as they appear on the statement.
5. Select **Start reconciling**.
6. Check off each QuickBooks transaction that appears on the statement. Leave unchecked anything that has not cleared yet, like an outstanding check or a deposit still in transit.
7. Watch the **Difference**. Keep going until it is **$0.00**.
8. Select **Finish now**, then **Done**. QuickBooks saves a reconciliation report, which you can reopen later under **History by account**.

If a bank or card is connected, many transactions may already have a check mark from the bank feed. Still compare them to the statement. The feed can miss a day, import a duplicate or land a transfer in the wrong place.

Do this for every business checking and savings account, every business credit card, payment apps that hold a balance (such as Stripe, Square or PayPal), and any business loan or line of credit.

## When the difference is not $0.00

Do not finish and accept the difference. QuickBooks can create an adjusting entry to force the books to match, but that buries the error instead of finding it. Stay in the reconciliation and look for the cause.

Work through these in order:

1. **Recheck the ending date and ending balance you typed.** Select **Edit info** and compare both figures to the statement.
2. **Confirm the beginning balance.** It should match the ending balance from the last reconciliation, and the starting balance on this statement. If it is off, QuickBooks will usually show an alert and a **We can help you fix it** link, which opens the Reconcile Discrepancy Report. That report lists previously reconciled transactions that were later changed, voided or deleted.
3. **Look for a missing or duplicate transaction.** A payment on the statement that was never entered, a transfer booked twice, or an amount off by a digit will keep the difference from zero.
4. **Check combined deposits.** If the bank shows several customer payments as one deposit, your books should show one deposit for the same total.
5. **Check the account.** A transaction entered to the wrong bank or card will never appear in this reconciliation.

Once the difference is $0.00, then finish. If you are months behind, start with one account and one month, then keep going in order. Our guide on [how to catch up on bookkeeping before tax time](/articles/catch-up-bookkeeping-before-tax-time/) walks through that path.

## How often to reconcile

Reconcile each account every month, after the statement arrives. Waiting until year-end means matching a full year at once, which takes longer and makes small errors harder to find.

In mid-November, aim to have every account reconciled through October, then do November and December as soon as those statements arrive.

## Common questions

**Is matching the bank feed enough?**
No. Matching records the transactions. Reconciling proves the account matches the statement for that period.

**Should I check off outstanding checks?**
No. Leave them unchecked until they appear on a statement. They will clear in a later month.

**What if I already finished a reconciliation and then changed a transaction?**
That often throws off the next beginning balance. Use the Reconcile Discrepancy Report and fix the changed item before you start the next month.

**Does SteadyBooks include this in monthly bookkeeping?**
Yes. Bank and credit card reconciliation is part of every monthly plan. See [what monthly bookkeeping includes and costs](/articles/what-monthly-bookkeeping-includes/) for the details.

## Ready for accounts you can trust?

A bank reconciliation has a clear finish line: the difference is $0.00. Do it every month, for every account, and your reports stay tax-preparer-ready. SteadyBooks does not file taxes. We keep the records your tax preparer needs organized.

If you'd rather hand this off, monthly plans are $300, $500 or $800, and founding clients get 15% off for their first 6 months.

---

**About the author**
Written by Faizan Qureshi, owner of SteadyBooks. Bachelor's degree in accounting. 4+ years of hands-on bookkeeping and finance experience. QuickBooks Certified ProAdvisor.

SteadyBooks is 100% remote, serving clients across the US. If you'd like a second set of eyes on accounts that will not reconcile, [book a free 30-minute consult](https://calendly.com/faizan-steady-books/30min).
`,
};

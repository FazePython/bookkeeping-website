import assert from "node:assert/strict";
import test from "node:test";
import { chicagoDate, resolvePublishToday, selectPublished } from "./publishSchedule.ts";

const articles = [
  {
    slug: "in-house-bookkeeper-vs-outsourced-bookkeeping",
    title: "In-House Bookkeeper vs. Outsourced Bookkeeping: How to Choose",
    publishDate: "2026-10-21",
    datePublished: "2026-10-21",
  },
  {
    slug: "catch-up-bookkeeping-before-tax-time",
    title: "How to Catch Up on Bookkeeping Before Tax Time",
    publishDate: "2026-10-22",
    datePublished: "2026-10-22",
  },
  {
    slug: "bookkeeping-for-freelancers-1099-contractors",
    title: "Bookkeeping for Freelancers and 1099 Contractors: The Basics",
    publishDate: "2026-10-23",
    datePublished: "2026-10-23",
  },
  {
    slug: "set-up-quickbooks-online-new-llc",
    title: "How to Set Up QuickBooks Online for a New LLC (Step by Step)",
    publishDate: "2026-10-26",
    datePublished: "2026-10-26",
  },
  {
    slug: "sample-remote-bookkeeping",
    title: "Sample article for testing only",
    publishDate: "2026-10-21",
    datePublished: "2026-10-21",
    draft: true,
  },
];

function slugs(today: string) {
  return selectPublished(articles, today).map((article) => article.slug);
}

test("each publish date is excluded the day before and included on and after that date", () => {
  const cases = [
    ["2026-10-20", []],
    ["2026-10-21", ["in-house-bookkeeper-vs-outsourced-bookkeeping"]],
    [
      "2026-10-22",
      ["catch-up-bookkeeping-before-tax-time", "in-house-bookkeeper-vs-outsourced-bookkeeping"],
    ],
    [
      "2026-10-23",
      [
        "bookkeeping-for-freelancers-1099-contractors",
        "catch-up-bookkeeping-before-tax-time",
        "in-house-bookkeeper-vs-outsourced-bookkeeping",
      ],
    ],
    [
      "2026-10-25",
      [
        "bookkeeping-for-freelancers-1099-contractors",
        "catch-up-bookkeeping-before-tax-time",
        "in-house-bookkeeper-vs-outsourced-bookkeeping",
      ],
    ],
    [
      "2026-10-26",
      [
        "set-up-quickbooks-online-new-llc",
        "bookkeeping-for-freelancers-1099-contractors",
        "catch-up-bookkeeping-before-tax-time",
        "in-house-bookkeeper-vs-outsourced-bookkeeping",
      ],
    ],
    [
      "2026-10-27",
      [
        "set-up-quickbooks-online-new-llc",
        "bookkeeping-for-freelancers-1099-contractors",
        "catch-up-bookkeeping-before-tax-time",
        "in-house-bookkeeper-vs-outsourced-bookkeeping",
      ],
    ],
  ] as const;

  for (const [today, expected] of cases) {
    assert.deepEqual(slugs(today), expected, today);
  }
});

test("draft articles stay unpublished even when their publish date has arrived", () => {
  assert.equal(slugs("2026-10-21").includes("sample-remote-bookkeeping"), false);
});

test("America/Chicago date is not the UTC date around midnight", () => {
  // 23:59 CDT on Oct 21 is still Oct 21 in Chicago and already Oct 22 in UTC.
  assert.equal(chicagoDate(new Date("2026-10-22T04:59:00.000Z")), "2026-10-21");
  assert.equal(chicagoDate(new Date("2026-10-22T05:00:00.000Z")), "2026-10-22");
  // 23:59 CST on Jan 14 is Jan 15 in UTC.
  assert.equal(chicagoDate(new Date("2026-01-15T05:59:00.000Z")), "2026-01-14");
  assert.equal(chicagoDate(new Date("2026-01-15T06:00:00.000Z")), "2026-01-15");
});

test("BUILD_DATE overrides the clock and must be an ISO date", () => {
  const duringOct21Chicago = new Date("2026-10-22T04:30:00.000Z");
  assert.equal(resolvePublishToday(undefined, duringOct21Chicago), "2026-10-21");
  assert.equal(resolvePublishToday("2026-10-26", duringOct21Chicago), "2026-10-26");
  assert.equal(resolvePublishToday("  2026-10-23  ", duringOct21Chicago), "2026-10-23");
  assert.throws(() => resolvePublishToday("10/22/2026", duringOct21Chicago), /BUILD_DATE/);
});

test("a non-draft article without a publish date fails the filter", () => {
  assert.throws(
    () => selectPublished([{ slug: "missing-date", publishDate: "" }], "2026-10-21"),
    /publishDate/,
  );
});

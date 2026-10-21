import type { ReactNode } from "react";

type Block =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "hr" };

const inlinePattern = /`([^`]+)`|\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;

export function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let last = 0;
  let index = 0;
  inlinePattern.lastIndex = 0;
  let match = inlinePattern.exec(text);
  while (match) {
    const start = match.index;
    if (start > last) nodes.push(text.slice(last, start));
    if (match[1] !== undefined) {
      nodes.push(
        <code key={`${keyPrefix}-c${index}`} className="font-body">
          {match[1]}
        </code>,
      );
    } else if (match[2] !== undefined) {
      nodes.push(<strong key={`${keyPrefix}-b${index}`}>{match[2]}</strong>);
    } else {
      nodes.push(
        <a
          key={`${keyPrefix}-a${index}`}
          href={match[4]}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-navy underline decoration-gold underline-offset-4"
        >
          {match[3]}
        </a>,
      );
    }
    last = start + match[0].length;
    index += 1;
    match = inlinePattern.exec(text);
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

function splitTableRow(line: string) {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function isTableRule(line: string) {
  return /^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$/.test(line.trim());
}

export function parseArticleBody(markdown: string): Block[] {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    if (line.trim() === "") {
      index += 1;
      continue;
    }
    if (line.trim() === "---") {
      blocks.push({ type: "hr" });
      index += 1;
      continue;
    }
    if (line.startsWith("### ")) {
      blocks.push({ type: "h3", text: line.slice(4) });
      index += 1;
      continue;
    }
    if (line.startsWith("## ")) {
      blocks.push({ type: "h2", text: line.slice(3) });
      index += 1;
      continue;
    }
    if (line.startsWith("|")) {
      const tableLines: string[] = [];
      while (index < lines.length && lines[index].startsWith("|")) {
        tableLines.push(lines[index]);
        index += 1;
      }
      const headers = splitTableRow(tableLines[0] ?? "");
      const rows = tableLines.slice(1).filter((row) => !isTableRule(row)).map(splitTableRow);
      blocks.push({ type: "table", headers, rows });
      continue;
    }
    if (line.startsWith("- ")) {
      const items: string[] = [];
      while (index < lines.length && lines[index].startsWith("- ")) {
        const item = lines[index].slice(2);
        items.push(item.startsWith("[ ] ") ? item.slice(4) : item);
        index += 1;
      }
      blocks.push({ type: "ul", items });
      continue;
    }
    if (/^\d+\. /.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^\d+\. /.test(lines[index])) {
        items.push(lines[index].replace(/^\d+\. /, ""));
        index += 1;
      }
      blocks.push({ type: "ol", items });
      continue;
    }
    blocks.push({ type: "p", text: line });
    index += 1;
  }

  return blocks;
}

function ArticleTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-stone-dark bg-white">
      <table className="w-full table-fixed border-collapse text-left font-body text-sm text-navy">
        <thead>
          <tr className="bg-stone">
            {headers.map((header, index) => (
              <th
                key={`h-${index}`}
                scope="col"
                className="px-3 py-3 align-top font-semibold border-b border-stone-dark break-words"
              >
                {renderInline(header, `th-${index}`)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={`r-${rowIndex}`}>
              {row.map((cell, cellIndex) => {
                const Cell = cellIndex === 0 ? "th" : "td";
                return (
                  <Cell
                    key={`c-${rowIndex}-${cellIndex}`}
                    scope={cellIndex === 0 ? "row" : undefined}
                    className={`px-3 py-3 align-top border-b border-stone-dark break-words ${
                      cellIndex === 0 ? "font-semibold" : ""
                    } ${rowIndex === rows.length - 1 ? "border-b-0" : ""}`}
                  >
                    {renderInline(cell, `c-${rowIndex}-${cellIndex}`)}
                  </Cell>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function renderBlock(block: Block, index: number) {
  if (block.type === "hr") return null;
  if (block.type === "h2") {
    return (
      <h2 key={index} className="font-display font-semibold text-2xl sm:text-3xl text-navy mt-10 mb-3">
        {renderInline(block.text, `h2-${index}`)}
      </h2>
    );
  }
  if (block.type === "h3") {
    return (
      <h3 key={index} className="font-display font-semibold text-xl text-navy mt-6 mb-2">
        {renderInline(block.text, `h3-${index}`)}
      </h3>
    );
  }
  if (block.type === "ul") {
    return (
      <ul key={index} className="list-disc pl-5 space-y-2 font-body text-base text-navy/80 leading-relaxed">
        {block.items.map((item, itemIndex) => (
          <li key={itemIndex}>{renderInline(item, `ul-${index}-${itemIndex}`)}</li>
        ))}
      </ul>
    );
  }
  if (block.type === "ol") {
    return (
      <ol key={index} className="list-decimal pl-5 space-y-2 font-body text-base text-navy/80 leading-relaxed">
        {block.items.map((item, itemIndex) => (
          <li key={itemIndex}>{renderInline(item, `ol-${index}-${itemIndex}`)}</li>
        ))}
      </ol>
    );
  }
  if (block.type === "table") {
    return <ArticleTable key={index} headers={block.headers} rows={block.rows} />;
  }
  if (block.text === "**About the author**") {
    return (
      <p key={index} className="font-display font-semibold text-xl text-navy">
        About the author
      </p>
    );
  }
  return (
    <p key={index} className="font-body text-base sm:text-lg text-navy/80 leading-relaxed">
      {renderInline(block.text, `p-${index}`)}
    </p>
  );
}

export default function ArticleBody({ markdown }: { markdown: string }) {
  const blocks = parseArticleBody(markdown);
  const authorAt = blocks.findIndex((block) => block.type === "p" && block.text === "**About the author**");
  const main = authorAt === -1 ? blocks : blocks.slice(0, authorAt);
  const author = authorAt === -1 ? [] : blocks.slice(authorAt);
  while (main.length > 0 && main[main.length - 1].type === "hr") main.pop();

  return (
    <div data-article-body className="space-y-4">
      {main.map(renderBlock)}
      {author.length > 0 ? (
        <aside className="mt-8 rounded-2xl border border-stone-dark bg-stone p-6 space-y-3">
          {author.map(renderBlock)}
        </aside>
      ) : null}
    </div>
  );
}

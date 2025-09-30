import { readFileSync, readdirSync, statSync } from "fs";
import { join, extname } from "path";

function findMarkdownFiles(dir) {
  const files = [];

  function walk(currentDir) {
    const items = readdirSync(currentDir);

    for (const item of items) {
      const fullPath = join(currentDir, item);
      const stat = statSync(fullPath);

      if (stat.isDirectory() && item !== "node_modules") {
        walk(fullPath);
      } else if (stat.isFile() && extname(item) === ".md") {
        files.push(fullPath);
      }
    }
  }

  walk(dir);
  return files;
}

function lintFile(filePath) {
  const content = readFileSync(filePath, "utf-8");
  const lines = content.split("\n");
  const issues = [];

  let inCodeBlock = false;

  // Helper to determine if a given index in a line is inside inline backticks
  function isInsideBackticks(line, index) {
    const before = line.slice(0, index);
    const countBackticksBefore = (before.match(/`/g) || []).length;
    return countBackticksBefore % 2 === 1;
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNumber = i + 1;

    // Track if we're inside a fenced code block
    if (line.trim().startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      continue;
    }

    // Skip linting inside code blocks
    if (inCodeBlock) {
      continue;
    }

    // Check for developers?.schoology.com URLs that aren't images or downloads
    // Find complete URLs by looking for the pattern and extracting the full URL
    const schoologyMatches = [];
    let match;
    const basicRegex = /https:\/\/developers?\.schoology\.com/g;

    while ((match = basicRegex.exec(line)) !== null) {
      const startIndex = match.index;
      let url = match[0];

      // Extract the rest of the URL until we hit the appropriate delimiter
      const remaining = line.substring(startIndex + url.length);

      // Check if URL is inside angle brackets <url>
      const beforeUrl = line.substring(0, startIndex);
      if (beforeUrl.endsWith("<")) {
        // URL is in angle brackets, continue until closing >
        const urlContinuation = remaining.match(/^[^>]*/);
        if (urlContinuation) {
          url += urlContinuation[0];
        }
      } else {
        // Regular URL, stop at whitespace or common delimiters
        const urlContinuation = remaining.match(/^[^\s)>]*/);
        if (urlContinuation) {
          url += urlContinuation[0];
        }
      }

      schoologyMatches.push({
        url: url,
        index: startIndex,
      });
    }

    for (const { url, index } of schoologyMatches) {
      // Skip if it's an image file (including URL-encoded extensions)
      if (/\.(png|jpg|jpeg|gif|svg|webp)/i.test(url)) {
        continue;
      }

      // Skip if it's a download file (zip, pdf, etc.)
      if (/\.(zip|pdf|tar|gz|rar|7z)$/i.test(url)) {
        continue;
      }

      // Clean up the URL (remove trailing quotes or other punctuation that might not be part of the URL)
      const cleanUrl = url.replace(/['"]+$/, "");

      issues.push({
        line: lineNumber,
        column: index + 1,
        message: `Found schoology.com URL that isn't an image: ${cleanUrl}`,
        type: "schoology-url",
      });
    }

    // Check for redundant markdown links where the shown text starts with http(s)
    // e.g. [https://a](https://b) or [http://example.com](http://example.com)
    const redundantLinkRegex =
      /\[(https?:\/\/[^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;

    while ((match = redundantLinkRegex.exec(line)) !== null) {
      // Skip image syntax like ![...](...)
      if (match.index > 0 && line[match.index - 1] === "!") {
        continue;
      }

      const shown = match[1];
      const href = match[2];

      issues.push({
        line: lineNumber,
        column: match.index + 1,
        message: `Redundant markdown link found: [${shown}](${href}) - could be just ${shown}`,
        type: "redundant-link",
      });
    }

    // Error on table headers that use "required" (e.g. "| required |")
    // Prefer using "*" to indicate required fields instead of a "required" header
    const requiredHeaderRegex = /\|\s+required\s+\|/i;
    const reqMatch = requiredHeaderRegex.exec(line);
    if (reqMatch) {
      issues.push({
        line: lineNumber,
        column: reqMatch.index + 1,
        message:
          "Don't use 'required' as a table header; use '*' to indicate required fields instead",
        type: "required-header",
      });
    }

    // New rule: don't use curly (smart) quotes — use straight quotes ' or " instead
    // Detect left/right single and double curly quotes: ‘ ’ “ ”
    const curlyRegex = /[\u2018\u2019\u201C\u201D]/g;
    let curlyMatch;
    while ((curlyMatch = curlyRegex.exec(line)) !== null) {
      // Skip if inside inline code span
      if (isInsideBackticks(line, curlyMatch.index)) {
        continue;
      }

      issues.push({
        line: lineNumber,
        column: curlyMatch.index + 1,
        message: `Found curly quote "${curlyMatch[0]}" — use straight quotes (' or ") instead`,
        type: "curly-quote",
      });
    }

    // New rule: don't explicitly list out operations by using the word "list," — prefer describing the action
    // Trigger on the token 'list,' (case-insensitive) when not inside inline code
    const listCommaRegex = /\blist,/gi;
    let listMatch;
    while ((listMatch = listCommaRegex.exec(line)) !== null) {
      const matchIndex = listMatch.index;
      // Skip if inside inline code span
      if (isInsideBackticks(line, matchIndex)) {
        continue;
      }

      issues.push({
        line: lineNumber,
        column: matchIndex + 1,
        message:
          'Don\'t explicitly list out operations using "list," — just describe it',
        type: "explicit-list",
      });
    }

    // New rule: don't misuse single/double quotes for data field names that are clearly snake_case.
    // Prefer using backticks for field identifiers: `field_name` instead of 'field_name' or "field_name"
    const quotedFieldRegex = /(['"])([a-z0-9]+_[a-z0-9_]+)\1/g;
    let qMatch;
    while ((qMatch = quotedFieldRegex.exec(line)) !== null) {
      const matchIndex = qMatch.index;
      // Skip if inside inline code span
      if (isInsideBackticks(line, matchIndex)) {
        continue;
      }

      const quoted = qMatch[0];
      const fieldName = qMatch[2];

      // Heuristic: ensure it's not part of a larger word like foo'bar' by checking surrounding characters
      const charBefore = line[matchIndex - 1];
      const charAfter = line[matchIndex + quoted.length];
      const beforeIsAlphaNum = charBefore && /[A-Za-z0-9_]/.test(charBefore);
      const afterIsAlphaNum = charAfter && /[A-Za-z0-9_]/.test(charAfter);
      if (beforeIsAlphaNum || afterIsAlphaNum) {
        // probably not an isolated quoted identifier, skip
        continue;
      }

      issues.push({
        line: lineNumber,
        column: matchIndex + 1,
        message: `Quoted field "${fieldName}" looks like a snake_case identifier — use backticks: \`${fieldName}\` instead of ${quoted}`,
        type: "quoted-field",
      });
    }

    // New rule: don't use emphasis (*, **, _ or __) around snake_case field names — use backticks
    // Detect patterns like *field_name*, **field_name**, _field_name_, or __field_name__
    const emphasisFieldRegex = /(\*\*|\*|__|_)([a-z0-9]+_[a-z0-9_]+)\1/g;
    let eMatch;
    while ((eMatch = emphasisFieldRegex.exec(line)) !== null) {
      const matchIndex = eMatch.index;
      // Skip if inside inline code span
      if (isInsideBackticks(line, matchIndex)) {
        continue;
      }

      const delim = eMatch[1]; // '*', '**', '_' or '__'
      const fieldName = eMatch[2];
      const fullMatch = eMatch[0];

      // Heuristic: ensure it's not part of a larger word like foo*bar* by checking surrounding characters
      const charBefore = line[matchIndex - 1];
      const charAfter = line[matchIndex + fullMatch.length];
      const beforeIsAlphaNum = charBefore && /[A-Za-z0-9_]/.test(charBefore);
      const afterIsAlphaNum = charAfter && /[A-Za-z0-9_]/.test(charAfter);
      if (beforeIsAlphaNum || afterIsAlphaNum) {
        // probably not an isolated emphasized identifier, skip
        continue;
      }

      issues.push({
        line: lineNumber,
        column: matchIndex + 1,
        message: `Emphasized field "${fieldName}" is wrapped with ${delim} — use backticks: \`${fieldName}\` instead of ${delim}${fieldName}${delim}`,
        type: "emphasis-field",
      });
    }

    // New rule: after "**Content** " or "**Return** ", the next letter must be uppercase
    const capAfterRegex = /\*\*(Content|Return)\*\*\s+([a-z])/g;
    let capMatch;
    while ((capMatch = capAfterRegex.exec(line)) !== null) {
      const wholeMatch = capMatch[0];
      const heading = capMatch[1]; // "Content" or "Return"
      const foundChar = capMatch[2]; // the lowercase letter found
      const matchStart = capMatch.index;

      // Find position of the foundChar within the wholeMatch to compute column
      const posInMatch = wholeMatch.indexOf(foundChar);
      const letterIndex = matchStart + posInMatch;

      // Skip if inside inline code span
      if (isInsideBackticks(line, letterIndex)) {
        continue;
      }

      issues.push({
        line: lineNumber,
        column: letterIndex + 1,
        message: `After "**${heading}** " the next character must be uppercase — found "${foundChar}"`,
        type: `${heading.toLowerCase()}-capitalization`,
      });
    }
  }

  return issues;
}

function main() {
  const cwd = process.cwd();
  const markdownFiles = findMarkdownFiles(cwd);

  let totalIssues = 0;

  for (const file of markdownFiles) {
    const issues = lintFile(file);

    if (issues.length > 0) {
      console.log(`\n📄 ${file}`);

      for (const issue of issues) {
        console.log(`  ${issue.line}:${issue.column} - ${issue.message}`);
        totalIssues++;
      }
    }
  }

  if (totalIssues === 0) {
    console.log("✅ No issues found!");
  } else {
    console.log(
      `\n🔍 Found ${totalIssues} issue(s) across ${markdownFiles.length} file(s)`,
    );
  }
}

main();

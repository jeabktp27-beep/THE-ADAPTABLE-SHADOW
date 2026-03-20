const fs = require('fs');
const file = 'C:/Users/jeabk/sjkhsfdjghk/project/src/App.jsx';
let lines = fs.readFileSync(file, 'utf8').split('\n');

// 1. Remove the duplicated block. (Lines 516 to 711 inclusive, index 515-710)
// We check if line 516 matches the start of the duplicate block
if (lines[515] && lines[515].includes('หน้าแสดงภาพตัวอย่างท่า')) {
  lines.splice(515, 711 - 515);
  console.log("Deleted duplicate block from line 516 to 711.");
} else {
  console.log("Duplicate block not found at line 516. Searching...");
  const startIdx = lines.findIndex(l => l.includes('หน้าแสดงภาพตัวอย่างท่า'));
  const endIdx = lines.findIndex((l, i) => i > startIdx && l.includes('หน้าแสดงภาพตัวอย่างท่า'));
  if (startIdx !== -1 && endIdx !== -1) {
    lines.splice(startIdx, endIdx - startIdx);
    console.log(`Deleted duplicate block from line ${startIdx+1} to ${endIdx}.`);
  }
}

let text = lines.join('\n');

// 2. Fix the p tag Syntax Error
text = text.replace(
  /<p style={{ fontFamily: ".*?marginTop: "12px", lineHeight: 1\.8 }}>\s*\)\)\}\s*<\/div>\s*<\/div>/g, 
  `<p style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", color: "#ffffff55", marginTop: "12px", lineHeight: 1.8 }}>
          {guides[exercise] ? guides[exercise].reason : guides.pushup.reason}
        </p>
      </div>` // Wait, if we replace two </div>'s, we need to put them back or check if they belong elsewhere
);

// Actually, the original JSX had </div></div> at the end.
text = text.replace(
  /\)\)\}\s*<\/div>\s*<\/div>/g,
  `  {guides[exercise] ? guides[exercise].reason : guides.pushup.reason}
        </p>
      </div>
    </div>`
);

fs.writeFileSync(file, text);
console.log("Successfully fixed the p tag issue!");

const { chromium } = require('playwright');
const fs = require('fs');

async function main() {
  const url = 'https://turo.com/us/en/suv-rental/canada/ottawa-on/jeep/cherokee/1864440?endDate=01%2F18%2F2024&endTime=10%3A00&searchId=9kUf_5ib&startDate=01%2F16%2F2024&startTime=12%3A00'
  const browser = await chromium.launch({
    headless: false,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(url)
  // Extract the content or perform further actions here
  const content = await page.content();
  
  // write to a file
  fs.writeFile('index.html', content, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
  // Close the browser
  await browser.close();
}

main()
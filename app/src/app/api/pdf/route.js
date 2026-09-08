import puppeteer from 'puppeteer';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { html } = await req.json();

    if (!html) {
      return NextResponse.json({ error: 'HTML is required' }, { status: 400 });
    }

    // Determine the base URL from the request headers
    const host = req.headers.get('host');
    const protocol = req.headers.get('x-forwarded-proto') || 'http';
    const baseUrl = `${protocol}://${host}`;

    // Inject base tag into the HTML head so relative assets resolve properly
    const htmlWithBase = html.replace(
      '<head>',
      `<head><base href="${baseUrl}">`
    );

    // Launch puppeteer
    const browser = await puppeteer.launch({
      headless: "new",
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Set viewport to the target width (675.12pt is about 900px, but we'll use exact pt in pdf)
    await page.setViewport({ width: 900, height: 1123, deviceScaleFactor: 2 });
    
    // Load HTML and wait for network idle to ensure fonts and images are loaded
    await page.setContent(htmlWithBase, { waitUntil: 'networkidle0' });

    // Wait for React to render the main Ficha container
    try {
      await page.waitForSelector('.FichaPage', { timeout: 10000 });
    } catch (e) {
      console.warn('FichaPage not found within timeout, proceeding with height calculation anyway', e);
    }

    // Calculate actual height of the content (adding 1px to avoid rounding clipping)
    const contentHeight = await page.evaluate(() => {
      const ficha = document.querySelector('.FichaPage');
      const root = document.getElementById('root');
      return Math.ceil(ficha ? ficha.offsetHeight : (root ? root.offsetHeight : document.body.scrollHeight)) + 1;
    });

    // Generate PDF with fixed width and dynamic height
    const pdfBuffer = await page.pdf({
      width: '900px',
      height: `${contentHeight}px`,
      pageRanges: '1', // Only export the first page
      printBackground: true, // Forces background colors and images
      margin: {
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px'
      }
    });

    await browser.close();

    // Return the PDF buffer
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="ficha.pdf"',
      },
    });

  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF', details: error.message },
      { status: 500 }
    );
  }
}

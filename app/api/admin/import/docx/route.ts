import { NextResponse } from 'next/server';
import mammoth from 'mammoth';
import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';

const turndownService = new TurndownService({ headingStyle: 'atx', bulletListMarker: '-' });
turndownService.use(gfm); // adds table/strikethrough/task-list support

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('file');

  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'No file was uploaded.' }, { status: 400 });
  }

  const isDocx =
    file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    file.name.toLowerCase().endsWith('.docx');
  if (!isDocx) {
    return NextResponse.json({ error: 'Please upload a .docx file (Word\'s newer format; .doc is not supported).' }, { status: 400 });
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const { value: html, messages } = await mammoth.convertToHtml({ buffer });
    const markdown = turndownService.turndown(html);

    return NextResponse.json({
      markdown,
      // mammoth reports things it couldn't convert perfectly (e.g. unusual styles) — surfaced so the admin can double-check, not hidden.
      warnings: messages.filter((message) => message.type === 'warning').map((message) => message.message),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Could not read this document.';
    return NextResponse.json({ error: message }, { status: 422 });
  }
}

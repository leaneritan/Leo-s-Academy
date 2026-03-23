import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'data', 'reading.json');

export async function GET() {
  const data = fs.readFileSync(DATA_PATH, 'utf8');
  return NextResponse.json(JSON.parse(data));
}

export async function POST(request: Request) {
  const body = await request.json();
  const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));

  if (body.type === 'assign') {
    // Teacher mode assignment
    const newBook = {
      id: body.title.toLowerCase().replace(/\s+/g, '-'),
      title: body.title,
      titleJapanese: body.titleJapanese,
      author: body.author,
      authorJapanese: body.authorJapanese || body.author,
      coverImage: body.coverImage || "",
      language: "Japanese",
      status: "reading",
      progress: 0
    };
    data.books.push(newBook);
  } else {
    // Student finishing a book
    const bookIndex = data.books.findIndex((b: any) => b.id === body.id);
    if (bookIndex !== -1) {
      data.books[bookIndex] = {
        ...data.books[bookIndex],
        ...body,
        status: 'finished'
      };
      data.monthlyGoal.completed += 1;
    }
  }

  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
  return NextResponse.json({ success: true });
}

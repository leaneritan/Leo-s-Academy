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

  if (body.type === 'assign' || body.type === 'add') {
    // Teacher mode assignment or Leo adding a book
    const newBook = {
      id: body.id || (body.title || body.titleJapanese || 'book').toLowerCase().replace(/\s+/g, '-') + '-' + Date.now(),
      title: body.title || body.titleJapanese || "",
      titleJapanese: body.titleJapanese || body.title || "",
      author: body.author || body.authorJapanese || "",
      authorJapanese: body.authorJapanese || body.author || "",
      genre: body.genre || "",
      coverColor: body.coverColor || "#056662",
      coverImage: body.coverImage || "",
      language: "Japanese",
      status: "reading",
      progress: body.progress || 0
    };
    data.books.push(newBook);
  } else {
    // Update or Finish
    const bookIndex = data.books.findIndex((b: any) => b.id === body.id);
    if (bookIndex !== -1) {
      const isFinishing = body.status === 'finished' && data.books[bookIndex].status !== 'finished';

      data.books[bookIndex] = {
        ...data.books[bookIndex],
        ...body
      };

      if (isFinishing) {
        data.monthlyGoal.completed += 1;
        if (!data.books[bookIndex].dateFinished) {
          data.books[bookIndex].dateFinished = new Date().toISOString().split('T')[0];
        }
      }
    }
  }

  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
  return NextResponse.json({ success: true });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Book ID is required' }, { status: 400 });
  }

  const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
  const initialCount = data.books.length;
  data.books = data.books.filter((b: any) => b.id !== id);

  if (data.books.length < initialCount) {
    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: 'Book not found' }, { status: 404 });
}

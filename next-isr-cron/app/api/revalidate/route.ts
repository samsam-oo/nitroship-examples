import { revalidateTag } from 'next/cache';

export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret || request.headers.get('authorization') !== `Bearer ${secret}`) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const tag = new URL(request.url).searchParams.get('tag');
  if (!tag) {
    return Response.json({ error: 'Provide a tag query parameter' }, { status: 400 });
  }

  revalidateTag(tag, { expire: 0 });
  return Response.json({ revalidated: true, tag });
}

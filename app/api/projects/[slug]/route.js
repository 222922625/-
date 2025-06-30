import { NextResponse } from 'next/server';
import { getProjectBySlug } from '../../../../lib/github';

export async function GET(request, { params }) {
  try {
    const { slug } = params;
    const project = await getProjectBySlug(slug);

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch project details' },
      { status: 500 }
    );
  }
}
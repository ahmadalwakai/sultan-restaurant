import { NextRequest, NextResponse } from 'next/server';
import { getDirections } from '@/lib/services/maps/directions.service';
import { z } from 'zod';

const directionsSchema = z.object({
  origin: z.string().min(1, 'Origin is required'),
  destination: z.string().min(1, 'Destination is required'),
  mode: z.enum(['driving', 'walking', 'transit']).default('driving'),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const origin = searchParams.get('origin');
    const destination = searchParams.get('destination') || '577 Gallowgate, Glasgow, G40 2PE';
    const mode = searchParams.get('mode') || 'driving';

    const validation = directionsSchema.safeParse({ origin, destination, mode });
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid parameters', details: validation.error.issues },
        { status: 400 }
      );
    }

    const directions = await getDirections({
      origin: validation.data.origin,
      destination: validation.data.destination,
      travelMode: validation.data.mode as 'driving' | 'walking' | 'transit' | 'bicycling',
    });

    return NextResponse.json(directions);
  } catch (error) {
    console.error('Error fetching directions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch directions' },
      { status: 500 }
    );
  }
}
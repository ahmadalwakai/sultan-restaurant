import { NextRequest, NextResponse } from 'next/server';
import { calculateDistance } from '@/lib/services/maps/distance.service';
import { z } from 'zod';

const distanceSchema = z.object({
  origin: z.string().min(1, 'Origin is required'),
  destination: z.string().min(1, 'Destination is required'),
  units: z.enum(['metric', 'imperial']).default('imperial'),
  mode: z.enum(['driving', 'walking', 'transit']).default('driving'),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const origin = searchParams.get('origin');
    const destination = searchParams.get('destination') || '577 Gallowgate, Glasgow, G40 2PE';
    const units = searchParams.get('units') || 'imperial';
    const mode = searchParams.get('mode') || 'driving';

    const validation = distanceSchema.safeParse({ origin, destination, units, mode });
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid parameters', details: validation.error.issues },
        { status: 400 }
      );
    }

    const distance = await calculateDistance({
      origins: [validation.data.origin],
      destinations: [validation.data.destination],
      unitSystem: validation.data.units as 'metric' | 'imperial',
      travelMode: validation.data.mode as 'driving' | 'walking' | 'transit',
    });

    return NextResponse.json(distance);
  } catch (error) {
    console.error('Error calculating distance:', error);
    return NextResponse.json(
      { error: 'Failed to calculate distance' },
      { status: 500 }
    );
  }
}
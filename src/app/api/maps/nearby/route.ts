import { NextRequest, NextResponse } from 'next/server';
import { findNearbyPlaces } from '@/lib/services/maps/nearby.service';
import { z } from 'zod';

const nearbySchema = z.object({
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
  type: z.enum(['restaurant', 'parking', 'supermarket', 'pharmacy', 'bank', 'atm']).optional().default('restaurant'),
  radius: z.number().min(100).max(50000).optional().default(2000), // 2km default
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');
    const type = searchParams.get('type');
    const radius = searchParams.get('radius');

    const validation = nearbySchema.safeParse({
      lat: lat ? parseFloat(lat) : undefined,
      lng: lng ? parseFloat(lng) : undefined,
      type,
      radius: radius ? parseInt(radius) : undefined,
    });

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid parameters', details: validation.error.issues },
        { status: 400 }
      );
    }

    const places = await findNearbyPlaces({
      location: {
        lat: validation.data.lat,
        lng: validation.data.lng,
      },
      type: validation.data.type,
      radius: validation.data.radius,
    });

    return NextResponse.json(places);
  } catch (error) {
    console.error('Error finding nearby places:', error);
    return NextResponse.json(
      { error: 'Failed to find nearby places' },
      { status: 500 }
    );
  }
}
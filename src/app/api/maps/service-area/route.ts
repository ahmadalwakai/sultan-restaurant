import { NextRequest, NextResponse } from 'next/server';
import { checkServiceAreaCoverage } from '@/lib/services/maps/service-area.service';
import { z } from 'zod';

const serviceAreaSchema = z.object({
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
}).or(z.object({
  postcode: z.string().min(1, 'Postcode is required'),
}));

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');
    const postcode = searchParams.get('postcode');

    let coordinates;
    if (lat && lng) {
      coordinates = { lat: parseFloat(lat), lng: parseFloat(lng) };
    } else if (postcode) {
      coordinates = { postcode };
    } else {
      return NextResponse.json(
        { error: 'Either lat/lng or postcode is required' },
        { status: 400 }
      );
    }

    const validation = serviceAreaSchema.safeParse(coordinates);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid parameters', details: validation.error.issues },
        { status: 400 }
      );
    }

    const coverage = await checkServiceAreaCoverage(validation.data);

    return NextResponse.json(coverage);
  } catch (error) {
    console.error('Error checking service area:', error);
    return NextResponse.json(
      { error: 'Failed to check service area' },
      { status: 500 }
    );
  }
}
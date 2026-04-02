import { NextRequest, NextResponse } from 'next/server';
import { geocodeAddress } from '@/lib/services/maps/geocode.service';
import { z } from 'zod';

const geocodeSchema = z.object({
  address: z.string().min(1, 'Address is required'),
  region: z.string().optional().default('GB'), // Default to UK
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get('address');
    const region = searchParams.get('region');

    const validation = geocodeSchema.safeParse({ address, region });
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid parameters', details: validation.error.issues },
        { status: 400 }
      );
    }

    const result = await geocodeAddress(validation.data.address, validation.data.region);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error geocoding address:', error);
    return NextResponse.json(
      { error: 'Failed to geocode address' },
      { status: 500 }
    );
  }
}
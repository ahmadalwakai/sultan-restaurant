import { NextRequest, NextResponse } from 'next/server';
import { RESTAURANT_LOCATION } from '@/data/maps/restaurant-coordinates';
import { SERVICE_AREA_POLYGON } from '@/data/maps/service-area-polygon';

export async function GET() {
  try {
    const restaurant = {
      coordinates: RESTAURANT_LOCATION.coordinates,
      address: RESTAURANT_LOCATION.address,
      name: RESTAURANT_LOCATION.name,
    };

    const serviceArea = {
      center: RESTAURANT_LOCATION.coordinates,
      polygon: SERVICE_AREA_POLYGON,
      radius: 5000, // 5km
    };

    return NextResponse.json({
      restaurant,
      serviceArea,
    });
  } catch (error) {
    console.error('Error fetching restaurant data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch restaurant data' },
      { status: 500 }
    );
  }
}
import { Loader } from '@googlemaps/js-api-loader';

let loader: Loader | null = null;
let isLoaded = false;

export interface GoogleMapsConfig {
  apiKey: string;
  version?: string;
  libraries?: string[];
  region?: string;
  language?: string;
}

export class GoogleMapsClient {
  private static instance: GoogleMapsClient;
  private config: GoogleMapsConfig;
  private loader: Loader;

  private constructor(config: GoogleMapsConfig) {
    this.config = {
      version: 'weekly',
      libraries: ['places', 'geometry'],
      region: 'GB',
      language: 'en',
      ...config,
    };

    this.loader = new Loader({
      apiKey: this.config.apiKey,
      version: this.config.version,
      libraries: this.config.libraries as any,
      region: this.config.region,
      language: this.config.language,
    });
  }

  public static getInstance(config?: GoogleMapsConfig): GoogleMapsClient {
    if (!GoogleMapsClient.instance) {
      if (!config?.apiKey) {
        throw new Error('Google Maps API key is required for initialization');
      }
      GoogleMapsClient.instance = new GoogleMapsClient(config);
    }
    return GoogleMapsClient.instance;
  }

  public async load(): Promise<typeof google.maps> {
    if (isLoaded && window.google?.maps) {
      return window.google.maps;
    }

    try {
      // For @googlemaps/js-api-loader v2.0.2, the API might be different
      // Try to access the loader differently
      const loaderInstance = this.loader as any;
      if (loaderInstance.loadCallback) {
        await new Promise<void>((resolve, reject) => {
          loaderInstance.loadCallback(() => {
            isLoaded = true;
            resolve();
          }, reject);
        });
      } else {
        // Fallback: assume it's already loaded or use a timeout
        await new Promise(resolve => setTimeout(resolve, 100));
        if (window.google?.maps) {
          isLoaded = true;
          return window.google.maps;
        }
        throw new Error('Google Maps failed to load');
      }
      return window.google!.maps;
    } catch (error) {
      console.error('Failed to load Google Maps:', error);
      throw new Error('Failed to load Google Maps API');
    }
  }

  public async isApiKeyValid(): Promise<boolean> {
    try {
      await this.load();
      return true;
    } catch (error) {
      return false;
    }
  }

  public getConfig(): GoogleMapsConfig {
    return { ...this.config };
  }
}

// Utility function to get the Google Maps client instance
export const getGoogleMapsClient = (apiKey?: string): GoogleMapsClient => {
  const config: GoogleMapsConfig = {
    apiKey: apiKey || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  };

  if (!config.apiKey) {
    throw new Error('Google Maps API key not found. Please set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY');
  }

  return GoogleMapsClient.getInstance(config);
};
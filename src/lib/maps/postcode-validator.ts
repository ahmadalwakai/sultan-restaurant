// UK Postcode validation and utilities
export interface PostcodeValidationResult {
  isValid: boolean;
  normalized: string;
  area: string;
  district: string;
  sector: string;
  unit: string;
  error?: string;
}

export class PostcodeValidator {
  private static instance: PostcodeValidator;

  // UK postcode regex patterns
  private static readonly POSTCODE_REGEX = {
    // Standard UK postcode format: AA9A 9AA or A9A 9AA or A9 9AA or A99 9AA or AA9 9AA or AA99 9AA
    FULL: /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i,
    // Outward code (first part)
    OUTWARD: /^[A-Z]{1,2}\d[A-Z\d]?$/i,
    // Inward code (second part)
    INWARD: /^\d[A-Z]{2}$/i,
  };

  private constructor() {}

  public static getInstance(): PostcodeValidator {
    if (!PostcodeValidator.instance) {
      PostcodeValidator.instance = new PostcodeValidator();
    }
    return PostcodeValidator.instance;
  }

  public validate(postcode: string): PostcodeValidationResult {
    if (!postcode || typeof postcode !== 'string') {
      return {
        isValid: false,
        normalized: '',
        area: '',
        district: '',
        sector: '',
        unit: '',
        error: 'Postcode is required',
      };
    }

    // Normalize postcode: remove spaces and convert to uppercase
    const normalized = postcode.replace(/\s+/g, '').toUpperCase();

    if (!PostcodeValidator.POSTCODE_REGEX.FULL.test(normalized)) {
      return {
        isValid: false,
        normalized,
        area: '',
        district: '',
        sector: '',
        unit: '',
        error: 'Invalid UK postcode format',
      };
    }

    // Parse postcode components
    const parts = this.parsePostcode(normalized);

    return {
      isValid: true,
      normalized: parts.formatted,
      area: parts.area,
      district: parts.district,
      sector: parts.sector,
      unit: parts.unit,
    };
  }

  private parsePostcode(postcode: string): {
    formatted: string;
    area: string;
    district: string;
    sector: string;
    unit: string;
  } {
    // Split into outward and inward codes
    const outwardMatch = postcode.match(/^([A-Z]{1,2}\d[A-Z\d]?)/i);
    const inwardMatch = postcode.match(/(\d[A-Z]{2})$/i);

    if (!outwardMatch || !inwardMatch) {
      throw new Error('Invalid postcode structure');
    }

    const outward = outwardMatch[1];
    const inward = inwardMatch[1];

    // Format with space
    const formatted = `${outward} ${inward}`;

    // Extract components
    const area = outward.replace(/\d.*$/, ''); // Letters before first digit
    const district = outward; // Full outward code
    const sector = inward.charAt(0); // First digit of inward code
    const unit = inward.substring(1); // Last two letters

    return {
      formatted,
      area,
      district,
      sector,
      unit,
    };
  }

  public isValid(postcode: string): boolean {
    return this.validate(postcode).isValid;
  }

  public normalize(postcode: string): string {
    return this.validate(postcode).normalized;
  }

  // Check if postcode is in Glasgow area (G1-G99)
  public isGlasgowArea(postcode: string): boolean {
    const validation = this.validate(postcode);
    if (!validation.isValid) return false;

    return validation.area === 'G';
  }

  // Get postcode area (first 1-2 letters)
  public getArea(postcode: string): string {
    const validation = this.validate(postcode);
    return validation.isValid ? validation.area : '';
  }

  // Get postcode district (outward code)
  public getDistrict(postcode: string): string {
    const validation = this.validate(postcode);
    return validation.isValid ? validation.district : '';
  }

  // Calculate distance between two postcodes (rough estimate using area codes)
  public getApproximateDistance(postcode1: string, postcode2: string): number | null {
    const validation1 = this.validate(postcode1);
    const validation2 = this.validate(postcode2);

    if (!validation1.isValid || !validation2.isValid) {
      return null;
    }

    // Simple distance estimation based on area codes
    // This is a rough approximation - in production, you'd use geocoding
    const glasgowAreas = ['G1', 'G2', 'G3', 'G4', 'G5', 'G11', 'G12', 'G13', 'G14', 'G15',
                         'G20', 'G21', 'G22', 'G23', 'G31', 'G32', 'G33', 'G34', 'G40',
                         'G41', 'G42', 'G43', 'G44', 'G45', 'G46', 'G51', 'G52', 'G53',
                         'G60', 'G61', 'G62', 'G63', 'G64', 'G65', 'G66', 'G67', 'G68',
                         'G69', 'G70', 'G71', 'G72', 'G73', 'G74', 'G75', 'G76', 'G77',
                         'G78', 'G79', 'G80', 'G81', 'G82', 'G83', 'G84', 'G85'];

    const isGlasgow1 = glasgowAreas.some(area => validation1.district.startsWith(area));
    const isGlasgow2 = glasgowAreas.some(area => validation2.district.startsWith(area));

    if (isGlasgow1 && isGlasgow2) {
      return 0; // Both in Glasgow area
    } else if (isGlasgow1 || isGlasgow2) {
      return 5; // One in Glasgow, one outside - rough estimate
    } else {
      return 10; // Both outside Glasgow - rough estimate
    }
  }
}

// Utility functions
export const validatePostcode = (postcode: string): PostcodeValidationResult => {
  return PostcodeValidator.getInstance().validate(postcode);
};

export const isValidPostcode = (postcode: string): boolean => {
  return PostcodeValidator.getInstance().isValid(postcode);
};

export const normalizePostcode = (postcode: string): string => {
  return PostcodeValidator.getInstance().normalize(postcode);
};

export const isGlasgowPostcode = (postcode: string): boolean => {
  return PostcodeValidator.getInstance().isGlasgowArea(postcode);
};
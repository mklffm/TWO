declare module 'mrz-detection' {
  // Define the basic types for MRZ detection
  export interface MRZResult {
    documentType?: string;
    documentNumber?: string;
    surname?: string;
    givenNames?: string;
    nationality?: string;
    birthDate?: string;
    expiryDate?: string;
    gender?: string;
    personalNumber?: string;
    fullName?: string;
  }

  // Functions
  export function detect(imageData: ImageData): Promise<MRZResult>;
  export function parse(mrzText: string): MRZResult;
} 
// Utility to validate and clean website URLs
export const validateAndCleanWebsiteUrl = (website: string | undefined): string | null => {
  if (!website) return null;
  
  // Remove any extra whitespace
  const cleanUrl = website.trim();
  
  // Check if it's empty after trimming
  if (!cleanUrl) return null;
  
  // If it doesn't start with http:// or https://, add https://
  if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
    return `https://${cleanUrl}`;
  }
  
  // Basic URL validation
  try {
    new URL(cleanUrl);
    return cleanUrl;
  } catch {
    // If URL is invalid, try with https prefix
    try {
      new URL(`https://${cleanUrl}`);
      return `https://${cleanUrl}`;
    } catch {
      return null;
    }
  }
};

// Get the domain name from a URL for display purposes
export const getDomainFromUrl = (url: string): string => {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.replace('www.', '');
  } catch {
    return url;
  }
};

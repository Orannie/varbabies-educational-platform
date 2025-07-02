// Secure Google Drive Configuration
// This file manages API keys and authentication securely
// Keys should be set via environment variables or secure config

class SecureConfig {
    constructor() {
        // Environment-based configuration
        this.config = {
            // These should be set via environment variables in production
            googleDrive: {
                apiKey: process.env.GOOGLE_DRIVE_API_KEY || this.getConfigFromMeta('google-api-key'),
                clientId: process.env.GOOGLE_CLIENT_ID || this.getConfigFromMeta('google-client-id'),
                serviceAccountEmail: process.env.GOOGLE_SERVICE_ACCOUNT || null,
                // Main folder ID where all past papers are stored
                rootFolderId: process.env.GOOGLE_ROOT_FOLDER_ID || this.getConfigFromMeta('root-folder-id'),
                // Enable public access mode (no authentication required for viewing)
                publicAccessMode: true,
                // Cache settings
                cacheEnabled: true,
                cacheExpiry: 30 * 60 * 1000 // 30 minutes
            },
            
            // Security settings
            security: {
                // Hide email addresses from public view
                hideEmailInPublic: true,
                // Enable CORS for secure API calls
                enableCORS: true,
                // Rate limiting for API calls
                rateLimitEnabled: true,
                maxRequestsPerMinute: 60
            },
            
            // Feature flags
            features: {
                directDownloads: true,
                filePreview: true,
                bulkDownload: false, // Completely disabled - no bulk downloads
                searchEnabled: true,
                filteringEnabled: true
            }
        };
    }
    
    // Get configuration from meta tags (for security)
    getConfigFromMeta(name) {
        const meta = document.querySelector(`meta[name="${name}"]`);
        return meta ? meta.getAttribute('content') : null;
    }
    
    // Get Google Drive configuration
    getGoogleDriveConfig() {
        return this.config.googleDrive;
    }
    
    // Get security configuration
    getSecurityConfig() {
        return this.config.security;
    }
    
    // Get feature flags
    getFeatures() {
        return this.config.features;
    }
    
    // Validate configuration
    isValid() {
        const gdConfig = this.config.googleDrive;
        return gdConfig.apiKey && gdConfig.clientId;
    }
    
    // Get safe configuration for frontend (without sensitive data)
    getSafeConfig() {
        return {
            features: this.config.features,
            security: {
                hideEmailInPublic: this.config.security.hideEmailInPublic,
                enableCORS: this.config.security.enableCORS
            },
            googleDrive: {
                publicAccessMode: this.config.googleDrive.publicAccessMode,
                cacheEnabled: this.config.googleDrive.cacheEnabled
            }
        };
    }
}

// Create secure config instance
const secureConfig = new SecureConfig();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SecureConfig, secureConfig };
} else {
    window.SecureConfig = SecureConfig;
    window.secureConfig = secureConfig;
}

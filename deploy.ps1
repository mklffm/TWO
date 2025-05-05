# Mira Booking Deployment Script
# ============================
# This script deploys the Mira Booking application to Cloudflare Workers

# Instructions:
# 1. Replace YOUR_API_TOKEN with the actual API token from Cloudflare
# 2. Run this script in PowerShell

# Set environment variables
$env:CLOUDFLARE_API_TOKEN = "YOUR_API_TOKEN"

Write-Host "🔑 Checking Cloudflare API token..." -ForegroundColor Yellow

# Check if token is valid
try {
    $whoami = npx wrangler whoami
    Write-Host "✅ API token is valid!" -ForegroundColor Green
    Write-Host $whoami
    
    # Extract account ID
    if ($whoami -match "Account ID: ([a-f0-9]+)") {
        $accountId = $matches[1]
        Write-Host "📋 Your Account ID: $accountId" -ForegroundColor Cyan
        $env:CF_ACCOUNT_ID = $accountId
        Write-Host "✅ Set CF_ACCOUNT_ID environment variable" -ForegroundColor Green
    }
} catch {
    Write-Host "❌ API token is invalid or not set correctly" -ForegroundColor Red
    Write-Host "Please get a valid API token from Cloudflare dashboard:" -ForegroundColor Yellow
    Write-Host "https://dash.cloudflare.com/profile/api-tokens" -ForegroundColor Yellow
    exit 1
}

# Build the application
Write-Host "🏗️ Building application..." -ForegroundColor Yellow
npm run build:cloudflare

# Deploy to Cloudflare Workers
Write-Host "🚀 Deploying to Cloudflare Workers..." -ForegroundColor Yellow
npx wrangler deploy

Write-Host "✨ Deployment complete!" -ForegroundColor Green 
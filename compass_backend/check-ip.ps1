# Script to check current IP address when connected to VPN
Write-Host "Checking current IP..." -ForegroundColor Cyan

try {
    # Get IP from different sources
    $ip1 = (Invoke-WebRequest -Uri "https://api.ipify.org" -TimeoutSec 5).Content
    $ip2 = (Invoke-WebRequest -Uri "https://ifconfig.me/ip" -TimeoutSec 5).Content
    
    Write-Host ""
    Write-Host "Current IP (from api.ipify.org): $ip1" -ForegroundColor Green
    Write-Host "Current IP (from ifconfig.me): $ip2" -ForegroundColor Green
    Write-Host ""
    
    if ($ip1 -eq $ip2) {
        Write-Host "IPs match - this is the correct IP" -ForegroundColor Green
        Write-Host ""
        Write-Host "Steps to add IP to MongoDB Atlas:" -ForegroundColor Yellow
        Write-Host "1. Open: https://cloud.mongodb.com/" -ForegroundColor White
        Write-Host "2. Select Cluster -> Security -> Network Access" -ForegroundColor White
        Write-Host "3. Click 'Add IP Address'" -ForegroundColor White
        Write-Host "4. Enter IP: $ip1" -ForegroundColor White
        Write-Host "5. Or select 'Allow Access from Anywhere' (0.0.0.0/0) for testing" -ForegroundColor White
        Write-Host ""
    } else {
        Write-Host "Warning: IPs differ - there might be a connection issue" -ForegroundColor Yellow
        Write-Host "Use the first IP: $ip1" -ForegroundColor Yellow
    }
    
} catch {
    Write-Host "Error getting IP:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    Write-Host ""
    Write-Host "You can open this link in browser to find your IP:" -ForegroundColor Cyan
    Write-Host "https://whatismyipaddress.com/" -ForegroundColor White
}

Write-Host ""
Write-Host "MongoDB Atlas Network Access link:" -ForegroundColor Cyan
Write-Host "https://cloud.mongodb.com/security/network/whitelist" -ForegroundColor White
Write-Host ""

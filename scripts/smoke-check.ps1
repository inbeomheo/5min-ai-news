$ErrorActionPreference = "Stop"

$root = Resolve-Path (Join-Path $PSScriptRoot "..")

$indexPath = Join-Path $root "index.html"
$monthDir = Join-Path $root "news\2025-12"

if (-not (Test-Path -LiteralPath $indexPath)) {
    throw "Missing file: $indexPath"
}

if (-not (Test-Path -LiteralPath $monthDir)) {
    throw "Missing directory: $monthDir"
}

# Avoid hardcoding Korean filenames in this script (PowerShell 5.1 encoding/codepage issues).
# Instead, locate 2025-12-20 files using ASCII-only patterns, then identify which is dashboard/infographic by content.
$candidates = Get-ChildItem -LiteralPath $monthDir -File | Where-Object {
    $_.Name -like "*2025*12*20*" -and $_.Extension -ieq ".HTML"
}

if ($candidates.Count -lt 2) {
    throw "Could not find both 2025-12-20 HTML files under $monthDir (found $($candidates.Count))"
}

$dashboard = $null
$infographic = $null

foreach ($f in $candidates) {
    $content = Get-Content -LiteralPath $f.FullName -Raw

    if ($null -eq $dashboard -and $content -match 'const\s+reportData\s*=\s*\[') {
        $dashboard = $f
        continue
    }

    if ($null -eq $infographic -and ($content -match 'Chart\.js' -or $content -match 'marketChart')) {
        $infographic = $f
        continue
    }
}

if ($null -eq $dashboard) {
    throw "Could not identify dashboard HTML from candidates under $monthDir"
}

if ($null -eq $infographic) {
    throw "Could not identify infographic HTML from candidates under $monthDir"
}

$index = Get-Content -LiteralPath $indexPath -Raw

# Check index links 2025-12-20 pages (ASCII-only regexp)
if ($index -notmatch 'href="news/2025-12/[^\"]*2025[^\"]*12[^\"]*20[^\"]*\.HTML"') {
    throw "index.html does not appear to link to 2025-12-20 pages"
}

$dash = Get-Content -LiteralPath $dashboard.FullName -Raw

if ($dash -notmatch 'value:\s*"24\.1%"') {
    throw "2025-12-20 dashboard keyMetricsData does not include value: 24.1%"
}

Write-Host "SMOKE CHECK OK"

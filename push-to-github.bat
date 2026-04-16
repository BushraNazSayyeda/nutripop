@echo off
setlocal enabledelayedexpansion
title NutriPop — Push to GitHub + Create PR + Deploy on Vercel

cd /d "C:\Users\bushr\nutripop"

echo.
echo  =========================================================
echo    NutriPop — GitHub Push, PR ^& Vercel Deploy
echo  =========================================================
echo.

REM ── Check git ─────────────────────────────────────────────────
where git >nul 2>&1
if errorlevel 1 (
    echo  [ERROR] git not found. Install from: https://git-scm.com/download/win
    pause & exit /b 1
)

REM ── Init repo if needed ───────────────────────────────────────
if not exist ".git" (
    echo  Initialising git repo...
    git init -q
    git remote add origin https://github.com/BushraNazSayyeda/nutripop.git
) else (
    git remote remove origin 2>nul
    git remote add origin https://github.com/BushraNazSayyeda/nutripop.git
)

REM ── Stage + commit ────────────────────────────────────────────
echo  Staging all files...
git add .
git diff --cached --quiet
if errorlevel 1 (
    git commit -q -m "feat: complete NutriPop e-commerce site

- All 10 pages: Home, Shop, ProductDetail, Cart, Checkout,
  OrderConfirmation, Wishlist, MilletLife, ArticleDetail,
  Profile, FAQ, Contact, InterestForm, OurStory, Login, 404
- CartContext: fixed localStorage persistence race condition
- AuthContext: added loading state for auth guard timing fix
- vercel.json: configured for Vite SPA deployment"
) else (
    echo  Nothing new to commit.
)

REM ── Create + push feature branch ─────────────────────────────
set BRANCH=feature/complete-site
echo  Pushing branch %BRANCH% to GitHub...
echo  (A browser window may open to sign in with GitHub)
echo.
git branch -f %BRANCH%
git push -u origin %BRANCH% --force
if errorlevel 1 (
    echo.
    echo  [ERROR] Push failed. Make sure you are logged into GitHub.
    echo  Try running: git push -u origin %BRANCH%
    pause & exit /b 1
)

echo.
echo  [OK] Branch pushed: github.com/BushraNazSayyeda/nutripop/tree/%BRANCH%
echo.

REM ── Create PR with gh CLI ─────────────────────────────────────
where gh >nul 2>&1
if not errorlevel 1 (
    echo  Creating Pull Request...
    gh pr create ^
      --title "feat: complete NutriPop e-commerce site" ^
      --body "## Summary^

- All 10+ pages built and verified (Home, Shop, Product Detail, Cart, Checkout, Order Confirmation, Wishlist, Profile, Millet Life, Article Detail, FAQ, Contact, Login, 404)^
- Real product images served from Downloads folder via Vite middleware^
- Two bug fixes: CartContext localStorage race condition, AuthContext loading state^
- vercel.json configured for Vite SPA deployment with React Router rewrites^

## Test plan^
- [ ] Browse to /shop, click product → /product/:id^
- [ ] Add to cart → /cart → /checkout → /order-success^
- [ ] Login → /profile shows mock orders^
- [ ] /doesnotexist shows 404 page^
- [ ] npm run build succeeds" ^
      --base main ^
      --head %BRANCH%

    if not errorlevel 1 (
        echo.
        echo  [OK] Pull Request created!
        gh pr view --web
    )
) else (
    echo  gh CLI not found - opening PR creation page in browser...
    start "" "https://github.com/BushraNazSayyeda/nutripop/compare/main...%BRANCH%?quick_pull=1&title=feat%%3A+complete+NutriPop+e-commerce+site"
)

REM ── Open Vercel ───────────────────────────────────────────────
echo.
echo  Opening Vercel to deploy...
timeout /t 2 /nobreak >nul
start "" "https://vercel.com/new"
echo.
echo  In Vercel:  click Import next to "nutripop" → Deploy
echo  Your site will be live at nutripop.vercel.app in ~60 seconds!
echo.
pause

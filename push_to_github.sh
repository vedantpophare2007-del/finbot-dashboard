#!/usr/bin/env bash
set -e

echo "======================================================="
echo "  🚀 FinBot One-Click GitHub Uploader"
echo "  Target: https://github.com/vedantpophare2007-del/finbot-dashboard"
echo "======================================================="
echo ""
printf "Paste your GitHub Token (typing hidden): "
read -s GITHUB_TOKEN
echo ""

if [ -z "$GITHUB_TOKEN" ]; then
  echo "Error: Token cannot be empty."
  exit 1
fi

echo "Uploading to GitHub..."
cd "/Users/vedantanuppophare/.gemini/antigravity/scratch/finbot-dashboard"
git remote set-url origin "https://vedantpophare2007-del:${GITHUB_TOKEN}@github.com/vedantpophare2007-del/finbot-dashboard.git"

if git push -u origin main; then
  # Clean up token from remote URL for safety
  git remote set-url origin "https://github.com/vedantpophare2007-del/finbot-dashboard.git"
  echo ""
  echo "======================================================="
  echo "  🎉 SUCCESS! All files uploaded to:"
  echo "  👉 https://github.com/vedantpophare2007-del/finbot-dashboard"
  echo "======================================================="
  open "https://github.com/vedantpophare2007-del/finbot-dashboard"
else
  git remote set-url origin "https://github.com/vedantpophare2007-del/finbot-dashboard.git"
  echo "Upload failed. Please verify your token permissions."
  exit 1
fi
